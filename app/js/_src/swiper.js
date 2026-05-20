document.addEventListener("DOMContentLoaded", function () {
    const swiperTop = new Swiper(
    ".top__swiper.swiper,.rent__swiper.swiper,.about__swiper.swiper,.numbers-top__swiper.swiper, .about-us-desc__swiper.swiper",
    {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 3000,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        },
    );

  // Проверяем, что swiperTop создан и у него есть autoplay
    if (swiperTop && swiperTop.autoplay) {
        const swiperContainers = document.querySelectorAll(
        ".top__swiper.swiper, .rent__swiper.swiper, .about__swiper.swiper, .about-us-desc__swiper.swiper",
        );
        swiperContainers.forEach((container) => {
        if (container) {
            container.addEventListener("mouseenter", () =>
            swiperTop.autoplay.stop(),
            );
            container.addEventListener("mouseleave", () =>
            swiperTop.autoplay.start(),
            );
        }
        });
    } else {
        console.warn(
        "SwiperTop не инициализирован или autoplay недоступен. Проверьте селекторы.",
        );
    }

  // Остальные инициализации Swiper...
    const swiperHouses = new Swiper(".houses__swiper.swiper", {
        slidesPerView: 3,
        spaceBetween: 21,
        speed: 1000,
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
        breakpoints: {
        991: {
            spaceBetween: 21,
        },
        320: {
            spaceBetween: 10,
        },
        },
    });

    const swiperMd = new Swiper(
        ".md-swiper.swiper,.infrastructure__swiper.md-swiper.swiper,.reviews__swiper.md-swiper.swiper,.services-swiper__swiper.md-swiper.swiper,.services-houses__swiper.md-swiper.swiper",
        {
        slidesPerView: "auto",
        speed: 1000,
        spaceBetween: 20,
        navigation: {
            nextEl:
            ".infrastructure__swiper-button-next,.reviews__swiper-button-next,.services-swiper__swiper-button-next,.services-houses__swiper-button-next.swiper-button-next",
            prevEl:
            ".infrastructure__swiper-button-prev,.reviews__swiper-button-prev,.services-swiper__swiper-button-prev,.services-houses__swiper-button-prev.swiper-button-prev",
        },
        breakpoints: {
            991: {
            spaceBetween: 20,
            },
            320: {
            spaceBetween: 10,
            loop: true,
            },
        },
        },
    );
});
