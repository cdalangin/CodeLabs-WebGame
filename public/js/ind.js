function buttonLoad() {
    // Index
    // document.getElementById("enter").style.display = "initial";

    // document.getElementById("home-text").style.display = "initial";
    // document.getElementById("player_name").style.display = "initial";
    document.getElementById("home").style.display = "initial";
    document.getElementById("question").style.display = "none";

    // Host a Game
    document.getElementById("hostGame").style.display = "none";
    // document.getElementById("generate").style.display = "none";
    // document.getElementById("leggo").style.display = "none";
    // document.getElementById("share").style.display = "none";
}

window.onload = buttonLoad;


function accept() {

    var database = firebase.database();
    var playerKey = database.ref().push().key

    var playerName = document.getElementById("player_name").value;
    if (playerName == "") {
        alert("Seriously, who are you?");
    }

    else {

        // var database = firebase.database();
        // database.ref("Players/" + playerKey).set({
        //     name: playerName,
        //     key: playerKey
        // });

        document.getElementById("enter").style.display = "none";

        document.getElementById("home-text").innerHTML = "Welcome, " + playerName + ". Your doom awaits.";
        document.getElementById("player_name").style.display = "none";

        document.getElementById("question").style.display = "initial";
    }

}

function hosting() {
    // Hide Home stuff and reveal Host stuff
    document.getElementById("home").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("hostGame").style.display = "initial";

    // Hide/Reveal Host stuff
    document.getElementById("generate").style.display = "initial";
    document.getElementById("leggo").style.display = "none";
    document.getElementById("share").style.display = "none";
}

// Host a Game Functions

function room() {
    var eventName = document.getElementById("event").value;
    var numofPlayers = document.getElementById('players').value;
    var duration = document.getElementById('duration').value;

    if (eventName == "" || numofPlayers == null || duration == null) {
        alert("Please fill out the form to proceed.")
    }
    else {

        var database = firebase.database();
        const autoId = database.ref().push().key
        const roomCode = autoId.substr(6, 5)
        const locationCode = Math.floor(Math.random() * 20)

        // database.ref("Host/" + autoId).set({
        //     event_name: eventName,
        //     number_of_players: numofPlayers,
        //     time_limit: duration,
        //     room_code: roomCode,
        //     location_num: locationCode
        // });

        document.getElementById("generate").style.display = "none";
        document.getElementById("share").style.display = "initial";
        document.getElementById("code").innerHTML = `<strong>${roomCode}</strong> <=== Copy that!!`
        document.getElementById("leggo").style.display = "initial";
    }

}
