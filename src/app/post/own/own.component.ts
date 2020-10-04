import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-own',
  templateUrl: './own.component.html',
  styleUrls: ['./own.component.css']
})
export class OwnComponent implements OnInit {

  myAllposts: any = [];
  contentLen: number = 30;

  constructor(
    private postService: PostService,
    private router: Router,
    private ls: LoaderService,
    private _snackBar: MatSnackBar
    )  {
      this.ls.updateStatus(true);
    }

  ngOnInit(): void {
    this.postService.showOwnPosts().subscribe(
      (response: any) => {
        // console.log(response.posts);
        if (response.posts.length > 0) {
          this.myAllposts = response.posts;
          this.ls.updateStatus(false);
        }
      },
      (err) => {
        // console.error('Errors:', err);
        this.openSnackBar(err.error.message, 'close');
      }
    );
  }

  openSnackBar(message: string, action: string = '') {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  gotoEdit(postId) {
    this.router.navigate(['/post/edit/' + postId]);
  }

  gotoDetails(postId){
    this.router.navigate(['/post/details/' + postId]);
  }

}
