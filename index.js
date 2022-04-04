const express = require("express");
const path = require("path");
const Kitten = require("./service/service");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();

const kitten = new Kitten();

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to your project folder.
});

router.post("/", function (req, res) {
  const kittyName = req.body["kitty"];
  console.log(kittyName);
  kitten
    .save(kittyName)
    .then((r) => {
      res.send("Saved Successfully");
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
      res.send("Request Failed");
    });
});

router.get("/kitties", function (req, res) {
  kitten
    .getAll()
    .then((r) => {
      res.send(
        Array.from(r)
          .map((e) => e.name)
          .join("<br>")
      );
    })
    .catch(console.log);
});

// router.get('/sitemap',function(req,res){
//   res.sendFile(path.join(__dirname+'/sitemap.html'));
// });

//add the router
app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");

// const CosmosClient = require('@azure/cosmos').CosmosClient
//  const config = require('./config')
//  const TaskList = require('./routes/Tasklist')
//  const TaskDao = require('./models/TaskDao')

//  const express = require('express')
//  const path = require('path')
//  const logger = require('morgan')
//  const cookieParser = require('cookie-parser')
//  const bodyParser = require('body-parser')

//  const app = express()

//  // view engine setup
//  app.set('views', path.join(__dirname, 'views'))
//  app.set('view engine', 'jade')

//  // uncomment after placing your favicon in /public
//  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//  app.use(logger('dev'))
//  app.use(bodyParser.json())
//  app.use(bodyParser.urlencoded({ extended: false }))
//  app.use(cookieParser())
//  app.use(express.static(path.join(__dirname, 'public')))

//  //Todo App:
//  const cosmosClient = new CosmosClient({
//    endpoint: config.host,
//    key: config.authKey
//  })
//  const taskDao = new TaskDao(cosmosClient, config.databaseId, config.containerId)
//  const taskList = new TaskList(taskDao)
//  taskDao
//    .init(err => {
//      console.error(err)
//    })
//    .catch(err => {
//      console.error(err)
//      console.error(
//        'Shutting down because there was an error settinig up the database.'
//      )
//      process.exit(1)
//    })

//  app.get('/', (req, res, next) => taskList.showTasks(req, res).catch(next))
//  app.post('/addtask', (req, res, next) => taskList.addTask(req, res).catch(next))
//  app.post('/completetask', (req, res, next) =>
//    taskList.completeTask(req, res).catch(next)
//  )
//  app.set('view engine', 'jade')

//  // catch 404 and forward to error handler
//  app.use(function(req, res, next) {
//    const err = new Error('Not Found')
//    err.status = 404
//    next(err)
//  })

//  // error handler
//  app.use(function(err, req, res, next) {
//    // set locals, only providing error in development
//    res.locals.message = err.message
//    res.locals.error = req.app.get('env') === 'development' ? err : {}

//    // render the error page
//    res.status(err.status || 500)
//    res.render('error')
//  })

//  module.exports = app
