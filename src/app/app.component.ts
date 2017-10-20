import { Component } from '@angular/core';
import { UserAgentService } from './mantis/user-agent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserAgentService]
})
export class AppComponent {
  title = 'app';

  constructor(private userAgentService: UserAgentService) { }
}
