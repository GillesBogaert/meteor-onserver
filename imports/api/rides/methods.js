import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
//import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
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


if (Meteor.isServer){


Meteor.methods({
  'rides.create': function (rides={}) {
    const ridesEntry = {...rides, userId: this.userId};
    const _id = Rides.insert(ridesEntry);
    return { ...ridesEntry, _id };
  },
  'rides.getRide' : function (rideId) {
      return Rides.find({_id : rideId.toString()});
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
  'rides.add.driver.current' : function (rideId, distance, Name, First_Name) {
    const ride = Rides.findOne(rideId);
    Rides.update({ _id : rideId.toString()}, {$push: {drivers : {driverid : this.userId, distance : distance, Name : Name, First_Name : First_Name}}
    })
},
'rides.add.driver.confirmed' : function (rideId, driverid, distance, Name, First_Name) {
    Rides.update({ _id : rideId.toString()}, {$set : {confirmedByUser : true}, $push: {confirmedDrivers : {driverid : driverid, distance : distance, Name : Name, First_Name : First_Name}}
    })
},
'rides.add.driver.test' : function ({}) {
    const ride = Rides.findOne({}, { limit: 1, sort: { createdAt: -1 }})
},
'sendmail.factuur' : function (options) {

    console.log("Starting sendmail.factuur call now...")
    this.unblock();


    SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));

    const emailData = {
        vergoeding : options.vergoeding,
        kostenUur : options.kostenUur,
        total : options.total,
        createdDate : "9/03/2018",
        dueDate : "9/04/2018"
    }

    Email.send({
        to: options.email,
        from: "info@getdriven.com",
        subject: "Factuur GetDriven " + Date(),
        html: SSR.render('htmlEmail', emailData),
      });
      Rides.update({ _id : options.rideId.toString()}, {$set : { rideFinished : true}
    })

      console.log("Email has been sent!")
      console.log("Ending sendmail.factuur call now...")
}
});
}


