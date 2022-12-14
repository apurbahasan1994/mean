import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token')
    const authReq = request.clone({ headers: request.headers.set("Authorization", "Bearer " + authToken) })
    return next.handle(authReq);
  }
}
