import './App.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { FixedTopNavbar } from './components/FixedTopNavbar';
import { Navbar } from './components/Navbar';
import { ListContainer } from './components/ListContainer';
import { HomePage } from './components/HomePage';
import { NoLists } from './components/NoLists';
import { Api } from './Api';
import { Login } from './components/Login/Login';


const DEFAULT_LIST_NAME = 'New list';
const DEFAULT_TASK_ID = -1;

const getDefaultTask = listId => {
  return {
    taskId: DEFAULT_TASK_ID,
    title: "New task",
    description: "",
    state: Api.STATES.NOT_STARTED,
    listId: listId
  };
};


const App = () => {

  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [showHomepage, setShowHomepage] = useState(true);

  /* -- Misc utils -- */
  const getDefaultListName = () => {
    let i = 1;
    for (let list of lists) {
      if (list.name.startsWith(DEFAULT_LIST_NAME)) {
        let numb = list.name.split(DEFAULT_LIST_NAME)[1].trim();
        numb = parseInt(numb);
        if (i <= numb)
          i = numb + 1;
      }
    }
    
    return `${DEFAULT_LIST_NAME} ${i}`;
  }

  const taskSorter = (o1, o2) => o1.title.localeCompare(o2.title);
  const listSorter = (o1, o2) => o1.name.localeCompare(o2.name);

  /* -- API Callbacks -- */
  const addList = () => {
    let listName = getDefaultListName();

    Api.addList(listName, res => {
      if (res === Api.ERROR)  {
        console.log('Failed to add list!');
        return;
      }

      const newList = {
        listId: res.id,
        name: listName
      };

      setLists([...lists, newList].sort(list => list.name));
      setShowHomepage(false);
      setActiveList(newList);
    });
  }

  const deleteList = list => {
    Api.deleteList(list.listId, res => {
      if (res === Api.ERROR) {
        console.log('Failed to delete list!');
        return;
      }
      let remainingLists = lists.filter(l => l.listId != list.listId);
      setLists(remainingLists);

      // If there's no more lists, show empty list
      if (remainingLists.length === 0) {
        setActiveList(null);
      }
      
    })
  }
  const editList = list => {
    Api.editList(list.listId, list.name, res => {
      if (res === Api.ERROR) {
        console.log('Failed to edit list!');
        return;
      }
      const allButThisList = lists.filter(l => l.listId != list.listId);
      let editedList = {
        listId: list.listId,
        name: list.name
      };

      setLists([...allButThisList, editedList].sort(listSorter));
      setActiveList(editedList);
    })
  }

  /* -- Task -- */
  const addTask = list => {
    const newTask = getDefaultTask(list.listId);
    Api.addTask(newTask, res => {
      if (res === Api.ERROR) {
        console.log('Failed to add task!');
        return;
      }
      newTask.taskId = res.id;
      setTasks([...tasks, newTask]);
    })
  }
  const deleteTask = task => {
    Api.deleteTask(task.taskId, res => {
      if (res === Api.ERROR) {
        console.log('Failed to delete task!');
        return;
      }
      setTasks(tasks.filter(t => t.taskId != task.taskId));
    })
  }
  const editTask = task => {
    const allButThisTask = tasks.filter(t => t.taskId != task.taskId);
    let editedTask = {
      taskId: task.taskId, 
      title: task.title,
      description: task.description, 
      state: task.state,
      listId: task.listId
    };
    Api.editTask(task, res => {
      if (res === Api.ERROR) {
        console.log('Failed to edit task!');
        return;
      }
      setTasks([...allButThisTask, editedTask].sort(taskSorter));
    })

  }

  useEffect(() => {
    Api.getLists(lists => setLists(lists));
    Api.getTasks(tasks => setTasks(tasks));
  }, []);
  
  /* State callbacks */
  const showListPage = list => {
    console.log(lists)
    setActiveList(list);
    setShowHomepage(false);
  }

  return (
    <div className="App">

    <FixedTopNavbar toHomePage={() => setShowHomepage(true)} />


      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Navbar lists={lists}
                addList={addList}
                deleteList={deleteList}
                editList={editList}
                activateList={showListPage}
                toHomePage={() => setShowHomepage(true)}
              />

              <div className="content">

                {
                  showHomepage 
                  ? <HomePage />
                  : activeList != null 
                    ? <ListContainer list={activeList}
                                    tasks={tasks.filter(task => task.listId == activeList.listId)}
                                    addTask={addTask}
                                    deleteTask={deleteTask}
                                    editTask={editTask}
                                    editList={editList}/>
                    : <NoLists addList={addList}/>
                }
              </div>
          </Route>
        </Switch>
      </BrowserRouter>


     
      
    </div>
  )
}

export default App
