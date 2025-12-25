import { useState } from "react";
import { addProduct } from "../api/productApi";

const ProductForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    stock_quantity: "",
    category: "",
    image: "",
    barcode: "",
    discount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(form);
    refresh();
    setForm({
      name: "",
      brand: "",
      description: "",
      price: "",
      stock_quantity: "",
      category: "",
      image: "",
      barcode: "",
      discount: "",
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Add Product
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Product Name */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-strokedark dark:text-white"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Brand
            </label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand name"
              className="w-full rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock_quantity"
              value={form.stock_quantity}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            />
          </div>

          {/* Barcode */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Barcode
            </label>
            <input
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              placeholder="Barcode"
              className="w-full rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2.5 block text-black dark:text-white">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Product description"
              className="w-full rounded border border-stroke bg-transparent px-5 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            />
          </div>

        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
