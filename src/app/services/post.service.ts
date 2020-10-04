import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  authApiRoot: string = 'http://localhost:1234';
  authToken: string;

  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('token');
  }

  showOwnPosts() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken
    };
    return this.http.get(this.authApiRoot + '/feed/posts/self', {'headers': headers});
  }

  showPostsService() {
    const headers = {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.authToken
                    };
    return this.http.get(this.authApiRoot + '/feed/posts', {'headers': headers});
  }

  createPostService(data){
    // console.log(data);
    const headers = {
      'Authorization': 'Bearer ' + this.authToken
    };
    return this.http.post(
      this.authApiRoot + '/feed/post',
      data,
      {
        'headers': headers
      }
    );
  }

  getPostDetails(postId: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken
    };
    return this.http.get(this.authApiRoot + '/feed/posts/edit/' + postId, {'headers': headers});
  }

  updatePost(data, postId) {
    const headers = {
      'Authorization': 'Bearer ' + this.authToken
    };
    return this.http.post(
      this.authApiRoot + '/feed/post/edit/' + postId,
      data,
      {
        'headers': headers
      }
    );
  }

}
