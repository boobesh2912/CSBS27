document.addEventListener('DOMContentLoaded', () => {
    // Lottie Animation
    const animationContainer = document.getElementById('animationContainer');
    if (animationContainer) {
        var animation = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'animations/animation.json'
        });
    }

    // Typing effect
    const words = ['Easy ', 'Fast ', 'Effective ', 'Social '];
    let currentIndex = 0;
    let charIndex = 0;
    let currentWord = '';
    let isDeleting = false;

    function type() {
        if (isDeleting) {
            currentWord = words[currentIndex].substring(0, charIndex--);
        } else {
            currentWord = words[currentIndex].substring(0, charIndex++);
        }

        const animatedText = document.getElementById('animated-text');
        if (animatedText) {
            animatedText.textContent = currentWord;
        }

        if (!isDeleting && charIndex === words[currentIndex].length) {
            isDeleting = true;
            setTimeout(type, 500); // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % words.length;
            setTimeout(type, 200); // Pause before typing next word
        } else {
            setTimeout(type, isDeleting ? 500 : 1000);
        }
    }

    if (document.getElementById('animated-text')) {
        type();
    }

    // Subscribe button
    const subscribeButton = document.getElementById('subscribeButton');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', () => {
            let email = prompt('Enter your email for updates:');
            if (email) {
                alert(`Subscribed with email: ${email}`);
                // Here you can add your logic to handle the subscription, e.g., sending the email to your server
            }
        });
    }

    // Menu button toggle for sidebar
    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = () => sidebar.classList.remove('open');

    if (menuButton && sidebar) {
        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar if clicking outside of it
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
                closeSidebar();
            }
        });

        // Prevent sidebar from closing when clicking inside the sidebar
        sidebar.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    // Popup menu
    const popupOverlay = document.getElementById('popupOverlay');
    const popupMenuButton = document.getElementById('popupMenuButton');

    // Show popup menu
    function showPopupMenu() {
        popupOverlay.style.display = 'flex';
    }

    // Close popup menu
    function closePopupMenu() {
        popupOverlay.style.display = 'none';
    }

    if (popupMenuButton) {
        popupMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showPopupMenu();
        });
    }

    // Close popup when clicking a link inside the popup menu
    const popupMenuLinks = document.querySelectorAll('#popupMenu a');
    popupMenuLinks.forEach(link => {
        link.addEventListener('click', closePopupMenu);
    });

    // Close popup when clicking outside of it
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closePopupMenu();
        }
    });
});
