import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  loginError: string | null = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async onLogin() {
    try {
      this.loginError = null;
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login error', error);
      if (error.code === 'auth/user-not-found') {
        this.loginError = 'Email not found. Please sign up.';
        setTimeout(() => {
          this.router.navigate(['/signup']);
        }, 3000); 
      } else if (error.code === 'auth/wrong-password') {
        this.loginError = 'Incorrect password. Please try again.';
      } else {
        this.loginError = 'Login failed. Please try again later.';
      }
    }
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.showPassword = !this.showPassword;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}
