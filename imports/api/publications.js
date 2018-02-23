import { Meteor } from 'meteor/meteor';
import { Rides } from '../rides';

Meteor.publish('Rides', function getRides() {
  return Rides.find({});
  //return Rides.find({ userId: this.userId }, { limit: 300, sort: { createdAt: -1 } });
});