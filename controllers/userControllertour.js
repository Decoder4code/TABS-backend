const { Tour } = require("../Model/Userschema");

exports.addTour = async (req, res) => {
    try {
        const { tourName, place } = req.body;
        let tour = await Tour.findOne({ name: tourName });
        if (tour) {
            tour.places.push(place);
        } else {
            tour = new Tour({ name: tourName, places: [place] });
        }
        await tour.save();
        res.status(201).json({ message: "Tour added successfully", tour });
    } catch (error) {
        console.error("Error adding tour:", error.message);
        res.status(500).json({ message: "Error adding tour", error: error.message });
    }
};

exports.searchTour = async (req, res) => {
    try {
        const { tourName } = req.query;
        const tours = await Tour.find({ name: { $regex: tourName, $options: "i" } });
        if (tours.length > 0) {
            res.status(200).json({ tours });
        } else {
            res.status(404).json({ message: "No tours found" });
        }
    } catch (error) {
        console.error("Error searching tours:", error.message);
        res.status(500).json({ message: "Error searching tours", error: error.message });
    }
};