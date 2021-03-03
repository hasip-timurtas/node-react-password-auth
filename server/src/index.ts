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

dotenv.config();

const PORT = 4000;

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

// passport config
passportConfig(passport);


// Admin Middleware
const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

// Routes
app.post('/register', async (req: Request, res: Response) => {
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
    const { id }: any = req.body;
    if (!id) res.send("Invalid Argument");

    User.findByIdAndDelete(id).then(e => {
        res.send("success");
    }).catch((e: Error) => {
        res.send("error " + e.message);
    })
});

app.listen(PORT, () => console.log(`Server listenin on port : ${PORT}`));