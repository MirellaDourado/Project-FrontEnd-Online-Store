import { shape, string } from 'prop-types';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { BsTruck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import '../style/Details.css';
import Forms from './Forms';
import ImageSlider from './ImageSlider';

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      quantidadeNoCarrinho: 0,
      quantidadeDisponivel: 0,
      quantidadeVendida: 0,
      fotos: [],
      precoOriginal: '',
      freteGratis: false,
    };
  }

  componentDidMount() {
    this.getID();
    this.setState({
      quantidadeNoCarrinho: JSON.parse(localStorage.getItem('quantidadeNoCarrinho')),
    });
  }

  updating = () => {
    const { quantidadeNoCarrinho } = this.state;
    this.setState({
      quantidadeNoCarrinho: quantidadeNoCarrinho + 1,
    });
  };

  getID = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getProductById(id);
    this.setState({
      product: data,
      quantidadeDisponivel: data.available_quantity,
      quantidadeVendida: data.sold_quantity,
      fotos: data.pictures,
      precoOriginal: data.original_price,
      freteGratis: data.shipping.free_shipping,
    });
  };

  salvandoNoCarrinho = (item) => (
    localStorage.setItem('salvoNoCarrinho', JSON.stringify(item))
  );

  adicionarAoCarrinho = (item) => {
    const noCarrinho = JSON.parse(localStorage.getItem('salvoNoCarrinho'));
    this.salvandoNoCarrinho([...noCarrinho, item]);
    this.updating();
  };

  render() {
    const {
      product, quantidadeNoCarrinho, quantidadeDisponivel,
      quantidadeVendida, fotos, precoOriginal, freteGratis,
    } = this.state;
    const { title, price, condition } = product;
    const { match: { params: { id } } } = this.props;
    return (
      <main className="details">
        <header>
          <Link to="/">
            <BiHome />
          </Link>
          <Link
            to="/carrinho"
          >
            <button
              data-testid="shopping-cart-button"
              type="button"
            >
              <AiOutlineShoppingCart fontSize="35px" />
              <span data-testid="shopping-cart-size">
                { quantidadeNoCarrinho }
              </span>
            </button>
          </Link>
        </header>
        <section>
          <ImageSlider slides={ fotos.map((img) => img.url) } alternativeText={ title } />
          <div id="all-information">
            <div id="someInformation">
              <p>
                {condition === 'new' ? 'Novo' : 'Usado' }
                {' '}
                |
                {' '}
                { quantidadeVendida > 1 ? `${quantidadeVendida} vendidos`
                  : `${quantidadeVendida} vendido` }
              </p>
              <p>
                { quantidadeDisponivel > 0 ? 'Estoque Disponível' : 'Produto Esgotado' }
              </p>
            </div>
            <div>
              {
                freteGratis === true && (
                  <p>
                    <BsTruck />
                    <span> Frete Grátis</span>
                  </p>)
              }
              <h3 data-testid="product-detail-name">{ title }</h3>
              { precoOriginal > price && (
                <p>
                  R$
                  {Number(precoOriginal).toString().replace('.', ',')}
                </p>)}
              <h4 data-testid="product-detail-price">
                R$
                { Number(price).toString().replace('.', ',') }
              </h4>
              <button
                type="button"
                onClick={ () => this.adicionarAoCarrinho(product) }
                data-testid="product-detail-add-to-cart"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </section>
        <section>
          <h3> Opine sobre o produto</h3>
          <Forms productId={ id } />
        </section>
      </main>
    );
  }
}

Details.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired,
    }).isRequired,
  }).isRequired,
};
