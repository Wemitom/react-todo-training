function CategoryItem({ isCurrent, category, handleClick, makeCurrent }) {
  const { _id, title, color } = category;
  return (
    <div
      style={{
        background: isCurrent ? '#dbdbdb' : '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted',
        cursor: 'pointer',
      }}
      onClick={() => makeCurrent(_id)}
    >
      <div>
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

export default CategoryItem;
