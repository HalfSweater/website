document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 50) {
                section.classList.add("show");
            }
        });
    }

    revealSections();
    window.addEventListener("scroll", revealSections);

    // Function to fetch the visitor's IP info (country and flag)
    function fetchVisitorInfo() {
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=50b6f7439ac94f92aea70d107f24e9c9')
            .then(response => response.json())
            .then(data => {
                const visitorList = document.getElementById("visitor-list");
                const country = data.country;
                const countryCode = data.countryCode.toLowerCase(); // For flag
                const ip = data.ip; // Corrected key for IP

                // Create the HTML content for the visitor
                const visitorInfo = `
                    <div class="visitor">
                        <p><strong>IP Address:</strong> ${ip}</p>
                        <p><strong>Country:</strong> ${country}</p>
                        <img src="https://flagcdn.com/16x12/${countryCode}.png" alt="${country} flag" />
                    </div>
                `;

                // Append to the visitor list
                visitorList.innerHTML = visitorInfo;
            })
            .catch(error => console.error('Error fetching visitor data:', error));
    }

    // Call the function when the page loads
    fetchVisitorInfo();

    // Click (left & right) redirection for season cards
    const seasonCards = document.querySelectorAll(".season-card");

    seasonCards.forEach((card) => {
        const seasonLinks = {
            "spring": "spring.html",
            "summer": "summer.html",
            "autumn": "autumn.html",
            "winter": "winter.html",
            "monsoon": "monsoon.html",
            "migratory-birds": "migratory-birds.html",
        };

        function redirectToSeasonPage(event) {
            event.preventDefault(); // Prevent default action
            for (let season in seasonLinks) {
                if (card.classList.contains(season)) {
                    window.location.href = seasonLinks[season];
                    break;
                }
            }
        }

        // Left-click event
        card.addEventListener("click", redirectToSeasonPage);

        // Right-click event
        card.addEventListener("contextmenu", redirectToSeasonPage);
    });
});
