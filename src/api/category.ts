import { ICategory, IProduct } from "@/types/products";

// ================= GET ALL CATEGORIES =================

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// ================= GET PRODUCTS BY CATEGORY =================

export const getCategory = async (
  category: string
): Promise<IProduct[]> => {
  try {
    const response = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${category}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
};