import { Request, Response } from "express";

export function HomeController(_: Request, response: Response) {
  response.send("<h1>Hi! This is Aseer</h1>");
}

