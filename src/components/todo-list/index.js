import React from "react";
import './style.css'

import TodoListItem from '../todo-list-item'

const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {
    const elements = todos.map((item) =>{
        const {id, ...list} = item;
        return (
            <li key={item.id} className="list-group-item">
                <TodoListItem {...list}
                onDeleted={() => onDeleted(id)}
                onToggleImportant = {() => onToggleImportant(id)}
                onToggleDone = {() => onToggleDone(id)}
                />
            </li>
        )
    })
    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    )
};

export default TodoList;