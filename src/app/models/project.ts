import { Node } from './node'
import { Release } from './release'
import { MantisService } from './mantis.service'

export class Project extends Node {

  private mantisServiceInstance: MantisService;

  id: number;
  summary: string;
  hasChildren: boolean = true;
  children: Release[] = [];
  isExpanded: boolean = true;

  constructor(id: number, summary: string, mantisServiceInstance: MantisService) {
    super()
    this.id = id
    this.summary = summary;
    this.mantisServiceInstance = mantisServiceInstance;
  }

  init() : Promise<Project> {
    return this.mantisServiceInstance.getReleases(this.id).then((releases) => {
        return Promise.all(releases.map((release) => release.init()))
    }).then((releases) => {
      this.children = releases
    }).then(() => {
      return this
    })
  }

  allowDrag(): boolean {
    return true;
  }

  type(): string {
    return 'project'
  }

  loadChildren() {
    return []
  }

  public static fromSoap(object, mantisServiceInstance: MantisService) : Project {
    const {
      id,
      summary,
      relationships
    } = object;

    let project : Project = new Project(id, summary, mantisServiceInstance)
    return project;
  }
}

