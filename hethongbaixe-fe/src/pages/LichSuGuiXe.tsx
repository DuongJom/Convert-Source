import React, { useEffect, useState } from 'react';

interface ChiTietGuiXe {
    phuongTienId: number;
    choDeXeId: number;
    ngayGui: string;
    ngayRa: string | null;
}

const LichSuGuiXe: React.FC = () => {
    const [data, setData] = useState<ChiTietGuiXe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('https://localhost:7537/api/admin/lich-su-gui-xe', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
            },
        })
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error('Lỗi khi tải lịch sử:', err);
                setLoading(false);
            });
    }, []);

    const formatDateTime = (dateStr: string | null) => {
        if (!dateStr) return 'Chưa lấy';
        const date = new Date(dateStr);
        if (isNaN(date.getTime()) || dateStr === '0001-01-01T00:00:00') return 'Chưa lấy';
        return date.toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="text-center mt-4">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Lịch sử gửi xe</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Phương tiện ID</th>
                    <th>Chỗ để xe ID</th>
                    <th>Ngày gửi</th>
                    <th>Ngày ra</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.phuongTienId}</td>
                        <td>{item.choDeXeId}</td>
                        <td>{formatDateTime(item.ngayGui)}</td>
                        <td>{formatDateTime(item.ngayRa)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LichSuGuiXe;
