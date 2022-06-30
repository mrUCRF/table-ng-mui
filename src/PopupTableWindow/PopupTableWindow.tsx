import { useContext, useState } from 'react'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import { MenuItem, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import { TableCopyContext } from '../App'

export const initialState = [
    {
        value: 4,
        date: '20.02.2022',
        user: 'Petro',
        comment: '',
        id: 1,
    },
    {
        value: 5,
        date: '21.02.2022',
        user: 'Roman',
        comment: '',
        id: 2,
    },
    {
        value: 6,
        date: '22.02.2022',
        user: 'Anna',
        comment: '',
        id: 3
    }
]
const users = ['Andrii', 'Victor']
const properties = ['Value', 'Date', 'User', 'Comment']


function PopupTableWindow() {
    const [data, setData] = useState(initialState)
    const [inputValue, setInputValue] = useState<number | string>('')
    const [userValue, setUserValue] = useState(users[0])
    const [commentData, setCommentData] = useState('')
    //
    const [value, setValue] = useState([]);
  const [tableValue, updateCellValue] = useContext<any>(TableCopyContext);
  const { path } = useParams();
//




    const getDate = () => {
        return new Date().toLocaleDateString();
    };
    const changeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserValue(event.target.value)
    }
    const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(Number(event.target.value))
    }

    const addComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentData(event.target.value)
    }
    const onSubmit = () => {
        setData([
            ...data,
            {
                value: inputValue as number,
                date: getDate(),
                user: userValue,
                comment: commentData,
                id: data.length + 1
            }
        ])
        // setValue((prevState) => [...prevState, newValues]);
        updateCellValue(path, inputValue)
          setInputValue('')
        setUserValue(users[0])
        setCommentData('') 
    }
const closeWindow = () => {
    window.close()
}
    return (
        <div>
            <TableContainer component={Paper} >
                <Table >
                    <TableHead sx={{ th: { border: '0.5px solid' } }}>
                        <TableRow >
                            {properties.map((property) => (
                                 <TableCell key={property}><b>{property}</b></TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {data.map((data) => (
                            <TableRow key={data.id} sx={{ td: { border: '0.5px solid' } }}>
                                <TableCell>{data.value}</TableCell>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>{data.user}</TableCell>
                                <TableCell>{data.comment}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow >
                            <TableCell>
                                <TextField id="outlined-basic" type="number" label="add numb" variant="outlined"
                                      value={inputValue} onChange={changeValueInput} />
                            </TableCell>
                            <TableCell>
                                <TextField disabled id="outlined-basic" label="date" variant="outlined" value={getDate()} />
                            </TableCell>
                            <TableCell>
                                <TextField id="outlined-select-currency" select label="select name" value={userValue}
                                    onChange={changeUser}>
                                        {users.map((user) => (
                                            <MenuItem key={user} value={user}>{user}</MenuItem>
                                        ))}
                                </TextField>
                            </TableCell>
                            <TableCell>
                                <TextField id="outlined-basic" type="text" label="add comment" variant="outlined" value={commentData} 
                                onChange={addComment} />                               
                            </TableCell>
                            <TableCell>
                                <Button type="button" color="primary" onClick={onSubmit}>Add</Button>
                                <br/>
                                <Button type="button" color="secondary" onClick={() => {  closeWindow() }}>Close</Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>    
            </TableContainer>

        </div>
    )
}

export default PopupTableWindow
