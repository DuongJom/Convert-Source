import React, { useEffect, useState } from 'react';

interface ChiTietGuiXe {
    id: number;
    phuongTienId: number;
    choDeXeId: number;
    ngayGui: string;
    ngayRa: string | null;
    phuongThucThanhToan: string;
}

const DanhSachYeuCauDuyet: React.FC = () => {
    const [data, setData] = useState<ChiTietGuiXe[]>([]);

    useEffect(() => {
        fetch('https://localhost:7537/api/admin/yeu-cau-duyet', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
            }
        })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error('Lỗi khi tải dữ liệu:', err));
    }, []);

    const handleApprove = async (id: number) => {
        if (!window.confirm("Bạn có chắc muốn duyệt lấy xe này?")) return;

        try {
            const res = await fetch(`https://localhost:7537/api/admin/duyet-lay-xe/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
                },
                body: JSON.stringify({ chiTietGuiXeId: id })
            });

            if (res.ok) {
                alert("Duyệt thành công!");
                setData(prev => prev.filter(item => item.id !== id)); // Xoá item khỏi danh sách
            } else {
                alert("Duyệt thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi duyệt:", error);
            alert("Đã xảy ra lỗi khi duyệt!");
        }
    };

    const formatDateTime = (dateStr: string | null) => {
        if (!dateStr) return 'Chưa lấy';
        const date = new Date(dateStr);
        return date.toLocaleString('vi-VN');
    };

    return (
        <div className="container py-4">
            <h2>
                <i className="bi bi-check-circle me-2"></i>
                Danh sách yêu cầu lấy xe đang chờ duyệt
            </h2>

            <table className="table table-bordered mt-3">
                <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>Phương tiện ID</th>
                    <th>Chỗ để xe</th>
                    <th>Ngày gửi</th>
                    <th>Ngày ra</th>
                    <th>Phương thức thanh toán</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {data.length > 0 ? data.map(item => (
                    <tr key={item.id} className="text-center">
                        <td>{item.id}</td>
                        <td>{item.phuongTienId}</td>
                        <td>{item.choDeXeId}</td>
                        <td>{formatDateTime(item.ngayGui)}</td>
                        <td>{formatDateTime(item.ngayRa)}</td>
                        <td>{item.phuongThucThanhToan}</td>
                        <td>
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleApprove(item.id)}
                            >
                                <i className="bi bi-check-circle-fill me-1"></i> Duyệt lấy xe
                            </button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={7} className="text-center">Không có yêu cầu nào.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default DanhSachYeuCauDuyet;
