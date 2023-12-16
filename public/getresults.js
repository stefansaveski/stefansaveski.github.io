async function fetchData() {
  try {
    const response = await fetch("../../results/data.json");
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
    table.style.borderCollapse = "collapse"; // Add this line to collapse borders
    var location = document.getElementById("results");
    // Add header row
    var headerRow = table.insertRow();
    ["Input", "Expected", "Got"].forEach((header) => {
      var th = document.createElement("th");
      th.appendChild(document.createTextNode(header));
      th.style.border = "1px solid black"; // Add this line to set border
      headerRow.appendChild(th);
    });

    // Add data rows
    let flag = true;
    // Assuming jsonData is your provided JSON object

    for (const key in jsonData.input) {
      var row = table.insertRow();
      row.style.border = "1px solid black"; // Add this line to set border

      // Display input data with newline
      var testCell = row.insertCell();
      testCell.style.border = "1px solid black"; // Add this line to set border
      var inputText = jsonData.input[key].replace(/\n/g, "<br>");
      testCell.innerHTML = inputText;

      // Display expected data
      var expectedCell = row.insertCell();
      expectedCell.style.border = "1px solid black"; // Add this line to set border
      var expectedText = jsonData.expected[key].replace(/\n/g, "<br>");
      expectedCell.innerHTML = expectedText;

      // Display got data
      var gotCell = row.insertCell();
      gotCell.style.border = "1px solid black"; // Add this line to set border
      var gotText = jsonData.got[key].replace(/\n/g, "<br>");
      gotCell.innerHTML = gotText;

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
      resultCell.colSpan = 3; // Set the column span to cover all columns
      resultCell.style.border = "1px solid black"; // Add this line to set border
      resultCell.appendChild(document.createTextNode("Passed all tests!"));
    } else {
      var row = table.insertRow();
      var resultCell = row.insertCell();
      resultCell.colSpan = 3; // Set the column span to cover all columns
      resultCell.style.border = "1px solid black"; // Add this line to set border
      resultCell.appendChild(document.createTextNode("Try again."));
    }
    location.appendChild(table);
  } catch (error) {
    console.error("Error in displayDataInTable:", error);
  }
}
