import React from 'react'
import { BrowserRouter, Route, Routes} from  "react-router-dom";

import List from '../components/page/List';
import Update from '../components/page/Update';
import Create from '../components/page/Create';
import Detail from '../components/page/Detail';

export default function Router() {
  return (

      <Routes>
        {/* <Route path='detail' element={<Detail/>}/> */}
        
        <Route path='/' element={<List/>}/>
        <Route path='create' element={<Create/>}/>
        <Route path='list' element={<List/>}/>
        <Route path='update/:id' element={<Update/>}/>
        <Route path="detail" element={<Detail />} />
      </Routes>

  )
}
