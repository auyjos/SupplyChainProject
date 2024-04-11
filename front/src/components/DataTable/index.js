/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-table components
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from 'react-table';

// @mui material components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';

// Material Dashboard 2 PRO React components
import MDBox from '../MDBox';
import MDTypography from '../MDTypography';
import MDInput from '../MDInput';
import MDPagination from '../MDPagination';
import MDButton from '../MDButton';

// Material Dashboard 2 PRO React examples
import DataTableHeadCell from './DataTableHeadCell';
import DataTableBodyCell from './DataTableBodyCell';

// Custom imports
import TableCell from '@mui/material/TableCell';
import {
  Visibility,
  Delete,
  Edit,
  List,
  AccessTime,
  PictureAsPdf,
  Lock,
  Add,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  handleSearch,
  useActions,
  deleteAction,
  editAction,
  viewAction,
  useSelect,
  useView,
  useEdit,
  useDelete,
  selectAction,
  deleteMessage,
  useTime,
  timeAction,
  useFile,
  fileAcction,
  useLock,
  lockAction,
  useAdd,
  addAction,
  pressSearchAction,
  collapseContent,
}) {
  const defaultValue = entriesPerPage.defaultValue
    ? entriesPerPage.defaultValue
    : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ['5', '10', '15', '20', '25'];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const [rowSelected, setRowSelected] = useState(null);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) =>
    gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  const onClickSearch = () => {
    if (handleSearch !== null) {
      handleSearch(search);
    }
  };

  const onPressSearch = (event) => {
    if (event.key === 'Enter') {
      if (handleSearch !== null) {
        handleSearch(search);
      }
    }
  };

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? 'desc' : 'asce';
    } else if (isSorted) {
      sortedValue = 'none';
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const onSelectRowCollapseHandler = (index) => {
    if (collapseContent) {
      setRowSelected((prev) => {
        if (prev === index) {
          setRowSelected(null);
        } else {
          setRowSelected(index);
        }
      });
    }
  };

  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      {entriesPerPage || canSearch ? (
        <MDBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          p={3}
        >
          {entriesPerPage && (
            <MDBox display='flex' alignItems='center'>
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size='small'
                sx={{ width: '5rem' }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant='caption' color='secondary'>
                &nbsp;&nbsp;entries per page
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox
              width='22rem'
              ml='auto'
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              p={3}
            >
              <MDInput
                placeholder='Search...'
                size='small'
                onChange={({ currentTarget }) => {
                  setSearch(currentTarget.value);
                  // onSearchChange(currentTarget.value);
                }}
                onKeyPress={onPressSearch}
              />
              <MDButton
                variant='outlined'
                color='dark'
                onClick={() => {
                  onClickSearch();
                }}
              >
                <Icon>search</Icon>
                &nbsp;Buscar
              </MDButton>
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox component='thead'>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {useActions && (
                <TableCell align='center' style={{ minWidth: '150px' }}>
                  Actions
                </TableCell>
              )}
              {headerGroup.headers.map((column) => (
                <DataTableHeadCell
                  {...column.getHeaderProps(
                    isSorted && column.getSortByToggleProps()
                  )}
                  width={column.width ? column.width : 'auto'}
                  align={column.align ? column.align : 'left'}
                  sorted={setSortedValue(column)}
                >
                  {column.render('Header')}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, index) => {
            // console.log(row)
            prepareRow(row);
            return (
              <>
                <TableRow {...row.getRowProps()}>
                  
                  {useActions && (
                    <TableCell align='center'>
                      <Grid container justifyContent={'start'}>
                        {useView && (
                          <Grid item>
                            <IconButton
                              onClick={() => {
                                viewAction(row.original);
                              }}
                              aria-label='view'
                            >
                              <Visibility fontSize='small' color='success' />
                            </IconButton>
                          </Grid>
                        )}
                        {useEdit && (
                          <Grid item>
                            <IconButton
                              onClick={() => {
                                editAction(row.original);
                              }}
                              aria-label='edit'
                            >
                              <Edit fontSize='small' color='info' />
                            </IconButton>
                          </Grid>
                        )}
                        {useSelect && (
                          <Grid item>
                            <IconButton
                              onClick={() => {
                                selectAction(row.original);
                                if (collapseContent) {
                                  onSelectRowCollapseHandler(index);
                                }
                              }}
                              aria-label='delete'
                            >
                              <List fontSize='small' color='info' />
                            </IconButton>
                          </Grid>
                        )}
                        {useDelete && (
                          <Grid item>
                            <Tooltip title={deleteMessage || 'Eliminar'}>
                              <IconButton
                                onClick={() => {
                                  deleteAction(row.original);
                                }}
                                aria-label='delete'
                              >
                                <Delete
                                  fontSize='small'
                                  sx={{ color: 'red' }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        )}
                        {useTime && (
                          <Grid item>
                            <IconButton
                              onClick={() => {
                                timeAction(row.original);
                              }}
                              aria-label='delete'
                            >
                              <AccessTime fontSize='small' color='info' />
                            </IconButton>
                          </Grid>
                        )}
                        {useFile && (
                          <Grid item>
                            <IconButton
                              onClick={() => {
                                fileAcction(row.original);
                              }}
                              aria-label='delete'
                            >
                              <PictureAsPdf fontSize='small' />
                            </IconButton>
                          </Grid>
                        )}
                        {useLock && (
                          <Grid item>
                            <IconButton
                              onClick={() => {
                                lockAction(row.original);
                              }}
                              aria-label='delete'
                            >
                              <Lock fontSize='small' color='info' />
                            </IconButton>
                          </Grid>
                        )}
                        {useAdd && (
                          <Grid item>
                            <IconButton
                              onClick={() => {
                                addAction(row.original);
                              }}
                              aria-label='add'
                            >
                              <Add fontSize='small' sx={{ color: 'red' }} />
                            </IconButton>
                          </Grid>
                        )}
                      </Grid>
                    </TableCell>
                  )}
                  {row.cells.map((cell) => (
                    <DataTableBodyCell
                      noBorder={noEndBorder && rows.length - 1 === index}
                      align={cell.column.align ? cell.column.align : 'left'}
                      {...cell.getCellProps()}
                    >
                      
                      {cell.render('Cell').props.cell.value === true ? 'SI' : cell.render('Cell').props.cell.value === false ? 'NO' : cell.render('Cell') }
                      
                    </DataTableBodyCell>
                  ))}
                </TableRow>
                {collapseContent &&
                  rowSelected === index &&
                  <TableRow >
                    <TableCell colSpan={columns.length + 1}>
                      {collapseContent(row.original)}
                    </TableCell>
                  </TableRow>
                  }
              </>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              variant='button'
              color='secondary'
              fontWeight='regular'
            >
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : 'gradient'}
            color={pagination.color ? pagination.color : 'info'}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width='5rem' mx={1}>
                <MDInput
                  inputProps={{
                    type: 'number',
                    min: 1,
                    max: customizedPageOptions.length,
                  }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: 'gradient', color: 'info' },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(['contained', 'gradient']),
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'dark',
      'light',
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
