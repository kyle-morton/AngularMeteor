//This folder runs on both server/client
Parties = new Mongo.Collection("parties");

//defines permissions when doing CRUD on Parties collection
//if true, allow CRUD action
Parties.allow({
	insert: function(userId, party){
		return userId && party.owner === userId;
	},
	update: function (userId, party, fields, modifier){
		return userId && party.owner === userId; 
	},
	remove: function (userId, party){
		return userId && party.owner === userId;
	}
});