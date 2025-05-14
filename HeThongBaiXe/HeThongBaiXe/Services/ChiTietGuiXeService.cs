using HeThongBaiXe.Models;
using Microsoft.EntityFrameworkCore;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface IChiTietGuiXeService
    {
        Task GuiXe(int phuongTienId, int choDeXeId);
        List<ChiTietGuiXe> GetDanhSachGuiXeTheoTaiKhoan(int taiKhoanId);
        Task LayXe(int chiTietGuiXeId);
        List<ChiTietGuiXe> GetAllLichSuGuiXe();
        public Task TaoYeuCauLayXe(int chiTietGuiXeId, string phuongThucThanhToan);
        public Task DuyetLayXe(int chiTietGuiXeId);
        ChiTietGuiXe GetById(int id);
        Task<double> ThongKeTheoNgay(DateTime ngay);
        Task<double> ThongKeTheoThang(int thang, int nam);
        Task<double> ThongKeTheoNam(int nam);
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

        public async Task GuiXe(int phuongTienId, int choDeXeId)
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

            await _unitOfWork.SaveChangesAsync();
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
                                .Where(x => danhSachXe.Contains(x.PhuongTienId) && (x.TrangThai == "ChuaLay" || string.IsNullOrWhiteSpace(x.TrangThai)))
                                .ToList();

            return danhSachGuiXe;
        }

        public async Task LayXe(int chiTietGuiXeId)
        {
            var chiTiet = _unitOfWork.ChiTietGuiXeRepository.GetById(chiTietGuiXeId);
            if (chiTiet != null)
            {
                chiTiet.NgayRa = DateTime.Now;
                chiTiet.TrangThai = "DaLay";
                _unitOfWork.ChiTietGuiXeRepository.Update(chiTiet);

                // Cập nhật trạng thái chỗ đỗ xe
                var choDeXe = _unitOfWork.ChoDeXeRepository.GetById(chiTiet.ChoDeXeId);
                if (choDeXe != null)
                {
                    choDeXe.TrangThai = "Trống";
                    _unitOfWork.ChoDeXeRepository.Update(choDeXe);
                }

               await _unitOfWork.SaveChangesAsync();
            }
        }
        public List<ChiTietGuiXe> GetAllLichSuGuiXe()
        {
            return _unitOfWork.ChiTietGuiXeRepository.GetAll().ToList();
        }
        public async Task TaoYeuCauLayXe(int chiTietGuiXeId, string phuongThucThanhToan)
        {
            var chiTiet = _unitOfWork.ChiTietGuiXeRepository.GetById(chiTietGuiXeId);
            if (chiTiet != null)
            {
                chiTiet.TrangThai = "ChoDuyet";
                chiTiet.PhuongThucThanhToan = phuongThucThanhToan;
                chiTiet.NgayRa = DateTime.Now;

                _unitOfWork.ChiTietGuiXeRepository.Update(chiTiet);
                await _unitOfWork.SaveChangesAsync();
            }
        }
        public async Task DuyetLayXe(int chiTietGuiXeId)
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
                await _unitOfWork.SaveChangesAsync();
            }
        }
        public ChiTietGuiXe GetById(int id)
        {
            return _unitOfWork.ChiTietGuiXeRepository.GetById(id);
        }
        public async Task<double> ThongKeTheoNgay(DateTime ngay)
        {
            var list = await _context.HoaDons
                .Include(h => h.ChiTietGuiXe)
                .Where(h => h.ChiTietGuiXe.NgayRa.HasValue &&
                            h.ChiTietGuiXe.NgayRa.Value.Date == ngay.Date)
                .ToListAsync();
            return list.Sum(h => h.TongHoaDon);
        }

        public async Task<double> ThongKeTheoThang(int thang, int nam)
        {
            var list = await _context.HoaDons
                .Include(h => h.ChiTietGuiXe)
                .Where(h => h.ChiTietGuiXe != null &&
                            h.ChiTietGuiXe.NgayRa.HasValue &&
                            h.ChiTietGuiXe.NgayRa.Value.Month == thang &&
                            h.ChiTietGuiXe.NgayRa.Value.Year == nam)
                .ToListAsync();
            return list.Sum(h => h.TongHoaDon);
        }

        public async Task<double> ThongKeTheoNam(int nam)
        {
            var list = await _context.HoaDons
                .Include(h => h.ChiTietGuiXe)
                .Where(h => h.ChiTietGuiXe != null &&
                            h.ChiTietGuiXe.NgayRa.HasValue &&
                            h.ChiTietGuiXe.NgayRa.Value.Year == nam)
                .ToListAsync();

            return list.Sum(h => h.TongHoaDon);
        }
    }
}
