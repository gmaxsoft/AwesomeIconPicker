# FontAwesome Icon Picker

A lightweight and customizable icon picker for selecting FontAwesome icons, built with JavaScript, Bootstrap 5, and Webpack.

## Technologies

- **JavaScript/TypeScript** - Programming language
- **Bootstrap 5** - CSS framework for responsive user interface
- **Webpack** - Module bundling tool
- **FontAwesome** - Icon library
- **Vite** - Application build tool (optional)

## Features

- **FontAwesome Integration**: Supports free icons from `@fortawesome/fontawesome-free`.
- **Responsive Design**: Built with Bootstrap 5 for a mobile-friendly UI.
- **Dynamic Icon Loading**: Loads icons dynamically using `fetch`.
- **TypeScript Support**: Includes type definitions for TypeScript projects.
- **Flexible Usage**: Supports ES modules or global script inclusion.

## Installation

```bash
npm install @maxsoft/fontawesome-iconpicker @fortawesome/fontawesome-free bootstrap
```

## Usage

### ES Module (Recommended)
1. **Include HTML**:
   ```html
   <div class="container mt-5">
     <h1>FontAwesome Icon Picker</h1>
     <div class="input-group mb-3">
       <input type="text" id="myIconInput" class="form-control" placeholder="Kliknij, aby wybrać ikonę" readonly>
       <span class="input-group-text" id="selectedIconDisplay"></span>
     </div>
   </div>
   <div class="modal fade" id="iconPickerPopup" tabindex="-1" aria-labelledby="iconPickerModalLabel" aria-hidden="true">
     <div class="modal-dialog modal-lg">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="iconPickerModalLabel">Wybierz ikonę FontAwesome</h5>
           <button type="button" class="btn-close" id="closePopup" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
           <div id="iconList" class="icon-list"></div>
         </div>
       </div>
     </div>
   </div>
   ```

2. **Add Styles**:
   ```css
   .icon-list {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
     gap: 10px;
     max-height: 400px;
     overflow-y: auto;
     padding: 10px;
   }
   .icon-list div {
     display: flex;
     justify-content: center;
     align-items: center;
     transition: background-color 0.2s;
   }
   .icon-list div:hover {
     background-color: #f0f0f0;
   }
   ```

3. **Import in JavaScript/TypeScript**:
   ```typescript
   import initializeIconPicker from '@maxsoft/fontawesome-iconpicker';
   import '@fortawesome/fontawesome-free/css/all.css';
   import 'bootstrap/dist/css/bootstrap.min.css';
   import './styles.css';

   initializeIconPicker('#myIconInput');
   ```

4. **Include Bootstrap**:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
   ```

### Using with Vite
To ensure the JSON file loads correctly in Vite:
1. **Copy JSON to `public/`** (workaround):
   ```bash
   mkdir -p public/json
   cp node_modules/@maxsoft/fontawesome-iconpicker/dist/json/fontawesome-free-all.json public/json/
   ```
2. **Or Configure `vite.config.js`**:
   ```javascript
   import { defineConfig } from 'vite';
   import path from 'path';

   export default defineConfig({
     assetsInclude: ['**/*.woff', '**/*.woff2'],
     server: {
       fs: {
         allow: ['.', './node_modules']
       }
     },
     resolve: {
       alias: {
         '/json/fontawesome-free-all.json': path.resolve(__dirname, 'node_modules/@maxsoft/fontawesome-iconpicker/dist/json/fontawesome-free-all.json')
       }
     }
   });
   ```

### Global Script (Alternative)
1. **Include Script**:
   ```html
   <script src="node_modules/@maxsoft/fontawesome-iconpicker/dist/iconPicker.js"></script>
   <script>
     IconPicker('#myIconInput');
   </script>
   ```

## License

MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- [FontAwesome](https://fontawesome.com/) for the icon library.
- [Bootstrap](https://getbootstrap.com/) for the responsive UI framework.
- [Webpack](https://webpack.js.org/) for bundling.

---

Happy icon picking! 🚀