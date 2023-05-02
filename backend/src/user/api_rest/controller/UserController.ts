import { Application, Request, Response } from "express";

export const UserController = (app: Application): void => {
	app.get("/api", (req: Request, res: Response) => {
		return res.status(200).send("Hola");
	});
};