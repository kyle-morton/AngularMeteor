angular.module('socially').directive('partyDetails', function() {
		return {
			restrict: 'E',
			templateUrl: 'client/parties/party-details/party-details.html', //abs path
			controllerAs: 'partyDetails',
			controller: function ($scope, $stateParams, $reactive) {
				$reactive(this).attach($scope);
				
				this.helpers({
					party: function(){
						return Parties.findOne({_id: $stateParams.partyId});
					}				
				});
				
				this.save = function(){
					//update party where id == partyId
					Parties.update({_id: $stateParams.partyId}, {
						$set: {
							name: this.party.name,
							description: this.party.description
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