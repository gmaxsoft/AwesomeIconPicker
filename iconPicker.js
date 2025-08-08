import './main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as bootstrap from 'bootstrap';

export default function initializeIconPicker(selector) {

  const targetElement = document.querySelector(selector);
  const popup = document.getElementById('iconPickerPopup');
  const iconList = document.getElementById('iconList');
  const closeButton = document.getElementById('closePopup');
  const selectedIconDisplay = document.getElementById('selectedIconDisplay');

  if (!targetElement || !popup || !iconList || !closeButton || !selectedIconDisplay) {
    console.error('Nie znaleziono wszystkich wymaganych elementów HTML.');
    return;
  }

  const modal = new bootstrap.Modal(popup, {
    keyboard: true,
    backdrop: true
  });

  async function getIcons() {
    try {
      //console.log('Attempting to load JSON');
      const response = await fetch('./json/fontawesome-free-all.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const faIcons = await response.json();
      //console.log('JSON loaded:', faIcons);
      const iconsArray = Array.isArray(faIcons) ? faIcons : Object.values(faIcons);
      //console.log('Przetworzone ikony FontAwesome:', iconsArray);
      return iconsArray;
    } catch (error) {
      console.error('Błąd ładowania ikon FontAwesome:', error);
      return [];
    }
  }

  function populateIconList(iconNames) {
    iconList.innerHTML = '';
    //console.log('Ikony do wyświetlenia (FontAwesome):', iconNames);
    iconNames.forEach(iconName => {
      const iconElement = document.createElement('div');
      iconElement.className = 'cursor-pointer p-2 rounded-md hover:bg-gray-200';
      iconElement.innerHTML = `<i class="${iconName} text-2xl"></i>`;
      iconElement.setAttribute('title', iconName);
      iconList.appendChild(iconElement);
    });
  }

  function showPopup() {
    modal.show();
  }

  function hidePopup() {
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
    const target = event.target.closest('[title]');
    if (target) {
      const selectedIconClass = target.getAttribute('title');
      targetElement.value = selectedIconClass;
      selectedIconDisplay.innerHTML = `<i class="${selectedIconClass} text-2xl"></i>`;
      hidePopup();
    }
  });
}