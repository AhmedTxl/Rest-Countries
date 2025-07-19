# Rest Countries API - Vue.js Application

A modern, responsive web application built with Vue.js 3 that displays information about countries using the [REST Countries API](https://restcountries.com/).

## 🌟 Features

- **Country List**: Browse all countries with infinite scroll
- **Country Details**: View detailed information about each country
- **Search Functionality**: Search countries by name with debounced input
- **Dark/Light Theme**: Toggle between dark and light themes with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Lazy Loading**: Images load only when they come into view
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Skeleton loading screens for better UX
- **Border Countries**: Navigate to neighboring countries directly

## 🚀 Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Official router for Vue.js
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **VueUse** - Collection of Vue composition utilities
- **Lucide Vue** - Beautiful & consistent icon toolkit

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Rest-Countries
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Vue components
│   ├── CountryList.vue      # Main country listing component
│   ├── CountryDetails.vue   # Individual country details
│   ├── CountryInfo.vue      # Home page with search
│   ├── CountrySkeleton.vue  # Loading skeleton
│   ├── LazyImage.vue        # Lazy loading image component
│   ├── InfoRow.vue          # Reusable info row component
│   └── ErrorBoundry.vue     # Error boundary component
├── composables/         # Vue composition functions
│   ├── useCountries.js      # API calls for countries
│   ├── useTheme.js          # Theme management
│   └── useSearch.js         # Search functionality
├── utils/               # Utility functions
│   └── formatters.js        # Data formatting utilities
├── router.js           # Vue Router configuration
├── main.js             # Application entry point
└── style.css           # Global styles
```

## 🎨 Key Features Explained

### Composable Architecture
The application uses Vue 3 composables for better code organization and reusability:
- `useCountries()` - Centralized API calls
- `useTheme()` - Theme state management
- `useSearch()` - Search functionality with debouncing

### Performance Optimizations
- **Lazy Loading**: Images only load when visible
- **Infinite Scroll**: Load more countries as user scrolls
- **Debounced Search**: Reduces API calls during typing
- **Skeleton Loading**: Better perceived performance
- **Optimized API Calls**: Only fetch required fields

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 API Integration

The application integrates with the [REST Countries API v3.1](https://restcountries.com/):

- **All Countries**: `GET /v3.1/all`
- **Country by Code**: `GET /v3.1/alpha/{code}`
- **Field Filtering**: Only fetch required fields for performance

## 🎯 Future Enhancements

- [ ] Filter by region
- [ ] Sort countries by population, name, etc.
- [ ] Offline support with service workers
- [ ] Country comparison feature
- [ ] Map integration
- [ ] More detailed country information
- [ ] Export country data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [REST Countries API](https://restcountries.com/) for providing the data
- [Vue.js](https://vuejs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
