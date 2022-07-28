import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoin } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
    };
  }

  async componentDidMount() {
    const { fetchOptions } = this.props;
    await fetchOptions();
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRolesValidation());
  }

  render() {
    const { value, description } = this.state;
    const { options } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            {' '}
            <input
              type="number"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ (event) => this.handleInputChange(event) }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            {' '}
            <select name="currency" data-testid="currency-input">
              {
                options.map((coin) => (
                  <option key={ coin } value={ coin }>
                    {coin}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select name="method" data-testid="method-input">
              <option value="money">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debt">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Método de pagamento:
            <select name="tag" data-testid="tag-input">
              <option value="Food">Alimentação</option>
              <option value="Leisure">Lazer</option>
              <option value="Work">Trabalho</option>
              <option value="Transport">Transporte</option>
              <option value="Health">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              type="number"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ (event) => this.handleInputChange(event) }
            />
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  fetchOptions: propTypes.func.isRequired,
  options: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  options: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOptions: () => dispatch(fetchCoin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
