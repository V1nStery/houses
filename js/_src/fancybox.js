// Настройки для отключения карусели
const noGroupOptions = {
  groupAttr: false,   // Отключаем группировку по атрибуту data-fancybox
  groupAll: false     // Запрещаем автоматическую группировку всех элементов
};

// Инициализация галерей с отключенной группировкой
Fancybox.bind("[data-fancybox='small-gallery']", {});
Fancybox.bind("[data-fancybox='type-gallery']", {});
Fancybox.bind("[data-fancybox='slider-gallery']", {});
Fancybox.bind("[data-fancybox='video-gallery']", {});
Fancybox.bind("[data-fancybox='top-video']", noGroupOptions);
Fancybox.bind("[data-fancybox='modal-map']", noGroupOptions);
Fancybox.bind("[data-fancybox='modal-reviews']", noGroupOptions);
Fancybox.bind("[data-fancybox='modal-quiz']", noGroupOptions);
Fancybox.bind("[data-fancybox='modal-callback']", noGroupOptions);
Fancybox.bind("[data-fancybox='phonePopup']", noGroupOptions);





// Обработчик для модального окна выхода
if (document.querySelector("#to-exit")) {
  if (!localStorage.getItem("modalShown")) {
    document.addEventListener("mouseleave", function handleMouseLeave(event) {
      if (event.clientY < 0) {
        Fancybox.show([{ src: "#to-exit", type: "inline" }]);
        localStorage.setItem("modalShown", "true");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    });
  }
}



