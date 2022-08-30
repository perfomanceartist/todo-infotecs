import React from "react";
import ToDoPage from './ToDoPage.js';
import ToDoElement from './ToDoElement.js';
import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      todos: props.todos, // список задач
      filterName: "", // текст, который должны содержать показываетмые задачи
      newToDoVal : "", //текст задачи для добавления
      newId: props.todos.length, //id для новой задачи
      currentToDoId:0 // id выбранной для редактирования задачи
    };
  }
  

  UpdateToDo = (todo) => {
    const index = this.state.todos.findIndex(item => todo.id === item.id);
    const newTodos = [...this.state.todos];

    newTodos[index].name = todo.name;
    newTodos[index].status = todo.status;
    this.setState({todos: newTodos  });
  }
  DeleteToDo = (id) => {
    const list = this.state.todos.filter( (item) => item.id !== id );
    this.setState({todos: list});
  }
  AddNew = (e) => {
    
    e.preventDefault(); //AddNew - действие при submit'e, поэтому необходимо избавиться от стандартной обработки
    const val = this.state.newToDoVal;
    if (val.length === 0) {
      alert("Имя новой задачи не должно быть пустым!");
      return;
    }
    
    const list = [...this.state.todos, {name:val, status:"inProcess", id: this.state.newId + 1}];
    this.setState( {todos:list, newToDoVal: "" , newId : this.state.newId + 1 } );
  }
  
  render () {
    const NameFiltered = (name, filterName) => name.toUpperCase().includes(filterName.toUpperCase());
    const todosToShow = this.state.todos.filter( (item) => NameFiltered(item.name, this.state.filterName));

    const todoList = todosToShow.map( (item) => 
      
        <ToDoElement  onClick={ (id)  => this.setState({ currentToDoId: id }) }  // Для props ToDoPage;
                      key={item.id} 
                      id={item.id} 
                      name={item.name} 
                      status={item.status} 
                      callback={this.DeleteToDo}
        />
      
    );

    let currentToDo = this.state.todos.find(todo => todo.id === this.state.currentToDoId);
    if (currentToDo === undefined) {
      currentToDo = {"id":0, 'name':"", "status" :""};
    }

      return (
        <div className="App">
          <div class="todo-list-div">
            <div class="todo-list-name">
                Задачи
            </div>
            <div className="todo-find-form-div">
              <form className="todo-find-form" onSubmit={() => {} }>
                <input  className="todo-find-input" 
                        type="text" 
                        onChange={ (e) => this.setState({filterName: e.target.value}) } 
                        value={this.state.filterName} 
                        placeholder="Найти задачу..."
                />
              </form>
            </div>
            <div class="todo-list">
                {todoList}
            </div>
            <div className="todo-add-form-div">
              <form className="todo-add-form" onSubmit={this.AddNew}>
                <input  className="todo-add-input" 
                        type="text" 
                        onChange={(e) => this.setState({newToDoVal : e.target.value}) } 
                        value={this.state.newToDoVal} 
                        placeholder="Новая задача"
                />
                <div className="todo-add-btn-div">
                  <input className="todo-add-btn" type="submit" value="Добавить"/>
                </div>
              </form>
            </div>
            </div>

            <ToDoPage key={currentToDo.id} 
                name={currentToDo.name} 
                status={currentToDo.status} 
                id={currentToDo.id}
                updateCallback={this.UpdateToDo}
                deleteCallback={this.DeleteToDo}
            />
        </div>
      
    );
  }
  
};
App.defaultProps = {todos: []};
export default App;
