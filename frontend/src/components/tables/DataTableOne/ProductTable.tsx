import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    PaginationState,
}
    from "@tanstack/react-table";
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Badge from "../../ui/badge/Badge";
import axios from "axios";
import { useEffect } from "react";
import { Route } from "react-router";

interface Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    stock_quantity: number;
    category: string;
    image: string;
    barcode: string;
    discount: number;
}

export default function ProductTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState("");
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleCreateProduct = () => {
        // alert("Create Product button clicked");
        <Route path="/create-product" />
    };

    // Define columns
    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "image",
            header: "Product",
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-lg flex-shrink-0">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                            )}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                        </span>
                    </div>
                );
            },
            enableSorting: false,
        },
        {
            accessorKey: "stock_quantity",
            header: "Stock",
            cell: ({ getValue }) => {
                const stock = getValue() as number;
                return (
                    <Badge size="sm" color={stock > 0 ? "success" : "error"}>
                        {stock}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "brand",
            header: "Brand",
            cell: ({ getValue }) => (
                <span className="text-gray-700 dark:text-gray-300">
                    {getValue() as string}
                </span>
            ),
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ getValue }) => (
                <span className="text-gray-700 dark:text-gray-300">
                    {getValue() as string}
                </span>
            ),
        },
        {
            accessorKey: "barcode",
            header: "Barcode",
            cell: ({ getValue }) => (
                <span className="text-gray-700 dark:text-gray-300">
                    {getValue() as string}
                </span>
            ),
        },

        {
            accessorKey: "price",
            header: "Price",
            cell: ({ getValue }) => (
                <span className="text-gray-700 dark:text-gray-300">
                    ${getValue() as number}
                </span>
            ),
        },
        {
            accessorKey: "discount",
            header: "Discount",
            cell: ({ getValue }) => (
                <span className="text-gray-700 dark:text-gray-300">
                    {getValue() as number}%
                </span>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ getValue }) => {
                const description = getValue() as string;
                return (
                    <span
                        className="text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: description?.replace(/\n/g, '<br>') || '' }}
                    />
                );
            },
        }

    ];

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
            pagination,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
    });

    const totalEntries = table.getFilteredRowModel().rows.length;
    const startEntry = pagination.pageIndex * pagination.pageSize + 1;
    const endEntry = Math.min(
        (pagination.pageIndex + 1) * pagination.pageSize,
        totalEntries
    );

    return (
        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            {/* Header with Show entries and Search */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Show</span>
                    <select
                        value={pagination.pageSize}
                        onChange={(e) => {
                            setPagination({
                                pageIndex: 0,
                                pageSize: Number(e.target.value),
                            });
                        }}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        {[10, 25, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCreateProduct}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Plus size={18} />
                        Create Product
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={filtering}
                            onChange={(e) => setFiltering(e.target.value)}
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center gap-2 ${header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : ""
                                                    }`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanSort() && (
                                                    <span className="text-gray-400">
                                                        {header.column.getIsSorted() === "asc" ? (
                                                            <ChevronUp size={14} />
                                                        ) : header.column.getIsSorted() === "desc" ? (
                                                            <ChevronDown size={14} />
                                                        ) : (
                                                            <div className="flex flex-col">
                                                                <ChevronUp size={10} className="opacity-30" />
                                                                <ChevronDown size={10} className="opacity-30 -mt-1" />
                                                            </div>
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer with pagination info and controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {totalEntries > 0 ? startEntry : 0} to {endEntry} of {totalEntries} entries
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-1">
                        {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => table.setPageIndex(pageIndex)}
                                className={`px-3 py-1 text-sm rounded-md ${pagination.pageIndex === pageIndex
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}