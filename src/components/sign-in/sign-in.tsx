import * as React from 'react';

import {connect} from "react-redux";
import {Operation} from "../../reducer/user/user";

import {DataSignIn} from '../../types';

interface Props {
  signIn: (data: DataSignIn) => void
}

class SignIn extends React.PureComponent<Props, null> {
  private _loginField: React.RefObject<HTMLInputElement>;
  private _passwordField: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this._loginField = React.createRef();
    this._passwordField = React.createRef();

    this._handleButtonSubmit = this._handleButtonSubmit.bind(this);
  }

  render() {
    const {_loginField, _passwordField, _handleButtonSubmit} = this;

    return <>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={_loginField} defaultValue="test@test.com" className="login__input form__input" type="email" name="email" placeholder="Email" required={true} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={_passwordField} className="login__input form__input" type="password" name="password" placeholder="Password" required={true} />
              </div>
              <button className="login__submit form__submit button" type="submit"
                onClick={_handleButtonSubmit}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>;
  }

  _handleButtonSubmit(evt) {
    evt.preventDefault();

    const {_loginField, _passwordField} = this;

    if (_loginField && _passwordField) {
      const [email, password] = [_loginField.current.value, _passwordField.current.value];

      if (email && password) {
        this.props.signIn({email, password});
      }
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => Object.assign({}, ownProps);

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (data: DataSignIn) => {
    dispatch(Operation.signIn(data));
  },
});

export {SignIn};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
