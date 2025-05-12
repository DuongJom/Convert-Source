namespace HeThongBaiXe.Models
{
    public class HoaDon
    {
        public int Id { get; set; }
        public int ChiTietGuiXeId { get; set; }
        public ChiTietGuiXe ChiTietGuiXe { get; set; }
        public int BangPhiGuiXeId { get; set; }
        public BangPhiGuiXe BangPhiGuiXe { get; set; }
        public double TongHoaDon { get; set; }
    }
}
