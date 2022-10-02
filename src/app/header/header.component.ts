import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated = false;
  private authListenerSub: Subscription;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authListenerSub = this.auth.getAuthStatus().subscribe(status => {
      this.isUserAuthenticated = status;
    })
    const token = localStorage.getItem("token")
    if (token.length > 0) {
      this.isUserAuthenticated = true

    }
  }
  onLogOutClick() {
    this.auth.token = null;
    localStorage.removeItem('token');
    this.isUserAuthenticated = false;
    this.auth.setAuthStatus(false);
    this.router.navigate(['/login']);
    this.auth.logOut();
  }
  ngOnDestroy() {
    this.authListenerSub.unsubscribe()
  }
}
