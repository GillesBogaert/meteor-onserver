import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Rides = new Mongo.Collection('rides');

export const RidesSchema = new SimpleSchema({
  name: {
    type: String,
    index: true
  },
  userId: {
    type: String,
    index: true
  }
});

Rides.attachSchema(RidesSchema);

Rides.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
