import React from "react"

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex space-x-2 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              activeCategory === category
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
