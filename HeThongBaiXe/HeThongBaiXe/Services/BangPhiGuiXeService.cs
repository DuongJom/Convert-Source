using HeThongBaiXe.Models;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface IBangPhiGuiXeService
    {
        Task Save();
        Task insertBangPhiGuiXe(BangPhiGuiXe BangPhiGuiXe);
        Task updateBangPhiGuiXe(int id, BangPhiGuiXe bangPhiGuiXe);
        Task deleteBangPhiGuiXe(int id);
        BangPhiGuiXe getBangPhiGuiXeById(int id);
        IEnumerable<BangPhiGuiXe> getAll();
    }
    public class BangPhiGuiXeService : IBangPhiGuiXeService
    {
        private readonly IUnitOfWork _unitOfWork;
        public BangPhiGuiXeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public BangPhiGuiXe getBangPhiGuiXeById(int id)
        {
            return _unitOfWork.BangPhiGuiXeRepository.GetById(id);
        }

        public async Task insertBangPhiGuiXe(BangPhiGuiXe BangPhiGuiXe)
        {
            _unitOfWork.BangPhiGuiXeRepository.Add(BangPhiGuiXe);
            await Save();
        }

        public async Task Save()
        {
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task updateBangPhiGuiXe(int id, BangPhiGuiXe bangPhiGuiXe)
        {
            var _BangPhiGuiXe = _unitOfWork.BangPhiGuiXeRepository.GetById(id);
            if (_BangPhiGuiXe != null)
            {
                _BangPhiGuiXe.LoaiXe = bangPhiGuiXe.LoaiXe;
                _BangPhiGuiXe.LoaiGui = bangPhiGuiXe.LoaiGui;
                _BangPhiGuiXe.GiaGui = bangPhiGuiXe.GiaGui;
                _unitOfWork.BangPhiGuiXeRepository.Update(_BangPhiGuiXe);
                await Save();
            }
            else
            {
                throw new Exception("Chỗ để xe không tồn tại.");
            }
        }
        public IEnumerable<BangPhiGuiXe> getAll()
        {
            return _unitOfWork.BangPhiGuiXeRepository.GetAll();
        }

        public async Task deleteBangPhiGuiXe(int id)
        {
            var BangPhiGuiXe = _unitOfWork.BangPhiGuiXeRepository.GetById(id);
            if (BangPhiGuiXe != null)
            {
                _unitOfWork.BangPhiGuiXeRepository.Delete(BangPhiGuiXe);
                await Save();
            }
            else
            {
                throw new Exception("Chỗ để xe không tồn tại.");
            }
        }
    }
}
