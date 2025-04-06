document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("searchBox");
    const searchButton = document.getElementById("searchButton");
    const resultsContainer = document.getElementById("nic-results"); // Ensure correct ID reference

    // Function to perform API search
    function performSearch() {
        const query = searchBox.value.trim();
        if (query === "") {
            alert("Please enter a search query.");
            return;
        }

        // Show loading message
        resultsContainer.innerHTML = "<p>🔍 Searching...</p>";

        // API request
        fetch("http://127.0.0.1:9040/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query, k: 5 }),
        })
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = ""; // Clear previous results

            if (data.results && data.results.length > 0) {
                // Display formatted results
                data.results.forEach(item => {
                    const resultElement = document.createElement("div");
                    resultElement.classList.add("result-item");
                    resultElement.innerHTML = `
                        <h3>${item["Description"]}</h3>
                        <p><strong>S.No.:</strong> ${item["S.No."]}</p>
                        <p><strong>Class:</strong> ${item["Class"]}</p>
                        <p><strong>Group:</strong> ${item["Group"]}</p>
                        <p><strong>Sub Class:</strong> ${item["Sub Class"]}</p>
                    `;
                    resultsContainer.appendChild(resultElement);
                });
            } else {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            resultsContainer.innerHTML = "<p>❌ There was an error processing your request.</p>";
        });
    }

    // Attach event listeners
    searchButton.addEventListener("click", performSearch); // Ensure this runs API search
    searchBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });
});
