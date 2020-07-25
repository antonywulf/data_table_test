import React, { Component } from 'react';
import SortDirectionIcon from './SortDirectionIcon/SortDirectionIcon';

class Table extends Component {
  state = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  onThClick = (thName, onTableSort) => {
    let direction = this.state[thName];

    if (direction) {
      if (direction === 'asc') {
        direction = 'desc';
      } else {
        direction = 'asc';
      }
    } else {
      direction = 'asc';
    }

    let copyState = { ...this.state };

    for (let key in copyState) {
      copyState[key] = '';
    }

    copyState[thName] = direction;

    this.setState({ ...copyState }, () => onTableSort(thName, direction));
  };

  render() {
    const { onTableSort, onRowClick, data } = this.props;
    const arrayOfKeys = Object.keys(this.state);

    return (
      <React.Fragment>
        <table
          style={{ textAlign: 'center', cursor: 'pointer' }}
          className="table table-bordered table-hover"
        >
          <thead className="thead-light">
            <tr>
              {arrayOfKeys.map(thName => (
                <th key={thName} onClick={this.onThClick.bind(null, thName, onTableSort)}>
                  {thName} {<SortDirectionIcon sortDirection={this.state[thName]} />}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map(item => (
                <tr onClick={onRowClick.bind(null, item)} key={item.id + item.phone}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {!data && (
          <p style={{ textAlign: 'center', fontStyle: 'italic' }} className="lead">
            Cant't find anything :(
          </p>
        )}
      </React.Fragment>
    );
  }
}

export default Table;
