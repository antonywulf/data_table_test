import React, { Component } from 'react';

class AddNewRowForm extends Component {
  state = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  onInputChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onAddNewRow(this.state);

    const stateCopy = { ...this.state };
    for (let key in stateCopy) {
      stateCopy[key] = '';
    }

    this.setState({ ...stateCopy });
  };

  render() {
    let isValid = true;
    const valueArray = Object.values(this.state);
    for (let item of valueArray) {
      if (!item) {
        isValid = false;
      }
    }

    return (
      <form onSubmit={this.onFormSubmit}>
        <table style={{ textAlign: 'center' }} className="table table-bordered">
          <thead>
            <tr className="table-primary">
              <th>id</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  onChange={this.onInputChange}
                  style={{ width: '100%' }}
                  type="number"
                  id="id"
                  value={this.state.id}
                />
              </td>
              <td>
                <input
                  onChange={this.onInputChange}
                  style={{ width: '100%' }}
                  type="text"
                  id="firstName"
                  value={this.state.firstName}
                />
              </td>
              <td>
                <input
                  onChange={this.onInputChange}
                  style={{ width: '100%' }}
                  type="text"
                  id="lastName"
                  value={this.state.lastName}
                />
              </td>
              <td>
                <input
                  onChange={this.onInputChange}
                  style={{ width: '100%' }}
                  type="email"
                  id="email"
                  value={this.state.email}
                />
              </td>
              <td>
                <input
                  onChange={this.onInputChange}
                  style={{ width: '100%' }}
                  type="text"
                  id="phone"
                  value={this.state.phone}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {isValid && (
          <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-outline-success">Добавить в таблицу</button>
          </div>
        )}
      </form>
    );
  }
}

export default AddNewRowForm;
