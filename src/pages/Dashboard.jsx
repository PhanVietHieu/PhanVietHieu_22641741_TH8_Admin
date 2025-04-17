import { useEffect, useState } from 'react';
import '../css/admin.css'
import DataTable from 'react-data-table-component';
export default function Dashboard() {
    const [cards, setCards] = useState([]);
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/overview")
            .then((res) => res.json())
            .then((data) => setCards(data))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);
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
                    <div className="secB"></div>
                </div>
                <div className="footer"></div>
            </div>
        </>
    )
}