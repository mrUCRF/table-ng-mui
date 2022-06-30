
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";



function HeaderTable() {

    return (
                <TableHead sx={{ th: { border: '0.5px solid'}}}>
                    <TableRow >
                        <TableCell />
                        <TableCell component="th" scope="row" colSpan={3} align="center">
                            <b>2017</b>
                        </TableCell>
                        <TableCell component="th" scope="row" colSpan={3} align="center">
                            <b>2018</b>
                        </TableCell>
                        <TableCell component="th" scope="row" colSpan={3} align="center">
                            <b>2019</b>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" >
                            <b>Regions</b>
                            </TableCell>
                        {['a', 'b', 'c'].map((key) => (
                            <Fragment key={key}>
                                <TableCell key={`${key}xx`} align="center">
                                    <b>xx</b>
                                </TableCell>
                                <TableCell key={`${key}yy`} align="center">
                                    <b>yy</b>
                                </TableCell>
                                <TableCell key={`${key}zz`} align="center">
                                    <b>zz</b>
                                </TableCell>
                            </Fragment>
                        ))}
                    </TableRow>
                </TableHead>
    )
}

export default HeaderTable