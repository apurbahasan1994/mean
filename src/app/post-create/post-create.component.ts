import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../models/post';
import { PostServiceService } from '../post-service.service';
import { mimeType } from './mimtype_validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title = '';
  content = '';
  mode = 'create';
  id: string;
  post: Post;
  loader;
  file;
  previewimage;
  form
  isLoading = false;

  constructor(private postService: PostServiceService, private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(5)] }),
        'content': new FormControl(null, { validators: [Validators.required, Validators.minLength(5)] }),
        'image': new FormControl(null, { validators: [Validators.required] })
      }
    )
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit'
        this.id = paramMap.get('id')
        this.post = this.postService.getPost(this.id)
        console.log(this.id);
        this.form.setValue({ 'title': this.post.title, 'content': this.post.content, 'image': this.post.imagePath })
        this.previewimage = this.post.imagePath
      }
      else {
        this.mode = 'create'
        this.id = null;
      }

    })


  }
  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    const content = this.form.value.content;
    const title = this.form.value.title;
    this.isLoading = true;
    if (this.mode === 'edit') {
      this.postService.updatePost(this.id, title, content, this.form.value.image)
    }
    else {
      this.postService.addPost(title, content, this.form.value.image)
    }
    this.form.reset();
  }
  onFilePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.file = file;
    this.form.patchValue({ 'image': file })
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = () => {
      this.previewimage = reader.result
    }
    reader.readAsDataURL(file);
  }

}
