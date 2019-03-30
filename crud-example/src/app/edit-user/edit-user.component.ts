import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  constructor(private formBuild: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    const userId = window.localStorage.getItem('editUserId');
    console.log('user id: ', userId);
    if (!userId) {
      alert('invalid action');
      this.router.navigate(['list-users']);
      return;
    }

    this.editForm = this.formBuild.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });

    this.apiService.getUserById(+userId).subscribe(data => {
      this.editForm.setValue(data.body);
    });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.code === 0) {
            alert('update user success');
            this.router.navigate(['list-users']);
          } else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        }
      );
  }

}
