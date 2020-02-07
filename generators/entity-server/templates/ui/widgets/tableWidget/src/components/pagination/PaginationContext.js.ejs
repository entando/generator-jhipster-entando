import React from 'react';
import PropTypes from 'prop-types';

export const itemsPerPageOptions = [5, 10, 25];

const initialState = {
  currentPage: 0,
  totalItemCount: 0,
  itemsPerPage: itemsPerPageOptions[itemsPerPageOptions.length - 1],
};

export const PaginationContext = React.createContext({ pagination: initialState });

export class PaginationProvider extends React.Component {
  constructor(props) {
    super(props);

    const initialItemsPerPage =
      props.paginationMode === 'pagination'
        ? itemsPerPageOptions[0]
        : itemsPerPageOptions[itemsPerPageOptions.length - 1];

    this.state = {
      pagination: {
        ...initialState,
        itemsPerPage: initialItemsPerPage,
      },
    };

    this.onChangeItemsPerPage = this.onChangeItemsPerPage.bind(this);
    this.onChangeCurrentPage = this.onChangeCurrentPage.bind(this);
  }

  onChangeItemsPerPage({ target: { value } }) {
    this.setState(state => ({
      ...state,
      pagination: { ...state.pagination, itemsPerPage: parseInt(value, 10), currentPage: 0 },
    }));
  }

  onChangeCurrentPage(newPage) {
    this.setState(state => ({
      ...state,
      pagination: { ...state.pagination, currentPage: parseInt(newPage, 10) },
    }));
  }

  render() {
    const { pagination } = this.state;
    const { children } = this.props;
    return (
      <PaginationContext.Provider
        value={{
          ...pagination,
          onChangeCurrentPage: this.onChangeCurrentPage,
          onChangeItemsPerPage: this.onChangeItemsPerPage,
        }}
      >
        {children}
      </PaginationContext.Provider>
    );
  }
}

PaginationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  paginationMode: PropTypes.string,
};

PaginationProvider.defaultProps = {
  paginationMode: '',
};

export function withPaginationContext(Component) {
  return function PaginatedComponent(props) {
    return (
      <PaginationContext.Consumer>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {context => <Component {...props} pagination={context} />}
      </PaginationContext.Consumer>
    );
  };
}
