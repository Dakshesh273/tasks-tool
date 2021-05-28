import { Component, OnInit } from '@angular/core';
import { TodosService } from '../service/todos.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos = [];
  public title: any;
  public isEditMode: boolean = false;
  public selectedTodo: any;
  public completedTodos = [];
  user: any;

  constructor(private todosService: TodosService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user){
        this.user = user;
        this.findAllTodos(user.uid);
      }
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  findAllTodos(userId) {
    this.todosService.findAllTodos(userId).subscribe( res => {
      this.todos = res;
    });
  }

  addTask(){
   if(this.title){ 
    const todo = {
      title: this.title,
      date: new Date(),
      userId : this.user.uid,
      isCompleted: false
    };

    this.todosService.createTodo(todo);
    this.title = "";
   }  
  }
  
  editMode(todo){
    this.isEditMode = true;
    this.selectedTodo = todo;
    this.title = this.selectedTodo.payload.doc.data().title;

  }
  updateToDo() {
    console.log(this.selectedTodo.payload.doc.id);
    this.todosService.updateTodo(this.selectedTodo.payload.doc.id, { title: this.title });
    this.isEditMode = false;
    this.title = "";
  }

  markCompleted(e, todo){
    this.selectedTodo = todo;
    this.todosService.updateTodo(this.selectedTodo.payload.doc.id, { isCompleted: e.target.checked });
    this.todos.push(this.todos.splice(this.todos.indexOf(todo), 1)[0]);

  }
  
  removeToDo(id) {
    console.log(id);
    this.todosService.removeToDo(id);
  }
}