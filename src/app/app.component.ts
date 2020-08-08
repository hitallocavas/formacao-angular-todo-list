import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { Todo } from './models/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lista de Tarefas';

  public todos: Todo[] = [];
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
      ],
    });

    this.load();
  }

  public clear(): void {
    this.todoForm.reset();
  }

  public add(): void {
    const title = this.todoForm.controls.title.value;
    const id = this.todos.length + 1;
    const todo = new Todo(id, title, false);
    this.todos.push(todo);
    this.save();
    this.clear();
  }

  public setDone(todo: Todo, value: boolean): void {
    todo.done = value;
    this.save();
  }

  public delete(todo: Todo): void {
    const index = this.todos.findIndex((el) => el.id === todo.id);
    this.todos.splice(index, 1);
    this.save();
  }

  public save(): void {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  public load(): void {
    const data = localStorage.getItem('todos');
    if (data !== null) {
      this.todos = JSON.parse(data);
    }
  }
}
