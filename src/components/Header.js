import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <p>imagem da carteira</p>
        <div className="user-header">
          <p>imagem de perfil</p>
          <section className="user-info">
            <p data-testid="email-field">{email}</p>
            <div className="field">
              <p data-testid="total-field">0</p>
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
