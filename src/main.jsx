import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ProductProvider } from './context/ProductContext.jsx';
import {CategoryProvider} from './context/CategoryContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthModalProvider } from './context/AuthModalContext.jsx';

import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthModalProvider>
<BrowserRouter>
<CartProvider>
<CategoryProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
    </CategoryProvider>
    </CartProvider>
</BrowserRouter>
</AuthModalProvider>
  </StrictMode>,
)
