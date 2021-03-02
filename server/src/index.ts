import mongoose, { Error } from 'mongoose';
import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';
import { UserInterface } from './interfaces/UserInterface';

dotenv.config();

const PORT = 4000;
const LocalStrategy = passportLocal.Strategy;

mongoose.connect(`${process.env.DBLINK}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err: Error) => {
    if (err) throw err;
    console.log('MongoDb Connected');
});

// MiddleWare
const app = express();
app.use(express.json());
// TODO change with origin : http://localhost:3000
app.use(cors({ origin: "*", credentials: true }));
app.use(session({
    secret: "mysecretcode",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err: Error, user: UserInterface) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}));

passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
    User.findOne({ _id: id }, (err: Error, user: UserInterface) => {
        const userInfo = {
            username: user.username,
            isAdmin: user.isAdmin
        };
        cb(err, userInfo);
    });
});


// Routes
app.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req?.body

        if (!username || !password || typeof username !== "string" || typeof password !== "string") {
            res.send("Improper Values");
            return;
        }

        User.findOne({ username }, async (err: Error, doc: UserInterface) => {
            if (err) throw err;
            if (doc) res.send("User Already Exists");
            if (!doc) {
                const hashedPassword: string = await bcrypt.hash(password, 10);
                const newUser = new User({
                    username,
                    password: hashedPassword
                });

                await newUser.save();
                res.send("Success");
            }
        });

    } catch (err) {
        console.log(err);
        res.send("Error");
    }
});

// Login
app.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
    res.send("Succesfully Authenticated");
})

app.get('/user', (req, res) => {
    res.send(req.user);
});


app.listen(PORT, () => console.log(`Server listenin on port : ${PORT}`));