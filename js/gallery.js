// Gallery Page JavaScript

// Gallery Images Array for Lightbox
let galleryImages = [];
let currentImageIndex = 0;

// Initialize Gallery
document.addEventListener('DOMContentLoaded', function () {
    initializeGallery();
    initializeFilters();
});

// Initialize gallery images array
function initializeGallery() {
    const photos = document.querySelectorAll('.gallery-photo');
    galleryImages = Array.from(photos).map(photo => ({
        src: photo.querySelector('img').src,
        title: photo.querySelector('.photo-info h4')?.textContent || '',
        category: photo.querySelector('.photo-info span')?.textContent || ''
    }));
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-photo');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });

            // Re-initialize gallery images for lightbox
            setTimeout(() => {
                const visiblePhotos = document.querySelectorAll('.gallery-photo:not(.hidden)');
                galleryImages = Array.from(visiblePhotos).map(photo => ({
                    src: photo.querySelector('img').src,
                    title: photo.querySelector('.photo-info h4')?.textContent || '',
                    category: photo.querySelector('.photo-info span')?.textContent || ''
                }));
            }, 100);
        });
    });
}

// Lightbox functions
function openLightbox(button) {
    const modal = document.getElementById('lightboxModal');
    const photo = button.closest('.gallery-photo');
    const img = photo.querySelector('img');
    const title = photo.querySelector('.photo-info h4')?.textContent || '';
    const category = photo.querySelector('.photo-info span')?.textContent || '';

    // Find current index
    const visiblePhotos = Array.from(document.querySelectorAll('.gallery-photo:not(.hidden)'));
    currentImageIndex = visiblePhotos.indexOf(photo);

    // Update lightbox content
    document.getElementById('lightboxImage').src = img.src;
    document.getElementById('lightboxCaption').innerHTML = `<strong>${title}</strong> - ${category}`;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyboard);
}

function prevImage() {
    const visiblePhotos = document.querySelectorAll('.gallery-photo:not(.hidden)');
    currentImageIndex = (currentImageIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
    updateLightboxImage(visiblePhotos[currentImageIndex]);
}

function nextImage() {
    const visiblePhotos = document.querySelectorAll('.gallery-photo:not(.hidden)');
    currentImageIndex = (currentImageIndex + 1) % visiblePhotos.length;
    updateLightboxImage(visiblePhotos[currentImageIndex]);
}

function updateLightboxImage(photo) {
    const img = photo.querySelector('img');
    const title = photo.querySelector('.photo-info h4')?.textContent || '';
    const category = photo.querySelector('.photo-info span')?.textContent || '';

    const lightboxImg = document.getElementById('lightboxImage');
    lightboxImg.style.opacity = '0';

    setTimeout(() => {
        lightboxImg.src = img.src;
        document.getElementById('lightboxCaption').innerHTML = `<strong>${title}</strong> - ${category}`;
        lightboxImg.style.opacity = '1';
    }, 200);
}

function handleKeyboard(e) {
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
}

// Close lightbox when clicking outside image
document.getElementById('lightboxModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('Gallery Page Loaded Successfully');
