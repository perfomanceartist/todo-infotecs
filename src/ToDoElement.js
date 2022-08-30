import React from "react";
import "./css/ToDoElement.css"

/*
    Функциональный конмпонент ToDoElement - плашка с задачей в списке задач. 
    Имеет 3 возможных CSS класса: waiting, inProcess, done, отличающиеся цветом.
    По щелчку на плашку задачи вызывается коллбек (из props) по передаче задачи в компонент ToDoPage.
    Для организации удаления/изменения задачи используется связь 
        Клик по плашке: ToDoElement    (callback)-> App    (props)-> ToDoPage
        Удаление/изменение: ToDoPage   (callback)-> App    (props)-> ToDoElement
*/
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
        <div className="todo-div" onClick={ () => { props.onClick(props.id); } } >
            <div className={StatusToClassName()} > {toDoName} </div>
        </div>
    )
}


ToDoElement.defaultProps = {name:"default name", status:"inProcess"};

export default ToDoElement;