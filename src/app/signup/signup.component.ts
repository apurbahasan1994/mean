import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const user = form.value
    this.auth.createUser(user).subscribe(user => {
      this.router.navigate(['/'])

    })

  }
}
