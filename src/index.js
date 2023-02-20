import ReactDOM from "react-dom/client";

// import '@shopify/polaris/dist/styles.css';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { BrowserRouter } from 'react-router-dom';

import App from "./App";
import "@shopify/polaris/build/esm/styles.css";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider i18n={enTranslations}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
);

reportWebVitals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
