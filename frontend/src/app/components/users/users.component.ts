import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    this.users = await this.userService.getUsers();
  }

  editUser(id: string) {
    this.router.navigate(['/user-form', id]);
  }

  async deleteUser(id: string) {
    await this.userService.deleteUser(id);
    this.users = await this.userService.getUsers(); // Refresh list
  }
}
