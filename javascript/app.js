// Initialize Firebase
var config = {
    apiKey: "AIzaSyDIb8JhVzacUX5EnZi0ymddTL3df3BPZwk",
    authDomain: "train-scheduler-c4f09.firebaseapp.com",
    databaseURL: "https://train-scheduler-c4f09.firebaseio.com",
    projectId: "train-scheduler-c4f09",
    storageBucket: "train-scheduler-c4f09.appspot.com",
    messagingSenderId: "96194083221"
  };
  firebase.initializeApp(config); 
  var database=firebase.database();
  $("#submit-button").on("click",function(){
    event.preventDefault();
    // Get the input values
    var TrainName=$("#train-name").val().trim();
    var Destination=$("#destination").val().trim();
    var FirstTrainName=$("#first-train-name").val().trim();
    var Frequency=$("#frequecy").val().trim();
    database.ref().push({
    TrainName:TrainName,
    Destination:Destination,
    FirstTrainName:FirstTrainName,
    Frequency:Frequency
    });
    $(".form-control").empty();
})