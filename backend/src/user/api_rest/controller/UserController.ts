import { ok } from "assert";
import { Application, Request, Response } from "express";

export const UserController = (app: Application): void => {
	app.get('/ping', (req: Request, res: Response) => {
		return res.send('pong').status(200);
	  });

	app.get("/api", (req: Request, res: Response) => {
		return res.status(200).send("Hola");
	});

};


