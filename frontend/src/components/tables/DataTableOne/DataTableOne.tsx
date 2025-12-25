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
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Employee {
  id: number;
  user: {
    image: string;
    name: string;
  };
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: string;
}

// Sample data
const employeeData: Employee[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Abram Schleifer",
    },
    position: "Sales Assistant",
    office: "Edinburgh",
    age: 57,
    startDate: "25 Apr, 2027",
    salary: "$89,500",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Carla George",
    },
    position: "Sales Assistant",
    office: "London",
    age: 45,
    startDate: "11 May, 2027",
    salary: "$15,500",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-19.jpg",
      name: "Ekstrom Bothman",
    },
    position: "Sales Assistant",
    office: "San Francisco",
    age: 53,
    startDate: "15 Nov, 2027",
    salary: "$19,200",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Emery Culhane",
    },
    position: "Sales Assistant",
    office: "New York",
    age: 45,
    startDate: "29 Jun, 2027",
    salary: "$23,500",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "John Doe",
    },
    position: "Sales Assistant",
    office: "Tokyo",
    age: 35,
    startDate: "15 Mar, 2027",
    salary: "$32,000",
  },
  {
    id: 6,
    user: {
      image: "/images/user/user-22.jpg",
      name: "Jane Smith",
    },
    position: "Sales Assistant",
    office: "Paris",
    age: 42,
    startDate: "20 Jul, 2027",
    salary: "$28,500",
  },
  {
    id: 7,
    user: {
      image: "/images/user/user-23.jpg",
      name: "Michael Brown",
    },
    position: "Sales Assistant",
    office: "Berlin",
    age: 38,
    startDate: "10 Aug, 2027",
    salary: "$31,200",
  },
  {
    id: 8,
    user: {
      image: "/images/user/user-24.jpg",
      name: "Sarah Wilson",
    },
    position: "Sales Assistant",
    office: "Sydney",
    age: 29,
    startDate: "05 Sep, 2027",
    salary: "$27,800",
  },
  {
    id: 9,
    user: {
      image: "/images/user/user-25.jpg",
      name: "David Lee",
    },
    position: "Sales Assistant",
    office: "Toronto",
    age: 51,
    startDate: "12 Oct, 2027",
    salary: "$35,400",
  },
  {
    id: 10,
    user: {
      image: "/images/user/user-26.jpg",
      name: "Emma Davis",
    },
    position: "Sales Assistant",
    office: "Dubai",
    age: 33,
    startDate: "18 Nov, 2027",
    salary: "$41,000",
  },
  {
    id: 11,
    user: {
      image: "/images/user/user-27.jpg",
      name: "Robert Taylor",
    },
    position: "Sales Assistant",
    office: "Mumbai",
    age: 44,
    startDate: "22 Dec, 2027",
    salary: "$29,700",
  },
  {
    id: 12,
    user: {
      image: "/images/user/user-28.jpg",
      name: "Lisa Anderson",
    },
    position: "Sales Assistant",
    office: "Singapore",
    age: 37,
    startDate: "08 Jan, 2028",
    salary: "$33,900",
  },
  {
    id: 13,
    user: {
      image: "/images/user/user-29.jpg",
      name: "James Martinez",
    },
    position: "Sales Assistant",
    office: "Hong Kong",
    age: 41,
    startDate: "14 Feb, 2028",
    salary: "$38,600",
  },
  {
    id: 14,
    user: {
      image: "/images/user/user-30.jpg",
      name: "Patricia Garcia",
    },
    position: "Sales Assistant",
    office: "Mexico City",
    age: 48,
    startDate: "25 Mar, 2028",
    salary: "$26,300",
  },
  {
    id: 15,
    user: {
      image: "/images/user/user-31.jpg",
      name: "Christopher Rodriguez",
    },
    position: "Sales Assistant",
    office: "São Paulo",
    age: 36,
    startDate: "30 Apr, 2028",
    salary: "$30,100",
  },
  {
    id: 16,
    user: {
      image: "/images/user/user-32.jpg",
      name: "Amanda White",
    },
    position: "Sales Assistant",
    office: "Moscow",
    age: 39,
    startDate: "15 May, 2028",
    salary: "$34,200",
  },
  {
    id: 17,
    user: {
      image: "/images/user/user-33.jpg",
      name: "Daniel Harris",
    },
    position: "Sales Assistant",
    office: "Seoul",
    age: 31,
    startDate: "22 Jun, 2028",
    salary: "$36,800",
  },
  {
    id: 18,
    user: {
      image: "/images/user/user-34.jpg",
      name: "Olivia Martin",
    },
    position: "Sales Assistant",
    office: "Bangkok",
    age: 28,
    startDate: "10 Jul, 2028",
    salary: "$25,900",
  },
  {
    id: 19,
    user: {
      image: "/images/user/user-35.jpg",
      name: "Matthew Thompson",
    },
    position: "Sales Assistant",
    office: "Istanbul",
    age: 46,
    startDate: "18 Aug, 2028",
    salary: "$31,500",
  },
  {
    id: 20,
    user: {
      image: "/images/user/user-36.jpg",
      name: "Sophia Jackson",
    },
    position: "Sales Assistant",
    office: "Jakarta",
    age: 34,
    startDate: "25 Sep, 2028",
    salary: "$28,700",
  },
  {
    id: 21,
    user: {
      image: "/images/user/user-37.jpg",
      name: "William Clark",
    },
    position: "Sales Assistant",
    office: "Cairo",
    age: 43,
    startDate: "05 Oct, 2028",
    salary: "$33,400",
  },
  {
    id: 22,
    user: {
      image: "/images/user/user-38.jpg",
      name: "Isabella Lewis",
    },
    position: "Sales Assistant",
    office: "Buenos Aires",
    age: 32,
    startDate: "12 Nov, 2028",
    salary: "$29,100",
  },
  {
    id: 23,
    user: {
      image: "/images/user/user-39.jpg",
      name: "Joseph Walker",
    },
    position: "Sales Assistant",
    office: "Manila",
    age: 40,
    startDate: "20 Dec, 2028",
    salary: "$27,300",
  },
  {
    id: 24,
    user: {
      image: "/images/user/user-40.jpg",
      name: "Mia Hall",
    },
    position: "Sales Assistant",
    office: "Madrid",
    age: 36,
    startDate: "08 Jan, 2029",
    salary: "$35,600",
  },
  {
    id: 25,
    user: {
      image: "/images/user/user-41.jpg",
      name: "Benjamin Allen",
    },
    position: "Sales Assistant",
    office: "Barcelona",
    age: 47,
    startDate: "15 Feb, 2029",
    salary: "$37,800",
  },
  {
    id: 26,
    user: {
      image: "/images/user/user-42.jpg",
      name: "Charlotte Young",
    },
    position: "Sales Assistant",
    office: "Rome",
    age: 30,
    startDate: "22 Mar, 2029",
    salary: "$26,400",
  },
  {
    id: 27,
    user: {
      image: "/images/user/user-43.jpg",
      name: "Lucas King",
    },
    position: "Sales Assistant",
    office: "Amsterdam",
    age: 38,
    startDate: "10 Apr, 2029",
    salary: "$32,900",
  },
  {
    id: 28,
    user: {
      image: "/images/user/user-44.jpg",
      name: "Amelia Wright",
    },
    position: "Sales Assistant",
    office: "Brussels",
    age: 35,
    startDate: "18 May, 2029",
    salary: "$30,500",
  },
  {
    id: 29,
    user: {
      image: "/images/user/user-45.jpg",
      name: "Henry Lopez",
    },
    position: "Sales Assistant",
    office: "Vienna",
    age: 41,
    startDate: "25 Jun, 2029",
    salary: "$34,700",
  },
  {
    id: 30,
    user: {
      image: "/images/user/user-46.jpg",
      name: "Evelyn Hill",
    },
    position: "Sales Assistant",
    office: "Stockholm",
    age: 33,
    startDate: "05 Jul, 2029",
    salary: "$31,800",
  },
];

export default function DataTableOne() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Define columns
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => {
        const user = row.original.user;
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 overflow-hidden rounded-full flex-shrink-0">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </span>
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        return rowA.original.user.name.localeCompare(rowB.original.user.name);
      },
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ getValue }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "office",
      header: "Office",
      cell: ({ getValue }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ getValue }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {getValue() as number}
        </span>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Start date",
      cell: ({ getValue }) => (
        <span className="text-gray-700 dark:text-gray-300">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {getValue() as string}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: employeeData,
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

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
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
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort()
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
                  No results found.
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
                className={`px-3 py-1 text-sm rounded-md ${
                  pagination.pageIndex === pageIndex
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