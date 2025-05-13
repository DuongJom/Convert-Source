import React, { useEffect, useState } from 'react';
import CreateBangPhiGuiXe from './CreateBangPhiGuiXe';
import DetailBangPhiGuiXe from './DetailBangPhiGuiXe';
import EditBangPhiGuiXe from './EditBangPhiGuiXe';

interface BangPhiGuiXe {
  id: number;
  loaiXe: string;
  giaGui: number;
  loaiGui: string;
}

const ListBangPhiGuiXe: React.FC = () => {
  const [data, setData] = useState<BangPhiGuiXe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<BangPhiGuiXe | null>(null);
  const [editingItem, setEditingItem] = useState<BangPhiGuiXe | null>(null);

  const fetchData = () => {
    setLoading(true);
    fetch('https://localhost:7537/api/admin/bang-phi-gui-xe', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setData(data.listPhiGuiXe);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi tải dữ liệu:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    fetch(`https://localhost:7537/api/admin/bang-phi-gui-xe/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
        'Content-Type': 'application/json'
        }
    })
      .then(res => {
        if (res.ok) {
          setData(data.filter(item => item.id !== id));
        } else {
          console.error('Xóa không thành công');
        }
      })
        .catch(err => {
            console.error('Lỗi khi xóa:', err);
        });
    };

    const handleShowDetail = (item: BangPhiGuiXe) => {
        setSelectedDetail(item);
    };



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Danh sách bảng phí gửi xe</h3>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-1"></i> Tạo mới
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr className='text-center'>
              <th>Loại xe</th>
              <th>Giá gửi</th>
              <th>Loại gửi</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.loaiXe}</td>
                <td className='text-end'>{item.giaGui.toLocaleString()} đ</td>
                <td className='text-center'>{item.loaiGui}</td>
                <td className='text-center'>
                  <button className="btn btn-primary btn-sm me-2 w-25" onClick={() => setEditingItem(item)}>
                    <i className="bi bi-pencil-square"></i> Sửa
                  </button>
                  <button className="btn btn-outline-info btn-sm me-2 w-25" onClick={() => handleShowDetail(item)}>
                    <i className="bi bi-info-circle"></i> Chi tiết
                  </button>
                  <button className="btn btn-outline-danger btn-sm w-25" onClick={() => handleDelete(item.id)}>
                    <i className="bi bi-trash"></i> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-md modal-dialog-centered"> 
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title"><i className="bi bi-plus-circle me-1"></i> Tạo bảng phí gửi xe</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body p-0 h-100">
                    <CreateBangPhiGuiXe
                    onSuccess={() => {
                        setShowModal(false);
                        fetchData();
                    }}
                    onCancel={() => setShowModal(false)}
                    />
                </div>
                </div>
            </div>
        </div>
      )}
    
      {editingItem && (
        <EditBangPhiGuiXe
            data={editingItem}
            onCancel={() => setEditingItem(null)}
            onSuccess={() => {
            setEditingItem(null);
            fetchData();
            }}
        />
        )}

      {selectedDetail && (
        <DetailBangPhiGuiXe
            data={selectedDetail}
            onClose={() => setSelectedDetail(null)}
        />
        )}
    </div>
  );
};

export default ListBangPhiGuiXe;
