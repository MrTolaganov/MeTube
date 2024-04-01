import { Stack } from "@mui/material";
import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";

const Category = ({ selectedCategory, selectedCategoryHandler }) => {
  return (
    <Stack direction={"row"} sx={{ overflowX: "scroll" }}>
      {categories.map(category => (
        <button
          key={category.name}
          className="category-btn"
          style={{
            background: category.name === selectedCategory && colors.secondary,
            color: category.name === selectedCategory && "#fff"
          }}
          onClick={() => selectedCategoryHandler(category.name)}
        >
          <span
            style={{
              color:
                category.name === selectedCategory ? "#fff" : colors.secondary,
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span style={{ opacity: 1 }}>{category.name}</span>
        </button>
      ))}
    </Stack>
  );
};

export default Category;
