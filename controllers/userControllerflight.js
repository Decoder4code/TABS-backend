const { Flight } = require("../Model/Userschema");

// Create a flight
exports.createFlight = async (req, res) => {
    try {
        const { from, to, date , name } = req.body;
        const newFlight = new Flight({ from, to, date , name });
        await newFlight.save();
        res.status(201).json({ message: "Flight created successfully", flight: newFlight });
    } catch (error) {
        console.error("Error creating flight:", error.message);
        res.status(500).json({ message: "Error creating flight", error: error.message });
    }
};

// Delete a flight by ID
exports.deleteFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await Flight.findOneAndDelete(id);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        res.status(200).json({ message: "Flight deleted successfully" });
    } catch (error) {
        console.error("Error deleting flight:", error.message);
        res.status(500).json({ message: "Error deleting flight", error: error.message });
    }
};


exports.getFlights = async (req, res) => {
    try {
        const { from, to, date } = req.query;
        const flights = await Flight.find({ from, to, date });
        if (!flights.length) {
            return res.status(404).json({ message: "No flights found" });
        }
        res.status(200).json({ flights });
    } catch (error) {
        console.error("Error fetching flights:", error.message);
        res.status(500).json({ message: "Error fetching flights", error: error.message });
    }
};