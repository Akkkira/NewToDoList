import React, {Component} from 'react'

import './style.css'
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import DeleteAll from "../delete-all"

export default class App extends Component {

    maxId = 300000;

    state = {
        todoData: [],
        term: '',
        filter: 'all',
};

    createTodoItem(label,text,startData,finalData) {
        return {
            label,
            text,
            startData,
            finalData,
            important: false,
            done: false,
            id: this.maxId++
        }

    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [...todoData.slice(0, idx),
                              ...todoData.slice(idx + 1)];
            return {
                todoData: newArray
            }
        })
    };

    deleteAll = () => {
        this.setState(() => {
            const newArray = [];
            return {
                todoData: newArray
            }
        })
    };

   addItem = (label,text,startData,finalData) => {
        if (text.length === 0){
            text = "sorry, there's nothing here"
        }
        if(startData.length === 0){
            startData = "there is no start of deadline"
        }
        if(finalData.length === 0){
            finalData = "there is no final of deadline"
        }
        if( label === ''){
            label ="Untitled"
        }
        const newItem = this.createTodoItem(label,text,startData,finalData);
        this.setState(({todoData}) => {
        const newArray = [...todoData, newItem]
            return{
            todoData: newArray
            }

        })
    };

    toggleProperty(arr,id,propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx]
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }


     onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })

    };

     onToggleDone = (id) => {
         this.setState(({todoData}) => {
             return {
                 todoData: this.toggleProperty(todoData,id,'done')
             }
         });
     };

     search (items, term) {
         if(term.length === 0) {
             return items;
         }

        return  items.filter((item) => {
             return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
         })
     }

     onSearchChange = (term) => {
         this.setState({term})
     };

      filter(items, filter) {

         switch (filter) {
             case 'all':
                 return items;
             case 'active':
                 return items.filter((item) => !item.done);
             case 'important':
                 return items.filter((item) => item.important);
             case 'done':
                 return items.filter((item) => item.done);
             default:
                 return  items;
         }
     }

     onFilterChange = (filter) => {
         this.setState({filter});
     };

 render() {
     const {todoData, term, filter} = this.state;

     const visibleItems = this.filter(this.search(todoData, term),filter);

     const doneCount = todoData
         .filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;


     return (
         <div>
         <div className="todo-app">
             <AppHeader toDo={todoCount} done={doneCount}/>
             <div className="top-panel d-flex">
                 <SearchPanel
                 onSearchChange = {this.onSearchChange}/>
             </div>
             <div>
                 <ItemStatusFilter filter = {filter}
                 onFilterChange = {this.onFilterChange}/>
                 <DeleteAll
                 deleteAll = {this.deleteAll}/>
             </div>
             <TodoList
                 todos={visibleItems}
                       onDeleted={this.deleteItem}
                       onToggleImportant = {this.onToggleImportant}
                       onToggleDone = {this.onToggleDone}/>
             <ItemAddForm onItemAdded={this.addItem}/>
         </div>
         </div>
         )
     }
     }

