import axios from "axios";

const API_ULR = "http://localhost:3000/products";

export const getProducts = async () => {
    try {
        const response = await axios.get(API_ULR);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }

};
export const addProduct = async (product) => {
    try {
        const response = await axios.post(API_ULR, product);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};
