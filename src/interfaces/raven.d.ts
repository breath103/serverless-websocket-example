declare module "raven" {
  class Raven {
    config(ravenKey: string): Raven;
    install(): void;
    setContext(context: any): void;
    /**
     * return generate eventId
     */
    captureException(exception: any, callback?: (error: Error, eventId: string) => void): string;
  }
  export = new Raven();
}