import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { edited, fetchCoin } from '../redux/actions';

class WalletEditForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchOptions, expenses, idToEdit } = this.props;
    const { value, description, currency, method, tag } = expenses[idToEdit];
    this.setState({
      value, description, currency, method, tag,
    });
    fetchOptions();
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleEditField = () => {
    const { value, description, currency, method, tag } = this.state;
    const { edit } = this.props;
    edit({ value, description, currency, method, tag });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { options } = this.props;
    const returnEdit = (
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
              id="currency"
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
              id="method"
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
              id="tag"
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
            onClick={ () => this.handleEditField() }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
    return returnEdit;
  }
}

WalletEditForm.propTypes = {
  fetchOptions: propTypes.func.isRequired,
  edit: propTypes.func.isRequired,
  options: propTypes.arrayOf(propTypes.string).isRequired,
  idToEdit: propTypes.number.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    value: propTypes.string,
    description: propTypes.string,
    currency: propTypes.string,
    method: propTypes.string,
    tag: propTypes.string,
    exchangeRates: propTypes.objectOf(propTypes.shape({
      ask: propTypes.string,
      name: propTypes.string,
    })),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  options: state.wallet.currencies,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOptions: () => dispatch(fetchCoin()),
  edit: (values) => dispatch(edited(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletEditForm);
