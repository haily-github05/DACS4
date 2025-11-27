const {mongooseToObject} = require('../util/mongoose');
const ticketModel = require('../models/Ticket')
const { multipleMongooseToObject } = require("../util/mongoose");
class TicketService {
    createTicket = async (req) => {
        try {
            ticketModel.create(req)
        } catch (error) {
            throw error
        }
    }

    getAllTickets = () => {
        return ticketModel.find({}).populate('airline_id').populate('user_id').populate({
            path: 'flight_id',
            populate: {path: 'departure_airport_id'}
        }).populate({
            path: 'flight_id',
            populate: {path: 'arrival_airport_id'}
        })
        .then((tickets) => {
            return multipleMongooseToObject(tickets);
        })
        .catch((error) => {
            throw error;
        });
    }

    deleteTicket = async (id) => {
        try {
            ticketModel.findByIdAndDelete(id).exec()
        } catch (error) {
            throw error
        }
    }

    getTicketByUser = async (user_id) => {
        try {
            return ticketModel.find({user_id: user_id}).populate('airline_id').populate('user_id').populate({
                path: 'flight_id',
                populate: {path: 'departure_airport_id'}
            }).populate({
                path: 'flight_id',
                populate: {path: 'arrival_airport_id'}
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = new TicketService;