import React, { Component } from 'react';
import { BiHome } from 'react-icons/bi';
import { BsCartDash, BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../style/CarrinhoDeCompras.css';

class CarrinhoDeCompras extends Component {
  constructor() {
    super();
    this.state = {
      noCarrinho: [],
    };
  }

  componentDidMount() {
    this.lerCarrinhoDeCompras();
  }

  componentDidUpdate() {
    const { noCarrinho } = this.state;
    localStorage.setItem('salvoNoCarrinho', JSON.stringify(noCarrinho));
  }

  lerCarrinhoDeCompras = () => {
    this.setState({
      noCarrinho: JSON.parse(localStorage.getItem('salvoNoCarrinho', 'carrinhoDecompra')),
    });
  };

  semRepetição = () => {
  // https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    const { noCarrinho } = this.state;
    return [...new Map(noCarrinho.map((item) => [item.id, item])).values()];
  };

  Quantidade = (value) => {
    const { noCarrinho } = this.state;
    return noCarrinho.filter((v) => (v.id === value.id)).length;
  };

  diminuiQuantidade = (quant) => {
    const { noCarrinho } = this.state;
    // console.log(noCarrinho);
    const indice = noCarrinho.lastIndexOf(quant);
    const indiceNegativo = -1;
    if (this.Quantidade(quant) > 1 && indice > indiceNegativo) {
      noCarrinho.splice(indice, 1);
    }
    this.setState({
      noCarrinho,
    });
    // console.log(indice);
  };

  aumentaQuantidade = (quant) => {
    const { noCarrinho } = this.state;
    if (this.Quantidade(quant) < quant.available_quantity) {
      this.setState({
        noCarrinho: [...noCarrinho, quant],
      });
    }
  };

  removeDoCarrinho = (prod) => {
    const { noCarrinho } = this.state;
    const novoArray = noCarrinho.filter((item) => item.id !== prod.id);
    this.setState({
      noCarrinho: novoArray,
    });
  };

  render() {
    const { noCarrinho } = this.state;
    return (
      <div id="carrinho-de-compras">
        <header>
          <Link to="/">
            <BiHome />
          </Link>
          <h3>Meu Carrinho De Compras</h3>
        </header>
        <div>
          { noCarrinho.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>)
            : this.semRepetição().map((produto) => (
              <li key={ produto.id }>
                <p data-testid="shopping-cart-product-name">
                  { produto.title }
                </p>
                <img
                  src={ produto.thumbnail }
                  alt={ produto.title }
                />
                <p>
                  R$
                  { Number(produto.price).toString().replace('.', ',') }
                </p>
                <div id="controls">
                  <button
                    type="button"
                    onClick={ () => this.diminuiQuantidade(produto) }
                    data-testid="product-decrease-quantity"
                  >
                    <BsCartDash />
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    { this.Quantidade(produto) }
                  </p>
                  <button
                    type="button"
                    onClick={ () => this.aumentaQuantidade(produto) }
                    data-testid="product-increase-quantity"
                  >
                    <BsCartPlus />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={ () => this.removeDoCarrinho(produto) }
                  data-testid="remove-product"
                >
                  Remover do Carrinho
                </button>
              </li>)) }
        </div>
        <div>
          <Link to="/checkout">
            <button
              type="button"
              data-testid="checkout-products"
              disabled={ noCarrinho.length === 0 }
            >
              Finalizar compra
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CarrinhoDeCompras;
