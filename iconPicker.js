import './main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as bootstrap from 'bootstrap';

console.log('IconPicker module loaded!');

export default function initializeIconPicker(selector) {
  console.log('Initializing IconPicker with selector:', selector);

  const targetElement = document.querySelector(selector);
  const popup = document.getElementById('iconPickerPopup');
  const iconList = document.getElementById('iconList');
  const closeButton = document.getElementById('closePopup');
  const selectedIconDisplay = document.getElementById('selectedIconDisplay');

  if (!targetElement || !popup || !iconList || !closeButton || !selectedIconDisplay) {
    console.error('Nie znaleziono wszystkich wymaganych elementów HTML. Sprawdź czy dodałeś okno modal!');
    return;
  }

  const modal = new bootstrap.Modal(popup, {
    keyboard: true,
    backdrop: true
  });

  async function getIcons() {
    try {
      console.log('Attempting to load JSON from: /fontawesome-free-all.json');
      const response = await fetch('fontawesome-free-all.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const faIcons = await response.json();
      console.log('JSON loaded:', faIcons);
      const iconsArray = Array.isArray(faIcons) ? faIcons : Object.values(faIcons);
      console.log('Przetworzone ikony FontAwesome:', iconsArray);
      return iconsArray;
    } catch (error) {
      console.error('Błąd ładowania ikon FontAwesome:', error);
      return [];
    }
  }

  function populateIconList(iconNames) {
    iconList.innerHTML = '';
    console.log('Ikony do wyświetlenia (FontAwesome):', iconNames);
    iconNames.forEach((iconName, index) => {
      const iconElement = document.createElement('div');
      iconElement.className = 'cursor-pointer p-2 rounded-md hover:bg-gray-200';
      iconElement.innerHTML = `<i class="${iconName} text-2xl"></i>`;
      iconElement.setAttribute('title', iconName);
      iconElement.dataset.icon = iconName; // Add data-icon for easier debugging
      console.log(`Dodano ikonę ${index}:`, iconElement.outerHTML);
      iconList.appendChild(iconElement);
    });
  }

  function showPopup() {
    console.log('Opening modal');
    modal.show();
  }

  function hidePopup() {
    console.log('Closing modal');
    modal.hide();
  }

  targetElement.addEventListener('click', async () => {
    const icons = await getIcons();
    populateIconList(icons);
    showPopup();
  });

  closeButton.addEventListener('click', hidePopup);

  popup.addEventListener('click', event => {
    if (event.target === popup) {
      hidePopup();
    }
  });

  iconList.addEventListener('click', event => {
    console.log('Clicked element:', event.target);
    const target = event.target.closest('div[title]');
    if (target) {
      const selectedIconClass = target.getAttribute('title');
      console.log('Selected icon:', selectedIconClass);
      targetElement.value = selectedIconClass;
      selectedIconDisplay.innerHTML = `<i class="${selectedIconClass} text-2xl"></i>`;
      hidePopup();
    } else {
      console.warn('No element with title attribute found for click event');
    }
  });
}