/* eslint-disable no-param-reassign */
import { Accounts } from 'meteor/accounts-base';


/**
 * On creation of a user account sets the user name as the email without the @ sign and everything after it
 * Also sets an extra parameter in the user object; profile
 */

Accounts.onCreateUser(function onCreateUser(options, user) {
  if (!user.username) {
    user.username = user.email.split('@')[0];
  }
  if (options.profile)
  user.profile = options.profile; 
  return user;
});
