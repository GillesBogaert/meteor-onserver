import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Rides = new Mongo.Collection('rides');

export const RidesSchema = new SimpleSchema({
  Naam: {
    type: String,
    index: true
  },
  Street : {
    type: String, 
    index: true
  },
  Nr : {
    type: String,
    index: true
  },
  Postal_Code : {
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
  Driver : {
    type: String,
    index: true
  },
  Des_Street : {
    type: String,
    index: true
  },
  Catagory : {
    type: String,
    index: true
  },
  TypeCar : {
    type: String,
    index: true
  },
  End_Date : {
  type : String,
  index: true
  },
  End_Time : {
    type : String,
    index : true
  }
});

Rides.attachSchema(RidesSchema);

Rides.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
