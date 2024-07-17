// src/app/data-master-user/data-master-user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../api/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-data-master-user',
  standalone: true,
  templateUrl: './data-master-user.component.html',
  styleUrls: ['./data-master-user.component.css'],
  imports: [CommonModule, FormsModule, AddUserComponent, EditUserComponent]
})
export class DataMasterUserComponent implements OnInit {
  users: User[] = [];
  roles = ['KARYAWAN', 'ADMIN', 'SUPER ADMIN'];
  currentUser: User = { id: 0, username: '', password: '', role: '' };
  isEditMode = false;
  isModalOpen = false;
  filterUserId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  showAddUserModal(): void {
    this.isEditMode = false;
    this.currentUser = { id: 0, username: '', password: '', role: '' }; 
    this.isModalOpen = true;
  }

  addUser(user: User): void {
    this.userService.addUser(user).subscribe(() => {
      this.loadUsers();
      this.isModalOpen = false;
    });
  }

  editUser(user: User): void {
    this.isEditMode = true;
    this.currentUser = { ...user };
    this.isModalOpen = true;
  }

  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe(() => {
      this.loadUsers();
      this.isModalOpen = false;
    });
  }

  saveUser(form: any): void {
    if(confirm('Are you sure you want to delete this user?')){
      if (this.isEditMode) {
        this.userService.updateUser(this.currentUser).subscribe(() => {
          this.loadUsers();
          this.closeModal();
        });
      } else {
        this.userService.addUser(this.currentUser).subscribe(() => {
          this.loadUsers();
          this.closeModal();
        });
      }
    }
  }

  confirmDelete(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  filterUsers(): void {
    if (this.filterUserId !== null) {
      this.userService.filterUsersByUserId(this.filterUserId).subscribe(users => this.users = users);
    } else {
      this.loadUsers();
    }
  }
}
