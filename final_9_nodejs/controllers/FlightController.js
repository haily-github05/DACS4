const flightServices = require('../services/FlightService')
const airlineService = require('../services/AirlineService');
const airportService = require('../services/AirportService');
const {mongooseToObject} = require('../util/mongoose');

class FlightController {
    async getFlightsBySearch(req, res, next) {
        try {
            const airportDeparture = await airportService.getAirportById(req.body.departure_airport_id);
            const airportArrival = await airportService.getAirportById(req.body.arrival_airport_id);
            const flights = await flightServices.getFlightsBySearch(req, res, next);

            for (const flight of flights) {
                const airline = await airlineService.getAirlineById(flight.airline_id);
                flight.airlineInfo = airline;
                flight.from = airportDeparture;
                flight.to = airportArrival;
            }
            const airlines = await airlineService.getAllAirlines(req,res,next);
           
            const formData = req.body;
            formData.from = airportDeparture;
            formData.to = airportArrival;

            const user = await req.user;
            res.render('pages/client/flights-listing', {formData: formData, flights: flights, airlines: airlines, user: mongooseToObject(user)});
           
        } catch (error) {
            console.error(error);
            throw error; 
        }
    };
    async showSeats(req, res, next) {
        const user = await req.user;
        res.render('pages/client/booking-seat',{flightData: JSON.parse(req.body.flightData), class: JSON.parse(req.body.inputData).class, user: mongooseToObject(user)});
    }
    async showDetailFlightBooking(req,res,next){
        const seat = req.body.seat;
        const classPricing = req.body.class;
        const flightData = JSON.parse(req.body.flightData);
        flightData.classValue = String(classPricing);
        if (classPricing == "Phổ Thông"){
            flightData.classPricing = flightData.economy_price;
        }   
        else{
            flightData.classPricing = flightData.business_price;
        }   
        const user = await req.user;
        res.render('pages/client/flight-booking-detail', {flightData: flightData, seatNo: seat, user: mongooseToObject(user)});
    }
}

module.exports = new FlightController;