class LazyYandexMap {
    constructor() {
        // ВЫНОСИМ ДАННЫЕ В ПЕРЕМЕННЫЕ ДЛЯ ЛЕГКОГО ИЗМЕНЕНИЯ
        this.locationData = {
            coords: [60.068588, 30.289494], // Координаты [широта, долгота]
            name: "Smart System ★ 5,0",     // Название компании
            rating: "5,0",                  // Рейтинг
            workingHours: "До 20.00",       // График работы
            address: "г. Санкт-Петербург, ул. Примерная, д. 123" // Полный адрес (для будущего использования)
        };
        
        this.mapContainer = document.getElementById('yandex-map');
        this.mapSection = document.getElementById('map-section');
        this.map = null;
        this.isLoaded = false;
        this.isReady = false;
        this.observer = null;
        
        this.init();
    }

    init() {
        this.disableMapScroll();
        this.setupIntersectionObserver();
    }

    disableMapScroll() {
        if (this.mapContainer) {
            this.mapContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
            }, { passive: false });

            this.mapContainer.addEventListener('touchmove', (e) => {
                if (e.target === this.mapContainer) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    }

    setupIntersectionObserver() {
        if (!this.mapSection) return;

        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoaded) {
                    this.loadMap();
                    this.observer.unobserve(this.mapSection);
                }
            });
        }, options);

        this.observer.observe(this.mapSection);
    }

    loadMap() {
        if (this.isLoaded) return;

        const placeholder = this.mapContainer.querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }

        if (!window.ymaps) {
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=default-sg-enplmreflrc8s0sj9lc1&lang=ru_RU';
            script.onload = () => {
                ymaps.ready(() => this.initMap());
            };
            document.head.appendChild(script);
        } else {
            ymaps.ready(() => this.initMap());
        }

        this.isLoaded = true;
    }

    initMap() {
        try {
            const officeCoords = this.locationData.coords;
            const isSmallScreen = window.innerWidth < 768;
            const mapCenterCoords = isSmallScreen 
                ? [officeCoords[0], officeCoords[1] + 0.0011]
                : [officeCoords[0], officeCoords[1] + 0.0021];

            this.map = new ymaps.Map(this.mapContainer, {
                center: mapCenterCoords,
                zoom: 17.5,
                controls: ['zoomControl'],
                behaviors: ['disable("scrollZoom")']
            });

            const markerLayout = this.createMarkerLayout();
            
            this.placemark = new ymaps.Placemark(officeCoords, {
                balloonContent: this.locationData.address // Используем адрес из переменной
            }, {
                iconLayout: markerLayout,
                iconOffset: [-25, -60],
            });

            this.map.geoObjects.add(this.placemark);
            this.map.controls.add('trafficControl');

            this.isReady = true;
            console.log('Яндекс.Карта успешно загружена с адресом:', this.locationData.name);

        } catch (error) {
            console.error('Ошибка при инициализации карты:', error);
        }
    }

    createMarkerLayout() {
        // Используем данные из переменной locationData
        return ymaps.templateLayoutFactory.createClass(
            '<div class="custom-marker">' +
                '<div class="marker-icon-wrapper">' +
                    '<div class="marker-circle">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="white">' +
                            '<path d="M18.58 5H15V3H9v2H5.43L3 12v9h3v-2h12v2h3v-9l-2.42-7zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>' +
                            '<circle cx="7.5" cy="14.5" r="1.5"/>' +
                            '<circle cx="16.5" cy="14.5" r="1.5"/>' +
                        '</svg>' +
                    '</div>' +
                    '<div class="marker-tail"></div>' +
                '</div>' +
                '<div class="marker-address-text">' +
                    '<div class="company-name">' + this.locationData.name + '</div>' +
                    '<div class="working-hours">' + this.locationData.workingHours + '</div>' +
                '</div>' +
            '</div>'
        );
    }

    /**
     * ОСНОВНОЙ МЕТОД ДЛЯ ИЗМЕНЕНИЯ ДАННЫХ КАРТЫ
     * Можно менять координаты, название, график работы
     */
    updateLocation(newData) {
        if (!this.isReady) {
            console.warn('Карта еще не загружена. Данные будут применены после загрузки.');
            Object.assign(this.locationData, newData);
            return;
        }

        try {
            // Обновляем внутренние данные
            Object.assign(this.locationData, newData);
            
            // Если менялись координаты - обновляем карту и маркер
            if (newData.coords) {
                this.map.setCenter(newData.coords);
                this.placemark.geometry.setCoordinates(newData.coords);
            }
            
            // Если менялись текстовые данные - пересоздаем маркер с новым layout
            if (newData.name || newData.workingHours) {
                this.map.geoObjects.remove(this.placemark);
                
                const newMarkerLayout = this.createMarkerLayout();
                this.placemark = new ymaps.Placemark(
                    this.locationData.coords, 
                    {
                        balloonContent: this.locationData.address
                    }, 
                    {
                        iconLayout: newMarkerLayout,
                        iconOffset: [-25, -60],
                    }
                );
                
                this.map.geoObjects.add(this.placemark);
            }
            
            console.log('Данные карты обновлены:', this.locationData);
            
        } catch (error) {
            console.error('Ошибка при обновлении данных карты:', error);
        }
    }

    /**
     * Удобные методы для отдельных изменений
     */
    updateCoords(newCoords) {
        this.updateLocation({ coords: newCoords });
    }
    
    updateName(newName) {
        this.updateLocation({ name: newName });
    }
    
    updateWorkingHours(newHours) {
        this.updateLocation({ workingHours: newHours });
    }

    destroy() {
        if (this.map) {
            this.map.destroy();
            this.map = null;
        }
        if (this.observer) {
            this.observer.disconnect();
        }
        this.isLoaded = false;
        this.isReady = false;
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.lazyMap = new LazyYandexMap();
});