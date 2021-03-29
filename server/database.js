const mysql = require('mysql');


class Database {

    constructor(config) {
        this.config = config;
        this.con = mysql.createConnection(config);
    }

    connect() {
        this.con.connect(err => {
            if (err) {
                console.log('ERROR: Failed to connect to database');
                throw err;
            } 
            console.log(`Connected to database ${this.config.database} at ${this.config.host}`);
        })
    }

    close() {
        this.con.end();
    }

    baseQuery(query, values, callback) {
        this.con.query(query, values, (err, res) => {
            let result;
            if (err) {
                console.log('ERROR Executing query!');
                console.log(err)
                result = null;
            } else {
                result = res;
            }
            if (callback != undefined)
                callback(result);
            else
                console.log(result);
        })
    }

    getLastTask() {

    }

    getLastList() {

    }

    stringifyResult(res) {
        if (res == null)
            return {result: "error"};
        
        return res.affectedRows > 0 ? {result: "ok"} : {result: "no change"}
    }

    getTasks(callback) {
        this.baseQuery('SELECT * from Task;', [], callback);
    }

    getLists(callback) {
        this.baseQuery('SELECT * from List;', [], callback);
    }

    addTask(title, description, listId, callback) {
        this.baseQuery('INSERT INTO Task (title, description, listId) ' + 
                       'VALUES (?, ?, ?);',
                       [title, description, listId], 
                       res => callback({id: res.insertId})
                       );
    }

    addList(name, callback) {
        this.baseQuery('INSERT INTO List (name) VALUES (?);', 
                       [name],
                       res => callback({id: res.insertId})
                       );
                           
    }

    editTask(taskId, title, description, state, listId, callback) {
        this.baseQuery('UPDATE Task SET title = ?, description = ?, state = ?, listId = ? ' + 
                       'WHERE taskId = ?;',
                       [title, description, state, listId, taskId], 
                       res => callback(this.stringifyResult(res)));
    }

    editList(listId, name, callback) {
        this.baseQuery('UPDATE List SET name = ? WHERE listId = ?;',
                       [name, listId], 
                       res => callback(this.stringifyResult(res)));
    }

    deleteTask(taskId, callback) {
        this.baseQuery('DELETE FROM Task WHERE taskId = ?;', [taskId],
                        res => callback(this.stringifyResult(res)));
    }

    deleteList(listId, callback) {
        this.baseQuery('DELETE FROM List WHERE listId = ?;', [listId],
                        res => callback(this.stringifyResult(res)));
    }

}


module.exports = Database;