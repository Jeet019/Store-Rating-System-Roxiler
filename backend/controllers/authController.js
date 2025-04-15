// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const signup = async (req, res) => {
//     try {
//         console.log("REQ.BODY: ", req.body);
    
//         const { name, email, password, address, role } = req.body;

//         if (!name || !email || !password || ! address) return res.status(400).json({ msg: "All fields are required"});
        
//         const existing = await User.findOne({ where: { email } });
//         if (existing) return res.status(409).json({ msg: "User already exists" });

//         const hashed = await bcrypt.hash(password, 10);

//         const user = await User.create({ name, email, password: hashed,  address, role });
//         res.status(201).json({msg: "User Created", user: {id: user.id, name: user.name, email: user.email,  address:user.address, role: user.role}, });
//     } catch (err) {
//         res.status(500).json({msg: "Server Error", error: err.message});
//     }
// };

// const login = async (req, res) => {
//     try {
//         const {email, password,role} = req.body;

//         const user = await User.findOne({ where: {email}});
//         if (!user) return res.status(404).json({ msg: "User not found"});

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({msg: "Invalid Credentials"});
// console.log("Signup Request Body: ", req.body);
// console.log("Login Request Body: ", req.body);

//         const token = jwt.sign (
//             {id: user.id, role: user.role},
//             process.env.JWT_SECRET,
//             { expiresIn: "1d"}
//         );

//         res.json({
//             msg: "Login Successful",
//             token,
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });
//     } catch (err) {
//         res.status(500).json({msg: "Server Error", error: err.message});
//     }
// }; 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signup = async (req, res) => {
    try {
        console.log("REQ.BODY: ", req.body);
    
        const { name, email, password, address, role } = req.body;

        // Ensure all required fields are provided
        if (!name || !email || !password || !address) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if user already exists
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({ msg: "User already exists" });
        }

        // Hash the password
        const hashed = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({
            name,
            email,
            password: hashed,
            address,
            role: role || 'user' // Default role to 'user' if not provided
        });

        res.status(201).json({
            msg: "User Created",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Signup Error: ", err);  // Log error for debugging
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            msg: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Login Error: ", err); // Log error for debugging
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};



module.exports = { signup, login };