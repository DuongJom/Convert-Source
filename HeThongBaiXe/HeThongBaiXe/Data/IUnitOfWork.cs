using HeThongBaiXe.Models;

namespace QLKS.Data
{
    public interface IUnitOfWork : IDisposable
    {
        Task<int> SaveChangesAsync();
        void SaveChanges();
        IRepository<BangPhiGuiXe> BangPhiGuiXeRepository { get; }
        IRepository<ChiTietGuiXe> ChiTietGuiXeRepository { get; }
        IRepository<ChoDeXe> ChoDeXeRepository { get; }
        IRepository<HoaDon> HoaDonRepository { get; }
        IRepository<PhuongTien> PhuongTienRepository { get; }
        IRepository<TaiKhoan> TaiKhoanRepository { get; }
    }
}
