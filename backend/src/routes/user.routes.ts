import { Router } from "express";
import { activateUser, loginUser, requestEmailVerification, signUpUser } from "../controllers/user.controller";

const router = Router();

router.post("/login", loginUser)

router.post("/signup", signUpUser)

router.get("/activate-user/:email/:token", activateUser)

router.post("/request-mail", requestEmailVerification)


export default router