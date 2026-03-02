
import { usermodel } from "../../DB/model/user.model.js";
import { emailEvent } from "../../utils/events/email.event.js";
import { asynchandler } from "../../utils/response/error.response.js";
import { generateHash } from "../../utils/security/hash.security.js";
import { compareHash } from "../../utils/security/token.js";
import { generateToken } from "../../utils/security/token.js";
import bcrypt from 'bcrypt'

export const signup = asynchandler(
    async (req, res, next) => {
        const { username, email, password } = req.body
        if (await usermodel.findOne({ email })) {
            return next(new Error("email exist", { cause: 409 }))
        }

        const hashpassword = generateHash({ plainText: password })
        const user = await usermodel.create({ username, email, password: hashpassword })
        emailEvent.emit("sendConfirmationEmail", { email })
        return res.status(200).json({ message: "done", user })
    })



export const login = asynchandler(
    async (req, res, next) => {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            return next(new Error("invalid email or password", { cause: 400 }));
        }
        const match = compareHash({ plainText: password, hashValue: user.password });
        if (!match) {
            return next(new Error("invalid email or password", { cause: 400 }));
        }
        const accessToken = generateToken({
            payload: { id: user._id, email: user.email },
            signature: process.env.ACCESS_TOKEN_SIGNATURE,
            expiresIn: "15m",
        });
        const refreshToken = generateToken({
            payload: { id: user._id },
            signature: process.env.REFRESH_TOKEN_SIGNATURE,
            expiresIn: "7d",
        });
        return res.status(200).json({
            message: "login success",
            accessToken,
            refreshToken,
        });
    }
);