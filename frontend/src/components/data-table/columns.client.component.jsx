export const columns = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    // cell: ({ row }) => {
    // const name = row.getValue("nam")
    //   return <div className="text-right font-medium">{row}</div>
    // },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price (FCFA)</div>,
    cell: ({ row }) => {
      const price = row.getValue("brand");
      return <div className="text-center font-medium">{price}</div>;
    },
  },
  {
    accessorKey: "brand",
    header: () => <div className="text-center">Brand</div>,
    cell: ({ row }) => {
      const brand = row.getValue("brand");
      return <div className="text-center ">{brand}</div>;
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => {
      const category = row.getValue("brand");
      return <div className="text-center">{category}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => {
      const stock = row.getValue("brand");
      return <div className="text-center ">{stock}</div>;
    },
  },
];
