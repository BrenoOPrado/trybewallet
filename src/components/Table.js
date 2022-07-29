import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {
          (expenses.length <= 0) ? <> </> : expenses.map((item) => {
            const exchangeAux = item.exchangeRates[item.currency];
            const value = (item.value === '') ? 0 : parseFloat(item.value);
            const money = (value * parseFloat(exchangeAux.ask)).toFixed(2);
            return (
              <tbody key={ item.id }>
                <tr>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{value.toFixed(2).toString()}</td>
                  <td>{exchangeAux.name}</td>
                  <td>{parseFloat(exchangeAux.ask).toFixed(2).toString()}</td>
                  <td>{money.toString()}</td>
                  <td>Real</td>
                </tr>
              </tbody>
            );
          })
        }
      </table>
    );
  }
}

Table.propTypes = {
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
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);
