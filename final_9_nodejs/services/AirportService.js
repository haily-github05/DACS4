const airport = require('../models/Airport');
const {multipleMongooseToObject} = require('../util/mongoose');
const {mongooseToObject} = require('../util/mongoose');
class AirportService {
    getAllAirport = () => {
        return airport.find({})
            .then((airports) => {
                return multipleMongooseToObject(airports);
            })
            .catch((error) => {
                throw error;
            });
    }
    getAirportById = async (id) => {
        try {
          const airportDatas = await airport.findById(id);
      
          return mongooseToObject(airportDatas);
        } catch (error) {
          // console.error(`Error fetching airport by ID: ${error.message}`);
          // throw error; // Rethrow the error or handle it based on your application's needs
        }
      };
}

module.exports = new AirportService;

