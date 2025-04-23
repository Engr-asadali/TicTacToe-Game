import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";

export default function Todo() {
    let [todos, setTodos] = useState([]);
    let [newTodo, setNewTodo] = useState("");
    let inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    let addNewTodo = () => {
        if (!newTodo.trim()) return;
        setTodos([...todos, { task: newTodo, id: uuidv4(), isDone: false }]);
        setNewTodo("");
    };

    let handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addNewTodo();
        }
    };

    let deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    let MarkAsDone = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo)));
    };

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <div className="input-container">
                <input
                    ref={inputRef}
                    placeholder="Enter your task here"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button className="add-btn" onClick={addNewTodo}>Add</button>
            </div>

            <hr />

            <ul className="todo-list">
                {todos.length === 0 ? (
                    <p className="empty-message">No tasks added yet!</p>
                ) : (
                    todos.map((todo) => (
                        <li key={todo.id}>
                            <span className={todo.isDone ? "completed" : ""}>{todo.task}</span>
                            <div>
                                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                <button className="done-btn" onClick={() => MarkAsDone(todo.id)}>Done</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
