declare module "raven" {
  class Raven {
    config(ravenKey: string): Raven;
    install(): void;
    setContext(context: any): void;
    captureException(exception: any): void;
  }
  export = new Raven();
}