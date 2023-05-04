import { Application, Request, Response } from "express";
import { UserRequestDto } from "../../domain/dto/UserRequestDto";
import { UserService } from "../../application/use_case/UserService";
import { RestUserMapper } from "../mapper/RestUserMapper";
export const UserController = (app: Application): void => {
	const userService = new UserService();
	const restUserMapper = new RestUserMapper();
	app.get('/ping', (req: Request, res: Response) => {
		return res.send('pong').status(200);
		});

	app.get("/api", (req: Request, res: Response) => {
		return res.status(200).send("Hola");
	});

	app.post("/api/register", (req: Request<{}, {}, UserRequestDto>, res: Response) => {
		const userRequestDto: UserRequestDto = req.body;
		userService.createUser(restUserMapper.toEntity(userRequestDto));
		// aquí puedes hacer lo que necesites con el objeto userDto
		return res.status(200).send(userRequestDto);
	});
};


