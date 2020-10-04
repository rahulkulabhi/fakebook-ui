import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  selectedFile: File = null;
  previewUrl: any;
  post: any;

  editPostForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.minLength(5)]],
    image: [null],
    content: [null, [Validators.required, Validators.minLength(5)]]
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LoaderService,
    private _snackBar: MatSnackBar
    ) {
      this.ls.updateStatus(true);
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        // console.log(+data.id);
        this.postService.getPostDetails(+data.id).subscribe(
          (postdata: any) => {
            this.post = postdata.post;
            if (postdata.post.imageUrl)
              this.previewUrl = 'http://localhost:1234/' + postdata.post.imageUrl;
            this.editPostForm.patchValue({
              title: postdata.post.title,
              image: postdata.post.imageUrl,
              content: postdata.post.content
            });
            this.ls.updateStatus(false);
            // console.log(this.post);
          },
          err => {
            // console.log(err);
            this.openSnackBar(err.error.message, 'close');
          }
        );
      }
    );
  }

  openSnackBar(message: string, action: string = '') {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onEditPost() {
    this.ls.updateStatus(true);
    var fd = new FormData();
    fd.append('title', this.editPostForm.value.title);
    if(this.selectedFile !== null)
      fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('content', this.editPostForm.value.content);
    this.postService.updatePost(fd, this.post.id).subscribe(
      (response: any) => {
        // console.log(response);
        if (response.success === true) {
          this.ls.updateStatus(false);
          this.openSnackBar(response.message, 'close');
            this.router.navigate(['/post/details/' + this.post.id]);
        }
      },
      err => {
        // console.error(err);
        this.openSnackBar(err.error.message, 'close');
      }
    );
  }

  uploadFile(event) {
    // console.log(event.target.files[0]);
    this.selectedFile = <File>event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

}
