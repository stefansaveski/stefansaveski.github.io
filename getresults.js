async function fetchData() {
  try {
    const response = await fetch("../jsons/data.json");
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function displayDataInTable() {
  try {
    const jsonData = await fetchData();

    // Create a table dynamically
    var table = document.createElement("table");
    table.border = "0";

    // Add header row
    var headerRow = table.insertRow();
    ["Input", "Expected", "Got"].forEach((header) => {
      var th = document.createElement("th");
      th.appendChild(document.createTextNode(header));
      headerRow.appendChild(th);
    });

    // Add data rows
    let flag = true;
    // Assuming jsonData is your provided JSON object

    for (const key in jsonData.input) {
      var row = table.insertRow();

      // Display input data with newline
      var testCell = row.insertCell();
      var inputText = jsonData.input[key].replace(/\n/g, "<br>");
      testCell.innerHTML = inputText;

      // Display expected data
      var expectedCell = row.insertCell();
      expectedCell.appendChild(document.createTextNode(jsonData.expected[key]));

      // Display got data
      var gotCell = row.insertCell();
      gotCell.appendChild(document.createTextNode(jsonData.got[key]));

      // Check if "is_same" is true for the current test case
      if (jsonData.is_same[key] === "true") {
        row.style.backgroundColor = "lightgreen";
      } else {
        row.style.backgroundColor = "#FFCCCB";
        flag = false;
      }
    }

    if (flag) {
      var row = table.insertRow();
      var resultCell = row.insertCell();
      resultCell.appendChild(document.createTextNode("Passed all tests!"));
    } else {
      var row = table.insertRow();
      var resultCell = row.insertCell();
      resultCell.appendChild(document.createTextNode("Try again."));
    }
    document.body.appendChild(table);
  } catch (error) {
    console.error("Error in displayDataInTable:", error);
  }
}
