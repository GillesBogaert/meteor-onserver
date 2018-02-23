import { Meteor } from 'meteor/meteor';
import { Rides } from '../rides';

Meteor.publish('Rides', function getRides() {
  //return Rides.find({}, { limit: 300, sort: { createdAt: -1 } });
  return Rides.find({ userId: this.userId }, { limit: 300, sort: { createdAt: -1 } });
});