// Make some columns!
const defaultColumns = [
  // Accessor Column
  {
    accessorKey: "name",
    header: "Name",
    footer: (props) => props.column.id,
  },
  // Accessor Column
  {
    accessorKey: "email",
    header: "Email",
    footer: (props) => props.column.id,
  },
];
