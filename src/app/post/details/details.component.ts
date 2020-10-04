import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  post: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private ls: LoaderService,
    private _snackBar: MatSnackBar
    )  {
      this.ls.updateStatus(true);
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        // console.log(+data.id);
        this.postService.getPostDetails(+data.id).subscribe(
          (postdata: any) => {
            this.post = postdata.post;
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

  gotoEdit(postId) {
    this.router.navigate(['/post/edit/' + postId]);
  }

}
