import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getUsers().subscribe(data => {
      this.users = data.body;
    });
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }

  editUser(user: User): void {
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem('editUserId', user.id.toString());
    this.router.navigate(['edit-user']);
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user).subscribe(data => {
      this.users = this.users.filter(u => u !== user);
    });
  }

}
