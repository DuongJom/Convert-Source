using HeThongBaiXe.Models;
using Microsoft.EntityFrameworkCore;

namespace HeThongBaiXe
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<ChoDeXe> ChoDeXes { get; set; }
        public DbSet<ChiTietGuiXe> ChiTietGuiXes { get; set; }
        public DbSet<BangPhiGuiXe> BangPhiGuiXes { get; set; }
        public DbSet<HoaDon> HoaDons { get; set; }
        public DbSet<PhuongTien> PhuongTiens { get; set; }
        public DbSet<TaiKhoan> TaiKhoans { get; set; }
    }
}
