document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Animate timeline items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Toggle expand/collapse on year-label click
    const yearLabels = document.querySelectorAll('.year-label');
    yearLabels.forEach(label => {
        label.addEventListener('click', () => {
            const section = label.closest('.year-section');
            section.classList.toggle('active');
            label.classList.toggle('active');
        });
    });

    // Manual slideshow + swipe
    const containers = document.querySelectorAll('.image-container');
    containers.forEach(container => {
        const img = container.querySelector('img');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        const imagePaths = JSON.parse(container.dataset.images || '[]');
        if (!imagePaths.length || !img) return;

        let index = 0;

        function showImage(newIndex) {
            img.classList.add('fade-out');
            setTimeout(() => {
                index = (newIndex + imagePaths.length) % imagePaths.length;
                img.src = imagePaths[index];
                img.classList.remove('fade-out');
            }, 300);
        }

        // Buttons
        if (prevBtn) prevBtn.addEventListener('click', () => showImage(index - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showImage(index + 1));

        // --- Swipe support ---
        let startX = 0;
        let endX = 0;

        img.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });

        img.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            let diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swiped left → NEXT image
                    showImage(index + 1);
                } else {
                    // Swiped right → PREV image
                    showImage(index - 1);
                }
            }
        });
        // ----------------------
    });
});
