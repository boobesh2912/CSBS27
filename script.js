document.addEventListener('DOMContentLoaded', () => {
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
            setTimeout(type, 500); 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % words.length;
            setTimeout(type, 200);
        } else {
            setTimeout(type, isDeleting ? 500 : 1000);
        }
    }

    if (document.getElementById('animated-text')) {
        type();
    }

    const subscribeButton = document.getElementById('subscribeButton');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', () => {
            let email = prompt('Enter your email for updates:');
            if (email) {
                alert(`Subscribed with email: ${email}`);
            }
        });
    }

    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = () => sidebar.classList.remove('open');

    if (menuButton && sidebar) {
        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
                closeSidebar();
            }
        });

        sidebar.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }


    const popupOverlay = document.getElementById('popupOverlay');
    const popupMenuButton = document.getElementById('popupMenuButton');


    function showPopupMenu() {
        popupOverlay.style.display = 'flex';
    }

    function closePopupMenu() {
        popupOverlay.style.display = 'none';
    }

    if (popupMenuButton) {
        popupMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            showPopupMenu();
        });
    }

    const popupMenuLinks = document.querySelectorAll('#popupMenu a');
    popupMenuLinks.forEach(link => {
        link.addEventListener('click', closePopupMenu);
    });

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closePopupMenu();
        }
    });
});
