import { Component, OnInit, Input } from '@angular/core';
import { Release } from '../../models/release';

@Component({
  selector: 'release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {
  @Input() release: Release;

  constructor() { }

  ngOnInit() {
  }

}
