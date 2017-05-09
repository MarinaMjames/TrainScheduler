// Will console log ready to show that the js file has been linked properly to html file
$( document ).ready(function() {
    console.log( "ready!" );
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA3HbF_LrnmFmGY8MJjwAU_y4S5_6QD5fc",
  authDomain: "train-scheduler-e1d2d.firebaseapp.com",
  databaseURL: "https://train-scheduler-e1d2d.firebaseio.com",
  projectId: "train-scheduler-e1d2d",
  storageBucket: "train-scheduler-e1d2d.appspot.com",
  messagingSenderId: "561603915711"
};
  firebase.initializeApp(config);

// Create a variable to reference the database
    var database = firebase.database();
    // Initial Values
    var trainName = "";
    var destination = "";
    var trainTime = "";
    var frequency = "";

// Capture Button Click
  $("#submitBtn").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    console.log("I was clicked!!!!");

      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      trainTime = $("#trainTime").val().trim();
      frequency = $("#frequency").val().trim();

      database.ref().push({
        "TrainName": trainName,
        "Destination": destination,
        "TrainTime": trainTime,
        "Frequency": frequency
      });
    });
        // Firebase watcher + initial loader HINT: .on("value")
 database.ref().on("value", function(snapshot){

    var sv = snapshot.val()
    var svKeys = Object.keys(sv);
    var objLen = svKeys.length - 1;

    $("#empTable").empty();

    svKeys.forEach(function(lineItem){
      console.log(sv[lineItem].trainName, sv[lineItem].destination, sv[lineItem].trainTime, sv[lineItem].frequency);
      addRow(sv[lineItem].trainName, sv[lineItem].destination, sv[lineItem].trainTime, sv[lineItem].frequency);
    });

  });

  function addRow (){


    $('#dataTable').append(  
      '<tr>' + 
        '<td>' + trainName + '</td>' +                
        '<td>' + destination + '</td>' +                 
        '<td>' + trainTime + '</td>' +                    
        '<td> $' + frequency + '</td>' +               
      '</tr>')
    };