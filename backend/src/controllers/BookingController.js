//index, show, store, update, destroy
const User = require('../models/User');
const Spot = require('../models/Spot');
const Booking = require('../models/Booking');

module.exports = {
    async store(req,res) {
      const { user_id } = req.headers;
      const { spot_id } = req.params;
      const { date } = req.body;

      let user = await  User.findById(user_id);
      if(!user){
        return res.status(400).json({error: 'User does not exists'});
      }

      // let spot = await  Spot.findById({spot_id});
      // if(!spot){
      //   return res.status(400).json({error: 'Spot does not exists'});
      // }

      const booking = await Booking.create({
          user: user_id,
          spot: spot_id,
          date,
      });

      await booking.populate('spot').populate('user').execPopulate();

      return res.json(booking);
    }
}