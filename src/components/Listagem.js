import React, { Component } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../style/Listagem.css';
import Categorias from './Categorias';
import Produtos from './Produtos';

// link ref:https://upmostly.com/tutorials/react-onchange-events-with-examples

class Listagem extends Component {
  state = {
    valorProcurado: '',
    infos: [],
    click: false,
    quantidadeNoCarrinho: 0,
  };

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('salvoNoCarrinho'))) {
      localStorage.setItem('salvoNoCarrinho', JSON.stringify([]));
      localStorage.setItem('quantidadeNoCarrinho', JSON.stringify(0));
    } else {
      this.setState({
        quantidadeNoCarrinho: (JSON.parse(localStorage
          .getItem('salvoNoCarrinho', 'carrinhoDecompra'))).length,
      });
    }
  }

  componentDidUpdate() {
    const { quantidadeNoCarrinho } = this.state;
    localStorage.setItem('quantidadeNoCarrinho', JSON.stringify(quantidadeNoCarrinho));
  }

  aumentandoQuantidade = () => {
    this
      .setState((before) => ({ quantidadeNoCarrinho: before.quantidadeNoCarrinho + 1 }));
  };

  mudando = ({ target: { name, value } }) => this.setState({ [name]: value });

  infosDaApi = async (data) => {
    const infos = await getProductsFromCategoryAndQuery('nan', data);
    this.setState({ infos: infos.results });
  };

  categoriaClicada = async (categoria) => {
    const respostaApi = await getProductsFromCategoryAndQuery(categoria);
    this.setState({
      infos: respostaApi.results,
    });
  };

  render() {
    const { valorProcurado, infos, click, quantidadeNoCarrinho } = this.state;
    return (
      <section id="home">
        <header data-testid="home-initial-message">
          <div>
            <input
              type="text"
              name="valorProcurado"
              // value={ () => {} }
              onChange={ this.mudando }
              data-testid="query-input"
              placeholder="Digite o que você procura"
            />
            <button
              type="button"
              onClick={ () => {
                this.infosDaApi(valorProcurado);
                this.setState({ click: true });
              } }
              data-testid="query-button"
            >
              <BsSearch />
            </button>
          </div>
          <h3>Digite algum termo de pesquisa ou escolha uma categoria.</h3>
          <Link data-testid="shopping-cart-button" to="/carrinho">
            <button type="button">
              <AiOutlineShoppingCart fontSize="35px" />
              <span data-testid="shopping-cart-size">
                { quantidadeNoCarrinho }
              </span>
            </button>
          </Link>
        </header>
        <section className="product">
          <aside>
            <Categorias categoriaClicada={ this.categoriaClicada } />
          </aside>
          <main>
            <ul>
              {infos.length <= 0 && click ? <p>Nenhum produto foi encontrado</p>
                : infos.map((info) => (
                  <li key={ info.id }>
                    <Produtos
                      produto={ info }
                      aumentandoQuantidade={ this.aumentandoQuantidade }
                    />
                  </li>
                ))}
            </ul>
          </main>
        </section>
      </section>
    );
  }
}

export default Listagem;
