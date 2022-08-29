import React from "react";
import "./css/ToDoElement.css"


function ToDoElement(props) {

    const StatusToClassName = () => {
        switch (props.status) {
            case "inProcess":
                return "todo-name todo-inProcess";
            case "done":
                return "todo-name todo-done";
            case "waiting":
                return "todo-name todo-waiting";
            default:
                return "error";
        }
    };


    const toDoName = props.name.length > 0 ? props.name : "Введите имя...";

    return (
        <div className="todo-div" onClick={ () => { props.onClick(props.id, props.name, props.status); } } >
            <div className={StatusToClassName()} > {toDoName} </div>
        </div>
    )
}


ToDoElement.defaultProps = {name:"default name", status:"inProcess"};

export default ToDoElement;