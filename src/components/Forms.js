import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsFillStarFill } from 'react-icons/bs';

class Forms extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      nota: '',
      comentarios: '',
      comentariosChecked: true,
      avaliacoes: [],
    };
  }

  componentDidMount() {
    this.carregandoAvaliacoes();
  }

  carregandoAvaliacoes = () => {
    const { productId } = this.props;
    let listagem = [];
    if (productId && localStorage.getItem(productId)) {
      listagem = JSON.parse(localStorage.getItem(productId));
    }
    this.setState({
      avaliacoes: listagem,
    });
  };

  mudando = ({ name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.inputsValidados();
    });
  };

  inputsValidados = () => {
    const { email, nota } = this.state;
    let comentariosChecked = true;
    if (!email) comentariosChecked = false;
    if (!nota) comentariosChecked = false;
    if (!email.includes('@')) comentariosChecked = false;

    if (!comentariosChecked) {
      this.setState({
        comentariosChecked: false,
      });
    } else {
      this.setState({
        comentariosChecked: true,
      });
    }
  };

  clique = () => {
    const { email, nota } = this.state;
    let comentariosChecked = true;
    if (!email) comentariosChecked = false;
    if (!nota) comentariosChecked = false;
    if (!email.includes('@')) comentariosChecked = false;

    if (!comentariosChecked) {
      this.setState({
        comentariosChecked: false,
      });
    } else {
      this.setState({
        comentariosChecked: true,
      });
      this.saveRate();
    }
  };

  saveRate = () => {
    const { email, nota, comentarios } = this.state;
    const { productId } = this.props;
    let listagem = [];

    if (localStorage.getItem(productId)) {
      listagem = JSON.parse(localStorage.getItem(productId));
    }

    const avaliandoProduto = {
      email,
      nota,
      comentarios,
    };

    listagem.push(avaliandoProduto);
    localStorage.setItem(productId, JSON.stringify(listagem));
    this.setState({
      avaliacoes: listagem,
    });

    this.setState({
      email: '',
      nota: '',
      comentarios: '',
    });
  };

  render() {
    const { comentariosChecked, avaliacoes, email, comentarios } = this.state;
    return (
      <>
        <form>
          <div>
            <h4> Informe seu email </h4>
            <input
              data-testid="product-detail-email"
              name="email"
              type="email"
              value={ email }
              onChange={ (e) => { this.mudando(e.target); } }
              placeholder="Insira seu email"
            />
            <h4> Avalie este produto </h4>
            <label htmlFor="nota1">
              <input
                type="radio"
                value="1"
                onChange={ (e) => { this.mudando(e.target); } }
                name="nota"
                id="nota1"
                data-testid="1-rating"
              />
              <BsFillStarFill />
            </label>
            <label htmlFor="nota2">
              <input
                type="radio"
                value="2"
                onChange={ (e) => { this.mudando(e.target); } }
                name="nota"
                id="nota2"
                data-testid="2-rating"
              />
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
            </label>

            <label htmlFor="nota3">
              <input
                type="radio"
                value="3"
                onChange={ (e) => { this.mudando(e.target); } }
                name="nota"
                id="nota3"
                data-testid="3-rating"
              />
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
            </label>
            <label htmlFor="nota4">
              <input
                type="radio"
                value="4"
                onChange={ (e) => { this.mudando(e.target); } }
                name="nota"
                id="nota4"
                data-testid="4-rating"
              />
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
            </label>
            <label htmlFor="nota5">
              <input
                type="radio"
                value="5"
                onChange={ (e) => { this.mudando(e.target); } }
                name="nota"
                id="nota5"
                data-testid="5-rating"
              />
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
              {' '}
              <BsFillStarFill />
            </label>
          </div>
          <div>
            <h4> Comente sobre este produto </h4>
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Insira seu comentário"
              value={ comentarios }
              name="comentarios"
              onChange={ (e) => { this.mudando(e.target); } }
            />
            <p> Lembre de informar todos os quadros</p>
          </div>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.clique }
          >
            Avaliar
          </button>

          {
            (!comentariosChecked && <p data-testid="error-msg">Campos inválidos</p>)
          }
        </form>
        {

          avaliacoes.map((nota, i) => (
            <div key={ i }>
              <p data-testid="review-card-email">{ nota.email }</p>
              <p data-testid="review-card-rating">{ nota.nota }</p>
              <p data-testid="review-card-evaluation">{ nota.comentarios }</p>
            </div>
          ))
        }
      </>

    );
  }
}

Forms.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Forms;
