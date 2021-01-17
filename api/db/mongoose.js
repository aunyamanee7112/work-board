// handle connection to MongoDB

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', {useNewUrlParser:true})
.then(()=>{
  console.log("Connected to MongoDB successfully:)");
}).catch( (err)=>{
  console.log("Error while u access to mongo DB");
  console.log(err);
} );

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.exports = {
  mongoose
}
