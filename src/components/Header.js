import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, values } = this.props;
    let money = 0;
    values.forEach((element) => {
      money += money + parseFloat(element.value)
      + parseFloat(element.exchangeRates[element.currency].ask);
    });
    return (
      <header>
        <p>imagem da carteira</p>
        <div className="user-header">
          <p>imagem de perfil</p>
          <section className="user-info">
            <p data-testid="email-field">{email}</p>
            <div className="field">
              <p data-testid="total-field">{ money }</p>
              <p data-testid="header-currency-field">BRL</p>
            </div>
          </section>
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  values: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
