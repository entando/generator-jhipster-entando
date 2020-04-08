/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, Component } from 'react';
import refType from 'components/__types__/ref';
import { PaginationContext } from 'components/pagination/PaginationContext';

export default function withPagination(WrappedComponent) {
  class WithPaginationComponent extends Component {
    renderWrappedComponent = context => {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent {...rest} ref={forwardedRef} pagination={context} />;
    };

    render() {
      return <PaginationContext.Consumer>{this.renderWrappedComponent}</PaginationContext.Consumer>;
    }
  }

  WithPaginationComponent.propTypes = {
    forwardedRef: refType,
  };

  WithPaginationComponent.defaultProps = {
    forwardedRef: null,
  };

  return forwardRef((props, ref) => <WithPaginationComponent {...props} forwardedRef={ref} />);
}
