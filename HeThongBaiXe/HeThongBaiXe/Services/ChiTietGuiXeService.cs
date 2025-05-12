using HeThongBaiXe.Models;
using Microsoft.EntityFrameworkCore;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface IChiTietGuiXeService
    {
        void GuiXe(int phuongTienId, int choDeXeId);
        List<ChiTietGuiXe> GetDanhSachGuiXeTheoTaiKhoan(int taiKhoanId);
        void LayXe(int chiTietGuiXeId);
        List<ChiTietGuiXe> GetAllLichSuGuiXe();
        public void TaoYeuCauLayXe(int chiTietGuiXeId, string phuongThucThanhToan);
        public void DuyetLayXe(int chiTietGuiXeId);
        ChiTietGuiXe GetById(int id);
        double ThongKeTheoNgay(DateTime ngay);
        double ThongKeTheoThang(int thang, int nam);
        double ThongKeTheoNam(int nam);
    }

    public class ChiTietGuiXeService : IChiTietGuiXeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        public ChiTietGuiXeService(IUnitOfWork unitOfWork, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        public void GuiXe(int phuongTienId, int choDeXeId)
        {
            // Tạo bản ghi gửi xe mới
            var chiTietGuiXe = new ChiTietGuiXe
            {
                PhuongTienId = phuongTienId,
                ChoDeXeId = choDeXeId,
                NgayGui = DateTime.Now,
                NgayRa = null,
                TrangThai = "ChuaLay",
                PhuongThucThanhToan = "Chưa thanh toán"
            };

            _unitOfWork.ChiTietGuiXeRepository.Add(chiTietGuiXe);

            // Update trạng thái chỗ đỗ xe
            var choDeXe = _unitOfWork.ChoDeXeRepository.GetById(choDeXeId);
            if (choDeXe != null)
            {
                choDeXe.TrangThai = "Đã đầy";
                _unitOfWork.ChoDeXeRepository.Update(choDeXe);
            }

            _unitOfWork.SaveChanges();
        }
        public List<ChiTietGuiXe> GetDanhSachGuiXeTheoTaiKhoan(int taiKhoanId)
        {
            var danhSachXe = _unitOfWork.PhuongTienRepository
                                .GetAll()
                                .Where(x => x.TaiKhoanId == taiKhoanId)
                                .Select(x => x.Id)
                                .ToList();

            var danhSachGuiXe = _unitOfWork.ChiTietGuiXeRepository
                                .GetAll()
                                .Where(x => danhSachXe.Contains(x.PhuongTienId))
                                .ToList();

            return danhSachGuiXe;
        }

        public void LayXe(int chiTietGuiXeId)
        {
            var chiTiet = _unitOfWork.ChiTietGuiXeRepository.GetById(chiTietGuiXeId);
            if (chiTiet != null && (chiTiet.NgayRa == null || chiTiet.NgayRa == DateTime.MinValue))
            {
                chiTiet.NgayRa = DateTime.Now;
                _unitOfWork.ChiTietGuiXeRepository.Update(chiTiet);

                // Cập nhật trạng thái chỗ đỗ xe
                var choDeXe = _unitOfWork.ChoDeXeRepository.GetById(chiTiet.ChoDeXeId);
                if (choDeXe != null)
                {
                    choDeXe.TrangThai = "Trống";
                    _unitOfWork.ChoDeXeRepository.Update(choDeXe);
                }

                _unitOfWork.SaveChanges();
            }
        }
        public List<ChiTietGuiXe> GetAllLichSuGuiXe()
        {
            return _unitOfWork.ChiTietGuiXeRepository.GetAll().ToList();
        }
        public void TaoYeuCauLayXe(int chiTietGuiXeId, string phuongThucThanhToan)
        {
            var chiTiet = _unitOfWork.ChiTietGuiXeRepository.GetById(chiTietGuiXeId);
            if (chiTiet != null)
            {
                chiTiet.TrangThai = "ChoDuyet";
                chiTiet.PhuongThucThanhToan = phuongThucThanhToan;
                chiTiet.NgayRa = DateTime.Now;

                _unitOfWork.ChiTietGuiXeRepository.Update(chiTiet);
                _unitOfWork.SaveChanges();
            }
        }
        public void DuyetLayXe(int chiTietGuiXeId)
        {
            var chiTiet = _unitOfWork.ChiTietGuiXeRepository.GetById(chiTietGuiXeId);
            if (chiTiet != null && chiTiet.TrangThai == "ChoDuyet")
            {
                chiTiet.TrangThai = "DaLay";

                var choDeXe = _unitOfWork.ChoDeXeRepository.GetById(chiTiet.ChoDeXeId);
                if (choDeXe != null)
                {
                    choDeXe.TrangThai = "Trống";
                    _unitOfWork.ChoDeXeRepository.Update(choDeXe);
                }

                _unitOfWork.ChiTietGuiXeRepository.Update(chiTiet);
                _unitOfWork.SaveChanges();
            }
        }
        public ChiTietGuiXe GetById(int id)
        {
            return _unitOfWork.ChiTietGuiXeRepository.GetById(id);
        }
        public double ThongKeTheoNgay(DateTime ngay)
        {
            var list = _context.HoaDons
                .Include(h => h.ChiTietGuiXe)
                .Where(h => h.ChiTietGuiXe.NgayRa.HasValue &&
                            h.ChiTietGuiXe.NgayRa.Value.Date == ngay.Date)
                .ToList();
            return list.Sum(h => h.TongHoaDon);
        }

        public double ThongKeTheoThang(int thang, int nam)
        {
            var list = _context.HoaDons
                .Include(h => h.ChiTietGuiXe)
                .Where(h => h.ChiTietGuiXe != null &&
                            h.ChiTietGuiXe.NgayRa.HasValue &&
                            h.ChiTietGuiXe.NgayRa.Value.Month == thang &&
                            h.ChiTietGuiXe.NgayRa.Value.Year == nam)
                .ToList();
            return list.Sum(h => h.TongHoaDon);
        }

        public double ThongKeTheoNam(int nam)
        {
            var list = _context.HoaDons
                .Include(h => h.ChiTietGuiXe)
                .Where(h => h.ChiTietGuiXe != null &&
                            h.ChiTietGuiXe.NgayRa.HasValue &&
                            h.ChiTietGuiXe.NgayRa.Value.Year == nam)
                .ToList();

            return list.Sum(h => h.TongHoaDon);
        }
    }
}
