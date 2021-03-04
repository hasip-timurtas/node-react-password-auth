import User from '../models/User';
import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';
import { DBUserInterface, UserInterface } from '../interfaces/UserInterface';
import { PassportStatic } from 'passport';

const LocalStrategy = passportLocal.Strategy;

/**
 * Sets the configuration of passportjs
 * For preparing express passport middleware only.
 * Contains passport.use, serializeUser and deserializeUser
 * 
 * @param {PassportStatic} passport passportjs package itself
 */

const passportConfig = (passport: PassportStatic) => {
    passport.use(new LocalStrategy((username: string, password: string, done: (err: null, id: boolean | DBUserInterface) => void) => {
        User.findOne({ username }, (err: Error, user: DBUserInterface) => {
            if (err) throw err;
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err: Error, result: boolean) => {
                if (err) throw err;
                if (result) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    }));

    passport.serializeUser((user: DBUserInterface, cb: (err: null, id: string) => void) => {
        cb(null, user._id);
    });

    passport.deserializeUser((id: string, cb: (err: Error, userInfo: UserInterface) => void) => {
        User.findOne({ _id: id }, (err: Error, user: DBUserInterface) => {
            const userInfo: UserInterface = {
                username: user.username,
                isAdmin: user.isAdmin,
                id: user._id
            };
            cb(err, userInfo);
        });
    });
}

export default passportConfig;