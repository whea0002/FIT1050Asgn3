document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".cs-button");
    const galleries = document.querySelectorAll(".cs-gallery");
    const body = document.body;
    let currentGalleryImages = [];
    let currentIndex = 0;

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");

            // Hide all galleries
            galleries.forEach(gallery => {
                gallery.classList.add("cs-hidden");
            });

            // Show only the gallery matching the filter
            const galleryToShow = document.querySelector(`.cs-gallery[data-category="${filter}"]`);
            if (galleryToShow) {
                galleryToShow.classList.remove("cs-hidden");
            }
        });
    });

    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.classList.add('cs-modal');
    const modalImg = document.createElement('img');
    modalImg.classList.add('cs-modal-img');
    const closeModal = document.createElement('span');
    closeModal.classList.add('cs-close-modal');
    closeModal.innerHTML = '&times;';
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('cs-prev');
    prevBtn.innerHTML = '&#10094;';
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('cs-next');
    nextBtn.innerHTML = '&#10095;';

    modal.appendChild(closeModal);
    modal.appendChild(modalImg);
    modal.appendChild(prevBtn);
    modal.appendChild(nextBtn);
    body.appendChild(modal);

    // Function to show modal
    const showModal = (imgSrc, index) => {
        modalImg.src = imgSrc;
        modal.style.display = 'block';
        body.style.overflow = 'hidden';
        currentIndex = index;
    };

    // Function to hide modal
    const hideModal = () => {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
    };

    // Event listener for close button
    closeModal.addEventListener('click', hideModal);

    // Event listener for clicking outside the image
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        showModal(currentGalleryImages[currentIndex].src, currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentGalleryImages.length;
        showModal(currentGalleryImages[currentIndex].src, currentIndex);
    });

    // Add click event to all images
    const images = document.querySelectorAll('.cs-image img');
    images.forEach(image => {
        image.addEventListener('click', function () {
            const gallery = this.closest('.cs-gallery');
            currentGalleryImages = Array.from(gallery.querySelectorAll('img'));
            const index = currentGalleryImages.indexOf(this);
            showModal(this.src, index);
        });
    });
});