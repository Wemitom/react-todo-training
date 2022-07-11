function TodoItem({ todo, markComplete, handleClick, color }) {
  const getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: todo.completed ? 'line-through' : 'none',
    };
  };

  const { _id, title } = todo;
  return (
    <div style={getStyle()}>
      <div>
        <input
          type="checkbox"
          onChange={markComplete.bind(this, _id)}
          checked={todo.completed}
        />{' '}
        {title}
        <button style={btnStyle} onClick={handleClick.bind(this, _id)}>
          x
        </button>
        <div
          className="color-marking"
          style={{ backgroundColor: '#' + color }}
        ></div>
      </div>
    </div>
  );
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: '2px solid black',
  padding: '4px 8px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right',
};

export default TodoItem;
