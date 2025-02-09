document.addEventListener("DOMContentLoaded", function() {
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
        // Using ip-api for demonstration; you could replace this with another service
        fetch('http://ip-api.com/json/')
            .then(response => response.json())
            .then(data => {
                const visitorList = document.getElementById("visitor-list");
                const country = data.country;
                const countryCode = data.countryCode.toLowerCase(); // For flag
                const ip = data.query; // IP address of the visitor

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
});
