// src/app/add-user/add-user.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../api/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<User>();
  roles = ['KARYAWAN', 'ADMIN', 'SUPER ADMIN'];
  newUser: User = { id: 0, username: '', password: '', role: '' };

  constructor(private userService: UserService) { }

  onSubmit(form: any): void {
    if (form.valid) {
      this.userAdded.emit(this.newUser);
      this.newUser = { id: 0, username: '', password: '', role: '' };
    }
  }

  refreshPage(): void {
    window.location.reload();
  }
}
