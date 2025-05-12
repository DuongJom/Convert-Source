using HeThongBaiXe.Models;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface IBangPhiGuiXeService
    {
        void Save();
        void insertBangPhiGuiXe(BangPhiGuiXe BangPhiGuiXe);
        void updateBangPhiGuiXe(int id);
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

        public void insertBangPhiGuiXe(BangPhiGuiXe BangPhiGuiXe)
        {
            _unitOfWork.BangPhiGuiXeRepository.Add(BangPhiGuiXe);
            Save();
        }

        public void Save()
        {
            _unitOfWork.SaveChanges();
        }

        public void updateBangPhiGuiXe(int id)
        {
            var BangPhiGuiXe = _unitOfWork.BangPhiGuiXeRepository.GetById(id);
            if (BangPhiGuiXe != null)
            {
                _unitOfWork.BangPhiGuiXeRepository.Update(BangPhiGuiXe);
                Save();
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
    }
}
