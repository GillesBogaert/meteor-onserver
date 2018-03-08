import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
//import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import {Rides} from './rides'




// Finds one ride on basis of name.
// The validatedMethod acts as a schema for name value that is being passed
// into the method. This schema is then tested against the value and an error is thrown
// if the values are not strings in this case
export const findOneRide = new ValidatedMethod({
    name : 'rides.findOne',
    validate : new SimpleSchema({
        name : { type : String, optional : false},
    }).validator(),
    run({name}) {
        return Rides.findOne({name});
    },
});

// Only excecutes these methods if on the server
// This stops client side calls of this code if hosted locally
if (Meteor.isServer){

// Designated place where meteor looks for methods
Meteor.methods({

    // Creates rides based of a rides object that is being passed by the clinet
    // A user id is then passed into the object
    // This is id is gotten from the currently logged in user id via this.userId (Build in meteor method)
    // Returns ride object

    'rides.create': function (rides={}) {
    const ridesEntry = {...rides, userId: this.userId};
    const _id = Rides.insert(ridesEntry);
    return { ...ridesEntry, _id };
  },

  // Returns a ride based on an id that is passed to the meteor via the client
  // The find function uses id as a parameter with the Rides collection
  // to return a ride object
    
  'rides.getRide' : function (rideId) {
      return Rides.find({_id : rideId.toString()});
  },
  
  // Removes all rides from the database
  // Helper Function

  'rides.removeall' : function (rides={}) {
      return Rides.remove({});
  },

  // Adds driver to ridein Rides collection using driverId and rideId
  // The validatedMethod acts as a schema for driverId and rideId values that is being passed
  // into the method. This schema is then tested against these values and an error is thrown
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

  // Adds driver to ride in Rides collection using rideId
  // The update method searches for a ride with _id = rideId then pushes the object being passed by the clinet
  // into the drivers field of the ride object 
  'rides.add.driver.current' : function (rideId, distance, Name, First_Name) {
    const ride = Rides.findOne(rideId);
    Rides.update({ _id : rideId.toString()}, {$push: {drivers : {driverid : this.userId, distance : distance, Name : Name, First_Name : First_Name}}
    })
},

  // Adds driver to ride in Rides collection using rideId
  // The update method searches for a ride with _id = rideId then pushes the object being passed by the clinet
  // into the confirmedDrivers field of the ride object
  // Also setrs the confirmedByUser field to true in the object

'rides.add.driver.confirmed' : function (rideId, driverid, distance, Name, First_Name) {
    Rides.update({ _id : rideId.toString()}, {$set : {confirmedByUser : true}, $push: {confirmedDrivers : {driverid : driverid, distance : distance, Name : Name, First_Name : First_Name}}
    })
},

// Test function
'rides.add.driver.test' : function ({}) {
    const ride = Rides.findOne({}, { limit: 1, sort: { createdAt: -1 }})
},

//  Sends mail based on the options field being passed by the client
'sendmail.factuur' : function (options) {

    console.log("Starting sendmail.factuur call now...")

    // Unblocks the meteor thread so that other processes can do their thing while we wait for email to send
    this.unblock();

    // Uses the SSR modules to populate the htmlEmail with the html we wrote in 'html-email.html'
    SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));

    // Email data that will be used to dynamically render the fields in our HTML document
    const emailData = {
        vergoeding : options.vergoeding,
        kostenUur : options.kostenUur,
        total : options.total,
        createdDate : "9/03/2018",
        dueDate : "9/04/2018"
    }


    // Sends email using the Email module with the options field and emailData const
    Email.send({
        to: options.email,
        from: "info@getdriven.com",
        subject: "Factuur GetDriven " + Date(),
        html: SSR.render('htmlEmail', emailData), // Renders the email with the emailData we defined on line 108
      });
      console.log(options.rideId)


      // Updates the rideFinished to true in the ride object to show that the ride has ended 
      Rides.update({ _id : options.rideId}, {$set : { rideFinished : true}
    })

      console.log("Email has been sent!")
      console.log("Ending sendmail.factuur call now...")
}
});
}


