import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TreeModule } from 'angular-tree-component';
import { MatChipsModule, MatToolbarModule, MatExpansionModule, MatButtonModule, MatInputModule, MatSlideToggleModule, MatCardModule } from '@angular/material';


import { AppComponent } from './app.component';
import { ProjectComponent } from './components/project/project.component';
import { StoryComponent } from './components/story/story.component';
import { ReleaseComponent } from './components/release/release.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    StoryComponent,
    ReleaseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TreeModule,
    CommonModule,
    MatChipsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
