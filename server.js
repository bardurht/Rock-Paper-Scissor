var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {"extended":false} ) );

// Create some players for testing
var jPlayerOne = {"nickname":"a","choice":""};
var jPlayerTwo = {"nickname":"b","choice":""};

app.get( "/game", function( req,res ){
	res.sendFile(__dirname+"/game.html");
});

app.get( "/match/:nickname/:choice" , function( req , res ){
	
	var sNickname = req.params.nickname;
	var sChoice = req.params.choice;
	
	console.log( sNickname , sChoice );
	
	if( sNickname == "a" ){
		jPlayerOne.choice =  sChoice;
	}else{
		jPlayerTwo.choice =  sChoice;
	}
	res.json({"response":"ok"});
});

app.get( "/result/:nickname" , function( req , res ){
	var sNickname = req.params.nickname;

	// WAITING
	if( jPlayerOne.choice == "" || jPlayerTwo.choice == "" ){
		res.json({"status":"wait"});
	}
	// EVEN
	if( jPlayerOne.choice == jPlayerTwo.choice  ){		
		res.json( {"status":"even"} );
	}
	// WINNER
	if( jPlayerOne.choice == "rock" && jPlayerTwo.choice == "scissor" ){
		res.json( {"status":"winner","nickname":jPlayerOne.nickname} );
	}
});

app.listen(4200, function(){
	console.log("SERVER RUNNING");
});
