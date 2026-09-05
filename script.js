/* =========================
   DISABLE IMAGE RIGHT-CLICK
========================= */

document.addEventListener("contextmenu", function (e) {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});

/* =========================
   LIGHTBOX
========================= */

const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentPhotoList = [];
let currentPhotoIndex = 0;

function openLightbox(url, photoList) {
    currentPhotoList = photoList || [url];
    currentPhotoIndex = currentPhotoList.indexOf(url);
    if (currentPhotoIndex === -1) currentPhotoIndex = 0;

    updateLightboxImage();
    lightboxOverlay.classList.add("active");

    // Hide arrows if there's only one photo
    const showArrows = currentPhotoList.length > 1;
    lightboxPrev.style.display = showArrows ? "block" : "none";
    lightboxNext.style.display = showArrows ? "block" : "none";
}

function updateLightboxImage() {
    lightboxImage.src = currentPhotoList[currentPhotoIndex];
}

function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotoList.length;
    updateLightboxImage();
}

function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotoList.length) % currentPhotoList.length;
    updateLightboxImage();
}

function closeLightbox() {
    lightboxOverlay.classList.remove("active");
    lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", showNextPhoto);
lightboxPrev.addEventListener("click", showPrevPhoto);

lightboxOverlay.addEventListener("click", function (e) {
    if (e.target === lightboxOverlay) closeLightbox();
});

// Optional: keyboard arrow key support
document.addEventListener("keydown", function (e) {
    if (!lightboxOverlay.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNextPhoto();
    if (e.key === "ArrowLeft") showPrevPhoto();
    if (e.key === "Escape") closeLightbox();
});

/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});

/* =========================
   LOCATION / GPS
========================= */

const locationBtn = document.getElementById("locationBtn");
const locationResult = document.getElementById("locationResult");

locationBtn.addEventListener("click", function () {

    if (!navigator.geolocation) {
        locationResult.textContent = "Your browser does not support GPS.";
        return;
    }

    locationResult.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            locationResult.innerHTML =
                "Latitude: " + latitude.toFixed(5) +
                "<br>" +
                "Longitude: " + longitude.toFixed(5);
        },

        function (error) {
            console.error("Location error:", error);
            locationResult.textContent =
                "Unable to get your location. Please allow location access.";
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
});