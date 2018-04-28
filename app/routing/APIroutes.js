

var friends = require('../data/friends.js');


// ===============================================================================
// ROUTES
// ===============================================================================

module.exports = function(app){

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	app.post('/api/friends', function(req, res){

		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		// Survey POST parsing
		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

		// Calculating difference between available matches and current user
		var totalDifference = 0;

		// Looping thru possible matches
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// Looping thru scores
			for (var j=0; j< friends[i].scores[j]; j++){

				//Getting absolute value of scores vs difference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// Comparing sum of differences to achieve bestMatch
				if (totalDifference <= bestMatch.friendDifference){

					// Reset  
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		//saving current user to database
		friends.push(userData);

		res.json(bestMatch);

	});

}
