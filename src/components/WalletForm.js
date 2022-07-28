import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem, fetchCoin } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      invalid: true,
    };
  }

  componentDidMount() {
    const { fetchOptions } = this.props;
    fetchOptions();
  }

  handleRoleValidation = () => {
    const { value, description, currency, method, tag } = this.state;
    if (
      value > 0
      && description.length > 0
      && currency.length > 0
      && method.length > 0
      && tag.length > 0
    ) {
      this.setState({
        invalid: false,
      });
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.handleRoleValidation());
  }

  handleAddField = () => {
    const { value, description, currency, method, tag } = this.state;
    const { addProduct } = this.props;
    addProduct({ value, description, currency, method, tag });
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      invalid: true,
    });
  }

  render() {
    const { value, description, currency, method, tag, invalid } = this.state;
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
            <select
              name="currency"
              data-testid="currency-input"
              onChange={ (event) => this.handleInputChange(event) }
              value={ currency }
            >
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
            <select
              name="method"
              data-testid="method-input"
              onChange={ (event) => this.handleInputChange(event) }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              data-testid="tag-input"
              onChange={ (event) => this.handleInputChange(event) }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ (event) => this.handleInputChange(event) }
            />
          </label>
          <button
            type="button"
            onClick={ () => this.handleAddField() }
            disabled={ invalid }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  fetchOptions: propTypes.func.isRequired,
  addProduct: propTypes.func.isRequired,
  options: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  options: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOptions: () => dispatch(fetchCoin()),
  addProduct: (items) => dispatch(addItem(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
