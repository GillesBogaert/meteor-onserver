import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Rides = new Mongo.Collection('rides');

const Schemas = {};

Schemas.RidesSchema = new SimpleSchema({
  Naam: {
    type: String,
    index: true
  },
  userId: {
    type: String,
    index: true
  },
  rideFinished : {
    type: Boolean,
    index: true,
  },
  confirmedByUser : {
    type: Boolean,
    index: true, 
  },
  drivers : {
    type : Array,
    label : 'The resources for drivers'
  },
  'drivers.$' : {
    type : Object,
    blackbox: true
  },
  'drivers.$.driverid' : {
    type : String  
  },
  'drivers.$.distance' : {
    type : String,
  },
  'drivers.$.First_Name' : {
    type : String,
  },
  'drivers.$.Name' : {
    type : String,
  },
  confirmedDrivers : {
    type : Array,
    blackbox: true
  },
  'confirmedDrivers.$' : {
    type : Object,
    blackbox: true
  },
  'confirmedDrivers.$.driverid' : {
    type : String  
  },
  'confirmedDrivers.$.distance' : {
    type : String,
  },
  'confirmedDrivers.$.First_Name' : {
    type : String,
  },
  'confirmedDrivers.$.Name' : {
    type : String,
  },
  Date : {
    type : String,
    index : true
  },
  Street : {
    type : String,
    index: true
  },
  Nr : {
    type : String,
    index: true
  },
  Postal_Code: {
    type: String,
    index: true
  },
  City : {
    type: String,
    index: true
  },
  Time: {
    type: String,
    index: true
  },
  Catagory : {
    type: String,
    index: true
  },
  RequiredDrivers : {
    type : String,
    index: true,
  },
  Des_street : {
    type : String,
    index: true,
    optional : true,
  },
  Des_nr : {
    type : String,
    index: true,
    optional : true,
  },
  Des_Postal_Code : {
    type : String,
    index: true,
    optional : true,
  },
  Des_City : {
    type : String,
    index: true,
    optional : true,
  },
  TypeCar : {
    type : String,
    index: true
  },
  End_Date : {
    type : String,
    index: true
  },
  End_Time : {
    type : String,
    index: true
  },
  user : {
    type : String,
    index : true,
  },
  userobject : {
    type : Object,
    optional: true,
      blackbox: true,
  }
});


var settingsDriver = new SimpleSchema({
  driverid : {
    type : String
  },
  distance : {
    type : String
  }
});

Rides.attachSchema(Schemas.RidesSchema);

Rides.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
