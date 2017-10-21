import { Node } from './node'
import { MantisService } from './mantis.service'

export class Story extends Node {

  parent;
  relationships;

  id: number;
  summary: string;
  handler: string;
  hasChildren: boolean = true;

  constructor(summary?: string) {
    super()
    this.summary = summary
  }

  allowDrag(): boolean {
    return true;
  }

  type(): string {
    return 'story'
  }

  loadChildren() {
    return [ new Story('Child 1') , new Story('Child 2') ]
  }

  public static fromSoap(object, mantisServiceInstance: MantisService) : Story {
    const {
      id,
      summary,
      handler: { name : handler } = { name: undefined },
      relationships
    } = object;

    let story : Story = new Story()
    story.id = id;
    story.summary = summary;
    story.handler = handler;
    story.relationships = relationships;
    return story;
  }
}

