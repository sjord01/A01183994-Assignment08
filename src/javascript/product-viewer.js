document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const popup = document.getElementById('popup');
    const startButton = document.getElementById('btn-start');
    const stopButton = document.getElementById('btn-stop');
    const reverseButton = document.getElementById('btn-revers');
    const closePopupButton = document.getElementById('closePopup');
    const bicycleImage = document.querySelector('#img-main-product img');

    // Animation state variables
    let currentFrame = 1;
    let isAnimating = false;
    let animationId = null;
    let lastFrameTime = 0;
    let isReverse = false;
    let hasStartedAnimation = false;

    // Popup timer
    let popupTimer = setTimeout(() => {
        if (!hasStartedAnimation) showPopup();
    }, 3000);

    // Function to update the bicycle image
    function updateImage() {
        bicycleImage.src = `./src/assets/images/product-images/bike-${currentFrame}.jpg`;
        currentFrame = isReverse ? (currentFrame - 1 || 34) : (currentFrame % 34 + 1);
    }

    // Animation function
    function animate(timestamp) {
        if (!isAnimating) return;
        if (timestamp - lastFrameTime >= 100) {
            updateImage();
            lastFrameTime = timestamp;
        }
        animationId = requestAnimationFrame(animate);
    }

    // Function to start the animation
    function startAnimation() {
        if (!isAnimating) {
            isAnimating = true;
            lastFrameTime = 0;
            animationId = requestAnimationFrame(animate);
        }
    }

    // Function to stop the animation
    function stopAnimation() {
        isAnimating = false;
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    // Function to reverse the animation
    function reverseAnimation() {
        isReverse = !isReverse;
        if (!isAnimating) startAnimation();
    }

    // Function to show the popup
    function showPopup() {
        popup.style.visibility = 'visible';
        popup.style.opacity = '1';
    }

    // Function to hide the popup
    function hidePopup() {
        popup.style.opacity = '0';
        setTimeout(() => popup.style.visibility = 'hidden', 1000);
    }

    // Event listeners
    startButton.addEventListener('click', () => {
        clearTimeout(popupTimer);
        hasStartedAnimation = true;
        startAnimation();
    });
    stopButton.addEventListener('click', stopAnimation);
    reverseButton.addEventListener('click', reverseAnimation);
    closePopupButton.addEventListener('click', hidePopup);
});