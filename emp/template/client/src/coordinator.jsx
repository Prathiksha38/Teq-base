import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Adminlayout from './admin_layout';
import Studentdetails from './studentdetails';
import Employeedetails from './employeedetails';
import Studentregister from './studentregister';
import Classschedule from './class_schedule';
import Reportshowing from './reportshowing';


function coordinator() {


    return (
        <>
            <Routes>
                <Route path="/" element={<Adminlayout />}>
                    <Route index element={<Studentregister />} />
                    <Route path="/stureg" element={<Studentregister />} />
                    <Route path="/empdet" element={<Employeedetails />} />
                    <Route path="/studentdetails" element={<Studentdetails />} />
                    <Route path="/class" element={<Classschedule />} />
                    <Route path="/repshow" element={<Reportshowing/ >} />
                </Route>
            </Routes>
        </>

    );
}

export default coordinator;






