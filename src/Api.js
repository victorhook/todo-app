const URL = 'http://127.0.0.1:5000';


export class Api {

    static INVALID_ID = -1;
    static ERROR = -2;

    static STATES = {
        NOT_STARTED: "not started",
        STARTED: "started",
        FINISHED: "finished"
    };

    static getTasks(callback) {
        fetch(`${URL}/task`, {method: 'GET'})
            .then(res => res.json())
            .catch(() => callback(Api.ERROR))
            .then(tasks => callback(tasks))
    }

    static baseQuery(endpoint, method, searcParams, callback) {
        console.log(`Querying: "${endpoint}" method: "${method}", params: "${searcParams}"`);

        if (searcParams == null)
            searcParams = '';
        else
            searcParams = '?' + new URLSearchParams(searcParams);

        const url = `${URL}/${endpoint}${searcParams}`

        fetch(url, {method: method})
            .then(res => res.json())
            .catch(err => {
                console.log(`Error when performing API query: ${err}`);
                callback(Api.ERROR);
            })
            .then(res => {
                if (res == undefined)
                    res = Api.ERROR

                callback(res)
            })
            .catch(() => Api.ERROR)
    }

    static getLists(callback) {
        Api.baseQuery('list', 'GET', null, callback);
    }

    static editList(listId, listName, callback) {
        const params = {listId:listId, name:listName};
        Api.baseQuery('list', 'PUT', params, callback);
    };
    
    static addList(name, callback) {
        Api.baseQuery('list', 'POST', {name: name}, callback);
    };
    
    static deleteList(listId, callback) {
        fetch(`${URL}/list?${new URLSearchParams({listId: listId})}`, 
             {method: 'DELETE'})
            .then(res => res.json())
            .catch(() => callback([]))
            .then(res => callback(res))
    };
    
    static addTask(task, callback) {
        let params = {
            title: task.title,
            description: task.description,
            state: task.state,
            listId: task.listId
        };
        Api.baseQuery('task', 'POST', params, callback);
    };
    
    static editTask(task, callback) {
        const params = {
            taskId: task.taskId,
            title: task.title,
            description: task.description,
            state: task.state,
            listId: task.listId
        };
        Api.baseQuery('task', 'PUT', params, callback);
    };

    static deleteTask(taskId, callback) {
        Api.baseQuery('task', 'DELETE', {taskId: taskId}, callback);
    }

};

