using HeThongBaiXe.DTOs;
using HeThongBaiXe.Models;
using HeThongBaiXe.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HeThongBaiXe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IChoDeXeService _choDeXeService;
        private readonly IBangPhiGuiXeService _bangPhiGuiXeService;
        private readonly ITaiKhoanService _taikhoanService;
        private readonly IChiTietGuiXeService _chiTietGuiXeService;
        private readonly JwtService _jwtService;

        public AdminController(
            IChoDeXeService choDeXeService,
            IBangPhiGuiXeService bangPhiGuiXeService,
            ITaiKhoanService taikhoanService,
            IChiTietGuiXeService chiTietGuiXeService,
            JwtService jwtService)
        {
            _choDeXeService = choDeXeService;
            _bangPhiGuiXeService = bangPhiGuiXeService;
            _taikhoanService = taikhoanService;
            _chiTietGuiXeService = chiTietGuiXeService;
            _jwtService = jwtService;
        }

        [HttpGet("cho-de-xe")]
        public IActionResult GetChoDeXeList([FromQuery] string? trangThai)
        {
            var list = _choDeXeService.getAll();
            if (!string.IsNullOrEmpty(trangThai))
                list = list.Where(x => x.TrangThai == trangThai).ToList();
            return Ok(list);
        }

        [HttpGet("cho-de-xe/{id}")]
        public IActionResult GetChoDeXeById(int id)
        {
            var result = _choDeXeService.getChoDeXeById(id);
            if (result == null) return NotFound();
            return Ok(new { choDeXe = result });
        }

        [HttpPost("cho-de-xe")]
        public IActionResult CreateChoDeXe([FromBody] TaoChoDeXeDto choDeXe)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var choDeXeModel = new ChoDeXe
            {
                ViTri = choDeXe.ViTri,
                TrangThai = "Trống"
            };
            _choDeXeService.insertChoDeXe(choDeXeModel);
            return Ok();
        }

        [HttpPut("cho-de-xe/{id}")]
        public IActionResult UpdateChoDeXe(int id, [FromBody] ChoDeXe choDeXe)
        {
            if (id != choDeXe.Id) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _choDeXeService.updateChoDeXe(id, choDeXe);
            return Ok();
        }

        [HttpGet("bang-phi-gui-xe")]
        public IActionResult GetBangPhiList()
        {
            var list = _bangPhiGuiXeService.getAll();
            return Ok(new { listPhiGuiXe = list });
        }

        [HttpGet("bang-phi-gui-xe/{id}")]
        public IActionResult GetBangPhiById(int id)
        {
            var result = _bangPhiGuiXeService.getBangPhiGuiXeById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("bang-phi-gui-xe")]
        public IActionResult CreateBangPhi([FromBody] BangPhiGuiXe data)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _bangPhiGuiXeService.insertBangPhiGuiXe(data);
            return Ok();
        }

        [HttpPut("bang-phi-gui-xe/{id}")]
        public IActionResult UpdateBangPhi(int id, [FromBody] BangPhiGuiXe data)
        {
            if (id != data.Id) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _bangPhiGuiXeService.updateBangPhiGuiXe(id, data);
            return Ok();
        }

        [HttpDelete("bang-phi-gui-xe/{id}")]
        public IActionResult DeleteBangPhi(int id)
        {
            _bangPhiGuiXeService.deleteBangPhiGuiXe(id);
            return Ok();
        }

        [HttpGet("lich-su-gui-xe")]
        public IActionResult GetLichSuGuiXe()
        {
            var data = _chiTietGuiXeService.GetAllLichSuGuiXe();
            return Ok(data);
        }

        [HttpPost("duyet-lay-xe/{id}")]
        public IActionResult DuyetLayXe(int id)
        {
            _chiTietGuiXeService.DuyetLayXe(id);
            return Ok();
        }

        [HttpGet("yeu-cau-duyet")]
        public IActionResult GetYeuCauDuyet()
        {
            var data = _chiTietGuiXeService
                .GetAllLichSuGuiXe()
                .Where(x => x.TrangThai == "ChoDuyet")
                .ToList();
            return Ok(data);
        }

        [HttpPost("thong-ke")]
        public IActionResult ThongKe([FromQuery] string kieuThongKe, [FromQuery] DateTime? ngay, [FromQuery] int? thang, [FromQuery] int? nam)
        {
            double ketQua = 0;
            switch (kieuThongKe)
            {
                case "Ngay":
                    if (ngay.HasValue) ketQua = _chiTietGuiXeService.ThongKeTheoNgay(ngay.Value);
                    break;
                case "Thang":
                    if (thang.HasValue && nam.HasValue) ketQua = _chiTietGuiXeService.ThongKeTheoThang(thang.Value, nam.Value);
                    break;
                case "Nam":
                    if (nam.HasValue) ketQua = _chiTietGuiXeService.ThongKeTheoNam(nam.Value);
                    break;
            }
            return Ok(ketQua);
        }
    }
}