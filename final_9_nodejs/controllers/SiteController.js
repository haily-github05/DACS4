const airportController = require('../controllers/AirportController');
const {mongooseToObject} = require('../util/mongoose');
const ticketService = require('../services/TicketService');
const { multipleMongooseToObject } = require("../util/mongoose");

class SiteController {
    async index(req, res, next) {

      const user = await req.user;
      let airports = await airportController.getAllAirport();
      res.render("pages/client/index", {airports, user: mongooseToObject(user)});
       
    }
    async showPassengerInfo(req,res,next){
        const {
            firstName,lastName,phoneNumber,email,Dob,seatNo
          } = req.body;
        
          const passenger = {
            firstName,lastName,phoneNumber,email,Dob, seatNo
          };
          let seatNoValue = JSON.parse(seatNo);
          passenger.seatNo = seatNoValue;
        const flightData = JSON.parse(req.body.flightData);
        const user = await req.user;
        res.render("pages/client/personal-info-verify", {flightData: flightData, passengerInfo: passenger, user: mongooseToObject(user)});
        // if(req.session.user){
        //   const user = JSON.parse(req.session.user);
        //   res.render("pages/client/personal-info-verify", {flightData: flightData, passengerInfo: passenger,user});
        // }
        // else{
        //   res.render("pages/client/personal-info-verify", {flightData: flightData, passengerInfo: passenger});
        // }
    
    }
    async showPaymentBooking(req, res, next){
        const flightData = JSON.parse(req.body.flightData);
        let passengerInfo;
        if(req.body.passengerInfo){
           passengerInfo = JSON.parse(req.body.passengerInfo);
        }
        else{
           passengerInfo = null
           let seatNoValue = JSON.parse(req.body.seatNo);
           flightData.seatNo = seatNoValue;
        }
        const user = await req.user;
        res.render("pages/client/booking-detail", {flightData, passengerInfo, user: mongooseToObject(user)});
    }
    async showTicket(req,res,next){
      const flightData = JSON.parse(req.body.flightData);
        let passengerInfo;
        if(req.body.passengerInfo){
          passengerInfo = JSON.parse(req.body.passengerInfo);
        }
        else{
          passengerInfo = null
        }
        
      const user = await req.user;
      let ticket
      if (passengerInfo != null) {
          ticket = {
            airline_id: flightData.airline_id,
            flight_id:  flightData._id,
            user_id:    null,
            seat:       passengerInfo.seatNo,
            passenger_info: passengerInfo,
            ticket_class: flightData.classValue
          }
          await ticketService.createTicket(ticket)
      } else {
          ticket = {
            airline_id: flightData.airline_id,
            flight_id:  flightData._id,
            user_id:    user._id,
            seat:       flightData.seatNo,
            passenger_info: null,
            ticket_class: flightData.classValue
          }
          await ticketService.createTicket(ticket)
      }
      res.render('pages/client/ticket-info', {flightData, passengerInfo, user: mongooseToObject(user)});
    }

    async ticketList(req, res, next) {
      try {
        const user = req.user
        if (user) {
          const ticket_list = await ticketService.getTicketByUser(user._id)
          res.render('pages/client/list-ticket.hbs', {ticket_list: multipleMongooseToObject(ticket_list), user: mongooseToObject(user)})
        } else {
          res.redirect('/')
        }
      } catch (error) {
        throw error
      }
    }
    showAccountPage(req, res) {
    // Lấy thông tin người dùng đã xác thực
    const user = req.user; 
    
    // Render view 'account' và truyền dữ liệu người dùng
    res.render("/account", { 
        title: "Tài khoản của tôi", 
        user: mongooseToObject(user), 
        layout: 'main' 
    });
}
   
}

module.exports = new SiteController;