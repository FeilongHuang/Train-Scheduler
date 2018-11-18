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
    var FirstTrainTime=$("#first-train-time").val().trim();
    var Frequency=$("#frequency").val().trim();
    //push to firebase
    database.ref().push({
    TrainName:TrainName,
    Destination:Destination,
    FirstTrainTime:moment(FirstTrainTime, 'HH:mm').format('hh:mm a'),
    FirstTrainTimeUnix:moment(FirstTrainTime,'HH:mm').format('x'),
    Frequency:Frequency,
    });
    //clear input
    $('#form')[0].reset();
});

database.ref().on('child_added', function(snapshot){
    //set variable
    var TrainName=snapshot.val().TrainName;
    var Destination=snapshot.val().Destination;
    var Frequency=parseInt(snapshot.val().Frequency);
    var NextArrival=snapshot.val().FirstTrainTime;
    var FirstTrainTimeUnix=snapshot.val().FirstTrainTimeUnix;
    console.log(FirstTrainTimeUnix);

    var NextTrainTime=moment(FirstTrainTimeUnix,'x');
      var MinutesLeft = NextTrainTime.diff(moment(), 'minutes')
          while(MinutesLeft <= 0) {
              MinutesLeft += Frequency;
              NextTrainTime.add(Frequency, 'minutes');
              NextArrival= NextTrainTime.format('hh:mm a');
          }
      console.log(MinutesLeft)
  //append to table
      var table = $('#timetable');
      var NewTrain = $('<tr>');
      NewTrain.html('<td>' + TrainName + '</td><td>' + Destination + '</td><td>' + Frequency + '</td><td>' + NextArrival + '</td><td>' + MinutesLeft + '</td>');
      table.append(NewTrain);
      while(MinutesLeft <= 0) {
          NextArrival += Frequency;
          NextTrainTime = moment(NextArrival, 'HH:mm').format('x');
          MinutesLeft = moment(NextTrainTime, 'x').diff(moment(), 'minutes');
          table.append(NewTrain);
      }

})