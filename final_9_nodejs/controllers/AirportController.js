const airportService = require('../services/AirportService');

// class AirportController {
//     getAllAirport() {
//         airportService.getAllAirport()
//             .then((airports) => {
//                 // res.status(200).json({ message: "ok", data: airports });//api
//                 // res.send(airports);
//                 // console.log(airports);
//                 return multipleMongooseToObject(airports);
//             })
//             .catch((error) => {
//                 console.error(error);
//                 // res.status(500).json({ message: "Internal Server Error" });//api
//             });
//     }
// }
class AirportController {
    async getAllAirport(req, res, next) {
        try {
            const airports = await airportService.getAllAirport();
            return airports; 
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
    async getAirportById(id) {
        try {
            const airport = await airportService.getAirportById(id);
            return airport; 
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
}



module.exports = new AirportController;