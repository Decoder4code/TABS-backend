const express = require("express");

const userControllers = require("../controllers/userControllers");
const userControllerflight = require("../controllers/userControllerflight");
const userControllerhotel = require("../controllers/userControllerhotel");
const userControllertour =  require("../controllers/userControllertour");

const router = express.Router();

router.post("/createUser",userControllers.createUser);
router.delete("/deleteUser/:userid",userControllers.deleteUser);
router.put("/updateUser/:userid",userControllers.modifyUser);
router.post("/loginuser",userControllers.loginUser)

router.post("/flights/createFlight",userControllerflight.createFlight)
router.get("/flights/getFlights",userControllerflight.getFlights)

router.post("/hotels/addHotel",userControllerhotel.addHotel)
router.get("/hotels/getHotels",userControllerhotel.searchHotels)

router.post("/tours/addTour", userControllertour.addTour);
router.get("/tours/getTour", userControllertour.searchTour);
module.exports = router;