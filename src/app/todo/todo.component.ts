import { Component, OnInit } from '@angular/core';
import { ToogleAllTodoAction } from './model/todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  completado: boolean = false;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
  }

  toogleAll(){
      this.completado = !this.completado;
      const accion = new ToogleAllTodoAction(this.completado);
      this.store.dispatch(accion);
  }
}
