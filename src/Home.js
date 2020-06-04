import React from "react";
import { getRequest } from "./handleRequest.js";
import { useTable, usePagination } from "react-table";

const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Organization", accessor: "organization" },
  { Header: "Name", accessor: "name" },
  { Header: "Time Created", accessor: "created" },
  { Header: "Last Updated", accessor: "updated" }   
];

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tutorials: []
    };
    this.accessKey = props.accessKey;
  }

  async componentDidMount() {
    this.getTutorials().then(async (data) => {
      this.setState({ tutorials: data });
    });
  }

  async getTutorials() {
    return getRequest(
      "http://70.187.182.170:3000/api/assets/find",
      this.accessKey
    ).then(data => {
      console.log(data.payload.rows);
      return data.payload.rows;
    }).catch(error => {
      console.log(error);
      return [];
    });
  }

  render() {
    return (<Table data={this.state.tutorials} columns={columns} rowInfo={this.onRowClick}/>);
  }
}

const onRowClick = row => {
  console.log(row);
}

// https://github.com/tannerlinsley/react-table/tree/master/examples
function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} {...row.getRowProps({onClick: () => onRowClick(row)} )} >
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Home;
