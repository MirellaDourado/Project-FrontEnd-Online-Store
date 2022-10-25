import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SlSocialDropbox } from 'react-icons/sl';
import { Link } from 'react-router-dom';
// import { adicionarAoCarrinho } from '../services/carrinho';

class Produtos extends Component {
  salvandoNoCarrinho = (item) => (
    localStorage.setItem('salvoNoCarrinho', JSON.stringify(item))
  );

  adicionarAoCarrinho = (item) => {
    const { aumentandoQuantidade } = this.props;
    const noCarrinho = JSON.parse(localStorage.getItem('salvoNoCarrinho'));
    this.salvandoNoCarrinho([...noCarrinho, item]);
    aumentandoQuantidade();
  };

  render() {
    const { produto } = this.props;
    return (
      <>
        <Link
          key={ produto.id }
          to={ `/details/${produto.id}` }
          data-testid="product-detail-link"
        >
          <div data-testid="product">
            <img
              src={ produto.thumbnail }
              alt={ produto.title }
            />
            <p>
              R$
              { (produto.price).toString().replace('.', ',') }
            </p>
            <p>
              { produto.title }
            </p>
            {produto.shipping.free_shipping && (
              <p data-testid="free-shipping">
                <SlSocialDropbox fontSize="20px" />
                Frete Grátis
              </p>)}
          </div>
        </Link>
        <button
          type="button"
          onClick={ () => this.adicionarAoCarrinho(produto) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </>
    );
  }
}

Produtos.propTypes = {
  produto: PropTypes.shape().isRequired,
  aumentandoQuantidade: PropTypes.func.isRequired,
};

export default Produtos;
