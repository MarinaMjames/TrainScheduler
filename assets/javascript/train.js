// Will console log ready to show that the js file has been linked properly to html file
$( document ).ready(function() {
    console.log( "ready!" );
});

   // Initialize Firebase
  var config = {
      apiKey: "AIzaSyBvxJWvKWo3aqvMMND4O83PbhVH5La0BP4",
    authDomain: "train-schedule-96108.firebaseapp.com",
    databaseURL: "https://train-schedule-96108.firebaseio.com",
    projectId: "train-schedule-96108",
    storageBucket: "train-schedule-96108.appspot.com",
    messagingSenderId: "789111280326"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database

    // Initial Values
    var name = "";
    var destination = "";
    var time = "";
    var frequency = "";

    var database = firebase.database();
// Capture Button Click
  $("#submitBtn").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

      name = $("#trainNameInput").val().trim();
      destination = $("#destinationInput").val().trim();
      time = $("#trainTimeInput").val().trim();
      frequency = $("#frequencyInput").val().trim();

      database.ref().push({
        "name": name,
        "destination": destination,
        "time": time,
        "frequency": frequency
      });
    });
        // Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snap){

    var sv = snap.val()
    var svKeys = Object.keys(sv);
    var objLen = svKeys.length - 1;

    $("#dataTable").empty();

    svKeys.forEach(function(lineItem){
      console.log(sv[lineItem].name, sv[lineItem].destination, sv[lineItem].time, sv[lineItem].frequency)
      addRow(sv[lineItem].name, sv[lineItem].destination, sv[lineItem].time, sv[lineItem].frequency);
    })

  })

  function addRow (tnme, dst, ttme, frqy){

    $('#dataTable').append(  
      '<tr>' + 
        '<td>' + tnme + '</td>' +                
        '<td>' + dst + '</td>' +                 
        '<td>' + ttme + '</td>' +                    
        '<td>' + frqy + '</td>' +               
      '</tr>')
    };