import { getCategories } from "@/api/category";
import CategoryNavLinks from "./CategoryNavLinks";

const CategoryNavbar = async () => {
const categories = await getCategories();

return ( <nav className="w-full border-b border-gray-200 bg-white"> <div className="mx-auto max-w-[1164px]"> <CategoryNavLinks categories={categories} /> </div> </nav>
);
};

export default CategoryNavbar;
