import {connect} from "react-redux";
import {Operation} from "../../reducer/user/user";

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this._loginField = React.createRef();
    this._passwordField = React.createRef();
    this._errorLogin = React.createRef();
    this._errorPassword = React.createRef();

    this.checkDataSignIn = this.checkDataSignIn.bind(this);
  }

  checkDataSignIn(email, password) {
    if (email && password) {
      this.props.signIn({email, password});
    }
  }

  render() {
    const {_loginField, _passwordField, checkDataSignIn} = this;

    return <>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={_loginField} defaultValue="test@test.com" className="login__input form__input" type="email" name="email" placeholder="Email" required="" />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={_passwordField} className="login__input form__input" type="password" name="password" placeholder="Password" required="" />
              </div>
              <button className="login__submit form__submit button" type="submit"
                onClick={(evt) => {
                  evt.preventDefault();
                  if (_loginField && _passwordField) {
                    checkDataSignIn(_loginField.current.value, _passwordField.current.value);
                  }
                }}>Sign in</button>
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
}

SignIn.propTypes = {
  signIn: propTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps);

const mapDispatchToProps = (dispatch) => ({
  signIn: (data) => {
    dispatch(Operation.signIn(data));
  },
});

export {SignIn};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
