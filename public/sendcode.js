var firstName;
var lastName;
var indexNumber;
function sendData() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    indexNumber = document.getElementById("indexNumber").value;

    var userData = `${firstName}${lastName}`;
    console.log(userData);
}
async function saveToJson() {
    // Get the textarea element by its ID
    var textarea = document.getElementById("exampleFormControlTextarea1");

    // Get the content of the textarea
    var textareaContent = textarea.value;
    console.log("firstName");
    // Replace newlines with \n
    var jsonData = {
        name: "firstName",
        lastName: lastName,
        index: indexNumber,
        input: textareaContent.replace(/\n/g, "\\n")
    };

    // Send the data to the server
    await fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    });

    console.log('Data sent to the server:', jsonData);
}
