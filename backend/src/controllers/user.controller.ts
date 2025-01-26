import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { loginDto, signUpDto } from "../dto/user.dto";
import ApiResponse from "../utils/ApiResponse";
import { User } from "../models/User.model";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { mailService } from "../utils/mailService";
import crypto from 'crypto';
import { EmailVerification } from "../models/EmailVerfication.model";


function generateUniqueToken(randomString: string) {
    // Create a hash of the random string using SHA-256
    const hash = crypto.createHash('sha256').update(randomString).digest('hex');

    // Combine the hash with a timestamp (for uniqueness)
    const timestamp = Date.now().toString();
    const uniqueToken = `${hash}-${timestamp}`;

    return uniqueToken;
}


export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    // Validating the user data
    const result = loginDto.safeParse(req.body);

    // If the user data is not valid
    if (!result.success) throw new ApiError(400, result.error.issues[0].message);

    // check if the user exists
    const user = await User.findOne({ email: result.data.email })

    // if user does not exist
    if (!user) throw new ApiError(400, "User does not exist");

    // if user is not activated
    if (!user.isEmailVerified) throw new ApiError(400, "User not activated there account");


    res.status(200).json(new ApiResponse(200, "User Logged In"));

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
    const newUser = await User.create(result.data);

    //generating a unique token
    const token = generateUniqueToken(result.data.email);

    // create the email verification document
    const emailVerification = await EmailVerification.create({
        email: result.data.email,
        token: token
    })

    // send the mail to the email to the user
    const mailOptions: MailOptions = {
        from: `Task Manager <${process.env.MAIL_ADDRESS}>`,
        to: result.data.email,
        subject: 'Activate your account',
        html: `       
        <a href='${process.env.SERVER_URL}/api/v1/user/activate-user/${result.data.email}/${token}'> Activate your account</a>      
        `
    };

    mailService.sendMail(mailOptions)

    res.status(201).json(new ApiResponse(201, "Please check your email to verify your account"));

})


export const activateUser = asyncHandler(async (req: Request, res: Response) => {

    const email = req.params.email;
    const token = req.params.token;

    // find the email verification document
    const emailVerification = await EmailVerification.findOne({ email: email })

    // if the email verification document does not exist
    if (!emailVerification) throw new ApiError(400, "User does not exist");

    if (emailVerification.token !== token) throw new ApiError(400, "Invalid token");

    // update the isEmailVerified field to true
    await User.updateOne({ email: email }, { isEmailVerified: true });

    // delete the email verification document
    await EmailVerification.deleteOne({ email: email });

    // redirect the user to the client url
    res.redirect(`${process.env.CLIENT_URL}?success=true`);
})