import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";



// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// upload image function
const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null
        const uploadResult = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto",
        });
        console.log("file is uploaded successfully");
        fs.unlinkSync(localFilepath);
        return uploadResult.url;

    } catch (error) {
        fs.unlinkSync(localFilepath);
        return null;
    }
};







const registerUser = async function register(req, res) {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        await sendWelcomeEmail(email);
        res.status(201).json({ message: "User kamyabi se  registered hogaya!" });
    } catch (error) {
        res.status(500).json({ error: "User kamyabi se registerd nah huwa." });
    }
}

const loginUser = async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials." });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed." });
    }
}


export default { registerUser, loginUser }