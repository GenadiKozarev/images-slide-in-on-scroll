const sliderImages = document.querySelectorAll('.slide-in');

// This function limits the rate at which a given `func` is executed.
const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function () {
        // Define a function that will be called after the `wait` period has passed
        const later = () => {
            // Reset the timeout variable, indicating that `func` can be called again
            timeout = null;
            if (!immediate) func.apply(this, arguments);
        };
        const callNow = immediate && !timeout;
        // Clear any existing timeout to reset the `wait` period
        clearTimeout(timeout);
        // Set a new timeout to call `later` after the `wait` time has elapsed
        timeout = setTimeout(later, wait);
        // console.log(this) // window
        if (callNow) func.apply(this, arguments);
    };
};

const checkSlide = e => {
    sliderImages.forEach(sliderImage => {
        // half way through the image
        const slideInAt =
            window.scrollY + window.innerHeight - sliderImage.height / 2;
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        isHalfShown && isNotScrolledPast
            ? sliderImage.classList.add('active')
            : sliderImage.classList.remove('active');
    });
};

window.addEventListener('scroll', debounce(checkSlide));
