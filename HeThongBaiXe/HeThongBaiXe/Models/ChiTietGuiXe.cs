namespace HeThongBaiXe.Models
{
    public class ChiTietGuiXe
    {
        public int Id { get; set; }
        public int ChoDeXeId { get; set; }
        public ChoDeXe ChoDeXe { get; set; }
        public int PhuongTienId { get; set; }
        public PhuongTien PhuongTien { get; set; }
        public DateTime NgayGui { get; set; }
        public DateTime? NgayRa { get; set; }

        public string TrangThai { get; set; } = "ChuaLay";
        public string PhuongThucThanhToan { get; set; }
    }
}
