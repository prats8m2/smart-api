import { Request, Response } from "express";
import signup from "./signup";
import viewUser from "./viewUser";
import login from './login'

class UserController {
  public view = async (req: Request, res: Response) => {
    viewUser(req, res);
  };

  public signup = async (req: Request, res: Response) => {
    signup(req, res);
  };

    public login = async (req: Request, res: Response) => {
    login(req, res);
  };
}

export default UserController;
