# FontAwesome Icon Picker

A lightweight and customizable icon picker for selecting FontAwesome icons, built with JavaScript, Bootstrap 5, and Webpack. This package allows users to browse and select FontAwesome icons through a responsive modal interface.

## Features

- **FontAwesome Integration**: Supports free icons from `@fortawesome/fontawesome-free`.
- **Responsive Design**: Built with Bootstrap 5 for a mobile-friendly UI.
- **Dynamic Icon Loading**: Loads icons dynamically using `fetch` for optimal performance.
- **Easy to Use**: Click an input field to open a modal, select an icon, and display it in the input.
- **Customizable**: Easily extend with custom styles or functionality.

## Installation

Install the package and its peer dependencies:

```bash
npm install @maxsoft/fontawesome-iconpicker @fortawesome/fontawesome-free bootstrap
```
## Demo

![FontAwesome Icon Picker Screenshot](images/screenshot.png)

## Usage

1. **Include the required HTML** in your project:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>FontAwesome Icon Picker</title>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
     <style>
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
     </style>
   </head>
   <body>
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

     <script type="module">
       import initializeIconPicker from '@maxsoft/fontawesome-iconpicker/dist/iconPicker.js';
       initializeIconPicker('#myIconInput');
     </script>
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
   </body>
   </html>
   ```

2. **Add custom styles** (e.g., in `styles.css`):
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

3. **Using with a Module Bundler** (e.g., Webpack, Vite):
   ```javascript
   import initializeIconPicker from '@maxsoft/fontawesome-iconpicker';
   import '@fortawesome/fontawesome-free/css/all.css';
   import 'bootstrap/dist/css/bootstrap.min.css';
   import './styles.css';

   initializeIconPicker('#myIconInput');
   ```

## Development

To modify the package locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/gmaxsoft/iconpicker.git
   cd iconpicker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- [FontAwesome](https://fontawesome.com/) for the icon library.
- [Bootstrap](https://getbootstrap.com/) for the responsive UI framework.
- [Webpack](https://webpack.js.org/) for bundling.

---

Happy icon picking! 🚀