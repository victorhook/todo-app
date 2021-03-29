const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Read config file
const fs = require('fs');
const CONFIG_FILE = 'credentials.json';
const CONFIG_FILE_PATH = __dirname + '/' + CONFIG_FILE;
const config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH));

// Start connection to database
const Database = require('./database');
const db = new Database(config.database);

db.connect();

app.listen(config.server.port, () => console.log(`Server stared at port ${config.server.port}`));

app.route('/task')
   .get((req, res) => {
       console.log('hello')
        db.getTasks(tasks => res.json(tasks));
    })
   .post((req, res) => {
        db.addTask(req.query.title,
                   req.query.description,
                   req.query.listId,
                   result => res.json(result));
    })
   .put((req, res) => {
       console.log(req.query.taskId,
        req.query.title,
        req.query.description,
        req.query.state,
        req.query.listId)
        db.editTask(req.query.taskId,
                    req.query.title,
                    req.query.description,
                    req.query.state,
                    req.query.listId,
                    result => res.json(result));
    })
   .delete((req, res) => {
        db.deleteTask(req.query.taskId,
                      result => res.json(result));
    })

app.route('/list')
    .get((req, res) => {
        db.getLists(lists => res.json(lists));
    })
    .post((req, res) => {
        db.addList(req.query.name,
                   result => res.json(result));
    })
    .put((req, res) => {
        db.editList(req.query.listId,
                    req.query.name,
                    result => res.json(result));
    })
    .delete((req, res) => {
        db.deleteList(req.query.listId,
                      result => res.json(result));
    })