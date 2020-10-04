import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';
import { CreateComponent } from '../post/create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { MaterialModule } from '../material.module';
import { PostService } from '../services/post.service';
import { DetailsComponent } from './details/details.component';
import { OwnComponent } from './own/own.component';
import { ContentWrapPipe } from '../custom/content-wrap.pipe';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ShowComponent,
    DetailsComponent,
    OwnComponent,
    ContentWrapPipe
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
