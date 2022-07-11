import CategoryItem from './CategoryItem';

function Categories({ currentCategory, categories, handleClick, makeCurrent }) {
  return categories.map((category) => (
    <CategoryItem
      key={category._id}
      isCurrent={currentCategory === category}
      category={category}
      handleClick={handleClick}
      makeCurrent={makeCurrent}
    />
  ));
}

export default Categories;
