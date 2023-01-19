import express from "express"

import { currentUser } from "@stupnikk-tickets/common"


const router = express.Router()

router.get('/api/users/currentuser', currentUser,  (req, res) => {
    
    // is the user logged in ? 
    res.send({currentUser : req.currentUser || null})
    
    
   
})


export { router as currentUserRouter}