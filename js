$(document).ready(function() {

     $("#add-marta").on("click", function() {
     	// YOUR TASK!!!
     	// Code in the logic for storing and retrieving the most recent user.
     	// Dont forget to provide initial data to your Firebase database.
     	name = $('#marta-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-marta-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstMartaTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillMarta = frequency - tRemainder;
          nextMarta = moment().add(minutesTillMarta, "minutes");
          nextMartaFormatted = moment(nextMarta).format("hh:mm");

     	// Code for the push
     	keyHolder = dataRef.push({
     		name: name,
     		destination: destination,
     		firstMartaTime: firstMartaTime, 
     		frequency: frequency,
               nextMartaFormatted: nextMartaFormatted,
               minutesTillMarta: minutesTillMarta
     	});
          // The notes below are for finding the path to the key in the data being pushed, leaving as notes to save for later use.
        $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });
          //id=" + "'" + keyHolder.path.u[0] + "'" + "
     dataRef.on("child_added", function(childSnapshot) {
	// full list of items to the well next arrival formual and Away Formula

		$('.marta-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain +
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove marta' class='remove-marta btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");
//  errors
}, function(errorObject){
	
});

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});



// variables list

var url ="https://xcpproject.firebaseio.com/";
var dataRef = new Firebase(url);
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';

}); // Closes jQuery wrapper