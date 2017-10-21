export abstract class Node {
  abstract type(): string;
  allowDrag(): boolean {
    return false;
  }
}
