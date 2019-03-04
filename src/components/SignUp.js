import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";

import * as actions from "../actions";
import CustomInput from "./CustomInput";

class SignUp extends Component {
  onSubmit = async formData => {
    console.log("formData", formData);

    await this.props.signUp(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  };

  responseGooge = async res => {
    console.log("responseGoogle", res);
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <div>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <fieldset>
                <Field
                  name="email"
                  type="text"
                  id="email"
                  placeholder="example@example.com"
                  label="Enter your email"
                  component={CustomInput}
                />
              </fieldset>
              <fieldset>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  label="Enter your password"
                  placeholder="superpassword"
                  component={CustomInput}
                />
              </fieldset>

              {this.props.errorMessage ? (
                <div className="alert alert-danger">
                  {this.props.errorMessage}
                </div>
              ) : null}

              <button className="btn btn-primary" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or sign up using third-party services
            </div>

            <button className="btn btn-default">Facebook</button>

            <GoogleLogin
              clientId="169686806505-pvaog5buh2ca55u7cem873l0jnmf9hft.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGooge}
              onFailure={this.responseGooge}
              className="btn btn-outline"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
});

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);
