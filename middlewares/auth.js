const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next) => {
    try {
        //extract JWT token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }
        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }
        next()
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for students"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User role is not matching"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for admin"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User role is not matching"
        })
    }
}