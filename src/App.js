import React from "react";
import ToDoPage from './ToDoPage.js';
import ToDoElement from './ToDoElement.js';
import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    let todos = [ { name: "Eat", status:"done", id: 1}, { name:"Sleep", status:"inProcess", id:2}, { name:"Repeat", status:"waiting", id:3}];
    this.state = { 
      todos: todos, 
      todosToShow: todos,
      filterName: "",
      newToDoVal : "", 
      newId: todos.length, 
      currentToDoName:"", 
      currentToDoStatus:"", 
      currentToDoId:0
    };
    this.AddNew = this.AddNew.bind(this);
    this.FormOnChange = this.FormOnChange.bind(this);
    this.DeleteToDo = this.DeleteToDo.bind(this);
    this.ClickToDo = this.ClickToDo.bind(this);
    this.UpdateToDo = this.UpdateToDo.bind(this);
  }
  

  FormOnChange (e) {
    this.setState({newToDoVal : e.target.value});
  }
  UpdateToDo(todo) {
    console.log("UpdateTodo:")
    console.log(todo);
    const index = this.state.todos.findIndex(item => todo.id === item.id);
    let newTodos = [...this.state.todos];

    newTodos[index].name = todo.name;
    newTodos[index].status = todo.status;
    this.setState({todos: newTodos  });
  }
  DeleteToDo (id) {
    const list = this.state.todos.filter( (item) => item.id !== id );
    console.log(list);
    this.setState({todos: list});
  }
  AddNew (e) {
    
    e.preventDefault();
    let val = this.state.newToDoVal;
    if (val.length === 0) return;
    
    this.setState(state => {
      let list = [...state.todos, {name:val, status:"inProcess", id: state.newId + 1}];
      return { todos:list, newToDoVal: "" , newId : state.newId + 1};
    });
  }
  ClickToDo(id, name, status) {
    console.log({
      currentToDoId: id,
      currentToDoName: name,
      currentToDoStatus: status
    });
    this.setState({
      currentToDoId: id,
      currentToDoName: name,
      currentToDoStatus: status
    });
  }

  NameFiltered = (name, filterName) => name.toUpperCase().includes(filterName.toUpperCase());

  UpdateFilter = (e) => {
    this.setState({filterName: e.target.value});
  } ;

  render () {
    const todosToShow = this.state.todos.filter( (item) => this.NameFiltered(item.name, this.state.filterName));

    const todoList = todosToShow.map( (item) => 
      
        <ToDoElement onClick={this.ClickToDo} key={item.id} id={item.id} name={item.name} status={item.status} callback={this.DeleteToDo}/>
      
    );
      return (
        <div className="App">
          <div class="todo-list-div">
            <div class="todo-list-name">
                Задачи
            </div>
            <div className="todo-find-form-div">
              <form className="todo-find-form" onSubmit={() => {} }>
                <input className="todo-find-input" type="text" onChange={this.UpdateFilter} value={this.state.filterName} placeholder="Найти задачу..."/>
                
              </form>
            </div>
            <div class="todo-list">
                
                {todoList}
            </div>
            <div className="todo-add-form-div">
              <form className="todo-add-form" onSubmit={this.AddNew}>
                <input className="todo-add-input" type="text" onChange={this.FormOnChange} value={this.state.newToDoVal} placeholder="Новая задача"/>
                <div className="todo-add-btn-div">
                  <input className="todo-add-btn" type="submit" value="Добавить"/>
                </div>
              </form>
            </div>
            </div>

            <ToDoPage key={this.state.currentToDoId} 
                name={this.state.currentToDoName} 
                status={this.state.currentToDoStatus} 
                id={this.state.currentToDoId}
                updateCallback={this.UpdateToDo}
                deleteCallback={this.DeleteToDo}
            />
        </div>
      
    );
  }
  
};





export default App;
