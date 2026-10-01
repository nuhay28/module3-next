function CategoryBar({ selected, onSelect }) {
  const categories = [
    "All",
    "Main",
    "Breakfast",
    "Drink",
  ];

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selected === category
              ? "category-button active"
              : "category-button"
          }
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;