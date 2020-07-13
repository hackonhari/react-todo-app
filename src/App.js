import React from 'react';
import {TodoBanner} from './todobanner';
import{TodoRow} from './todorow';
import {TodoCreator} from './todocreator';
import {VisibilityControl} from './visibilitycontrol'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userName:"Hari krishnan",
      "todoItems":[{action:"Buy Flowers",done:false},
      {action:"Get Shoes",done:false},
      {action:"Collect Tickets",done:false},
      {action:"Call Joe",done:false}
    ],
    showCompleted:true
    }
  }
  updateNewTextValue=(event)=>{
    this.setState({newItemText:event.target.value})
  }

  createNewTodo=(task)=>{
    console.log(task)
    if(!this.state.todoItems.find(item=>{
      console.log(item)
      return item.action===task})){
      this.setState({todoItems:[...this.state.todoItems,{action:task,done:false}]},()=>localStorage.setItem('todos',JSON.stringify(this.state)))
    }
  }
  toggleTodo=(todo)=>this.setState({todoItems:this.state.todoItems.map(item=>item.action===todo.action?{action:item.action,done:!item.done}:item)},()=>localStorage.setItem('todos',JSON.stringify(this.state)));

  todoTableRows=(doneValue)=>{
    console.log(doneValue)
    return this.state.todoItems.filter(item=>item.done===doneValue).map(item=>
    <TodoRow key={item.action} item={item} callback={this.toggleTodo}/>)}
  
    componentDidMount=()=>{
      let data=localStorage.getItem("todos");
      this.setState(data!=null?JSON.parse(data):{
        userName:"Hari krishnan",
        "todoItems":[{action:"Buy Flowers",done:false},
        {action:"Get Shoes",done:false},
        {action:"Collect Tickets",done:false},
        {action:"Call Joe",done:false}
      ],
      showCompleted:false
      })

    }
  render(){
    return(
    <div className="container">
      <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
      <div className="container-fluid">
        <TodoCreator callback={(task)=>this.createNewTodo(task)}  />
        <table className="table table-striped table-bordered">
          <thead>
              <tr>
                <th>Description</th><th>Done</th>
              </tr>
          </thead>
          <tbody>
            {this.todoTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Completed Tasks"     
          isChecked={this.state.showCompleted}
          callback={(checked)=>this.setState({showCompleted:checked})} />
        </div>
        {
          this.state.showCompleted&&
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>
              {this.todoTableRows(true)}
            </tbody>
          </table>
        }
      </div>
    </div>)
  }

}

export default App