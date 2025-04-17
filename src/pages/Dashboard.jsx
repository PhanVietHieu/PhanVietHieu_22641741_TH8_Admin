import { useEffect, useState } from 'react';
import '../css/admin.css'
import DataTable from 'react-data-table-component';
export default function Dashboard() {
    return (
        <>

            <div className="container">
                <div className="header">
                    <h2 className='title'>Dashboard</h2>
                    <input className='input' type="text" placeholder='Sreach' />
                    <img src="../src/img/Bell 1.png" alt="" srcSet="" />
                    <img src="../src/img/Question 1.png" alt="" srcSet="" />
                    <img src="../src/img/Avatar (1).png" alt="" srcSet="" />

                </div>
                <div className="menu">
                    <img className='logoMenu' src="../src/img/Image 1858.png" alt="" />

                    <a href="#">Dashboard</a>
                    <a href="#">Projects</a>
                    <a href="#">Teams</a>
                    <a href="#">Analytics</a>
                    <a href="#">Messages</a>
                    <a href="#">Integrations</a>
                </div>
                <div className="content"></div>
                <div className="footer"></div>
            </div>
        </>
    )
}