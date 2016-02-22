//only returns the email and profile fields of ALL users
Meteor.publish('users', function(){
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});