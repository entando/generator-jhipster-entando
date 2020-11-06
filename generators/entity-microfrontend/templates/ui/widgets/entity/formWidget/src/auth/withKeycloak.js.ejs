/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, Component } from 'react';
import refType from 'components/__types__/ref';
import KeycloakContext from 'auth/KeycloakContext';

export default function withKeycloak(WrappedComponent) {
  class WithKeycloakComponent extends Component {
    renderWrappedComponent = value => {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent {...rest} ref={forwardedRef} keycloak={value} />;
    };

    render() {
      return <KeycloakContext.Consumer>{this.renderWrappedComponent}</KeycloakContext.Consumer>;
    }
  }

  WithKeycloakComponent.propTypes = {
    forwardedRef: refType,
  };

  WithKeycloakComponent.defaultProps = {
    forwardedRef: () => {},
  };

  return forwardRef((props, ref) => <WithKeycloakComponent {...props} forwardedRef={ref} />);
}
