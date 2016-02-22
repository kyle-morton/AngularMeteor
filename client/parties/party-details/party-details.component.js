angular.module('socially').directive('partyDetails', function() {
		return {
			restrict: 'E',
			templateUrl: 'client/parties/party-details/party-details.html', //abs path
			controllerAs: 'partyDetails',
			controller: function ($scope, $stateParams, $reactive) {
				$reactive(this).attach($scope);
				
				this.subscribe('parties');
				this.subscribe('users');
				
				this.helpers({
					party: function(){
						var newParty = Parties.findOne({_id: $stateParams.partyId});
						// console.log("Party: " + JSON.stringify(newParty));
						return newParty;
					}, 
					users: function(){
						return Meteor.users.find({});
					}			
				});
				
				this.save = function(){
					//update party where id == partyId
					Parties.update({_id: $stateParams.partyId}, {
						$set: {
							name: this.party.name,
							description: this.party.description,
							'public' : this.party.public
						}
					}, function(err, result){
						if (err) 
							console.log('Oops, unable to update the party...');
						else
							console.log("Done!");
					
					});
				};
			}
		}
	});