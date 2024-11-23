import express, { Application } from "express";

export abstract class BaseMiddleware {
  protected app: Application;

  constructor(app: Application) {
    this.app = app;
  }
  public abstract defineMiddleware(): void;
}

export class MainMiddleware extends BaseMiddleware {
  public defineMiddleware() {
    this.app.use((req, _, next) => {
      console.log(`Requested URL ${req.url}`);
      next();
    });
    this.app.use(express.json());
  }
}
