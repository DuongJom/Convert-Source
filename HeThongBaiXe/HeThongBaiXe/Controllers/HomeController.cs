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
                return Unauthorized("Sai tên đăng nhập hoặc mật khẩu");

            var token = _jwtService.GenerateToken(user.Id.ToString(), user.Role);
            return Ok(new { accessToken = token});
        }

        // REGISTER
        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] TaiKhoan model)
        {
            if (_taiKhoanService.IsUserNameExist(model.TenDangNhap))
                return Conflict("Tên đăng nhập đã tồn tại");

            model.Role = "KhachHang";
            _taiKhoanService.insertTaiKhoan(model);

            // Có thể tự động trả về token để đăng nhập sau khi đăng ký
            return Ok(model);
        }

        // ĐĂNG KÝ XE
        [HttpPost("dangkyxe")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult DangKyXe([FromBody] PhuongTien model)
        {
            var userId = GetUserIdFromClaims();
            if (userId == null) return Unauthorized();

            model.TaiKhoanId = userId.Value;
            _phuongTienService.DangKyPhuongTien(model);
            return Ok("Đăng ký xe thành công");
        }

        // CHỖ ĐỖ TRỐNG
        [HttpGet("chodetrong")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult ChoDeTrong()
        {
            var userId = GetUserIdFromClaims();
            if (userId == null) return Unauthorized();

            var danhSachCho = _choDeXeService.GetChoDeXeConTrong();
            var danhSachXe = _phuongTienService.GetPhuongTienByTaiKhoanId(userId.Value);

            return Ok(new { DanhSachCho = danhSachCho, DanhSachXe = danhSachXe });
        }

        // GỬI XE
        [HttpPost("guixe")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult GuiXe([FromBody] GuiXeDto dto)
        {
            _chiTietGuiXeService.GuiXe(dto.PhuongTienId, dto.ChoDeXeId);
            return Ok("Gửi xe thành công");
        }

        // DANH SÁCH XE
        [HttpGet("danhsachxe")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult DanhSachXe()
        {
            var userId = GetUserIdFromClaims();
            if (userId == null) return Unauthorized();

            var danhSachXe = _phuongTienService.GetPhuongTienByTaiKhoanId(userId.Value);
            return Ok(danhSachXe);
        }

        // DANH SÁCH GỬI XE
        [HttpGet("danhsachguixe")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult DanhSachGuiXe()
        {
            var userId = GetUserIdFromClaims();
            if (userId == null) return Unauthorized();

            var danhSachGuiXe = _chiTietGuiXeService.GetDanhSachGuiXeTheoTaiKhoan(userId.Value);
            return Ok(danhSachGuiXe);
        }

        // LẤY XE
        [HttpPost("layxe/{chiTietGuiXeId}")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult LayXe(int chiTietGuiXeId)
        {
            _chiTietGuiXeService.LayXe(chiTietGuiXeId);
            return Ok("Đã lấy xe");
        }

        // XEM THÔNG TIN THANH TOÁN
        [HttpGet("thanhtoan/{chiTietGuiXeId}")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult ThanhToan(int chiTietGuiXeId)
        {
            var ct = _chiTietGuiXeService.GetById(chiTietGuiXeId);
            if (ct == null) return NotFound("Không tìm thấy dữ liệu");
            return Ok(ct);
        }

        // THỰC HIỆN THANH TOÁN
        [HttpPost("thanhtoan")]
        [Authorize(Roles = "KhachHang")]
        public IActionResult ThanhToan([FromBody] ThanhToanDto dto)
        {
            _chiTietGuiXeService.TaoYeuCauLayXe(dto.ChiTietGuiXeId, dto.PhuongThuc);
            return Ok("Yêu cầu lấy xe đã được gửi");
        }

        // Helper method: lấy userId từ JWT claims
        private int? GetUserIdFromClaims()
        {
            var claim = User.Claims.FirstOrDefault(x => x.Type == "UserId");
            if (claim == null) return null;
            return int.TryParse(claim.Value, out var id) ? id : null;
        }
    }
}
