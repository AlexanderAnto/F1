// ApiCOntroler.js

const { text } = require("express");

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del formulario
  
    let messageContainer = document.getElementById('form-message');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'form-message';
        messageContainer.style.marginTop = '15px';
        messageContainer.style.padding = '10px';
        messageContainer.style.borderRadius = '5px';
        form.insertAdjacentElement('afterend', messageContainer);
    }

    // --- Clave para localStorage ---
    const STORAGE_KEY = 'usuarios_registrados';

    // --- Cargar países desde API ---
    async function loadCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
            if (!response.ok) throw new Error('Error al cargar países');
            const countries = await response.json();
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                countriesSelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            messageContainer.textContent = 'No se pudieron cargar los países. Recarga la página.';
            messageContainer.style.backgroundColor = '#f8d7da';
            messageContainer.style.color = '#721c24';
        }
    }
});
