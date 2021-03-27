const URL = 'http://127.0.0.1:5000';


export class Api {

    static getTasks(callback) {
        fetch(`${URL}/task`, {method: 'GET'})
            .then(res => res.json())
            .catch(() => callback([]))
            .then(tasks => callback(tasks))
    }

    static getLists(callback) {
        fetch(`${URL}/list`, {method: 'GET'})
            .then(res => res.json())
            .catch(() => callback([]))
            .then(lists => callback(lists))
    }

    static editList(listId, listName) {

    };
    
    static addList() {
    
    };
    
    static deleteList(listId) {
    
    };
    
    static addTask(title, description, listId, callback) {
        fetch(`${URL}/task?${
                new URLSearchParams({
                    title: title,
                    description: description,
                    listId: listId
                })
            }`, 
            {method: 'POST'}
            )
            .then(res => res.json())
            .catch(() => callback([]))
            .then(tasks => callback(tasks))
    };
    
    static editTask(taskId, title, description, listId, state, callback) {
        fetch(`${URL}/task?${
            new URLSearchParams({
                taskId: taskId,
                title: title,
                description: description,
                state: state,
                listId: listId
            })
            }`, 
            {method: 'PUT'})
            .then(res => res.json())
            .catch(() => callback([]))
            .then(tasks => callback(tasks)
        );
    };

    static deleteTask(taskId, callback) {
        fetch(`${URL}/task?${
            new URLSearchParams({
                taskId: taskId,
            })
            }`, 
            {method: 'DELETE'})
            .then(res => res.json())
            .catch(() => callback([]))
            .then(res => callback(res)
        );
    }

};

