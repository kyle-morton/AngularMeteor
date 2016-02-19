//tells meteor -> only run this code on client side
if (Meteor.isClient){
	angular.module('socially', ['angular-meteor']);
}