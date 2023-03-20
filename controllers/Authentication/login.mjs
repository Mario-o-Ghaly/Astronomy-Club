import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { User } from "../../models/User.mjs";
import { AppError } from "../../utils/AppError.mjs";
import * as consts from "../../utils/consts.mjs";

export const login = async (req, res, next) => { 
    const email = req.body.email;
    const password = req.body.password;
    if (!email||!password)
        return next(new AppError(400, "enter username and password"));

    const user = await User.findOne({ email: email }).select('+password');
    console.log(user)
    if (!user||! await bcrypt.compare(password, user.password)) 
        return next(new AppError(400, "invalid email or password"));
    

    if (!user.confirmed) 
        return next(new AppError(401, "This account isn't confirmed, check your email"));
    

    const token = jwt.sign(
    { id: user._id, role: user.role, username: user.username },
    process.env.JWT_KEY,
    { expiresIn: consts.LOGIN_TIMEOUT_SECS }
    );

    return res
    .cookie("jwt", token, consts.LOGIN_TIMEOUT_MILLIS)
    .status(200)
    .json({
        message: "signed in",
        user: user._id,
    });
};

  