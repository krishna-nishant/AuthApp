const express = require("express")
const router = express.Router()

const { login, signup } = require("../controllers/auth.js")
const { auth, isStudent, isAdmin } = require("../middlewares/auth.js")

router.post("/login", login)
router.post("/signup", signup)

//protected route
router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Student",
    })
})

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Admin",
    })
})

module.exports = router;