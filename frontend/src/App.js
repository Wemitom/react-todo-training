import { useState, useEffect } from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import axios from 'axios';
import Categories from './components/Categories';
import AddCategory from './components/AddCategory';

function App() {
  // Тут хранятся напоминания текущей категории
  const [todos, setTodos] = useState([]);
  // Тут хранятся все категории
  const [categories, setCategories] = useState([]);
  // Тут хранится текущая категория
  const [currentCategory, setCurrentCategory] = useState(null);

  // Выполняется после первого рендера
  useEffect(() => {
    // Запрашиваем категории с сервера
    const fetchCategories = async () => {
      const fetchedCategories = (
        await axios.get('http://localhost:5000/categories')
      ).data;
      setCategories(fetchedCategories);
      setCurrentCategory(fetchedCategories[0]);
    };

    fetchCategories();
  }, []);

  // Выполняется после каждого изменения текущей категории
  useEffect(() => {
    // Запрашиваем напоминания текущей категории с сервера
    const fetchTodos = async () => {
      setTodos(
        !currentCategory
          ? null
          : (
              await axios.get(
                `http://localhost:5000/todos/${currentCategory?._id}`
              )
            ).data
      );
    };

    fetchTodos();
  }, [currentCategory]);

  // Удаление напоминания
  const handleClickTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then((res) => setTodos([...todos.filter((todo) => todo._id !== id)]));
  };

  // Удаление категории
  const handleClickCategory = (id) => {
    setCategories([...categories.filter((category) => category._id !== id)]);
    currentCategory._id === id && setCurrentCategory(categories[0]);
    axios.delete(`http://localhost:5000/categories/${id}`);
  };

  // Отметить напоминаниие как выполненое
  const markComplete = (id) => {
    let newState;
    setTodos(
      todos.map((todo) => {
        if (todo._id === id) {
          // Сохраняем новое состояение
          newState = todo.completed = !todo.completed;
        }
        return todo;
      })
    );

    // Обновляем напоминание в соответствии с новым состоянием
    axios.put('http://localhost:5000/todos', {
      id: `${id}`,
      completed: `${newState}`,
    });
  };

  // Выполняется при добавлении нового напоминания
  const addTodo = (title) => {
    axios
      .post('http://localhost:5000/todos', {
        title: title,
        id: `${currentCategory._id}`,
      })
      .then((res) => setTodos([...todos, res.data]));
  };

  // Выполняется при добавлении новой категории
  const addCategory = (title) => {
    axios
      .post('http://localhost:5000/categories', {
        title: title,
      })
      .then((res) => setCategories([...categories, res.data]));
  };

  // Выполняется при изменении текущей категории
  const makeCurrent = (id) => {
    setCurrentCategory(categories.find((category) => category._id === id));
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div
          style={{
            width: '30%',
            overflowY: 'auto',
            height: 'calc(100vh - 70px)',
            minHeight: '100%',
          }}
        >
          <div className="categories-header">Категории</div>
          <Categories
            currentCategory={currentCategory}
            categories={categories}
            handleClick={handleClickCategory}
            makeCurrent={makeCurrent}
          />
          <AddCategory addCategory={addCategory} />
        </div>
        <div
          style={{
            width: '70%',
            borderLeft: '1px dotted #ccc',
            overflowY: 'auto',
            height: 'calc(100vh - 70px)',
            minHeight: '100%',
          }}
        >
          <AddTodo addTodo={addTodo} />
          <Todos
            todos={todos}
            markComplete={markComplete}
            handleClick={handleClickTodo}
            color={currentCategory?.color}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
