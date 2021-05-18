export default function Table({ table, className, onClick = () => {} }) {
    return (
        <div className={`rounded overflow-hidden ${className}`}>
            <table
                {...table.getTableProps()}
                className="min-w-full divide-y divide-dark-8 font-semibold"
            >
                <thead className="bg-gray-50 bg-dark-4">
                    {table.headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400 whitespace-nowrap"
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " ▼"
                                                : " ▲"
                                            : "\u00A0\u00A0"}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...table.getTableBodyProps()}
                    className="divide-y bg-dark-2 divide-dark-8"
                >
                    {table.rows.map((row) => {
                        table.prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                onClick={() => onClick(row)}
                                className="cursor-pointer"
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-6 py-4 whitespace-nowrap"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
