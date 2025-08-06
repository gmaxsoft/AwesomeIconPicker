# AwsomeIconPicker
AwsomeIconPicker to lekka, konfigurowalna biblioteka JavaScript do wyboru ikon Font Awesome lub Lucide Icons. Może być łatwo zintegrowana z dowolnym projektem, umożliwiając użytkownikowi wybór ikony za pomocą intuicyjnego interfejsu popup.

# Funkcje
Wybór źródła ikon: Obsługuje Font Awesome oraz Lucide Icons.

Łatwa integracja: Wystarczy dołączyć pliki CSS i JavaScript, a następnie zainicjować picker.

Ładowanie ikon z JSON: Ikony są ładowane z zewnętrznych plików JSON, co ułatwia ich aktualizację i zarządzanie.

Responsywny design: Interfejs popup jest dostosowany do różnych rozmiarów ekranów.

# Instalacja
# Krok 1: Wymagane pliki
Upewnij się, że w katalogu głównym projektu masz następujące pliki:

fa-icons.json (lista klas ikon Font Awesome)

lucide-icons.json (lista nazw ikon Lucide)

iconPicker.js (główny moduł biblioteki)

# Krok 2: Dołączenie do projektu
W pliku index.html Twojego projektu dodaj linki do bibliotek ikon i skryptu iconPicker.js:

<!-- Dołącz biblioteki ikon -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/lucide/dist/lucide.min.js"></script>

<!-- Dołącz swój skrypt iconPicker.js -->
<script type="module" src="iconPicker.js"></script>

# Krok 3: Struktura HTML
Przygotuj strukturę HTML, która będzie używać pickera. Musisz mieć element input (lub inny, który chcesz konfigurować) oraz elementy dla popupu.

<label for="myIconInput">Wybierz ikonę:</label>
<div class="relative">
    <input type="text" id="myIconInput" readonly>
    <span id="selectedIconDisplay"></span>
</div>

<select id="iconSourceSelect">
    <option value="fontawesome">Font Awesome</option>
    <option value="lucide">Lucide Icons</option>
</select>

<div id="iconPickerPopup" class="popup-overlay">
    <div class="popup-content">
        <!-- ... reszta struktury popupu ... -->
    </div>
</div>

# Krok 4: Inicjalizacja
W swoim pliku JavaScript zainicjuj picker po załadowaniu całej strony:

import initializeIconPicker from './iconPicker.js';

window.onload = function() {
    initializeIconPicker("#myIconInput", 'fontawesome');
};

# Użycie z pakietem npm
Jeśli spakujesz swój projekt jako pakiet npm, możesz zainstalować go w dowolnym projekcie, używając polecenia npm install. Pamiętaj, aby również zainstalować zależności:

npm install your-icon-picker
npm install @fortawesome/fontawesome-free lucide-react

Następnie zaimportuj i użyj w swoim kodzie:

import initializeIconPicker from 'your-icon-picker';

initializeIconPicker('#myIconInput');

# Konfiguracja
Funkcja initializeIconPicker przyjmuje następujące parametry:

selector (string, wymagany): Selektor CSS elementu, który będzie wyzwalał popup.

iconSource (string, opcjonalny, domyślnie 'fontawesome'): Początkowe źródło ikon. Wartości: 'fontawesome' lub 'lucide'.