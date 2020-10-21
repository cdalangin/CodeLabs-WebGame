function buttonsLoad() {
    //index
    if (window.location.pathname == "/") {
        document.getElementById("enter").style.display = "initial";
        document.getElementById("proceed").style.display = "none";

        document.getElementById("home-text").style.display = "initial";
    }
    // join
    else {
        document.getElementById("leggo").style.display = "none";
        document.getElementById("enterRoom").style.display = "initial";
    }
}

window.onload = buttonsLoad;

// Index
function accept() {
    var playerName

    if (window.location.pathname == "/") {
        var database = firebase.database();
        var playerKey = database.ref().push().key
        document.getElementById("player_name").value = playerName

        if (playerName == "") {
            alert("Seriously, who are you?");
        }

        else {

            var database = firebase.database();
            database.ref("Players/" + playerKey).set({
                name: playerName,
                key: playerKey
            });

            document.getElementById("enter").style.display = "none";
            document.getElementById("proceed").style.display = "initial";
            document.getElementById("home-text").innerHTML = "Welcome, " + playerName + ". Your doom awaits.";

        }
    }

    else {
        console.log(playerName);
        var enteredRoomCode = document.getElementById("roomcode").value;

        if (enteredRoomCode == "") {
            alert("Please enter a room code.")
        }
        else {

            var database = firebase.database()
            // Checks if the roomcode exists in the database
            database.ref().child("Host").orderByChild("room_code").equalTo(enteredRoomCode).once("value", snapshot => {

                //if room code exist, bring them to the room with the corresponding room code
                // What's Missing: Actually making the room
                if (snapshot.exists()) {

                    // Access the name of the event
                    snapshot.forEach(function (childSnapshot) {
                        var event = childSnapshot.val().event_name;
                        console.log(event)

                        document.getElementById("enterRoom").style.display = "none";
                        // document.getElementById("leggo").style.display = "initial";
                        document.getElementById("joinroom").innerHTML = `Welcome to \"${event}\", ${playerName}! <br> The host will let you in soon!`

                    });

                }

                //If not, they gotta try again
                else {
                    alert("That room doesn't exist.. Try again?")
                }
            });

        }
    }
}

/*
Things to fix:
-either be able to access playerName from separate function
- OR access enter function that is within the accept function
-OR find a way that will access the player within database
*/