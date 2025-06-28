import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
const Main = () => {
    return (
        <session>
            <Nav/>
            
            <Outlet/>
        </session>
    );
}

export default Main;
