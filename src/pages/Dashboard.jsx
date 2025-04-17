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

    const openModal = (order = null) => {
        if (order) {
            setSelectedOrder(order);
            setNewOrder({ ...order }); // Đặt lại thông tin đơn hàng đã chọn
        } else {
            setSelectedOrder(null); // Không có đơn hàng chọn để thêm mới
            setNewOrder({
                name: '',
                company: '',
                value: '',
                date: new Date().toISOString().split('T')[0],
                status: 'Pending',
            });
        }
        setModalOpen(true);
    };


    const closeModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };


    const handleSave = () => {
        if (selectedOrder) {
            // Cập nhật đơn hàng đã chọn
            fetch(`http://localhost:3002/orders/${selectedOrder.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedOrder),
            })
                .then((res) => res.json())
                .then((updatedOrder) => {
                    setData((prevData) =>
                        prevData.map((order) =>
                            order.id === updatedOrder.id ? updatedOrder : order
                        )
                    );
                    closeModal();
                })
                .catch((err) => {
                    console.error('Lỗi khi lưu order:', err);
                    alert("Không thể lưu đơn hàng. Hãy thử lại.");
                });
        } else {
            // Thêm mới đơn hàng
            fetch('http://localhost:3002/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            })
                .then((res) => res.json())
                .then((addedOrder) => {
                    setData((prevData) => [...prevData, addedOrder]);
                    closeModal();
                })
                .catch((err) => {
                    console.error('Lỗi khi thêm đơn hàng:', err);
                    alert('Không thể thêm đơn hàng. Hãy thử lại.');
                });
        }
    };



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
            {modalOpen && selectedOrder && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Order</h2>
                        <form>
                            <label>Customer Name</label>
                            <input
                                type="text"
                                value={selectedOrder.name}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, name: e.target.value })}
                            />
                            <label>Company</label>
                            <input
                                type="text"
                                value={selectedOrder.company}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, company: e.target.value })}
                            />
                            <label>Order Value</label>
                            <input
                                type="number"
                                value={selectedOrder.value}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, value: e.target.value })}
                            />
                            <label>Order Date</label>
                            <input
                                type="date"
                                value={selectedOrder.date}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, date: e.target.value })}
                            />
                            <label>Status</label>
                            <select
                                value={selectedOrder.status}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <div className="modal-actions">
                                <button type="button" onClick={handleSave}>Save</button>
                                <button type="button" onClick={closeModal}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}