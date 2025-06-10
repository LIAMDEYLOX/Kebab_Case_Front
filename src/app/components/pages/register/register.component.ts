import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // Form data
  user = {
    pseudouser: '',
    emailuser: '',
    password: '',
    confirmPassword: ''
  };

  // API response states
  loading = false;
  error: any = null;
  success = false;
  registeredUser: any = null;

  constructor(private userService: UserService) {}

  // Form submission
  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.error = { detail: [{ msg: 'Les mots de passe ne correspondent pas.' }] };
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = false;

    // Create a copy of the user object without confirmPassword
    const userData = {
      pseudouser: this.user.pseudouser,
      emailuser: this.user.emailuser,
      password: this.user.password
    };

    this.userService.register(userData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.loading = false;
        this.success = true;
        this.registeredUser = response;
        // Reset form after successful registration
        this.resetForm();
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.loading = false;
        this.error = err;
      }
    });
  }

  resetForm() {
    this.user = {
      pseudouser: '',
      emailuser: '',
      password: '',
      confirmPassword: ''
    };
  }
}
