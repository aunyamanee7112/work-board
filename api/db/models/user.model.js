const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//JWT secret
const jwtSecret = "04034489124737968087deloeoekoeooirtj2394073113";
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  sessions: [
    {
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Number,
        required: true,
      },
    },
  ],
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  // return the doc expect the passwoed and sessions
  // These shouldn't be made avalible
  return _.omit(userObject, ["password", "sessions"]);
};
UserSchema.methods.generateAccessAuthToken = function () {
  const user = this;
  return new Promise((reslove, reject) => {
    //create json web token and return that
    jwt.sign(
      { _id: user._id.toHexString() },
      jwtSecret,
      { expiresIn: "15m" },
      (err, token) => {
        if (!err) {
          reslove(token);
        } else {
          reject();
        }
      }
    );
  });
};
UserSchema.methods.createSession = function () {
  let user = this;
  return user.generateRefreshAuthToken().then((refreshToken) => {
    return saveSessionToDatabase(user, refreshToken)
      .then((refreshToken) => {
        return refreshToken;
      })
      .catch((e) => {
        return Promise.reject("Falied to save session to database" + e);
      });
  });
};
UserSchema.methods.generateRefreshAuthToken = function () {
  return new Promise((reslove, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      let token = buf.toString("Hex");
      return reslove(token);
    });
  });
};

/*MODEL METHODS STATIC METHODS*/
UserSchema.statics.findByIdAndToken = function (_id, token) {
  const User = this;
  return User.findOne({
    _id,
    "sessions.token": token,
  });
};
UserSchema.statics.findByCredentials = function (email, password) {
  let user = this;
  return user.findOne({ email }).then((user) => {
    if (!user) return Promise.reject();

    return new Promise((reslove, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) reslove(user);
        else {
          reject(err);
        }
      });
    });
  });
};

UserSchema.statics.hashRefreshTokenExpired = (expireAt) => {
  let secondsSinceEpoch = Date.now() / 1000;
  if (expireAt > secondsSinceEpoch) {
    return false;
  } else {
    return true;
  }
};

/*MIDDLE WARE*/
UserSchema.pre("save", function (next) {
  let user = this;
  let costFactor = 10;
  if (user.isDirectModified("password")) {
    // if the password field has been edited the run this code

    //Generate salt and hash password
    bcrypt.genSalt(costFactor, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/*HELPER METHODs*/
let saveSessionToDatabase = (user, refreshToken) => {
  return new Promise((resolve, reject) => {
    let expireAt = generateRefreshTokenExpiryTime();
    user.sessions.push({ token: refreshToken, expireAt });
    user
      .save()
      .then(() => {
        return resolve(refreshToken);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
let generateRefreshTokenExpiryTime = () => {
  let dayUntilExpire = 10;
  let secondUntilExpire = ((dayUntilExpire * 24) * 60 * 60);
  return ( (Date.now() / 1000) + secondUntilExpire);
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
