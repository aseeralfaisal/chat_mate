import { Server as HTTPServer } from "http";
import express, { Application } from "express";
import { MainRoute } from "../routes/main-route";
import { MainMiddleware } from "../middlewares/main-middleware";

export class MainServerService {
  private app: Application;

  constructor(private httpServer: HTTPServer) {
    this.app = express();
    this.defineMiddlewares();
    this.defineRoutes();
  }

  public start() {
    this.httpServer.on("request", this.app);
  }

  private defineRoutes() {
    const mainRoute = new MainRoute(this.app);
    mainRoute.defineRoutes();
  }

  private defineMiddlewares() {
    const middlewares = new MainMiddleware(this.app);
    middlewares.defineMiddleware();
  }
}
