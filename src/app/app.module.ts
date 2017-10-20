import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectComponent } from './mantis/project/project.component';
import { StoryComponent } from './mantis/story/story.component';
import { ReleaseComponent } from './mantis/release/release.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    StoryComponent,
    ReleaseComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
