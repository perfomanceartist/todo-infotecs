import React from "react";
import "./css/ToDoList.css"

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {

        return (
            <div class="todo-list-div">
        <div class="todo-list-name">
            Задачи
        </div>
        <div class="todo-list">
            
            <div class="todo">1</div>
            <div class="todo">2</div>
            <div class="todo">3</div>
            <div class="todo">4</div>
            <div class="todo">1</div>
            <div class="todo">2</div>
            <div class="todo">3</div>
            <div class="todo">4</div>
            <div class="todo">1</div>
            <div class="todo">2</div>
            <div class="todo">3</div>
            <div class="todo">4</div>
        </div>
        
            <div class="todo-add-form">
                ssss;
            </div>
            </div>
        );
    }
};

export default ToDoList;