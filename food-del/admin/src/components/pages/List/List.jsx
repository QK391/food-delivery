import React, { useEffect, useState } from "react";
import axios from "axios";
import './List.css';
import { toast } from "react-toastify";

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [confirmId, setConfirmId] = useState(null);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list-all`)
        if (response.data.success) {
            setList(response.data.data)
        } else {
            toast.error("Error")
        }
    }

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
        setConfirmId(null);
        await fetchList();
        if (response.data.success) {
            toast.success("Đã xóa món ăn thành công")
        } else {
            toast.error("Xóa thất bại")
        }
    }

    const toggleVisibility = async (foodId) => {
        const response = await axios.post(`${url}/api/food/toggle-visibility`, { id: foodId });
        if (response.data.success) {
            setList(prev => prev.map(item =>
                item._id === foodId ? { ...item, isVisible: response.data.isVisible } : item
            ));
            toast.success(response.data.isVisible ? "Đã hiện món ăn" : "Đã ẩn món ăn");
        } else {
            toast.error("Thao tác thất bại");
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className="list add flex-col">
            <p>Tất cả danh sách</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Ảnh</b>
                    <b>Tên món</b>
                    <b>Loại</b>
                    <b>Giá</b>
                    <b>Trạng thái</b>
                    <b>Hoạt động</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className={`list-table-format ${item.isVisible === false ? "list-row-hidden" : ""}`}>
                        <img src={`${url}/images/` + item.image} alt="" style={{ opacity: item.isVisible === false ? 0.4 : 1 }} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{(item.price * 1000).toLocaleString("vi-VN")} VND</p>
                        <p>
                            <span className={`list-badge ${item.isVisible === false ? "list-badge--hidden" : "list-badge--visible"}`}>
                                {item.isVisible === false ? "Đang ẩn" : "Hiển thị"}
                            </span>
                        </p>
                        <div className="list-action">
                            {confirmId === item._id ? (
                                <div className="list-confirm">
                                    <span>Xóa món này?</span>
                                    <button className="list-btn-confirm" onClick={() => removeFood(item._id)}>Xác nhận</button>
                                    <button className="list-btn-cancel" onClick={() => setConfirmId(null)}>Hủy</button>
                                </div>
                            ) : (
                                <div className="list-action-btns">
                                    <button
                                        className={`list-btn-toggle ${item.isVisible === false ? "list-btn-show" : "list-btn-hide"}`}
                                        onClick={() => toggleVisibility(item._id)}
                                    >
                                        {item.isVisible === false ? "Hiện" : "Ẩn"}
                                    </button>
                                    <button className="list-btn-delete" onClick={() => setConfirmId(item._id)}>
                                        🗑 Xóa
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default List