import React, { Component } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import Spinner from './components/Spinner/Spinner';
import Table from './components/Table/Table';
import PersonDetails from './components/PersonDetails/PersonDetails';
import ModeButtons from './components/ModeButtons/ModeButtons';
import SearchPanel from './components/SearchPanel/SearchPanel';

class App extends Component {
  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    // sortDirection: 'asc', // or 'desc',
    // sortFieldName: 'id', // or '[another thead]'
    selectedPerson: null,
    currentPage: 0,
    searchTerm: '',
    isError: false,
  };

  getSearchedData() {
    const { data, searchTerm } = this.state;

    if (!searchTerm) {
      return data;
    }

    let searchedData = data.filter(item => {
      return (
        // поля, по которым search
        item['firstName'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['lastName'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['email'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['phone'].toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (!searchedData.length) {
      searchedData = this.state.data;
    }

    return searchedData;
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        isLoading: false,
        data, // _.orderBy(data, this.state.sortFieldName, this.state.sortDirection),
      });
    } catch (error) {
      this.setState({ isError: true });
    }
  }

  onModeSelect = url => {
    this.setState({
      isModeSelected: true,
      isLoading: true,
    });
    this.fetchData(url);
  };

  onPanelSearch = searchTerm => {
    this.setState({ searchTerm, currentPage: 0 });
  };

  onTableSort = (sortFieldName, sortDirection) => {
    const dataCopy = this.state.data.concat();
    // const sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedData = _.orderBy(dataCopy, sortFieldName, sortDirection);

    this.setState({
      data: sortedData,
      sortDirection,
      sortFieldName,
    });
  };

  onRowClick = selectedPerson => {
    this.setState({ selectedPerson });
  };

  onPageChange = ({ selectedPage }) => {
    this.setState({ currentPage: selectedPage });
  };

  render() {
    if (!this.state.isModeSelected) {
      return (
        <div style={{ textAlign: 'center' }} className="container">
          <h3 className="mt-5">Выберите кол-во загружаемых строк таблицы:</h3>
          <ModeButtons onModeSelect={this.onModeSelect} />
        </div>
      );
    }

    const maxVisibleRowsCount = 50;

    const searchedData = this.getSearchedData();
    const pageCount = Math.ceil(searchedData.length / maxVisibleRowsCount);
    const visibleData = _.chunk(searchedData, maxVisibleRowsCount)[this.state.currentPage];

    return (
      <div className="container">
        {this.state.isError && (
          <p className="lead mt-5" style={{ textAlign: 'center', fontStyle: 'italic' }}>
            SOMETHING WENT WRONG...
          </p>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <SearchPanel onPanelSearch={this.onPanelSearch} />
            <Table
              onTableSort={this.onTableSort}
              onRowClick={this.onRowClick}
              data={visibleData}
              // sortDirection={this.state.sortDirection}
              // sortFieldName={this.state.sortFieldName}
            />
            {this.state.data.length > maxVisibleRowsCount && searchedData.length ? (
              <div className="d-flex justify-content-center">
                <ReactPaginate
                  pageCount={pageCount}
                  marginPagesDisplayed={3}
                  pageRangeDisplayed={4}
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  onPageChange={this.onPageChange}
                  forcePage={this.state.currentPage}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                />
              </div>
            ) : null}
          </React.Fragment>
        )}
        {this.state.selectedPerson ? <PersonDetails person={this.state.selectedPerson} /> : null}
      </div>
    );
  }
}

export default App;
