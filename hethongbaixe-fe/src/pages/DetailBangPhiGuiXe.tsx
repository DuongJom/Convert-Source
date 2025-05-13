// src/components/admin/BangPhiGuiXeDetails.tsx
import React from 'react';

type BangPhiGuiXe = {
  id: number;
  loaiXe: string;
  giaGui: number;
  loaiGui: string;
};

type Props = {
  data: BangPhiGuiXe;
  onClose: () => void;
};

const BangPhiGuiXeDetails: React.FC<Props> = ({ data, onClose }) => {
  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chi tiết bảng phí gửi xe</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <dl className="row">
              <dt className="col-sm-4">Loại xe</dt>
              <dd className="col-sm-8">{data.loaiXe}</dd>

              <dt className="col-sm-4">Giá gửi</dt>
              <dd className="col-sm-8">{data.giaGui.toLocaleString()} đ</dd>

              <dt className="col-sm-4">Loại gửi</dt>
              <dd className="col-sm-8">{data.loaiGui}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BangPhiGuiXeDetails;
