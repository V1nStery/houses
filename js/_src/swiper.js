document.addEventListener('DOMContentLoaded', () => {
    // Старый слайдер - используем более специфичный селектор
    if (document.querySelector('.main-swiper-container .swiper')) {
        new Swiper('.main-swiper-container .swiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 5
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'creative',
            creativeEffect: {
                prev: {
                    translate: ['-120%', 0, -500],
                    opacity: 0
                },
                next: {
                    translate: ['120%', 0, -500],
                    opacity: 0
                },
            },
            speed: 800,
            breakpoints: {
                768: {
                    spaceBetween: 30,
                },
                1200: {
                    spaceBetween: 40,
                }
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            on: {
                init: function() {
                    this.update();
                    this.slides.forEach(slide => {
                        slide.style.width = '';
                    });
                },
                resize: function() {
                    this.update();
                    this.slides.forEach(slide => {
                        slide.style.width = '';
                    });
                }
            }
        });
    }

    // Новый слайдер отзывов - используем уникальный контейнер
    const reviewsSwiperElement = document.querySelector('.reviews-swiper-custom');
    
    if (reviewsSwiperElement) {
        const reviewsSwiper = new Swiper('.reviews-swiper-custom', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.reviews-pagination-custom',
                clickable: true,
            },
            navigation: {
                nextEl: '.reviews-button-next-custom',
                prevEl: '.reviews-button-prev-custom',
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                }
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true
        });
    }
});