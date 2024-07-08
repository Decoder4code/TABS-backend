const { Signup } = require("../Model/Userschema");

exports.createUser = async (req, res) => {
    try {
        const { userid, email, password } = req.body;
        const newUser = new Signup({ userid, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await Signup.findOneAndDelete({ userid }); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};


exports.modifyUser = async (req, res) => {
    try {
        const { userid } = req.params; 
        const { email, password } = req.body;
        console.log(`Updating user with ID: ${userid}`); 
        const user = await Signup.findOneAndUpdate({ userid }, { email, password }, { new: true, runValidators: true });
        if (!user) {
            console.log("User not found"); 
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.log("Error updating user:", error.message); 
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Signup.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};