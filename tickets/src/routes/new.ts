import express , {Request, Response} from 'express'; 
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@stupnikk-tickets/common';
const router = express.Router()

router.post('/api/tickets',requireAuth, [
body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
body('price')
    .isFloat({ gt: 0})
    .not()
    .isEmpty()
    .withMessage('price is required and must be greater than 0')
], 
validateRequest, 
(req:Request, res:Response) => {
    res.sendStatus(200); 
})



export { router as createTicketRouter }