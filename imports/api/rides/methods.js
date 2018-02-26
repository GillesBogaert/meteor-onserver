import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

import {Rides} from './rides'

export const findOneRide = new ValidatedMethod({
    name : 'rides.findOne',
    validate : new SimpleSchema({
        name : { type : String, optional : false},
    }).validator(),
    run({name}) {
        return Rides.findOne({name});
    },
});

Meteor.methods({
  'rides.create': function (rides={}) {
    const ridesEntry = {...rides, userId: this.userId};
    const _id = Rides.insert(ridesEntry);
    return { ...ridesEntry, _id };
  },
  'rides.removeall' : function (rides={}) {
      return Rides.remove({});
  },
  'rides.add.driver' : function ({driverId, rideId}) {
      new SimpleSchema({
          driverId: {type : String },
          rideId: {type : String}
      }).Validate({driverId, rideId})

      const ride = Rides.findOne(rideId);
      Rides.update(rideId, {
          $set: {drivers : [...ride.drivers, driverId]}
      })
  },
  'rides.add.driver.current' : function ({rideId}) {
    new SimpleSchema({
        rideId: {type : String}
    }).validate({rideId})

    const ride = Rides.findOne(rideId);
    Rides.update(rideId, {
        $set: {drivers : [...ride.drivers, this.userId]}
    })
}

});



