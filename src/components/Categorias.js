import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categorias extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
    };
  }

  componentDidMount() {
    this.pegandoCategorias();
  }

  pegandoCategorias = async () => {
    this.setState({
      categorias: await getCategories(),
    });
  };

  render() {
    const { categorias } = this.state;
    const { categoriaClicada } = this.props;
    return (
      <>
        { categorias.map((categoria) => (
          <button
            key={ categoria.id }
            data-testid="category"
            type="button"
            name="categorias"
            onClick={ () => categoriaClicada(categoria.id) }
          >
            {categoria.name}
          </button>
        ))}
      </>
    );
  }
}

Categorias.propTypes = {
  categoriaClicada: PropTypes.func.isRequired,
};

export default Categorias;
