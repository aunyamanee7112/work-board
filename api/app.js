const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./db/mongoose");
//Load in the moonge models
const { List, Task } = require("./db/models");
const bodyParser = require("body-parser");

// Cors handdle

app.use(
  cors({
    credentials: true,
    origin: true,
    // methods: 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS'
  })
);

// app.use((req, res, next) => {

//   let refreshToken = req.header('x-refresh-token');
//   let _id = req.header('_id')
//   User.findOneAndToken(_id, token).then((user) => {
//     if (!user) {
//       return Promise.reject({
//         'error': 'user not found'
//       });
//     }
//     req.user_id = user._id;
//     req.refreshToken = refreshToken;
//     let isSessionValid

//     user.sessions.forEach(session => {
//       if (session.token === refreshToken) {
//         if (User.hashRefreshTokenExpired(session.expiresAt) === false) {
//           isSessionValid = true
//         }
//       }
//     });
//     if (isSessionValid) {
//       next();
//     } else {
//       return Promise.reject({
//         'error': 'Refresh token has expired'
//       }).catch((e) => {
//         res.status(401).send(e)
//       })
//     }
//   })

// })
// Load middelware
app.use(bodyParser.json());
/*Route Handlers*/

/*LIST ROUTES*/
app.get("/list", (req, res) => {
  //return all of list in database
  List.find({}).then((list) => {
    res.send(list);
  });
});

app.post("/list", (req, res) => {
  //new list
  let title = req.body.title;
  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    //the full list Document is returned(incl.id)
    res.send(listDoc);
  });
});

app.patch("/list/:id", (req, res) => {
  List.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(() => {
    res.send({ message: "complete successfull" });
  });
});
app.delete("/list/:id", (req, res) => {
  List.findByIdAndRemove({
    _id: req.params.id,
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

//TaskZone

app.get("/list/:listId/tasks", (req, res) => {
  Task.find({
    _listId: req.params.listId,
  }).then((tasks) => {
    res.send(tasks);
  });
});

app.post("/list/:listId/tasks", (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
});

app.patch("/list/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      _listId: req.params.listId,
    },
    {
      $set: req.body,
    }
  ).then(() => {
    res.send({ message: "complete successfull" });
  });
});
app.delete("/list/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((taskDoc) => {
    res.send(taskDoc);
  });
});

app.get("/list/:listId/tasks/:taskId" ,(req,res)=>{
   Task.find({
     _id: req.params.taskId,
     _listId:req.params.listId
   }).then((task)=>{
     res.send(task)
   })
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

/*USER ROUTES*/
