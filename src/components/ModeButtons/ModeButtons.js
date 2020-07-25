import React from 'react';

export default ({ onModeSelect }) => {
  const smallDataURL = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
  const bigDataURL = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

  return (
    <div className="btn-group mt-4">
      <button onClick={onModeSelect.bind(null, smallDataURL)} className="btn btn-outline-success">
        32 строки
      </button>
      <button onClick={onModeSelect.bind(null, bigDataURL)} className="btn btn-outline-danger">
        1000 строк
      </button>
    </div>
  );
};
