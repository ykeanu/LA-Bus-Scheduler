// -------------------- I. VARIABLES + DATABASE--------------------

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDIOUNKqe4Kl5j1E2zGQCW2OOt0qfqUugU",
    authDomain: "bus-scheduler-f4f18.firebaseapp.com",
    databaseURL: "https://bus-scheduler-f4f18.firebaseio.com",
    projectId: "bus-scheduler-f4f18",
    storageBucket: "bus-scheduler-f4f18.appspot.com",
    messagingSenderId: "86167308000"
};
firebase.initializeApp(config);

// Store firebase in a variable
var database = firebase.database();


// -------------------- II. FUNCTIONS -------------------

// Diplays current time
$("#current-time").html(moment().format("hh:mm"));




// -------------------- III. MAIN PROCSS --------------------

// Send data to firebase
$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    // Stores user input
    var busName = $("#bus-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstBus = $("#first-bus-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Convert to an object
    var newBus = {
        busName: busName,
        destination: destination,
        firstBus: firstBus,
        frequency: frequency
    };

    database.ref().push(newBus);

    //TESTING
    console.log(newBus);


    $("#bus-name-input").val("");
    $("#destination-input").val("");
    $("#first-bus-input").val("");
    $("#frequency-input").val("");

    // Since button type is submit, prevent page from refreshing
    return false;

});

database.ref().on("child_added", function(snapshot, key) {
    console.log(snapshot.val());

    var busName = snapshot.val().busName;
    var destination = snapshot.val().destination;
    var firstBus = snapshot.val().firstBus;
    var frequency = snapshot.val().frequency;

    var timeConverted = moment(firstBus, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var differenceTime = moment().diff(moment(timeConverted), "minutes");
    var remainingTime = differenceTime % frequency;
    var minutesRemaining = frequency - remainingTime;
    var nextBus = moment().add(minutesRemaining, "minutes");
    var nextArrival = moment(nextBus).format("hh:mm");

    $("#bus-table > tbody")
        .append("<tr><td>" +
            busName + "</td><td>" +
            destination + "</td><td>" +
            frequency + "</td><td>" +
            nextArrival + "</td><td>" +
            minutesRemaining + "</td></tr>");


    //TESTING
    console.log(timeConverted);

});