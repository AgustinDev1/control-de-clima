document.addEventListener('DOMContentLoaded', () => {
    // Elementos de la interfaz
    const temperatureSpan = document.getElementById('temperature');
    const weatherDetailsSpan = document.getElementById('weatherDetails');
    const weatherButton = document.getElementById('weatherButton');
    const modeButton = document.getElementById('modeButton');
    const body = document.body; // Elemento <body> para cambiar el modo

    // Función para obtener la temperatura y otros detalles utilizando la geolocalización
    const getWeatherDetails = () => {
        // Verificar si el navegador soporta la geolocalización
        if (navigator.geolocation) {
            // Obtener la ubicación del usuario
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // API key de OpenWeather (reemplaza con tu propia clave API)
                const apiKey = '38740c952abe018917271b1d59f34d38';  // Cambia esta clave por la tuya
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

                // Realizar la solicitud a la API de OpenWeather
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        // Verificar si se obtuvo la información del clima
                        if (data.main && data.main.temp && data.name && data.sys) {
                            const temperature = data.main.temp;
                            const humidity = data.main.humidity;
                            const pressure = data.main.pressure;
                            const city = data.name;
                            const country = data.sys.country;
                            const province = data.sys.region || 'No disponible';  // Si hay una región/estado/provincia disponible
                            
                            // Mostrar los datos en la interfaz
                            temperatureSpan.textContent = `Temperatura actual: ${temperature}°C`;
                            weatherDetailsSpan.innerHTML = `
                                <strong>Detalles del clima:</strong><br>
                                Ciudad: ${city}, ${province}, ${country}<br>
                                Temperatura: ${temperature}°C<br>
                                Humedad: ${humidity}%<br>
                                Presión atmosférica: ${pressure} hPa<br>
                            `;
                        } else {
                            weatherDetailsSpan.textContent = 'No se pudo obtener los detalles del clima.';
                        }
                    })
                    .catch(error => {
                        console.error('Error obteniendo los datos del clima', error);
                        weatherDetailsSpan.textContent = 'Hubo un error al obtener los detalles del clima.';
                    });
            }, (error) => {
                console.error('Error obteniendo la ubicación', error);
                weatherDetailsSpan.textContent = 'No se pudo obtener la ubicación.';
            }, { enableHighAccuracy: true });  // Alta precisión para la geolocalización
        } else {
            console.log('La geolocalización no está disponible en este navegador');
            weatherDetailsSpan.textContent = 'Geolocalización no disponible';
        }
    };

    // Cambiar entre Modo Noche y Modo Día
    modeButton.addEventListener('click', () => {
        if (body.classList.contains('day-mode')) {
            body.classList.remove('day-mode');
            body.classList.add('night-mode');
            modeButton.textContent = 'Modo Día';
        } else {
            body.classList.remove('night-mode');
            body.classList.add('day-mode');
            modeButton.textContent = 'Modo Noche';
        }
    });

    // Asociar el evento del botón para obtener los detalles del clima al hacer clic
    weatherButton.addEventListener('click', getWeatherDetails);

    // Llamar a la función para obtener la temperatura al cargar la página
    getWeatherDetails();
});
