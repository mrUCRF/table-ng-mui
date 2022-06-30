
import './App.css';
import PopupTableWindow from './PopupTableWindow/PopupTableWindow';
import MainTable from './Table/Table';
import { Routes, Route } from 'react-router-dom'
import React, { useCallback } from 'react';
import { BrowserRouter} from 'react-router-dom'

import testData from './data/testData';
import { cloneDeep, set } from 'lodash';
import useTableData from './hooks/useTableData';




function App() {
  window.localStorage.clear()
  const [tableData, setTableData] = useTableData("tableData", testData);
  const changeTableValue = useCallback((id: any, value: any) => {
      const path = (String(id + ".value"));
      setTableData((prevData: any) => {
        const newTable = cloneDeep(prevData);
        set(newTable, path, value);
        // console.log({ newTable });
        return newTable;
      });

    },
    [setTableData]
  );
  return (
    <TableCopyContext.Provider value={[tableData, changeTableValue]}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainTable />} />
        <Route path='/popup/:path' element={<PopupTableWindow />} />
      </Routes>
      </BrowserRouter>
      </TableCopyContext.Provider>

  );
}
export const TableCopyContext = React.createContext([{}, () => {}]);
export default App;


