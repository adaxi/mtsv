import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../../models/story'

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: Story;

  constructor() { }

  ngOnInit() { }

}
