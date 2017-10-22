import { Component } from '@angular/core';
import { MantisService } from './models/mantis.service';
import { Project } from './models/project';
import { TreeNode, ITreeOptions } from 'angular-tree-component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MantisService ]
})
export class AppComponent {
  title = 'app';

  private options;
  private stories;
  private projects;

  constructor(private mantis: MantisService) {
      mantis.getProjects().then((projects: Project[]) => {
        this.projects = projects
      })
      this.options = {
        getChildren: (node :TreeNode) => {
          return node.data.loadChildren()
        },
        allowDrag: (node: TreeNode) => {
          return node.data.allowDrag()
        },
        displayField: 'summary'
      }
  }



  log(node) {
    console.error('GBOBGO', node)
  }

}
