import User from "../models/User";
import { DBUserInterface } from "src/interfaces/UserInterface";
import { Request, Response, NextFunction } from 'express';

/**
 * Checks if the user is logged in and if the user is admin.
 * It checks the user from req.user which implemented with passportjs.
 * We use this function for express middleware only!
 * 
 * @param {Request} req express request param
 * @param {Response} res express response param
 * @param {Response} res express next function
 */
export default function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
    const { user }: any = req;
    if (user) {
        User.findOne({ username: user.username }, (err: Error, data: DBUserInterface) => {
            if (err) throw err;
            if (data?.isAdmin) {
                next();
            } else {
                res.send("Sorry only admin can perform this!");
            }
        })
    } else {
        res.send("Sorry you are not logged in!");
    }
}