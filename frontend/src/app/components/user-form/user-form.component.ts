import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user = { name: '', email: '', phone: '' };
  isEdit = false;
  userId: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEdit = true;
    }
  }

  async submitForm() {
    if (this.isEdit) {
      await this.userService.updateUser(this.userId!, this.user);
    } else {
      await this.userService.addUser(this.user);
    }
    this.router.navigate(['/users']);
  }
}

