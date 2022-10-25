import React from 'react';
import PropTypes from 'prop-types';

class Estrelas extends React.Component {
  state = {
    numeros: ['1', '2', '3', '4', '5'],
  };

  render() {
    const { numeros } = this.state;
    const { avaliacao, nota } = this.props;
    return (
      <section>
        { avaliacao
          ? (
            numeros.map((produto, indice) => (
              <input
                id={ produto }
                key={ produto }
                type="checkbox"
                data-testid={ `${indice + 1}-rating` }
                checked={ nota >= produto }
                onChange={ avaliacao }
              />
            ))
          )
          : (
            <div data-testid="review-card-rating">
              {numeros.map((produto) => (
                <input
                  id={ produto }
                  key={ produto }
                  type="checkbox"
                  checked={ nota >= produto }
                  disabled
                />
              ))}
            </div>
          )}
      </section>
    );
  }
}

Estrelas.defaultProps = {
  avaliacao: false,
};

Estrelas.propTypes = {
  avaliacao: PropTypes.func,
  nota: PropTypes.number.isRequired,
};

export default Estrelas;
