import React, {useCallback, useEffect, useState} from 'react';
import CreateChoDeXe from "./CreateChoDeXe";
import EditChoDeXe from "./EditChoDeXe";

interface ChoDeXe {
  id: number;
  viTri: string;
  trangThai: string;
}

const ChoDeXeList: React.FC = () => {
  const [data, setData] = useState<ChoDeXe[]>([]);
  const [trangThai, setTrangThai] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const url = trangThai
          ? `https://localhost:7537/api/admin/cho-de-xe?trangThai=${encodeURIComponent(trangThai)}`
          : `https://localhost:7537/api/admin/cho-de-xe`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
        }
      });

      if (response.ok) {
        const result = await response.json();
        const sortedData = (result.data || result).sort((a: ChoDeXe, b: ChoDeXe) =>
            a.viTri.localeCompare(b.viTri, 'vi', {numeric: true, sensitivity: 'base'})
        );
        setData(sortedData);
      } else {
        alert('Lỗi khi tải danh sách!');
      }
    } catch (error) {
      alert('Lỗi kết nối server!');
    }
  }, [trangThai]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowEdit(true);
  };

  const onAddSuccess = () => {
    setShowModal(false);
    fetchData();
  }

  const onEditSuccess = () => {
    setShowEdit(false);
    setEditId(null);
    fetchData();
  };

  const onEditCancel = () => {
    setShowEdit(false);
    setEditId(null);
  };

  return (
    <div className="container py-4">
      <h2>Danh sách chỗ đỗ xe</h2>

      <div className="mb-3 d-flex align-items-center gap-2">
        <select
          className="form-select"
          value={trangThai}
          onChange={(e) => setTrangThai(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="">-- Tất cả --</option>
          <option value="Trống">Trống</option>
          <option value="Đã đầy">Đã đầy</option>
        </select>
        <div>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle me-1"></i> Tạo mới
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>Vị trí</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.viTri}</td>
                <td className="text-center">{item.trangThai}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary rounded-pill"
                    onClick={() => handleEdit(item.id)}
                  >
                    <i className="bi bi-pencil-square me-1"></i>Sửa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
          <div
              className="modal fade show d-block"
              tabIndex={-1}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          >
            <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
              <div className="modal-content rounded-4 shadow p-3 border-0">
                <div className="modal-header border-0 pb-2">
                  <h5 className="modal-title d-flex align-items-center text-primary fw-bold">
                    <i className="bi bi-plus-circle me-2"></i> Tạo chỗ đỗ xe
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body px-3">
                  <CreateChoDeXe
                      onSuccess={onAddSuccess}
                      onCancel={() => setShowModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
      )}

      {showEdit && editId !== null && (
          <div
              className="modal fade show d-block"
              tabIndex={-1}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          >
            <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
              <div className="modal-content rounded-4 shadow p-3 border-0">
                <div className="modal-header border-0 pb-2">
                  <h5 className="modal-title d-flex align-items-center text-primary fw-bold">
                    <i className="bi bi-pencil-square me-2"></i> Cập nhật chỗ đỗ xe
                  </h5>
                  <button type="button" className="btn-close" onClick={onEditCancel} />
                </div>
                <div className="modal-body px-3">
                  <EditChoDeXe id={editId} onSuccess={onEditSuccess} onCancel={onEditCancel} />
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default ChoDeXeList;