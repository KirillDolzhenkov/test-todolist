import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    tasks: Array<TaskType>
    removeTask: (TaskId: string) => void
    addTask: (title: string) => void
    setFilterValue: (value: FilterType) => void
    changeIsDoneValue: (TaskId: string, IsDoneValue: boolean) => void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
    let [inputValue, setInputValue] = useState('')
    const addItem = () => {
        if(inputValue){
            props.addTask(inputValue)
            setInputValue('')
        }
    }
    const onkeypressHandler =  (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            addItem()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
    return (
        <div>
            <div className="App">
                <div>
                    <h3>What to learn</h3>
                    <div>
                        <input
                            value={inputValue}
                            onChange={onChangeHandler}
                            onKeyPress={onkeypressHandler}
                        />
                        <button onClick={addItem}>+</button>
                    </div>
                    <ul>
                        {props.tasks.map(t => {
                                const onclickHandler = () => props.removeTask(t.id)
                                const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeIsDoneValue(t.id, e.currentTarget.checked)
                                }
                                return (
                                    <li><input
                                        type="checkbox"
                                        checked={t.isDone}
                                        onChange={onChangeIsDoneHandler}
                                    />
                                        <span>{t.title}</span>
                                        <button onClick={onclickHandler}>X</button>
                                    </li>
                                )
                            }
                        )
                        }


                    </ul>
                    <div>
                        <button onClick={() => {
                            props.setFilterValue("All")
                        }}>All
                        </button>
                        <button onClick={() => {
                            props.setFilterValue("Active")
                        }}>Active
                        </button>
                        <button onClick={() => {
                            props.setFilterValue("Completed")
                        }}>Completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    TodoList
}