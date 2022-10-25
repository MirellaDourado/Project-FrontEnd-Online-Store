import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import CarrinhoDeCompras from './components/CarrinhoDecompras';
import Checkout from './components/Checkout';
import Details from './components/Details';
import Listagem from './components/Listagem';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/details/:id" component={ Details } />
        <Route exact path="/" component={ Listagem } />
        <Route path="/carrinho" component={ CarrinhoDeCompras } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
