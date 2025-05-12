using HeThongBaiXe;
using HeThongBaiXe.Models;

namespace QLKS.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IRepository<BangPhiGuiXe> _pRepository;
        private IRepository<ChiTietGuiXe> _cvRepository;
        private IRepository<ChoDeXe> _pdpRepository;
        private IRepository<HoaDon> _hhRepository;
        private IRepository<PhuongTien> _uRepository;
        private IRepository<TaiKhoan> _tRepository;
        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }
        public IRepository<BangPhiGuiXe> BangPhiGuiXeRepository => _pRepository ??= new RepositoryBase<BangPhiGuiXe>(_context);
        public IRepository<ChiTietGuiXe> ChiTietGuiXeRepository => _cvRepository ??= new RepositoryBase<ChiTietGuiXe>(_context);
        public IRepository<ChoDeXe> ChoDeXeRepository => _pdpRepository ??= new RepositoryBase<ChoDeXe>(_context);
        public IRepository<HoaDon> HoaDonRepository => _hhRepository ??= new RepositoryBase<HoaDon>(_context);
        public IRepository<PhuongTien> PhuongTienRepository => _uRepository ??= new RepositoryBase<PhuongTien>(_context);
        public IRepository<TaiKhoan> TaiKhoanRepository => _tRepository ??= new RepositoryBase<TaiKhoan>(_context);


        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
