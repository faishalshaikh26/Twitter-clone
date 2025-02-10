import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        // console.log("🔹 protectRoute middleware reached"); // Log this first

        // Check if JWT exists
        const token = req.cookies?.jwt; // Use optional chaining to avoid crashes
        //console.log("🔹 Token from cookies:", token);

        if (!token) {
            console.log("🚨 No token found in cookies");
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded JWT:", decoded); // Debugging step

        if (!decoded || !decoded.userId) {
            console.log("🚨 Invalid token structure:", decoded);
            return res.status(401).json({ error: "Unauthorized: Invalid Token" });
        }

        // Find user using decoded.id or decoded.userId
        const user = await User.findById(decoded.userId).select("-password");
        //console.log("User found in DB:", user); // Debugging step

        if (!user) {
            console.log("🚨 User not found in database");
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        req.user = user;
        //console.log("✅ req.user set successfully:", req.user);

        next();
    } catch (error) {
        console.error("Error in protectRoute middleware", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
