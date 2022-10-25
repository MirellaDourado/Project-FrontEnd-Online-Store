import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../style/Checkout.css';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      noCarrinho: [],
      nome: '',
      email: '',
      endereco: '',
      cpf: '',
      cep: '',
      telefone: '',
      payment: '',
      valido: false,
      quantidadeNoCarrinho: 0,
    };
  }

  componentDidMount() {
    this.lerCarrinhoDeCompras();
    this.setState({
      quantidadeNoCarrinho: JSON.parse(localStorage.getItem('quantidadeNoCarrinho')),
    });
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

  lidandoComInputs = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  validacao = () => {
    const { nome, endereco, cep, cpf, telefone, email, payment } = this.state;
    const resultado = !!(nome && endereco && cep && cpf && telefone && email && payment);
    if (!resultado) {
      this.setState({ valido: true });
    } else {
      this.confirmado();
      this.setState({ valido: false });
    }
  };

  confirmado = () => {
    const { history } = this.props;
    localStorage.removeItem('salvoNoCarrinho');
    localStorage.removeItem('carrinhoDecompra');
    history.push('/');
  };

  render() {
    const {
      nome, email, cpf, telefone, endereco, cep, valido, quantidadeNoCarrinho,
    } = this.state;
    return (
      <section id="checkout">
        <header>
          <Link to="/">
            <BiHome />
          </Link>
          <h3>Revise seus Produtos</h3>
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
        <div className="cart-products">
          <div id="all-products">
            { this.semRepetição().map((item) => (
              <div key={ item.id }>
                <p>{ this.Quantidade(item) }</p>
                <p>
                  {item.title}
                  <span>
                    R$
                    { Number(item.price).toString().replace('.', ',') }
                  </span>
                </p>
                <img src={ item.thumbnail } alt={ item.title } />
              </div>)) }
          </div>
        </div>
        <form className="checkout-form">
          <h3>Informações do Comprador</h3>
          <div className="buyer-info">
            <label
              htmlFor="nome"
            >
              Nome Completo
              <input
                name="nome"
                data-testid="checkout-fullname"
                value={ nome }
                onChange={ this.lidandoComInputs }
              />
            </label>
            <label
              htmlFor="email"
            >
              Email
              <input
                name="email"
                data-testid="checkout-email"
                value={ email }
                onChange={ this.lidandoComInputs }
              />
            </label>
            <label
              htmlFor="cpf"
            >
              CPF
              <input
                name="cpf"
                value={ cpf }
                data-testid="checkout-cpf"
                onChange={ this.lidandoComInputs }
              />
            </label>
            <label
              htmlFor="telefone"
            >
              Telefone
              <input
                name="telefone"
                data-testid="checkout-phone"
                value={ telefone }
                onChange={ this.lidandoComInputs }
              />
            </label>
            <label
              htmlFor="cep"
            >
              CEP
              <input
                name="cep"
                data-testid="checkout-cep"
                value={ cep }
                onChange={ this.lidandoComInputs }
              />
            </label>
            <label
              htmlFor="endereco"
            >
              Endereço
              <input
                name="endereco"
                data-testid="checkout-address"
                value={ endereco }
                onChange={ this.lidandoComInputs }
              />
            </label>
          </div>
          <h3>Método de Pagamento</h3>
          <div className="payment-metod">
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                id="boleto"
                onClick={ this.lidandoComInputs }
                data-testid="ticket-payment"
              />
              Boleto
            </label>
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                id="visa"
                onClick={ this.lidandoComInputs }
                data-testid="visa-payment"
              />
              Visa
            </label>
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                id="mastercard"
                onClick={ this.lidandoComInputs }
                data-testid="master-payment"
              />
              MasterCard
            </label>
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                id="elo"
                onClick={ this.lidandoComInputs }
                data-testid="elo-payment"
              />
              Elo
            </label>
          </div>
          { valido && <p data-testid="error-msg">Campos inválidos</p> }
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.validacao }
          >
            Comprar
          </button>
        </form>
      </section>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
