angular.module('socially').directive('partiesList', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/parties/parties-list/parties-list.html',
    controllerAs: 'partiesList',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);

      this.newParty = {};
      this.perPage = 3;
      this.page = 1;
      this.sort = {
        name: 1
      };
      this.orderProperty = '1';
      this.searchText = '';

      this.helpers({
        parties: function() {
          return Parties.find({}, { sort : this.getReactively('sort') });
        },
        partiesCount: function() {
          return Counts.get('numberOfParties');
        }
      });

      this.subscribe('parties', function() {
        return [
          {
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
          },
          this.getReactively('searchText')
        ]
      });

      this.addParty = function() {
        this.newParty.owner = Meteor.user()._id;
        Parties.insert(this.newParty);
        this.newParty = {};
      };

      this.removeParty = function(party) {
        Parties.remove({_id: party._id});
      };

      this.pageChanged = function(newPage) {
        this.page = newPage;
      };

      this.updateSort = function() {
        this.sort = {
          name: parseInt(this.orderProperty)
        }
      };
    }
  }
});