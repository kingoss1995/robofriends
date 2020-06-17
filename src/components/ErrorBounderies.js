import React from "react";

class ErrorBoundery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops Something Went Wrong</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundery;
