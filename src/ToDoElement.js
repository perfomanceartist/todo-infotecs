import React from "react"
import "./css/ToDoElement.css"
class ToDoElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.name, status:this.props.status, id: this.props.id, deleteCallback: this.props.callback};
    }

    StatusToClassName = () => {
        switch (this.props.status) {
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
    
    Delete = () => {
        this.state.deleteCallback(this.props.id);
        //this.setState({name: this.props.name, status:this.props.status, id: this.props.id})
    };

    render () {
        const name = this.props.name.length > 0 ? this.props.name : "Введите имя...";
    return (
        <div className="todo-div" 
            onClick={ () => {this.props.onClick(this.props.id, this.props.name, this.props.status);} } >
            <div className={this.StatusToClassName()} > {name} 
            </div>
            
        </div>
    );
    }
   
}
ToDoElement.defaultProps = {name:"default name", status:"inProcess"};

export default ToDoElement;