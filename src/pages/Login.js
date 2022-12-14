import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      invalid: true,
    };
  }

  inputRolesValidation = () => {
    const { email, password } = this.state;
    const minLetters = 6;
    if (
      email.length > 0
      && email.includes('@')
      && email.endsWith('.com')
      && password.length >= minLetters
    ) {
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRolesValidation());
  }

  handleEnter = (email) => {
    const { enterTheWallet, history } = this.props;
    enterTheWallet(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, invalid } = this.state;
    return (
      <div className="initial-page">
        <div className="login-page">
          <section>
            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Eg8INSNe--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5302/26258239-4ac6-4d28-b94c-ba6d3f9eabc2.png" alt="Logo da trybe" />
            <h2>TrybeWallet</h2>
          </section>
          <p>Informe seu email e senha:</p>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              data-testid="email-input"
              value={ email }
              onChange={ (event) => this.handleInputChange(event) }
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              data-testid="password-input"
              value={ password }
              onChange={ (event) => this.handleInputChange(event) }
            />
            {
              (invalid) ? <p>Por favor preencha corretamente as informa????es</p> : <> </>
            }
            <button
              type="button"
              disabled={ invalid }
              onClick={ () => this.handleEnter(email) }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  enterTheWallet: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  enterTheWallet: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
