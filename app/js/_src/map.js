// Функция для определения зума в зависимости от ширины
function getZoomByWidth(width) {
  const defaultZoom = 13.45;
  const smallWidthThreshold = 465;
  if (width <= smallWidthThreshold) {
    return defaultZoom - 1; // 12.45
  }
  return defaultZoom;
}

function initMap() {
  if (typeof ymaps === "undefined") return;

  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  const containerWidth = mapContainer.clientWidth;
  const zoom = getZoomByWidth(containerWidth);

  var myMap = new ymaps.Map("map", {
    center: [55.685123, 48.478],
    zoom: zoom,
    controls: ["zoomControl"],
  });

  myMap.behaviors.disable("scrollZoom");

  var myPolygon = new ymaps.Polygon(
    [
      [
        [55.6835, 48.498],
        [55.6845, 48.503],
        [55.682, 48.508],
        [55.678, 48.508],
        [55.6765, 48.505],
        [55.677, 48.498],
        [55.68, 48.496],
      ],
    ],
    {},
    {
      fillColor: "#EEE2D5",
      strokeColor: "#DF9A90",
      opacity: 0.6,
      strokeWidth: 2,
    },
  );

  var myPlacemark = new ymaps.Placemark(
    [55.681123, 48.501147],
    { iconCaption: "село Бритвино" },
    { preset: "islands#redDotIconWithCaption" },
  );

  myMap.geoObjects.add(myPolygon);
  myMap.geoObjects.add(myPlacemark);

  // Опционально: обновлять зум при изменении ширины окна
  let resizeTimeout;
  window.addEventListener("resize", function () {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      const newWidth = mapContainer.clientWidth;
      const newZoom = getZoomByWidth(newWidth);
      if (myMap.getZoom() !== newZoom) {
        myMap.setZoom(newZoom);
      }
    }, 200);
  });
}

// Механизм LazyLoad
const mapElement = document.getElementById("map");
if (mapElement) {
  const mapObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ymaps.ready(initMap);
          mapObserver.unobserve(mapElement);
        }
      });
    },
    { rootMargin: "0px 0px 200px 0px" },
  );
  mapObserver.observe(mapElement);
}
