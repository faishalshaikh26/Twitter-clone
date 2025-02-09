import User from "../models/user.model.js";
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
export const login = async (req, res) => {
    try {
        const {username , password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "") 

        if(!user || !isPasswordCorrect){
            return res.status(400).json({ error: "Invalid credential"})
        }

        generateTokenAndSetCookie(user._id , res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ error: "Internal server error"})
    }
};

// Logout controller
export const logout =async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge: 0})
        res.status(200).json({message: "Logout successful"})
    } catch (error) {
        console.log("Error in logout controller", error.message)
       res.status(500).json({ message: 'Internal server error' }); 
    }
    
};

export const getMe = async (req , res) => {
    try {

        // console.log("🔹 req.user in getMe:", req.user);

        if (!req.user) {
            console.log("🚨 req.user is undefined in getMe");
            return res.status(401).json({ error: "Unauthorized: No user found" });
        }

        const user = await User.findById(req.user._id).select("-password")

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user)
    } catch (error) {
        console.log("🚨 Error in getMe controller:", error.message);
       res.status(500).json({ message: 'Internal server error' }); 
    }
}