async function saveToJson() {
    // Get the textarea element by its ID
    var textarea = document.getElementById("exampleFormControlTextarea1");

    // Get the content of the textarea
    var textareaContent = textarea.value;

    // Replace newlines with \n
    var jsonData = {
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