function CategoryBar({ selected, onSelect }) {
    const categories = ["All", "Main course", "Side Menu", "Beverage"];

  return (
    <div className="category-bar">
      {categories.map((cat)=>(
        <button
          className={selected === cat ? "category-chip active" : "category-chip"}
          onClick={() => onSelect(cat)}
          key={cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar
