import { useState } from 'react';

function AddCategory({ addCategory }) {
  const [title, setTitle] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addCategory(title);
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
        placeholder="Добавить категорию..."
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

export default AddCategory;
