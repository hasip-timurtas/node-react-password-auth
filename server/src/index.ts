import mongoose, { Error } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';
import { DBUserInterface, UserInterface } from './interfaces/UserInterface';
import passportConfig from './middlewares/passportConfig'
import isAdminMiddleware from './middlewares/isAdmin'

dotenv.config();
const PORT = process.env.PORT || 4000;

/**
 * MongoDb connection 
 * We start the connection here. take the DBLINK from .env file 
 */
mongoose.connect(`${process.env.DBLINK}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err: Error) => {
    if (err) throw err;
    console.log('MongoDb Connected');
});


/**
 * MiddleWare Configurations 
 * All the express setup and middlewares set here.
 * Which are json, cors, cookieparser, session, passport.
 */
const app = express();
app.use(express.json());
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(cookieParser());
app.use(session({
    secret: "bubirgizlikoddur",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


/**
 * Passport config
 * We call Passport auth configuration here.
 * It contains all necesary configuration.
 */
passportConfig(passport);

/**
 * Routes
 * All the routes that we need for the application are her.
 * Which are: Register, Login, User, Logout for non admin users 
 * and getallusers, deleteuser for admin users
 */

app.post('/register', (req: Request, res: Response) => {
    try {
        const { username, password } = req?.body

        if (!username || !password || typeof username !== "string" || typeof password !== "string") {
            res.send("Improper Values");
            return;
        }

        User.findOne({ username }, async (err: Error, doc: DBUserInterface) => {
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
        res.send("Error");
    }
});

app.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
    res.send("success");
})

app.get('/user', (req, res) => {
    res.send(req.user);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.send("success")
});

app.get('/getallusers', isAdminMiddleware, async (req, res) => {
    await User.find({}, (err: Error, data: DBUserInterface[]) => {
        if (err) res.send("Error");
        const users: UserInterface[] = data.map((user: DBUserInterface) => {
            return {
                id: user._id,
                isAdmin: user.isAdmin,
                username: user.username
            }
        });

        res.send(users);
    });
});

app.post('/deleteuser', isAdminMiddleware, (req, res) => {
    const { id } = req?.body;
    if (!id) res.send("Invalid Argument");

    User.findByIdAndDelete(id).then(e => {
        res.send("success");
    }).catch((err: Error) => {
        res.send("error " + err.message);
    })
});

app.listen(PORT, () => console.log(`Server listenin on port : ${PORT}`));