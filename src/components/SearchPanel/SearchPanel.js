import React, { useState } from 'react';

export default ({ onPanelSearch }) => {
  const [value, setValue] = useState('');

  const onInputChange = event => {
    setValue(event.target.value);
  };

  return (
    <div className="input-group mb-3 mt-3">
      <input type="text" className="form-control" onChange={onInputChange} value={value} />
      <div className="input-group-append">
        <button className="btn btn-info" onClick={onPanelSearch.bind(null, value)}>
          Search
        </button>
      </div>
    </div>
  );
};
