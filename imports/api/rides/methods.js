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
    Rides.update({ _id : rideId.toString()}, {$set : {confirmedByUser : true}}, {$push: {confirmedDrivers : {driverid : driverid, distance : distance, Name : Name, First_Name : First_Name}}
    })
},
'rides.add.driver.test' : function ({}) {
    const ride = Rides.findOne({}, { limit: 1, sort: { createdAt: -1 }})
},
'sendmail.factuur' : function () {
    // console.log("Sending email now...")
    console.log("Starting sendmail.factuur call now...")
    this.unblock();

    // const page1 = PDFPage
    //     .modify(0)
    //     .drawText('This is test1', {
    //         x : 5,
    //         y : 5,
    //         color : '#000000'
    //     })
    //     .drawText('This is test2', {
    //         x : 10,
    //         y : 10,
    //         color : '#000000'
    //     });
    
    // const existingPDF = 'TemplateFactuur.pdf'
    // PDFDocument.modify(existingPDF)
    // .modifyPages(page1)
    // .write()
    // .then(path => {
    //     console.log('PDF modified at: ' + path);
    // });
    // console.log("Ending sendmail.factuur call now...")
    // Email.send({
    //     to: "imgillesbogaert@gmail.com",
    //     from: "info@gmail.com",
    //     subject: "Example Email",
    //     text: "The contents of our email in plain text.",
    //   });
    //   console.log("Email has been sent!")
}
});



