import * as React from 'react'

import {
  Column,
  ColumnDef,
  Row,
  SortingState,
  Table,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { BiSort, BiSortUp, BiSortDown } from 'react-icons/bi'

type AppTableProps<T> = {
  dataToRender: T[]
  columnAccesors: ColumnDef<any, any>[]
  rowClickHandler: (row: Row<T>) => void
}

function AppTable<T>({
  dataToRender,
  columnAccesors,
  rowClickHandler,
}: AppTableProps<T>) {
  const [columns, data] = React.useMemo(() => {
    return [columnAccesors, dataToRender]
  }, [dataToRender])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: false,
  })

  return (
    // max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col 2xl:max-w-6xl
    <>
      <div className="px-6 flex justify-between mb-6">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="py-2 px-4 font-lg shadow border rounded-full"
          placeholder="Search all columns..."
        />

        <TableController table={table} />
      </div>
      {/* w-[calc(100vw-70px)] lg:w-[calc(100vw-270px)] 
      ${
          showSidebar ? 'w-[calc(100vw-270px)]' : 'w-[calc(100vw-70px)]'
        }
      */}
      <div className={`overflow-scroll w-screen`}>
        <table className="table  bg-base-100 rounded-none">
          <thead className="shadow-md bg-info">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-base text-success-content"
                  >
                    {header.isPlaceholder ? null : (
                      <div className=" h-[100px]">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer flex items-center gap-2'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <BiSortUp />,
                            desc: <BiSortDown />,
                          }[header.column.getIsSorted() as string] ?? (
                            <BiSort />
                          )}
                        </div>
                        <div className="mt-2">
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-base-300 cursor-pointer"
                onClick={() => rowClickHandler(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className=" border-b-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AppTable

function TableController({ table }: { table: Table<any> }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary btn-sm disabled:btn-disabled"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        className="btn btn-primary btn-sm disabled:btn-disabled"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      <button
        className="btn btn-primary btn-sm disabled:btn-disabled"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </button>
      <button
        className="btn btn-primary btn-sm disabled:btn-disabled"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </button>
      <span className="flex gap-2 ">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className="border p-1 pl-2 rounded w-20"
        />
      </span>
      <select
        className="bg-danger text-danger-content font-bold p-2"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div className="">
      <div className="flex space-x-2 flex-col justify-center gap-1">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="px-2 py-1 w-28 text-sm text-base-content border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="px-2 py-1 w-28 text-sm text-base-content border shadow rounded"
        />
      </div>
      {/* <div className="h-1" /> */}
    </div>
  ) : (
    <div className="">
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-32 border shadow rounded text-sm px-2 py-1 text-base-content"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </div>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
