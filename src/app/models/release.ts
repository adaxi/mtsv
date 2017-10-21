import { Node } from './node'
import { Story } from './story'
import { MantisService } from './mantis.service'

export class Release extends Node {

  id: number;
  projectId: number;
  summary: string; // aka version
  released: boolean;
  hasChildren: boolean = true;
  isExpanded: boolean = false;
  children: Story[];

  private mantisServiceInstance : MantisService;

  constructor(id: number, projectId: number, summary: string, mantisServiceInstance : MantisService) {
    super()
    this.id = id
    this.projectId = projectId
    this.summary = summary
    this.mantisServiceInstance = mantisServiceInstance;
  }

  init() : Promise<Release> {
    if (!this.released) {
      return this.mantisServiceInstance.getStoriesByRelease(this.projectId, this.summary).then((stories) => {
        this.children = stories
      }).then(() => {
        return this
      })
    } else {
      return Promise.resolve(this);
    }

  }

  allowDrag(): boolean {
    return false;
  }

  type(): string {
    return 'release'
  }

  loadChildren() {
    return this.mantisServiceInstance.getStoriesByRelease(this.projectId, this.summary)
  }

  public static fromSoap(object, mantisServiceInstance: MantisService) : Release {
    const {
      id,
      name,
      released,
      project_id: projectId
    } = object;

    let release : Release = new Release(id, projectId, name, mantisServiceInstance)
    release.released = typeof released === 'string'
      ? (released === 'true' ? true : false)
      : released
    release.isExpanded = !release.released;
    return release;
  }
}

