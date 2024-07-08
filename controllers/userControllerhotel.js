const {Hotel} = require("../Model/Userschema");

// Add a hotel
exports.addHotel = async (req, res) => {
    try {
        const { name, city } = req.body;
        const newHotel = new Hotel({ name, city });
        await newHotel.save();
        res.status(201).json({ message: "Hotel added successfully", hotel: newHotel });
    } catch (error) {
        console.error("Error adding hotel:", error.message);
        res.status(500).json({ message: "Error adding hotel", error: error.message });
    }
};

// Search hotels by city
exports.searchHotels = async (req, res) => {
    try {
        const { city } = req.query;
        const hotels = await Hotel.find({ city });
        if (hotels.length === 0) {
            return res.status(404).json({ message: "No hotels found" });
        }
        res.status(200).json({ hotels });
    } catch (error) {
        console.error("Error searching hotels:", error.message);
        res.status(500).json({ message: "Error searching hotels", error: error.message });
    }
};