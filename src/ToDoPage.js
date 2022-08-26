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
            mode: "watching", 
            newName: ""
        }
        this.ToggleDone = this.ToggleDone.bind(this);
        this.ToggleFreese = this.ToggleFreese.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
        this.Edit = this.Edit.bind(this);
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
    Edit () {
        if (this.state.mode === "editing") {
            console.log("NewName: " + this.state.newName);
            let newName = this.state.newName;
            this.setState({name: newName, newName:""}, this.Update); //Callback
        }
        this.setState({
            mode: this.state.mode === "watching" ? "editing" : "watching"
        });
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
        
        const header = this.state.mode === "editing" ?
                <form >
                    <input type="text" 
                    autocomplete="off"
                    name="newName" 
                    value={this.state.newName} 
                    onChange={(e) => { this.setState({newName: e.target.value}); } }
                    />
                </form>
                : <h1> {this.state.name} </h1>   ;

        const editBtnText = this.state.mode === "editing" ?
            "Сохранить" : "Изменить";


        return <div className="todo-page-div">
            {header}            
            <div className="btn-group-status">
                <button className = {freeseBtnClass} name="freese" onClick={this.ToggleFreese}> Заморозить</button>
                <button className = {doneBtnClass} name="done" onClick={this.ToggleDone}> Выполнить</button>
                <button className = {unfreeseBtnClass} name="freese" onClick={this.ToggleFreese}> Разморозить</button>
                <button className = {undoneBtnClass} name="freese" onClick={this.ToggleDone}> Не выполнено</button>
            </div>
            <div className="btn-group-actions">                
            <button onClick={this.Edit}>{editBtnText}</button>
            <button onClick={this.Delete}>Удалить</button>
            </div>

        </div> 
        
    }
};

export default ToDoPage;