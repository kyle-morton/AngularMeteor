
//publish collection so client side my subscribe
Meteor.publish("parties", function (options, searchString) {
  
   console.log("Options/SearchString: " + options + " " + searchString);
  
   if (!searchString || searchString == null) {
     searchString = '';
   }
  
   var selector = {
    name: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $or: [
      {
        $and: [
          {"public": true},
          {"public": {$exists: true}}
        ]
      },
      {
        $and: [
          {owner: this.userId},
          {owner: {$exists: true}}
        ]
      }
    ]
  };
  
  Counts.publish(this, 'numberOfParties', Parties.find(selector), {noReady: true});
  return Parties.find(selector, options);
  
});