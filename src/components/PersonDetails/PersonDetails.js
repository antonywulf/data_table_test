import React from 'react';

export default ({ person }) => (
  <div className="card mb-4 col-6 mx-auto">
    <div className="card-body">
      <p className="lead">
        Выбран пользователь <b>{`${person.firstName} ${person.lastName}`}</b>
      </p>
      <p className="lead">
        Описание: <br />
        <textarea style={{ width: '100%', height: '10rem' }} defaultValue={person.description} />
      </p>

      <p className="lead">
        Адрес проживания: <b>{person.address.streetAddress}</b>
      </p>
      <p className="lead">
        Город: <b>{person.address.city}</b>
      </p>
      <p className="lead">
        Провинция/штат: <b>{person.address.state}</b>
      </p>
      <p className="lead">
        Индекс: <b>{person.address.zip}</b>
      </p>
    </div>
  </div>
);
