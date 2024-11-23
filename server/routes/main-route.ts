import { Application } from "express";
import { HomeController } from "../controllers/home-controller";

export class MainRoute {
  constructor(private app: Application) {
    this.defineRoutes();
  }

  public defineRoutes() {
    this.app.get("/", HomeController);
  }
}
