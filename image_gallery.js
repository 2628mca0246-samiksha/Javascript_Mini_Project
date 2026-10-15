
const places = [
    {
        name: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Hawa Mahal",
        location: "Jaipur, Rajasthan",
        image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Golden Temple",
        location: "Amritsar, Punjab",
        image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Red Fort",
        location: "Delhi",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Gateway of India",
        location: "Mumbai, Maharashtra",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80"
    },
    {
        name: "Kerala Backwaters",
        location: "Kerala",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
    }
];

const mainImage = document.getElementById("mainImage");
const imageTitle = document.getElementById("imageTitle");
const imageLocation = document.getElementById("imageLocation");
const imageCounter = document.getElementById("imageCounter");

const thumbnailContainer =
    document.getElementById("thumbnailContainer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

//  To Display all thumbnails
function createThumbnails() {
    places.forEach(function (place, index) {
        const thumbnail = document.createElement("div");

        thumbnail.className = "thumbnail";

        const img = document.createElement("img");
        img.src = place.image;
        img.alt = place.name;

        const title = document.createElement("p");
        title.textContent = place.name;

        const location = document.createElement("small");
        location.textContent = place.location;

        thumbnail.appendChild(img);
        thumbnail.appendChild(title);
        thumbnail.appendChild(location);

        // Change main image on thumbnail click
        thumbnail.addEventListener("click", function () {
            showImage(index);
        });

        thumbnailContainer.appendChild(thumbnail);
    });
}

// Display selected image
function showImage(index) {
    currentIndex = index;

    const place = places[currentIndex];

    mainImage.src = place.image;
    mainImage.alt = place.name;

    imageTitle.textContent = place.name;
    imageLocation.textContent = place.location;

    imageCounter.textContent =
        (currentIndex + 1) + " / " + places.length;

    // Highlight selected thumbnail
    const thumbnails =
        document.querySelectorAll(".thumbnail");

    thumbnails.forEach(function (thumbnail, i) {
        thumbnail.classList.toggle(
            "active",
            i === currentIndex
        );
    });
}

// Show next image
nextBtn.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= places.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);
});

// Show previous image
prevBtn.addEventListener("click", function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = places.length - 1;
    }

    showImage(currentIndex);
});

// Initialize gallery
createThumbnails();
showImage(0);
