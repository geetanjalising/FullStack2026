import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import ContextProvider from './Pages/Context/ContextProvider.jsx';
import { Provider } from "react-redux";
import { store } from "./Pages/Redux/store.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
