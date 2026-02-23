const details = require('../models/user');
const bcrypt = require('bcrypt');   // 🔥 Added bcrypt

// =======================
// ✅ SIGNUP CONTROLLER
// =======================
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🔹 Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 🔹 Check if user already exists
        const existingUser = await details.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // 🔥 Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Create new user with hashed password
        await details.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User created successfully"
        });

    } catch (err) {
        console.log("Signup Error:", err);
        return res.status(500).json({
            message: "Server error"
        });
    }
};


// =======================
// ✅ LOGIN CONTROLLER
// =======================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 Check if user exists
        const user = await details.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // 🔥 Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            message: "User login successful"
        });

    } catch (err) {
        console.log("Login Error:", err);
        return res.status(500).json({
            message: "Server error"
        });
    }
};