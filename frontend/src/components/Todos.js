import TodoItem from './TodoItem';

function Todos({ todos, markComplete, handleClick, color }) {
  return (
    <>
      {todos !== null
        ? todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              markComplete={markComplete}
              handleClick={handleClick}
              color={color}
            />
          ))
        : null}
    </>
  );
}

export default Todos;
