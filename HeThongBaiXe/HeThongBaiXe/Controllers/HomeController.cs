using HeThongBaiXe.DTOs;
using HeThongBaiXe.Models;
using HeThongBaiXe.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HeThongBaiXe.Controllers
{
    [Route("api")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ITaiKhoanService _taiKhoanService;
        private readonly IPhuongTienService _phuongTienService;
        private readonly IChoDeXeService _choDeXeService;
        private readonly IChiTietGuiXeService _chiTietGuiXeService;
        private readonly JwtService _jwtService;

        public HomeController(
            ITaiKhoanService taiKhoanService,
            IPhuongTienService phuongTienService,
            IChoDeXeService choDeXeService,
            IChiTietGuiXeService chiTietGuiXeService,
            JwtService jwtService)
        {
            _taiKhoanService = taiKhoanService;
            _phuongTienService = phuongTienService;
            _choDeXeService = choDeXeService;
            _chiTietGuiXeService = chiTietGuiXeService;
            _jwtService = jwtService;
        }

        // LOGIN
        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] TaiKhoanLoginDto dto)
        {
            var user = _taiKhoanService.checkLogin(dto.TenDangNhap, dto.MatKhau);
            if (user == null)
                return Unauthorized(new { message = "Sai tên đăng nhập hoặc mật khẩu" });

            var token = _jwtService.GenerateToken(user.Id.ToString(), user.Role);
            return Ok(new { accessToken = token});
        }

        // REGISTER
        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] TaiKhoan model)
        {
            if (_taiKhoanService.IsUserNameExist(model.TenDangNhap))
                return Conflict(new { message = "Tên đăng nhập đã tồn tại" });

            model.Role = "KhachHang";
            _taiKhoanService.insertTaiKhoan(model);

            // Có thể tự động trả về token để đăng nhập sau khi đăng ký
            return Ok(model);
        }

        // ĐĂNG KÝ XE
        [HttpPost("dang-ky-xe")]
        //[Authorize(Roles = "KhachHang")]
        public IActionResult DangKyXe([FromBody] DangKyXeDto model)
        {
            var userId = _jwtService.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var parsedUserId = default(int);
            var _ = int.TryParse(userId, out parsedUserId);

            var phuongTien = new PhuongTien
            {
                BienSo = model.BienSo,
                LoaiXe = model.LoaiXe,
                HoTenChuXe = model.HoTenChuXe,
                Sdt = model.Sdt,
                CCCD = model.CCCD,
                MaCaVet = model.MaCaVet,
                TaiKhoanId = parsedUserId
            };
            _phuongTienService.DangKyPhuongTien(phuongTien);
            return Ok(new { message = "Đăng ký xe thành công" });
        }

        // CHỖ ĐỖ TRỐNG
        [HttpGet("cho-de-trong")]
        //[Authorize(Roles = "KhachHang")]
        public IActionResult ChoDeTrong()
        {
            var userId = _jwtService.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var parsedUserId = default(int);
            var _ = int.TryParse(userId, out parsedUserId);

            var danhSachCho = _choDeXeService.GetChoDeXeConTrong();
            var danhSachXe = _phuongTienService.GetPhuongTienByTaiKhoanId(parsedUserId);

            return Ok(new { DanhSachCho = danhSachCho, DanhSachXe = danhSachXe });
        }

        // GỬI XE
        [HttpPost("gui-xe")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult GuiXe([FromBody] GuiXeDto dto)
        {
            _chiTietGuiXeService.GuiXe(dto.PhuongTienId, dto.ChoDeXeId);
            return Ok(new { message = "Gửi xe thành công" });
        }

        // DANH SÁCH XE
        [HttpGet("danh-sach-xe")]
        public IActionResult DanhSachXe()
        {
            var userId = _jwtService.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var parsedUserId = default(int);
            var _ = int.TryParse(userId, out parsedUserId);

            var danhSachXe = _phuongTienService.GetPhuongTienByTaiKhoanId(parsedUserId);
            return Ok(new { data = danhSachXe });
        }

        // DANH SÁCH GỬI XE
        [HttpGet("danh-sach-gui-xe")]
        public IActionResult DanhSachGuiXe()
        {
            var userId = _jwtService.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var parsedUserId = default(int);
            var _ = int.TryParse(userId, out parsedUserId);

            var danhSachGuiXe = _chiTietGuiXeService.GetDanhSachGuiXeTheoTaiKhoan(parsedUserId);
            return Ok(new { danhSachXe = danhSachGuiXe });
        }

        // LẤY XE
        [HttpPost("lay-xe/{chiTietGuiXeId}")]
        public IActionResult LayXe(int chiTietGuiXeId)
        {
            _chiTietGuiXeService.LayXe(chiTietGuiXeId);
            return Ok(new { message = "Đã lấy xe" });
        }

        // XEM THÔNG TIN THANH TOÁN
        [HttpGet("thanh-toan/{chiTietGuiXeId}")]
        public IActionResult ThanhToan(int chiTietGuiXeId)
        {
            var ct = _chiTietGuiXeService.GetById(chiTietGuiXeId);
            if (ct == null) return NotFound(new { message = "Không tìm thấy dữ liệu" });
            return Ok(new { data = ct });
        }

        // THỰC HIỆN THANH TOÁN
        [HttpPost("thanh-toan")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult ThanhToan([FromBody] ThanhToanDto dto)
        {
            _chiTietGuiXeService.TaoYeuCauLayXe(dto.ChiTietGuiXeId, dto.PhuongThuc);
            return Ok(new { message = "Yêu cầu lấy xe đã được gửi" });
        }
    }
}
