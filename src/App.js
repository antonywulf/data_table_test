import React, { Component } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import Spinner from './components/Spinner/Spinner';
import Table from './components/Table/Table';
import PersonDetails from './components/PersonDetails/PersonDetails';
import ModeButtons from './components/ModeButtons/ModeButtons';
import SearchPanel from './components/SearchPanel/SearchPanel';
import AddNewRowForm from './components/AddNewRowForm/AddNewRowForm';

class App extends Component {
  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    selectedPerson: null,
    currentPage: 0,
    searchTerm: '',
    isError: false,
    showForm: false,
  };

  getSearchedData() {
    const { data, searchTerm } = this.state;

    if (!searchTerm) {
      return data;
    }

    return data.filter(item => {
      return (
        // поля, по которым search
        item['firstName'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['lastName'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['email'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        item['phone'].toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        isLoading: false,
        data,
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
    const sortedData = _.orderBy(dataCopy, sortFieldName, sortDirection);

    this.setState({
      data: sortedData,
    });
  };

  onRowClick = selectedPerson => {
    this.setState({ selectedPerson });
  };

  onPageChange = ({ selected }) => {
    this.setState({ currentPage: selected });
  };

  onAddNewRowBtnClick = () => {
    this.setState(prevState => {
      return { showForm: !prevState.showForm };
    });
  };

  onAddNewRow = newPersonData => {
    const copyNewPersonData = { ...newPersonData };
    copyNewPersonData.description = 'Неизвесно';
    copyNewPersonData.address = {};
    copyNewPersonData.address.streetAddress = 'Неизвесно';
    copyNewPersonData.address.city = 'Неизвесно';
    copyNewPersonData.address.state = 'Неизвесно';
    copyNewPersonData.address.zip = 'Неизвесно';
    const newData = [copyNewPersonData].concat(this.state.data);
    this.setState({ data: newData });
  };

  render() {
    if (!this.state.isModeSelected) {
      return (
        <div style={{ textAlign: 'center' }} className="container">
          <h3 className="mt-5">Выберите способ загрузки данных:</h3>
          <ModeButtons onModeSelect={this.onModeSelect} />
        </div>
      );
    }

    const maxVisibleRowsCount = 50;

    const searchedData = this.getSearchedData();
    const pageCount = Math.ceil(searchedData.length / maxVisibleRowsCount);
    const visibleData = _.chunk(searchedData, maxVisibleRowsCount)[this.state.currentPage];

    const addNewRowBtnClass = this.state.showForm ? 'btn-outline-danger' : 'btn-outline-primary';

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

            <div className="d-flex justify-content-center mb-3">
              <button onClick={this.onAddNewRowBtnClick} className={`btn ${addNewRowBtnClass}`}>
                {this.state.showForm ? 'Отмена -' : 'Добавить +'}
              </button>
            </div>

            {this.state.showForm && <AddNewRowForm onAddNewRow={this.onAddNewRow} />}

            <Table onTableSort={this.onTableSort} onRowClick={this.onRowClick} data={visibleData} />
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
