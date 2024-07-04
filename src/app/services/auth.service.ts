import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Logout failed', error);
    });
  }
}
