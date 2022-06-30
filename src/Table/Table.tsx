import React, { Fragment, useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody'
import testData from '../data/testData';
import { PartitionData, TestDataType } from '../types/TableTypes';
import HeaderTable from '../HeaderTable/HeaderTable'
import Button from '@mui/material/Button';
import { TableHead } from '@mui/material';
import PopupTableWindow from '../PopupTableWindow/PopupTableWindow';
import { getValue } from '@testing-library/user-event/dist/utils';
import { TableCopyContext } from '../App';



type dataRegion = Array<{
    region: string,
    value: {
        G: {
            [year: number]: {
                XX: PartitionData;
                YY: PartitionData;
                ZZ: PartitionData;
            }
        }
    }
}>
const defaultData = testData

function MainTable() {
    //
    const [cloudTable] = useContext(TableCopyContext)
    const tableDataArr = Object.entries<any>(cloudTable)
    const yearsToArray = tableDataArr.map(([region, { G: regionData }]) => (
        Object.keys(regionData))
    ).reduce((initial, current) => initial.concat(current), []);
  const years = [...new Set(yearsToArray)];

  const sectionsToArray = tableDataArr.map(([region, { G: regionData }]) => {
    const allSectors: any[] = [];
    Object.values(regionData).forEach((chapters: any) => (
        Object.keys(chapters).forEach((chapter) => allSectors.push(chapter))
    )
    );
    return allSectors;
  })
  .reduce((initial, current) => initial.concat(current), []);
const sections = [...new Set(sectionsToArray)];

    // const [data, setData] = useState(null)
    const getData = (testData: TestDataType = defaultData): any => {
        const toArr = Object.entries(testData)
        const parcingData = tableDataArr.reduce((data: dataRegion, [year, value]) => {
            data.push({ region: year, value });
            return data;
        }, [])
        return parcingData
    }
    const openPopup = (path: string | number ) => {
        window.open(`/popup/${path}`, 'popupWindow', "width=800,height=400,left=150,top=150")
    }
    return (
        <>
            <TableContainer component={Paper} >
                <Table aria-label="simple table" >
                    <TableHead sx={{ th: { border: '0.5px solid' } }}>
                        <TableRow >
                            <TableCell />
                            {years.map((year) => (
                                <TableCell key={`${year}H`} component="th" scope="row" colSpan={3} align="center">
                                    <b>{year}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" >
                                <b>Regions</b>
                            </TableCell>
                            {years.map((year) => (
                                <Fragment key={`${year}` + 1}>
                                    {sections.map((property) => (
                                        <TableCell key={property} align="center">
                                            <b>{property}</b>
                                        </TableCell>
                                    ))}
                                </Fragment>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ td: { border: '0.5px solid' } }}>
                        {getData().map((data: any) => (
                            <TableRow key={`${data.region}R`}>
                                <TableCell align="center">
                                    {data.region}
                                </TableCell>
                                <Fragment key={`${data.region}F`}>
                                {years.map((year) =>
                                    sections.map((index) => (
                                            <TableCell key={index} align="center">
                                               <Button variant="text" onClick={() => openPopup(`${data.region}.G.${year}.${index}`) }>{data.value.G[year]?.[index]?.value}</Button>
                                            </TableCell>
                                        
                                    )

                                    ))}
                                    </Fragment>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default MainTable;
