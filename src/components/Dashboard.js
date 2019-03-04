import React, { Component } from "react";
import { getSecret } from "../actions";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getSecret();
  };
  render() {
    return (
      <div>
        This is a Dashboard component <br />
        Our secret: <h3>{this.props.secret}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secret: state.dash.secret
});

export default connect(
  mapStateToProps,
  { getSecret }
)(Dashboard);
