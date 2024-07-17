// src/app/edit-user/edit-user.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../api/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EditUserComponent {
  @Input() user: User = { id: 0, username: '', password: '', role: 'KARYAWAN' };
  @Output() userUpdated = new EventEmitter<User>();
  roles = ['KARYAWAN', 'ADMIN', 'SUPER ADMIN'];

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userUpdated.emit(this.user);
    }
  }

  refreshPage(): void {
    window.location.reload();
  }
}
