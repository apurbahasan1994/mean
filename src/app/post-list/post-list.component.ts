import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models/post';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  isLoading = false;

  posts: Post[] = [];
  postSubscriber: Subscription
  loader;
  page
  pagination
  constructor(private postService: PostServiceService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.postService.getPosts()
    this.postSubscriber = this.postService.getUpdatedPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.isLoading = false
    })
    this.postService.getPagination().subscribe(pagination => {
      this.pagination = pagination
    })

  }

  ngOnDestroy(): void {
    this.postSubscriber.unsubscribe();
  }
  onDelete(id: string) {

    this.isLoading = true;

    this.postService.deletePost(id)

  }
  onClick(value: any) {
    this.isLoading = true;
    this.page = value
    this.postService.getPosts(this.page)

  }


}
