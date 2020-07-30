import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { ToogleTodoAction, EditarTodoAction, BorrarTodoAction } from '../model/todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: [
  ]
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  checkField: FormControl;
  txtInput: FormControl;
  editando: boolean;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.checkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl (this.todo.texto, Validators.required);
    this.checkField.valueChanges
    .subscribe(valor =>{
        const accion = new ToogleTodoAction(this.todo.id);
        this.store.dispatch(accion);
    }); 
  }
  editar(){
    this.editando = true;
    this.txtInputFisico.nativeElement.select();
  }
  terminarEdicion(){
    this.editando = false;
    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value)
    this.store.dispatch(accion);
  }
  borrarTodo(){
    const accion = new BorrarTodoAction(this.todo.id)
    this.store.dispatch(accion);
  }
}
