/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Rides } from '../../api/rides/rides';


/**
 * Sets the enviornment variable of Mail_Url so that the meteor mail module knows where to look for the
 * SMTP server and how to redirect emails. We are currently using a mailgun
 */
Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://postmaster@sandboxa0cfaf6dcd374569841b2be96b8b4961.mailgun.org:a133541ffdf8edceb51843e372b5425f-e89319ab-0e77013b@smtp.mailgun.org:2525/'
});