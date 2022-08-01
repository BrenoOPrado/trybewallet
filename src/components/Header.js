import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, values, editor } = this.props;
    let money = 0;
    if (values.length >= 1) {
      values.forEach((element) => {
        const exchangeAux = element.exchangeRates[element.currency];
        const value = (element.value === '') ? 0 : parseFloat(element.value);
        money += value * parseFloat(exchangeAux.ask);
      });
    }
    // gambiarra
    const classNameMoney = (editor) ? 'total-field-edit' : 'total-field';
    return (
      <header>
        <img
          src="https://i.pinimg.com/originals/77/aa/50/77aa503ddc31d310e3a43915ca16b25c.png"
          alt="logo wallet"
        />
        <div className="user-header">
          <p data-testid="email-field">{email}</p>
          <div className="field">
            <p data-testid="total-field" className={ classNameMoney }>
              {
                money.toFixed(2)
              }
            </p>
            <p data-testid="header-currency-field" className={ classNameMoney }>BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string.isRequired,
  values: propTypes.arrayOf(propTypes.shape({
    value: propTypes.string,
    currency: propTypes.string,
    exchangeRates: propTypes.shape({
      ask: propTypes.string,
    }),
  })).isRequired,
  editor: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  values: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps, null)(Header);
