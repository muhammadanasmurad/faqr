// ============================================
// Foundation Gallery Lightbox Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item-enhanced');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems);
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(currentImageIndex);
        });
    });
    
    // Open lightbox function
    function openLightbox(index) {
        if (index >= 0 && index < images.length) {
            const imageSrc = images[index].querySelector('img').src;
            const imageAlt = images[index].querySelector('img').alt;
            const imageTitle = images[index].querySelector('.gallery-overlay h4')?.textContent || '';
            
            lightboxImage.src = imageSrc;
            lightboxImage.alt = imageAlt;
            lightboxCaption.textContent = imageTitle || imageAlt;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Update navigation buttons visibility
            updateNavigationButtons();
        }
    }
    
    // Close lightbox function
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigate to previous image
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    }
    
    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    }
    
    // Update navigation buttons visibility
    function updateNavigationButtons() {
        if (images.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'flex';
            lightboxNext.style.display = 'flex';
        }
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPreviousImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    // Prevent image drag in lightbox
    lightboxImage.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
});

