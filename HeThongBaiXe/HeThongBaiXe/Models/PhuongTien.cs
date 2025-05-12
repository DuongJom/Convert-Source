namespace HeThongBaiXe.Models
{
    public class PhuongTien
    {
        public int Id { get; set; }
        public string BienSo { get; set; }
        public string LoaiXe { get; set; }
        public string HoTenChuXe { get; set; }
        public string Sdt { get; set; }
        public string CCCD { get; set; }
        public string MaCaVet { get; set; }
        public int TaiKhoanId { get; set; }
        public TaiKhoan TaiKhoan { get; set; }

    }
}
