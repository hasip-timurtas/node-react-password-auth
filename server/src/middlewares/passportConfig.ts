import User from '../models/User';
import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';
import { UserInterface, UserInfo } from '../interfaces/UserInterface';
import { PassportStatic } from 'passport';

const LocalStrategy = passportLocal.Strategy;

const passportConfig = (passport: PassportStatic) => {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ username }, (err: Error, user: UserInterface) => {
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

    passport.serializeUser((user: any, cb: (err: null, id: string) => void) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id: string, cb: (err: Error, userInfo: UserInfo) => void) => {
        User.findOne({ _id: id }, (err: Error, user: UserInterface) => {
            const userInfo: UserInfo = {
                username: user.username,
                isAdmin: user.isAdmin
            };
            cb(err, userInfo);
        });
    });
}

export default passportConfig;