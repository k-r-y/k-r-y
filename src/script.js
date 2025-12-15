
// Gallery Data Source (Simulating a folder)
// You can add as many images as you want here.
const galleryImages = [
    'assets/images/pfp.jpg',
    'assets/images/pic.jpg'
];

const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('#lightbox span');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentIndex = 0;

// Render Gallery Grid (Max 6)
if (galleryGrid) {
    const maxVisible = 6;
    const visibleImages = galleryImages.slice(0, maxVisible);

    visibleImages.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'aspect-square rounded-md overflow-hidden border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity max-w-[10rem]';

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Gallery Image ${index + 1}`;
        img.className = 'w-full h-full object-cover';

        // Open lightbox on click
        div.addEventListener('click', () => {
            openLightbox(index);
        });

        div.appendChild(img);
        galleryGrid.appendChild(div);
    });
}

// Lightbox Logic
const openLightbox = (index) => {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.remove('hidden');
    // Small timeout for fade-in effect
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightboxImg.classList.remove('scale-95');
        lightboxImg.classList.add('scale-100');
    }, 10);
};

const updateLightboxImage = () => {
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    lightboxImg.src = galleryImages[currentIndex];
};

const closeLightbox = () => {
    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }, 300);
};

// Event Listeners for Lightbox
if (lightbox) {
    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex--;
        updateLightboxImage();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex++;
        updateLightboxImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentIndex--;
            updateLightboxImage();
        }
        if (e.key === 'ArrowRight') {
            currentIndex++;
            updateLightboxImage();
        }
    });
}
