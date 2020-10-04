import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  selectedFile: File = null;
  previewUrl: any;
  createPostForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private ls: LoaderService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ls.updateStatus(false);
    this.createPostForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(5)]],
      image: [null],
      content: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  onCreatePost() {
    this.ls.updateStatus(true);
    var fd = new FormData();
    fd.append('title', this.createPostForm.value.title);
    if(this.selectedFile !== null)
      fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('content', this.createPostForm.value.content);
    this.postService.createPostService(fd).subscribe(
      (response: any) => {
        // console.log(response);
        if (response.success === true) {
            this.ls.updateStatus(false);
            this.openSnackBar(response.message, 'close');
            this.router.navigate(['/post']);
        }
      },
      err => {
        // console.error(err);
        this.openSnackBar(err.error.message, 'close');
      }
    );
  }

  openSnackBar(message: string, action: string = '') {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // Image Preview
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
