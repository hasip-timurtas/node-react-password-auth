import mongoose, { Error } from 'mongoose';
import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './model/User';

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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(session({
    secret: "mysecretcode",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password);
    try {
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            passport: hashedPassword
        });

        await newUser.save();
        res.send("Success");
    } catch (err) {
        console.log(err);
        res.send("Error");
    }

});

app.listen(PORT, () => console.log(`Server listenin on port : ${PORT}`));