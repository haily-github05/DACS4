const express = require("express");
const route = express.Router();
const AdminController = require("../controllers/AdminController");

route.get("/manage-flights", AdminController.manageFlight);
route.get("/manage-airlines", AdminController.manageAirlines);

route.get("/manage-user", AdminController.manageUser);
route.get("/manage-ticket", AdminController.manageTicket);
route.get("/test", AdminController.test);

route.post("/create-flight", AdminController.createFlight);
route.post("/delete-flight", AdminController.deleteFlight);
route.post("/data-flight", AdminController.getFlightData);
route.post("/update-flight", AdminController.updateFlight);

route.post("/create-airline", AdminController.createAirline);
route.post("/delete-airline", AdminController.deleteAirline);
route.post("/data-airline", AdminController.getAirlineData);
route.post("/update-airline", AdminController.updateAirline);

route.post("/delete-user", AdminController.deleteUser);
route.post("/data-user", AdminController.getUserData);
route.post("/update-user", AdminController.updateUser);
route.post("/update-verify", AdminController.updateVerify);

route.post("/delete-ticket", AdminController.deleteTicket);

module.exports = route;
