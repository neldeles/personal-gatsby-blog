---
date: '2021-06-21T19:20:29'
tags: ['react-table']
title: 
published: true
description:
aliases:
references: ['https://stackoverflow.com/questions/63588421/how-to-pass-props-to-row-in-react-table']
---

# Setting custom props for Table
> getRowProps is not an option in v7. Since you are in charge of rendering your own table, you can create whatever method you want to pass row props to your table:

In your Table component, you pass on any prop (say, `rowProps`) of your choice for rows —

```js
<Table
        columns={columns}
        data={data}
        rowProps={row => ({
          onClick: () => alert(JSON.stringify(row.values)),
          style: {
            cursor: "pointer"
          }
        })}
      />
```

Then to actually use this —

```js
function Table({ columns, data, rowProps = () => ({}) }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map(
          (row, i) =>
            prepareRow(row) || (
              <tr {...row.getRowProps(rowProps(row))}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}
```
# Footer
---
Related: 