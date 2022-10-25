import React, {useReducer} from 'react';
import {v1} from "uuid";
import {AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";

import './App.css';
import {AddItemForm} from "./AddItemForm";
import {TaskType, Todolist} from "./TodoList";
import {Menu} from '@material-ui/icons';
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasksReducer";

export type FilterValuesType = "All" | "Active" | "Completed"
export type TodolistStateType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const TodoListId_1 = v1();
    const TodoListId_2 = v1();

    const [todosData, dispatchTodo] = useReducer(todolistsReducer, [
        {id: TodoListId_1, title: "what to learn", filter: "All"},
        {id: TodoListId_2, title: "what to bye", filter: "All"},
    ]);

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [TodoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [TodoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Coffee", isDone: false},
        ],
    });

    //tasks callBacks:
    const deleteTask = (taskId: string, todoId: string) => {
        /*//find tasks used TodoId from onClickHandler:
        let foundTasks = tasks[todoId];
        //remove task from all tasks:
        let filteredTasks = foundTasks.filter(t => t.id !== taskId);
        //rewrite new tasksData for todolist:
        tasks[todoId] = filteredTasks;
        //rerender all TasksData:
        //setTasks({...tasks});*/
        const action = removeTaskAC(taskId, todoId);
        dispatchTasks(action);
    };
    const createTask = (title: string, todoId: string) => {
        /*//create new task:
        let newTask = {id: v1(), title, isDone: false};
        //find tasks used TodoId from onClickHandler:
        let foundTasks = tasks[todoId];
        //rewrite new tasksData for todolist:
        let newTasksData = ([newTask, ...foundTasks]);
        tasks[todoId] = newTasksData;
        //rerender all TasksData:
        setTasks({newTasksData, ...tasks});*/
        const action = addTaskAC(title, todoId);
        dispatchTasks(action);
    };
    const changeFilter = (value: FilterValuesType, todoId: string) => {
        /*//find todolist used todoId from onClickHandler:
        let todo = todosData.find(tl => tl.id === todoId);
        //if todolist exists rewrite filter value and rerender all TodosData:
        if (todo) {
            todo.filter = value;
            //setTodosData([...todosData]);
        }*/
        const action = changeTodoFilterAC(todoId, value);
        dispatchTodo(action);
    };
    const changeTaskStatus = (taskId: string, isDone: boolean, todoId: string) => {
        /*//find taskS used TodoId from onClickHandler:
        let foundTasks = tasks[todoId]
        //find TASK from foundTasks used taskId from onClickHandler:
        let foundTask = foundTasks.find(t => t.id === taskId);
        //if task exists rewrite isDone value and rerender all TasksData:
        if (foundTask) {
            foundTask.isDone = isDone;
            setTasks({...tasks})
        }*/
        const action = changeTaskStatusAC(taskId, isDone, todoId);
        dispatchTasks(action);
    };
    const changeTaskTitle = (taskId: string, newTitle: string, todoId: string) => {
        /*//find taskS used TodoId from onClickHandler:
        let foundTasks = tasks[todoId];
        //find TASK from foundTasks used taskId from onClickHandler:
        let foundTask = foundTasks.find(t => t.id === taskId);
        //if task exists rewrite title value and rerender all TasksData:
        if (foundTask) {
            foundTask.title = newTitle;
            setTasks({...tasks})
        }*/
        const action = changeTaskTitleAC(taskId, newTitle, todoId);
        dispatchTasks(action);
    }


    //todoLists callBacks:
    const removeTodolist = (todoId: string) => {
        /*//remove todolist used todoId:
        let filteredTodo = todosData.filter(tl => tl.id !== todoId);
        //rewrite all todoData and delete taskData of this todolist:
        setTodosData(filteredTodo);
        delete tasks[todoId];
        //rerender all tasksData:
        setTasks({...tasks});*/
        const action = removeTodolistAC(todoId);
        dispatchTasks(action);
        dispatchTodo(action);
    }
    const createTodolist = (title: string) => {
        /*//create new todolist:
        let newTodo: TodolistStateType = {id: v1(), title, filter: "All"};
        //rerender all todoData with new todolist:
        setTodosData([newTodo, ...todosData]);
        //rerender all todoData with new tasks of this todolist:
        setTasks({
            ...tasks,
            [newTodo.id]: []
        });*/
        const action = addTodoAC(title);
        dispatchTasks(action);
        dispatchTodo(action);
    }
    const changeTodoListTitle = (todoId: string, newTitle: string) => {
       /* //found todolist used todoId:
        let filteredTodo = todosData.find(t => t.id === todoId);
        //filteredTodo = isUndefined, if todolist exist rewrite title and rerender all todosData:
        if (filteredTodo) {
            filteredTodo.title = newTitle;
            setTodosData([...todosData]);
        }*/
        const action = changeTodoTitleAC(newTitle, todoId);
        dispatchTodo(action);
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    {/*AddItemForm: */}
                    <AddItemForm addItemHandler={createTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {/*App: */}
                    {
                        todosData.map((tl) => {

                            //filtered tasks for todolist:

                            //#1:
                            /*let tasksForTodo = tasks[tl.id];
                            if (tl.filter === "Active") {
                                tasksForTodo = tasks[tl.id].filter(t => !t.isDone);
                            }
                            if (tl.filter === "Completed") {
                                tasksForTodo = tasks[tl.id].filter(t => t.isDone);
                            }*/

                            //#2:
                            /*let tasksForTodo = (): Array<TaskType> => {
                                switch (tl.filter) {
                                    case "Active": {
                                        return tasks[tl.id].filter(t => t.isDone);
                                    }
                                    case "Completed": {
                                        return tasks[tl.id].filter(t => !t.isDone);
                                    }
                                    default:
                                        return tasks[tl.id];
                                }
                            }*/

                            //#3(clear function):
                            let getTasksForRender = (todoList: TodolistStateType, tasks: TasksStateType): Array<TaskType> => {
                                switch (tl.filter) {
                                    case "Active": {
                                        return tasks[tl.id].filter(t => t.isDone);
                                    }
                                    case "Completed": {
                                        return tasks[tl.id].filter(t => !t.isDone);
                                    }
                                    default:
                                        return tasks[tl.id];
                                }
                            };

                            return (
                                <Todolist
                                    key={tl.id}
                                    todoId={tl.id}
                                    title={tl.title}
                                    tasks={getTasksForRender(tl, tasks)}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    createTask={createTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;