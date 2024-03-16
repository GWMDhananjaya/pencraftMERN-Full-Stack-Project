// Import necessary dependencies from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main component of the application
import App from './App.jsx';

// Import CSS styles for the application
import './index.css';

// Import the Redux store and persistor for state management
import { store, persistor } from './redux/Store.js';

// Import Provider component from React Redux to provide the Redux store to the application
import { Provider } from 'react-redux';

// Import PersistGate component from redux-persist to ensure the persistence of Redux state
import { PersistGate } from 'redux-persist/integration/react';

// Import ThemeProvider component from the custom component folder
import ThemeProvider from './components/ThemeProvider.jsx';

// Render the root component of the application
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the main application component with PersistGate to ensure Redux state persistence
  <PersistGate persistor={persistor}> 
    {/* Provide the Redux store to the application */}
    <Provider store={store}>
      {/* Wrap the application with a custom ThemeProvider component */}
      <ThemeProvider>
        {/* Render the main application component */}
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
