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
    // Initial Values
    var trainname = "";
    var destination = "";
    var traintime = "";
    var frequency = "";
    // variable to reference the database
    var database = firebase.database();
    
// Capture Button Click which submits the input values to the firebase database
$("#submitBtn").on("click", function(event) {
  // stops the default action of the submitBtn from happening
  event.preventDefault();
    // Gets the value from trainname input
    trainname = $("#trainNameInput").val().trim();
    // Gets the value from destination input
    destination = $("#destinationInput").val().trim();
    // Gets the value from traintime input
    traintime = $("#trainTimeInput").val().trim();
    // Gets the value from frequency input
    frequency = $("#frequencyInput").val().trim();

      // pushes this input values to the database
      database.ref().push({
        "trainname": trainname,
        "destination": destination,
        "traintime": traintime,
        "frequency": frequency
      });
});
// gets a snapshot of the values from the firebase database
database.ref().on("value", function(snapshot){
  // stores the snapshot value into snapshotValue variable
  var snapshotValue = snapshot.val();
  // stores all the object keys into snapshotKeys variable
  var snapshotKeys = Object.keys(snapshotValue);
  // stores the length of the objects pushed to the database into objectLength variable
  var objectLength = snapshotKeys.length - 1;
    // empties the table that stores all the input information
    $("#dataTable").empty();
    // gets the object key for each item inputted
    snapshotKeys.forEach(function(lineItem){
      // calls the addRow function to get the snapshot value of each item inputted
      addRow(snapshotValue[lineItem].trainname, snapshotValue[lineItem].destination, snapshotValue[lineItem].traintime, snapshotValue[lineItem].frequency);
    });
});
// addRow function that displays the database information into the dataTable div
function addRow (tnme, dst, traintime, frqy, minTilTrain){
  var timeStamp = moment();
  var trainTimeFormatted = moment(traintime, "HH:mm");
  var frequencyFormatted = moment(frequency, "HH:mm");
  //console.log(timeStamp);
  console.log(trainTimeFormatted);
  console.log(trainTimeFormatted.isValid());

var diffTime = moment().diff(trainTimeFormatted, "minutes");
console.log(diffTime);
var tRemainder= diffTime % frqy; 
console.log(tRemainder);
  // add on a new tr and td into the div with id dataTable when information is submitted
  $('#dataTable').append(  
    // create table row
    '<tr>' + 
      // create table data with train name
      '<td>' + tnme + '</td>' +  
      // create table data with destination              
      '<td>' + dst + '</td>' +       
      // create table data with frequency              
      '<td>' + frqy + '</td>' + 
      // create table data with train time               
      '<td>' + traintime + '</td>' + 
      // create table data with minutes away  
      '<td>' + tRemainder+ '</td>' + 
    // end the table row      
    '</tr>')
};