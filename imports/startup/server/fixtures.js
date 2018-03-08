/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Rides } from '../../api/rides/rides';

/**
 * On the start of the server, the rides collection is checked if it is empty. If not
 * the collection is populated with empty objects
 * 
 */

Meteor.startup(() => {
  console.log("Starting back up...")
  if (Rides.find().count() === 0) {
    console.log("Seeding database...")
    const seed = [
      {
        name : 'This is a test',
        startLocation : {
          street : 'Paul lebrunstraat',
          nr : '37',
          City : 'Leuven',
          Date : new Date(),
        },
        endLocation : {
          street : 'Paul lebrunstraat End',
          nr : '37 End',
          City : 'Leuven End',
          Date : new Date() + 'End',
        }
      }
    ]

    Rides.insert(seed[0])
    console.log("Database has been seeded")
  }
});
