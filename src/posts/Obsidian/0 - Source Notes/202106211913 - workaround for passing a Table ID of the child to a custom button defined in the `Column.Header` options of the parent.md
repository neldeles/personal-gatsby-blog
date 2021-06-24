---
date: '2021-06-21T19:13:25'
tags: ['react-table']
title: 
published: true
description:
aliases:
references:
---

#  workaround for passing a Table ID of the child to a custom button defined in the `Column.Header` options of the parent

What I did is to use the `initialState` option of the `useTable` hook. So I passed in a `categoryGroupId` prop to the table component and set `initialState` to that.

This state doesn't change for each budget table, so I didn't need to worry about state changes. 

This was my workaround since I couldn't figure out how to retrieve the custom Table prop I set via `getTableProps`. 

Final code: 
```js
// BudgetTable.js
import {useTable} from "react-table"

const BudgetTable = ({ columns, data, tableName, categoryGroupId }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState: categoryGroupId,
    });
  
  //....
}

export default BudgetTable
```


```js
// BudgetTableContainer
const BudgetTableContainer = () => {
  const budget = useSelector((state) => state.budget);
  const uniqueCategoryGroups = useSelector(selectCategoryGroupName);

  const [open, setOpen] = useState(false);
  const [activeCategoryGroup, setActiveCategoryGroup] = useState(null);

  const budgetMemoized = useMemo(() => budget, [budget]);

  const columns = useMemo(
    () => [
      {
        Header: (props) => {
          return (
            <div tw="inline-flex items-center">
              <span>category</span>
              <button
                css={[
                  tw`inline-flex items-center ml-2 padding[0.1rem]`,
                  tw`border border-transparent rounded-full shadow-sm text-white bg-gray-400`,
                  tw`hover:bg-green-400`,
                  tw`active:(outline-none ring-2 ring-offset-2 ring-green-500 bg-green-400)`,
                  tw`focus-visible:(outline-none ring-2 ring-offset-2 ring-green-500)`,
                  tw`focus:(outline-none)`,
                ]}
                onClick={() => handleModal(props.initialState)}
              >
                <PlusIconSolid tw="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        },
        accessor: "category",
      },
      {
        Header: "budgeted",
        accessor: "budgeted",
      },
      {
        Header: "activity",
        accessor: "activity",
      },
      {
        Header: "available",
        accessor: "available",
      },
    ],
    []
  );

  const handleModal = (categoryGroupId) => {
    setActiveCategoryGroup(categoryGroupId);
    setOpen(true);
  };
	
  // ...
}
```

# Footer
---
Related: 