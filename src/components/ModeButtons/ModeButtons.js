import React from 'react';

export default ({ onModeSelect }) => {
  const smallDataURL = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
  const bigDataURL = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

  return (
    <div className="row mt-4">
      <div className="col-6">
        <div
          onClick={onModeSelect.bind(null, smallDataURL)}
          style={{ cursor: 'pointer' }}
          className="card border-success"
        >
          <h5 className="card-header bg-success text-light">Small Data</h5>
          <div className="card-body">
            <p className="card-text">
              Загрузить таблицу с <b>32</b> строками данных
            </p>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div
          onClick={onModeSelect.bind(null, bigDataURL)}
          style={{ cursor: 'pointer' }}
          className="card border-danger"
        >
          <h5 className="card-header bg-danger text-light">Big Data</h5>
          <div className="card-body">
            <p className="card-text">
              Загрузить таблицу с <b>1000</b> строками данных
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
