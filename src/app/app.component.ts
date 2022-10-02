import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Post } from './models/post';
import { PostServiceService } from './post-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meanfrontend';
  constructor(private postService: PostServiceService, private auth: AuthService) { }
  ngOnInit(): void {
    this.auth.autoAuthUser()
  }

}
