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