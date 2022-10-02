import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Authdata } from './models/authData';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  token;
  user;
  private timer: any;
  constructor(private http: HttpClient, private router: Router) {
  }
  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }
  setAuthStatus(status) {
    this.authStatusListener.next(status)
  }
  loginUser(email: string, password: string) {
    const authData: Authdata = { email: email, password: password }
    this.http.post("http://localhost:3000/auth/login", authData).subscribe((user: any) => {
      const { token, loadedUser, expiresIn } = user
      this.token = token
      this.setAuthTimer(expiresIn)
      const now = new Date()
      const expirationDate = new Date(now.getTime() + (expiresIn * 1000))
      this.saveAuthData(token, expirationDate)
      this.user = user
      this.authStatusListener.next(true)
      this.router.navigate([''])
    }
    )

  }
  logOut() {
    clearTimeout(this.timer)
    this.authStatusListener.next(false)
    this.router.navigate(['/login'])
  }
  createUser(user: User) {
    return this.http.post("http://localhost:3000/auth/signup", user)

  }
  saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token)
    localStorage.setItem('expirationDate', expirationDate.toString())

  }
  deleteAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
  }
  autoAuthUser() {
    const authData: any = this.getAuthData()
    if (!authData) {
      this.authStatusListener.next(false)
      return false
    }
    const now = new Date().getTime()
    const expriesIn = now - authData.expirationDate.toString()
    if (expriesIn > 0) {
      this.token = authData.token
      this.setAuthTimer(expriesIn / 1000)
      this.authStatusListener.next(true)

    }

  }
  private setAuthTimer(duration) {
    this.timer = setTimeout(() => {
      this.authStatusListener.next(false)
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    }, duration * 1000)
  }
  private getAuthData(): { token: string, expirationDate: Date } | boolean {
    const token = localStorage.getItem('token')
    const expiresIn = localStorage.getItem('expirationDate');
    if (!token || !expiresIn) {
      return false;
    }
    return {
      token: token,
      expirationDate: new Date(expiresIn)
    }
  }
}
