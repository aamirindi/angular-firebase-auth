import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  signupError: string | null = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async onSignup() {
    if (this.password !== this.confirmPassword) {
      this.signupError = 'Passwords do not match.';
      return;
    }
    if (this.password.length < 6) {
      this.signupError = 'Password must be at least 6 characters long.';
      return;
    }
    try {
      const methods = await this.afAuth.fetchSignInMethodsForEmail(this.email);
      if (methods.length > 0) {
        this.signupError = 'Email already exists. Please use a different email.';
        return;
      }
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Signup error', error);
      this.signupError = 'Signup failed. Please try again later.';
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
