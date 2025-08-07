// iconPicker.js - Główny moduł pakietu npm

/**
 * Inicjalizuje narzędzie do wyboru ikon na wybranym elemencie.
 * @param {string} selector - Selektor CSS dla elementu, który wywołuje popup.
 * @param {string} iconSource - Początkowe źródło ikon ('fontawesome' lub 'lucide').
 */
export default async function initializeIconPicker(selector, iconSource = 'fontawesome') {
    const targetElement = document.querySelector(selector);
    const popup = document.getElementById("iconPickerPopup");
    const iconList = document.getElementById("iconList");
    const closeButton = document.getElementById("closePopup");
    const selectedIconDisplay = document.getElementById("selectedIconDisplay");
    const sourceSelect = document.getElementById("iconSourceSelect");

    // Mapowanie źródeł ikon na pliki JSON
    const iconSources = {
        'fontawesome': './json/fontawesome-free-all.json',
        'lucide': './json/lucide-icons.json'
    };

    if (!targetElement || !popup || !iconList || !closeButton || !sourceSelect) {
        console.error("Nie znaleziono wszystkich wymaganych elementów HTML.");
        return;
    }

    // Funkcja do ładowania ikon z zewnętrznego pliku JSON
    async function fetchIcons(source) {
        try {
            const url = iconSources[source];
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Błąd HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Nie udało się pobrać ikon:", error);
            return [];
        }
    }
    
    // Wypełnij popup ikonami
    function populateIconList(icons, source) {
        iconList.innerHTML = '';
        icons.forEach(iconClass => {
            const iconElement = document.createElement(source === 'lucide' ? 'div' : 'i');
            if (source === 'fontawesome') {
                iconElement.className = `${iconClass} text-2xl cursor-pointer p-2 rounded-md hover:bg-gray-200`;
            } else { // Lucide
                iconElement.className = `icon-wrapper cursor-pointer p-2 rounded-md hover:bg-gray-200`;
                // Używamy Lucide dynamicznie generowanego SVG
                if (typeof lucide !== 'undefined' && lucide.createIcons) {
                    iconElement.innerHTML = lucide.createIcons({icons: {[iconClass]: lucide.icons[iconClass]}}).lucide[iconClass].outerHTML;
                }
            }
            iconElement.setAttribute("title", iconClass);
            iconList.appendChild(iconElement);
        });
    }

    // Pokaż popup
    function showPopup() {
        popup.classList.add('show');
    }

    // Ukryj popup
    function hidePopup() {
        popup.classList.remove('show');
    }

    // Obsługa kliknięcia na element docelowy
    targetElement.addEventListener("click", showPopup);

    // Obsługa kliknięcia na przycisk zamykania
    closeButton.addEventListener("click", hidePopup);
    
    // Obsługa kliknięcia poza popupem w celu jego zamknięcia
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            hidePopup();
        }
    });

    // Obsługa wyboru ikony
    iconList.addEventListener("click", (event) => {
        const target = event.target.closest('[title]');
        if (target) {
            const selectedIconClass = target.getAttribute('title');
            const currentSource = sourceSelect.value;
            
            // Wstaw klasę do inputu
            targetElement.value = selectedIconClass;
            
            // Wyświetl ikonę obok inputu
            if (currentSource === 'fontawesome') {
                selectedIconDisplay.innerHTML = `<i class="${selectedIconClass}"></i>`;
            } else { // Lucide
                if (typeof lucide !== 'undefined' && lucide.createIcons) {
                    selectedIconDisplay.innerHTML = lucide.createIcons({icons: {[selectedIconClass]: lucide.icons[selectedIconClass]}}).lucide[selectedIconClass].outerHTML;
                }
            }

            // Ukryj popup
            hidePopup();
        }
    });
    
    // Ładowanie ikon i wypełnianie listy przy zmianie źródła
    sourceSelect.addEventListener('change', async (event) => {
        const newSource = event.target.value;
        const icons = await fetchIcons(newSource);
        populateIconList(icons, newSource);
    });

    // Początkowe ładowanie ikon (domyślnie Font Awesome)
    const icons = await fetchIcons(iconSource);
    populateIconList(icons, iconSource);
    
    // Naprawiono: Upewnij się, że biblioteka Lucide jest załadowana przed jej użyciem
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}
