import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { editItem, removeItem } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, deleteItem, edit, editor } = this.props;
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
          (expenses.length <= 0)
            ? (
              <tbody>
                <tr>
                  <td>Você não possui despesas</td>
                </tr>
              </tbody>
            )
            : expenses.map((item) => {
              const exchangeAux = item.exchangeRates[item.currency];
              const value = (item.value === '') ? 0 : parseFloat(item.value);
              const money = (value * parseFloat(exchangeAux.ask)).toFixed(2);
              const description = (item.description === '')
                ? 'Sem descrição' : item.description;
              return (
                <tbody key={ item.id }>
                  <tr>
                    <td>{description}</td>
                    <td>{item.tag}</td>
                    <td>{item.method}</td>
                    <td>{value.toFixed(2).toString()}</td>
                    <td>{exchangeAux.name}</td>
                    <td>{parseFloat(exchangeAux.ask).toFixed(2).toString()}</td>
                    <td>{money.toString()}</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        className="delete-btn"
                        disabled={ editor }
                        onClick={ () => deleteItem(item.id) }
                      >
                        Excluir
                      </button>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        className="edit-btn"
                        onClick={ () => edit(item.id) }
                      >
                        Editar
                      </button>
                    </td>
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
  deleteItem: propTypes.func.isRequired,
  edit: propTypes.func.isRequired,
  editor: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (state) => dispatch(removeItem(state)),
  edit: (state) => dispatch(editItem(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
