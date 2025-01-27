import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { emailVerificationDto, loginDto, signUpDto } from "../dto/user.dto";
import ApiResponse from "../utils/ApiResponse";
import { User } from "../models/User.model";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { mailService } from "../utils/mailService";
import crypto from 'crypto';
import { EmailVerification } from "../models/EmailVerfication.model";
import { signJwtToken } from "../utils/jwtService";


function generateUniqueToken(name: string) {
    // Create a hash of the random string using SHA-256
    const hash = crypto.createHash('sha256').update(name).digest('hex');

    // Take the first 16 characters of the hash and append the current timestamp for uniqueness
    const uniqueToken = hash.substring(0, 16) + Date.now().toString();

    return uniqueToken;
}


export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    // Validating the user data
    const result = loginDto.safeParse(req.body);

    // If the user data is not valid
    if (!result.success) throw new ApiError(400, result.error.issues[0].message);

    // check if the user exists with either email or username
    const user = await User.findOne({ $or: [{ email: result.data.username }, { username: result.data.username }] })

    // if user does not exist
    if (!user) throw new ApiError(400, "User does not exist");

    // if user is not activated
    if (!user.isEmailVerified) throw new ApiError(400, "User not activated there account");

    // If the password is not correct
    if (!await user.comparePassword(result.data.password)) throw new ApiError(400, "Invalid Password");

    // create a access token
    const accessToken = signJwtToken({
        _id: user._id,
    })

    // Add cookie to the response
    res.
        status(200)
        .cookie("accessToken", accessToken, { sameSite: "strict", httpOnly: true })
        .json(new ApiResponse(200, "Login Successfull"));

})


export const signUpUser = asyncHandler(async (req: Request, res: Response) => {

    // Validating the user data
    const result = signUpDto.safeParse(req.body);

    // If the user data is not valid    
    if (!result.success) {
        throw new ApiError(400, result.error.issues[0].message);
    }

    // check if the user already exists with either email or username
    const user = await User.findOne({
        $or: [
            { email: result.data.email },
            { username: result.data.username }
        ]
    });

    // throw the error if the user already exists
    if (user) throw new ApiError(400, "User already exists with either email or username");

    // create the user if it doesn't exist
    const newUser = new User(result.data);

    // hash the password
    await newUser.hashPassword()

    // save the user
    await newUser.save();

    //generating a unique token
    const token = generateUniqueToken(result.data.email);

    // create the email verification document if it doesn't exist
    await EmailVerification.findOneAndUpdate({ email: result.data.email }, { email: result.data.email, token: token }, { upsert: true })

    // Mail Options
    const mailOptions: MailOptions = {
        from: `T M S <${process.env.MAIL_ADDRESS}>`,
        to: result.data.email,
        subject: 'Activate your account',
        html: ` 
        <h1>Activate your account</h1>      
        <a href='${process.env.SERVER_URL}/api/v1/user/activate-user/${result.data.email}/${token}'> Tap here to activate your account</a>      
        `
    };

    // Send the mail
    //  mailService.sendMail(mailOptions)

    res.status(201).json(new ApiResponse(201, "Please check your email to verify your account"));
})


export const activateUser = asyncHandler(async (req: Request, res: Response) => {

    const email = req.params.email;
    const token = req.params.token;

    // find the email verification document
    const emailVerification = await EmailVerification.findOne({ email: email })

    // if the email verification document does not exist
    if (!emailVerification) throw new ApiError(400, "User does not exist");

    // if the token is not valid
    if (emailVerification.token !== token) throw new ApiError(400, "Invalid token");

    // update the isEmailVerified field to true
    await User.updateOne({ email: email }, { isEmailVerified: true });

    // delete the email verification document
    await EmailVerification.deleteOne({ email: email });

    // redirect the user to the client url
    res.redirect(`${process.env.CLIENT_URL}?success=true`);
})


export const requestEmailVerification = asyncHandler(async (req: Request, res: Response) => {

    // Validating the user data
    const result = emailVerificationDto.safeParse(req.body);

    // If the user data is not valid
    if (!result.success) throw new ApiError(400, result.error.issues[0].message);

    const email = result.data.email

    // find the user
    const user = await User.findOne({ email })

    if (!user) throw new ApiError(400, "User does not exist ! Please sign up");

    // if the user is already activated
    if (user.isEmailVerified) throw new ApiError(400, "User already activated");

    //generating a unique token
    const token = generateUniqueToken(email);

    // create the email verification document if it doesn't exist
    await EmailVerification.findOneAndUpdate({ email }, { email: email, token: token }, { upsert: true })


    // Mail Options
    const mailOptions: MailOptions = {
        from: `T M S <${process.env.MAIL_ADDRESS}>`,
        to: email,
        subject: 'Activate your account',
        html: ` 
        <h1>Activate your account</h1>      
        <a href='${process.env.SERVER_URL}/api/v1/user/activate-user/${email}/${token}'> Tap here to activate your account</a>      
        `
    };

    // Send the mail    
    mailService.sendMail(mailOptions)

    res.status(200).json(new ApiResponse(200, "Please check your email to verify your account"));
})


