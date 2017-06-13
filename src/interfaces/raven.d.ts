declare module "raven" {
  class Raven {
    public config(ravenKey: string): Raven;
    public install(): void;
    public setContext(context: any): void;
    /**
     * return generate eventId
     */
    public captureException(exception: any, callback?: (error: Error, eventId: string) => void): string;
  }
  export = new Raven();
}
