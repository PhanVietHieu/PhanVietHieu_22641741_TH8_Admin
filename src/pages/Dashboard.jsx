import { useEffect, useState } from 'react';
import '../css/admin.css'
import DataTable from 'react-data-table-component';
export default function Dashboard() {

    const [cards, setCards] = useState([]);
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newOrder, setNewOrder] = useState({
        name: '',
        company: '',
        value: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
    });

    useEffect(() => {
        fetch("http://localhost:3001/overview")
            .then((res) => res.json())
            .then((data) => setCards(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3002/orders")
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error(err));
    }, []);

    const columns = [
        {
            name: 'Customer Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Company',
            selector: row => row.company,
            sortable: true,
        },
        {
            name: 'Order Value',
            selector: row => `$${row.value}`,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => (
                <span className={`status ${row.status.toLowerCase()}`}>
                    {row.status}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <img
                    src="../src/img/create.png"
                    alt="Edit"
                    onClick={() => openModal(row)}
                    style={{ cursor: 'pointer' }}
                />
            ),
        },
    ];
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
                <div className="content">
                    <div className="secA">
                        <h2 className="overview-title">
                            <span className="icon-square">▧</span> Overview
                        </h2>
                        <div className="overview-row">
                            {cards.map((card) => (
                                <div key={card.id} className="card-box">
                                    <div className="card-title">{card.title}</div>
                                    <div className="card-value">{card.value}</div>
                                    <div className="card-change">
                                        ▲ {card.change} <span className="card-subtext">period of change</span>
                                    </div>
                                    <div className="card-icon">{card.icon}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="secB">
                        <div className="report-header">
                            <h3>
                                <i className="fas fa-file-alt report-icon"></i> Detailed report
                            </h3>
                            <div className="report-actions">
                                <button className="btn btn-outline"> Import</button>
                                <button className="btn btn-outline">Export</button>
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            highlightOnHover
                            striped
                            responsive
                        />
                    </div>
                </div>
                <div className="footer"></div>
            </div>
        </>
    )
}