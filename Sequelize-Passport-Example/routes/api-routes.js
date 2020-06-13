// Requiring our models and passport as we've configured it
var db = require("../models");


module.exports = function(app) {
//get request to get all info from database per user create table 
app.get("/api/user_data", function(req, res) {
  db.User.findAll({}).then(function(dbPlayers) {
    res.json(dbPlayers);
});
},

//post request to update wins, losses, blackjacks
app.put("/win", function(req, res) {
  db.User.update({
    wins: req.body.wins+1
  }, {
    where: {
      username: req.body.username
    }
  })
    .then(function(dbTodo) {
      res.json(dbTodo);
    });
}),

//update losses
app.put("/loss", function(req, res) {
  db.User.update({
    losses: req.body.losses+1
  }, {
    where: {
      username: req.body.username
    }
  })
    .then(function(dbLoss) {
      res.json(dbLoss);
    });
}),
//update blackjacks
app.put("/blackjack", function(req, res) {
  db.User.update({
    wins: req.body.wins+1,
    bjs: req.body.bjs+1
  }, {
    where: {
      username: req.body.username
    }
  })
    .then(function(dbBj) {
      res.json(dbBj);
    });
}),

//post request to post a new user in the database
app.post("/", function(req, res) {
  db.User.create({
    username: req.body.username,
    password: req.body.password
  }).then(function(){

  })
})
}