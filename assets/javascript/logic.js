// link to Firebase
var transportData = new Firebase("https://trainwreck.firebaseio.com/");

// button for adding a train
$("#addTrainBtn").on("click", function(){

 // grab user input
var trainName = $("#trainNameInput").val().trim();
var trainDest = $("#destinationInput").val().trim();
var trainTime = $("#arrivalInput").val().trim();
var trainFreq = $("#frequencyInput").val().trim();

	// creates local object for ho.ding data
var newTrain = {
	  name:  trainName,
	  destination: trainDest,
	  time: trainTime,
	  frequency: trainFreq
	}

	// pushes data to firebase
	transportData.push(newTrain);

	// console log that!
console.log(newTrain.name);
console.log(newTrain.destination); 
console.log(newTrain.time);
console.log(newTrain.frequency)

	// ALERT
alert("Transport successfully added");
	// clear fields 
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#arrivalInput").val("");
	$("#frequencyInput").val("");

	// prevents refresh
	return false;
});
// 3. adds transport to the database and a row to html when a user adds an entry
transportData.on("child_added", function(childSnapshot, prevChildKey){


// CONSOLE LOG THAT HOE!
	console.log(childSnapshot.val());
// assign everything to variables
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFreq = childSnapshot.val().frequency;

	// console lod that info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainTime);
	console.log(trainFreq);

	// initial time
var firstTimeConverted = moment(trainTime ,"HH:mm").subtract(1, "years");
	console.log(firstTimeConverted);
	
	// current time
var currentTime = moment();
	console.log("Current Time is: " + moment(currentTime).format("HH:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in Time is: " + diffTime);

	// time between
var tRemainder = diffTime % trainFreq; 
	console.log("Time remaining: " + tRemainder);

	// time until train (minutes)
var minAway = trainFreq - tRemainder;
	console.log("Minutes until the Train: " + minAway);

	// next train
var nextTrain = moment().add(minAway, "minutes");
	console.log("Planned Arrival Time: " + moment(nextTrain).format("HH:mm"));

	// push everything to the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + trainTime + "</td><td>" + minAway + "</td><td>");

});