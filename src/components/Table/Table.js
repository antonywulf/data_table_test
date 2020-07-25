import React from 'react';
import SortDirectionIcon from './SortDirectionIcon/SortDirectionIcon';

export default ({ onTableSort, data, onRowClick, sortFieldName, sortDirection }) => {
  const thNameArr = ['id', 'firstName', 'lastName', 'email', 'phone'];

  return (
    <React.Fragment>
      <table style={{ textAlign: 'center' }} className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            {thNameArr.map(thName => (
              <th key={thName} onClick={onTableSort.bind(null, thName)}>
                {thName}{' '}
                {sortFieldName === thName ? (
                  <SortDirectionIcon sortDirection={sortDirection} />
                ) : null}
              </th>
            ))}
          </tr>
        </thead>

        {data && (
          <tbody>
            {data.map(item => (
              <tr onClick={onRowClick.bind(null, item)} key={item.id + item.phone}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!data && (
        <p style={{ textAlign: 'center', fontStyle: 'italic' }} className="lead">
          Cant't find anything :(
        </p>
      )}
    </React.Fragment>
  );
};
