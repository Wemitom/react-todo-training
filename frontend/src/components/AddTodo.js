import { useState } from 'react';

function AddTodo({ addTodo }) {
  const [title, setTitle] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(title);
    setTitle('');
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex' }}>
      <input
        type="text"
        name="title"
        style={{ flex: '10', padding: '5px' }}
        value={title}
        placeholder="Добавить напоминание..."
        onChange={onChange}
      />
      <input
        type="submit"
        value="Добавить"
        className="btn"
        style={{ flex: '1' }}
      />
    </form>
  );
}

export default AddTodo;
