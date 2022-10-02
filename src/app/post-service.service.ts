import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  pagination: any
  private pagination_obj = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(params = null) {
    let httpParams;
    if (params) {
      httpParams = new HttpParams().set('page', params)
    }
    this.http.get("http://localhost:3000/getAllposts/", { params: httpParams }).subscribe((data: any) => {
      this.posts = data.posts
      this.posts = this.posts.map((post: any) => {
        return {
          title: post.title,
          content: post.content,
          imagePath: post.imagePath,
          id: post._id
        }
      }
      )
      this.pagination = data.pagination
      this.pagination_obj.next({ ...this.pagination })
      this.postUpdated.next([...this.posts])
    });
  }
  getPost(id: string) {

    return { ...this.posts.find(x => x.id === id) }

  }
  getPagination() {
    return this.pagination_obj.asObservable()
  }
  getUpdatedPosts() {
    return this.postUpdated.asObservable()
  }

  addPost(title, content, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content)
    postData.append('image', image, title)
    this.http.post('http://localhost:3000/createAPost', postData).subscribe((data: any) => {
      const post: Post = { id: data.post._id, title: data.post.title, content: data.post.content, imagePath: data.post.imagePath }
      this.posts.push(post);
      console.log(this.posts)
      this.postUpdated.next([...this.posts])
      this.router.navigate(['/'])
    }, error => {

    })
  }
  updatePost(id, title, content, image: any) {
    let postData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append("title", title);
      postData.append("content", content)
      postData.append('image', image, title)
    }
    else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      }
    }
    this.http.post('http://localhost:3000/updatePost/' + id, postData).subscribe((data: any) => {
      this.router.navigate(["/"]);



    }, error => {

    })
  }
  deletePost(id) {

    this.http.delete("http://localhost:3000/deletePost/" + id).subscribe((data: any) => {
      const updatedposts = [...this.posts.filter(x => x.id !== id)]
      this.posts = updatedposts
      this.postUpdated.next([...this.posts])


    }, error => {

    })
  }
}
