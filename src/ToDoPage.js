import React from "react";
import "./css/ToDoPage.css"

class ToDoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            status: this.props.status,
            id: this.props.id,
            updateCallback: this.props.updateCallback,
            deleteCallback: this.props.deleteCallback,
            mode: "watching"
        }
        this.ToggleDone = this.ToggleDone.bind(this);
        this.ToggleFreese = this.ToggleFreese.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
    }
    Delete() {
        this.state.deleteCallback(this.state.id);
        this.setState( {
            id: 0,
            name: "",
            status: "",
        });
    }
    ToggleFreese() {
        let newStatus = "";
        if (this.state.status === "waiting") newStatus = "inProcess";
        else if (this.state.status === "inProcess") newStatus = "waiting";
        this.setState({status:newStatus}, this.Update);
    }
    ToggleDone() {
        let newStatus = "";
        if (this.state.status === "done") newStatus = "inProcess";
        else if (this.state.status === "inProcess") newStatus = "done";
        this.setState({status:newStatus}, this.Update);
    }
    Update () {
        
        const todo = {
            id:this.state.id,
            name: this.state.name,
            status: this.state.status
        };
        console.log("Update():" );
        console.log(todo);
        this.state.updateCallback(todo);
    }

    render() {
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
        
        const deleteBtnClass = this.state.id === 0 ? "hidden" : "";

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

        return <div className="todo-page-div">
            <div className="todo-page-name">Редактирование задачи</div>
            <div className="todo-page-textarea-div">
                {formArea}    
            </div>
            
            <div className="btn-group">
                
                    <button className = {"todo-page-btn todo-page-freese-btn " + freeseBtnClass} name="freese" onClick={this.ToggleFreese}> Заморозить</button>
                    <button className = {"todo-page-btn todo-page-done-btn " + doneBtnClass} name="done" onClick={this.ToggleDone}> Выполнить</button>
                    <button className = {"todo-page-btn todo-page-unfreese-btn " + unfreeseBtnClass} name="freese" onClick={this.ToggleFreese}> Разморозить</button>
                    <button className = {"todo-page-btn todo-page-undone-btn " + undoneBtnClass} name="freese" onClick={this.ToggleDone}> Не выполнено</button>
                    <button className = {"todo-page-btn todo-page-del-btn " + deleteBtnClass}  onClick={this.Delete}>Удалить</button>
                
                
            </div>
            

        </div> 
        
    }
};

export default ToDoPage;