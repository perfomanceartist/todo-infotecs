import React from "react";
import "./css/ToDoPage.css"

/*
    Компонент ToDoPage реализует страницу изменения задачи. 
    Получает задачу через props от родительского элемента App, при изменении задачи изменяет свой state, 
        передает изменение через коллбеки (updateCallback и deleteCallback).
    Параметр key(=id задачи) также передается с задачей от App к ToDoPage через props 
        для гарантированного обновления state при изменении props.
    Для работы кнопок есть 3 метода - ToggleDone, ToggleFreese и Delete.
    ToggleDone и ToggleFreese меняют статус, Delete очищает state, вызывает коллбек для удаления.
*/

class ToDoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,  //Имя текущей задачи
            status: this.props.status, // Статус текущей задачи
            id: this.props.id, // ID текущей задачи (для удаления в списке)
            updateCallback: this.props.updateCallback, // коллбек обновления
            deleteCallback: this.props.deleteCallback  // коллбек удаления
        }
    }
    Delete = () => {
        this.state.deleteCallback(this.state.id); //Вызов коллбека у App (удаление из списка задач App.state.todos);
        this.setState( {
            id: 0,
            name: "",
            status: "",
        });
    }
    ToggleFreese = () => { //Смена статуса при нажатии на кнопку Заморозить/Разморозить
        let newStatus = "";
        if (this.state.status === "waiting") newStatus = "inProcess";
        else if (this.state.status === "inProcess") newStatus = "waiting";
        this.setState({status:newStatus}, this.Update); //Обновление через коллбек из-за асинхронности setState
    }
    ToggleDone = () => { //Смена статуса при нажатии на кнопку Выполнить/В процессе
        let newStatus = "";
        if (this.state.status === "done") newStatus = "inProcess";
        else if (this.state.status === "inProcess") newStatus = "done";
        this.setState({status:newStatus}, this.Update); //Обновление через коллбек из-за асинхронности setState
    }
    Update = () => {
        const todo = {
            id:this.state.id,
            name: this.state.name,
            status: this.state.status
        };
        this.state.updateCallback(todo); //Обновление в списке задач App задачи (поиск по id, новый статус или имя)
    }

    render() {
        //Сокрытие кнопок Заморозить/Выполнить/Разморозить/В процессе
        let freeseBtnClass, doneBtnClass, unfreeseBtnClass, undoneBtnClass;
        switch(this.state.status) {
            case "done":
                freeseBtnClass = "hidden";
                unfreeseBtnClass = "hidden";
                doneBtnClass = "hidden";
                undoneBtnClass = "";
                break;
            case "inProcess":
                freeseBtnClass = "";
                unfreeseBtnClass = "hidden";
                doneBtnClass = "";
                undoneBtnClass = "hidden";
                break;
            case "waiting":
                freeseBtnClass = "hidden";
                unfreeseBtnClass = "";
                doneBtnClass = "hidden";
                undoneBtnClass = "hidden";
                break;
            default:
                freeseBtnClass = "hidden";
                unfreeseBtnClass = "hidden";
                doneBtnClass = "hidden";
                undoneBtnClass = "hidden";
                break;
        }
        
        //Сокрытие кнопки Удалить
        const deleteBtnClass = this.state.id === 0 ? "hidden" : "";

        //Форма для изменения имени задачи (не показывается, пока не будет выбрана задача)
        const formArea = this.state.id !== 0 ? 
            <form onSubmit={this.Update}>
                <textarea
                autocomplete="off"
                className="todo-page-textarea"
                name="newName" 
                value={this.state.name} 
                placeholder="Введите имя"
                onChange={(e) => { 
                    let newName = e.target.value;
                    this.setState({name:newName}, this.Update);
                } }
                />
            </form>  :
            "Выберите задачу...";

        return (<div className="todo-page-div">
            <div className="todo-page-name">Редактирование задачи</div>
            <div className="todo-page-textarea-div">
                {formArea}    
            </div>
            
            <div className="btn-group">
                
                    <button className = {"todo-page-btn todo-page-freese-btn " + freeseBtnClass} onClick={this.ToggleFreese}> Заморозить</button>
                    <button className = {"todo-page-btn todo-page-done-btn " + doneBtnClass} onClick={this.ToggleDone}> Выполнить</button>
                    <button className = {"todo-page-btn todo-page-unfreese-btn " + unfreeseBtnClass} onClick={this.ToggleFreese}> Разморозить</button>
                    <button className = {"todo-page-btn todo-page-undone-btn " + undoneBtnClass} onClick={this.ToggleDone}> В процессе</button>
                    <button className = {"todo-page-btn todo-page-del-btn " + deleteBtnClass} onClick={this.Delete}>Удалить</button>
                
            </div>
            
        </div> );
        
    }
};

export default ToDoPage;