//
// Selectors
//
const slider = document.querySelector(".slider");
const sliderNavLinks = document.querySelectorAll(".slider-nav a");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

const footer = document.querySelector(".footer");
const footerRadio = document.querySelectorAll(".footer input");

//
// Globals
//
const sliderNavLen = slider.children.length;
currentIndex = 0;

(function activateButtons() {
  leftArrow.addEventListener("click", () => {
    scrollToPrevSlide();
  });

  rightArrow.addEventListener("click", () => {
    scrollToNextSlide();
  });

  footerRadio.forEach((radio) => {
    radio.addEventListener("click", () => {
      scrollToNthSlide(radio.getAttribute("index"));
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }

    // Check if the pressed key is the right arrow (keyCode 39)
    if (event.keyCode === 39) {
      scrollToNextSlide();
    }

    // Check if the pressed key is the left arrow (keyCode 37)
    if (event.keyCode === 37) {
      scrollToPrevSlide();
      console.log("glee");
    }
  });
})();

function scrollToNextSlide() {
  currentIndex = getNextIndex(currentIndex, sliderNavLen);
  const targetSlide = slider.children[currentIndex];

  slider.scroll({ left: targetSlide.offsetLeft, behavior: "smooth" });
  updateRadio(footer.children[currentIndex]);

  // Update active state for navigation links
  sliderNavLinks.forEach((link, index) => {
    link.classList.toggle("active", index === currentIndex);
  });
}

function scrollToNthSlide(n) {
  const targetSlide = slider.children[n];
  slider.scroll({ left: targetSlide.offsetLeft, behavior: "smooth" });

  // Update active state for navigation links
  sliderNavLinks.forEach((link, index) => {
    link.classList.toggle("active", index === n);
  });
}

function scrollToPrevSlide() {
  currentIndex = getPrevIndex(currentIndex, sliderNavLen);
  const targetSlide = slider.children[currentIndex];

  slider.scroll({ left: targetSlide.offsetLeft, behavior: "smooth" });
  updateRadio(footer.children[currentIndex]);

  // Update active state for navigation links
  sliderNavLinks.forEach((link, index) => {
    link.classList.toggle("active", index === currentIndex);
  });
}

function getNextIndex(index, len) {
  currentIndex = (index + 1) % len;
  return currentIndex;
}

function getPrevIndex(index, len) {
  currentIndex = (currentIndex - 1 + sliderNavLen) % sliderNavLen;
  return currentIndex;
}

function updateRadio(radio) {
  radio.checked = true;
}

function autoScroll(fun, time) {
  setInterval(fun, time);
}

// autoScroll(scrollToNextSlide, 2000);
