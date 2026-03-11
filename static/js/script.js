console.log("Javascript virker!");

const canvas = document.getElementById("pdf-render");

if (canvas) {
    const url = "/static/files/cv.pdf";
    const ctx = canvas.getContext("2d");

    const pdfjsLib = window["pdfjs-dist/build/pdf"];
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    pdfjsLib.getDocument(url).promise.then(function (pdf) {
        pdf.getPage(1).then(function (page) {
            const viewport = page.getViewport({ scale: 1.5 });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            page.render(renderContext);
        });
    }).catch(function (error) {
        console.error("Fejl ved loading af PDF:", error);
    });
}

const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");

if (track && dotsContainer) {
    let images = Array.from(track.querySelectorAll("img"));

    images.forEach(img => {
        const clone = img.cloneNode(true);
        track.appendChild(clone);
    });

    images = Array.from(track.querySelectorAll("img"));

    const imagesPerSlide = 3;
    const totalSlides = Math.ceil((images.length / 2) / imagesPerSlide);
    let currentSlide = 0;

    function updateCarousel() {
        const slideWidth = track.parentElement.offsetWidth;
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

        document.querySelectorAll(".carousel-dots .dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            currentSlide = i;
            updateCarousel();
        });

        dotsContainer.appendChild(dot);
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
}

document.addEventListener("DOMContentLoaded", function () {
    const faders = document.querySelectorAll(".fade-in");

    const appearOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.3
    });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});