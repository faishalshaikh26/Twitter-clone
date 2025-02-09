import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import  generateTokenAndSetCookie  from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { username, fullName, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        if(password.length < 6 ){
            return res.status(400).json({error: "password must be 6 character long"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ 
            username, 
            fullName, 
            email, 
            password: hashedPassword 
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                coverImg: newUser.coverImg,
                profileImg: newUser.profileImg,
            
            })
        } 

        else{
            res.status(400).json({error: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller")
    }
    
};

// Login controller
export const login = (req, res) => {
    res.send("login page")
};

// Logout controller
export const logout = (req, res) => {
    // For simplicity, we'll just send a success message
    res.status(200).json({ message: 'Logout successful' });
};