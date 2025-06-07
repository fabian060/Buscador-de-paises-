// Seleccionar elementos del DOM
const searchInput = document.querySelector('.search-input');
const helpMessage = document.querySelector('.comment-help');
const errorMessage = document.querySelector('.comment-error');
const container = document.querySelector('.container');

// Ocultar mensajes inicialmente
helpMessage.style.display = 'none';
errorMessage.style.display = 'none';

// API base URL
const API_URL = 'https://restcountries.com/v3.1';

// Crear elemento para mostrar resultados
const resultsContainer = document.createElement('div');
resultsContainer.classList.add('results-container');
container.appendChild(resultsContainer);

// Función para buscar países
async function searchCountries(searchTerm) {
    try {

        // Usar la API de búsqueda por nombre
        const response = await fetch(`${API_URL}/name/${searchTerm}`);
        const countries = await response.json();

        // Limpiar mensajes y resultados anteriores
        helpMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        resultsContainer.innerHTML = '';

        // Si hay más de 10 países, mostrar mensaje de ayuda
        if (countries.length > 10) {
            helpMessage.style.display = 'block';
            return;
        }

        // Mostrar lista de países
        countries.forEach(country => {








            const countryElement = document.createElement('div');
            countryElement.classList.add('country-item');
            countryElement.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.common} flag">




                <h2>${country.name.common}</h2>
            `;

            // Agregar evento click para mostrar más detalles
            countryElement.addEventListener('click', () => showCountryDetails(country));
            resultsContainer.appendChild(countryElement);
        });

    } catch (error) {
        // Mostrar mensaje de error si no se encuentra el país
        errorMessage.style.display = 'block';
        resultsContainer.innerHTML = '';
    }
}

// Función para mostrar detalles del país
function showCountryDetails(country) {











    resultsContainer.innerHTML = `
        <div class="country-details">
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <h2>${country.name.common}</h2>









            <p>Capital: ${country.capital}</p>
            <p>Población: ${country.population.toLocaleString()}</p>
            <p>Región: ${country.region}</p>
            <p>Subregión: ${country.subregion}</p>
        </div>
    `;
}

// Evento input para buscar mientras el usuario escribe
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm.length > 0) {
        searchCountries(searchTerm);
    } else {
        resultsContainer.innerHTML = '';
        helpMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
});
