import express, {Request, Response} from "express"
import { body, validationResult } from "express-validator" 
import { User } from "../models/user"
import jwt from "jsonwebtoken"

import { validateRequest, BadRequestError } from "@stupnikk-tickets/common"
import { Password } from "../service/password"


const router = express.Router()

router.post('/api/users/signin', 
[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'), 
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], validateRequest, 
async (req: Request, res: Response) => {

    const {email , password } = req.body
    const existingUser = await User.findOne({email})
    if (!existingUser){
        throw new BadRequestError('Invalid credentials')
    }
    const passowrdsMatch = await Password.compare(existingUser.password, password)
    if (!passowrdsMatch) throw new BadRequestError('Invalid Credentials'); 
       
    // Generate JWT

    const userJwt = jwt.sign({
        id: existingUser.id, 
        email: existingUser.email
        }, process.env.JWT_KEY!)
    
        // Store on Session 
        req.session = {
            jwt: userJwt 
        }
        // jtw 
        res.status(200).send(existingUser)
})


export { router as signinRouter}