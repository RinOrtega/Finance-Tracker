import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth"
import { GET_ME } from "../../utils/queries";
import { REMOVE_TRANSACTION } from "../../utils/mutations";
import dayjs from 'dayjs';

const formatTransactionDate = (timestamp) => {
    const dateObject = new Date(parseInt(timestamp)); // Convert timestamp to Date object
    return dayjs(dateObject).format('MM/DD/YYYY'); // Format date using dayjs
};

// this is next two functions help organize the table
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
// this function sorts the table
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// the title of the columns
const headCells = [
    {
        id: 'description',
        numeric: false,
        disablePadding: true,
        label: 'Description',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'category',
        numeric: true,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
];

// table columns (head cells)
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

// function to give the select and delete toolbars
function EnhancedTableToolbar(props) {
    const { numSelected, selectedTransactions, onDelete } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color=""
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selectedTransactions
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Transactions
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(selectedTransactions)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (

                // filter button icon
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedTransactions: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};



// table with all the transactions 
export default function TransactionTable() {

    const { loading, data, error, refetch } = useQuery(GET_ME);
    const [removeTransaction] = useMutation(REMOVE_TRANSACTION, {
        // update function that updates the Apollo cache by removing deleted transaction
        update(cache, { data: { removeTransaction } }) {
            if (removeTransaction) {
                const normalizedId = cache.identify({ id: removeTransaction._id, __typename: 'Transaction' });
                cache.evict({ id: normalizedId });
                cache.gc();
            }
        },
        // Refetch the GET_ME query to update the cache
        refetchQueries: [{ query: GET_ME }],
    });


    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('description');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data?.me?.transactions.map((transaction) => transaction._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    // hanldes the deletion of a transaction
    const handleDeleteTransactions = async (_ids) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            for (const _id of _ids) {
                await removeTransaction({ variables: { _id } });
            }
            // After deleting transactions, refetch data to update the table
            await refetch();
        } catch (error) {
            console.error("Error deleting transactions:", error);
        }
    };

    // adding the loading and data error
    if (loading) {
        return <Typography color="primary" sx={{ mt: 15, textAlign: "center" }} variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography color="Error" sx={{ mt: 15, textAlign: "center" }} variant="h6">Error loading transactions.</Typography>;
    }

    if (!data || !data.me || !data.me.transactions) {
        return <Typography color="Error" sx={{ mt: 15, textAlign: "center" }} variant="h6">No transactions found.</Typography>;
    }

    const transactions = data.me.transactions;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, transactions.length - page * rowsPerPage);

    const visibleRows = stableSort(transactions, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar onDelete={handleDeleteTransactions} numSelected={selected.length} selectedTransactions={selected} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={transactions.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row._id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    // This are the table rows with the checkboxes
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row._id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row._id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer', }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        {/* This is where the data from the top or the database can be passed to be rendered */}
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none">
                                            {/* userData.transactions.description */}
                                            {row.Description}
                                        </TableCell>
                                        <TableCell align="right"><Typography
                                            component="span"
                                            sx={{
                                                color: row.Amount >= 0 ? 'green' : 'red',
                                            }}
                                        >
                                            ${row.Amount.toFixed(2)}
                                        </Typography></TableCell>
                                        <TableCell align="right">{row.Categories[0].categoryType}</TableCell>
                                        <TableCell align="right">{formatTransactionDate(row.Date)}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* the amount per page and the amount of rows */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* the dense padding switch */}
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} sx={{ mr: 1 }} />}
                label="Condense Table"
            />
        </Box>
    );
}