/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


/* Close menu when a link is clicked */

const links = document.querySelectorAll(".nav-links a");

links.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

    });

});


/* =========================
   LOCATION
========================= */

const locationBtn = document.getElementById("locationBtn");
const locationResult = document.getElementById("locationResult");

locationBtn.addEventListener("click", function() {

    if (!navigator.geolocation) {

        locationResult.textContent =
            "Your browser does not support GPS.";

        return;

    }

    locationResult.textContent =
        "Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            locationResult.innerHTML =
                "Latitude: " + latitude.toFixed(5) +
                "<br>" +
                "Longitude: " + longitude.toFixed(5);

        },

        function() {

            locationResult.textContent =
                "Unable to get your location. Please allow location access.";

        }

    );

});