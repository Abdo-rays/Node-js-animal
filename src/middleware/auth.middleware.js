import { usermodel } from "../DB/model/user.model.js";
import { asynchandler } from "../utils/response/error.response.js";
import { verifyToken } from "../utils/security/token.js";

export const auth = asynchandler(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization?.toLowerCase().startsWith("bearer ")) {
        return next(new Error("authorization is required or invalid prefix", { cause: 400 }));
    }

    const token = authorization.split(" ")[1];
    if (!token) return next(new Error("token is required", { cause: 400 }));

    const decoded = verifyToken({
        token,
        signature: process.env.ACCESS_TOKEN_SIGNATURE
    });

    if (!decoded?.id) return next(new Error("invalid token payload", { cause: 401 }));

    const user = await usermodel.findById(decoded.id);
    if (!user) return next(new Error("user not found", { cause: 404 }));

    req.user = user;
    return next();
});