using HeThongBaiXe.Models;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface IChoDeXeService
    {
        void Save();
        void insertChoDeXe(ChoDeXe ChoDeXe);
        void updateChoDeXe(int id);
        ChoDeXe getChoDeXeById(int id);
        IEnumerable<ChoDeXe> getAll();
        List<ChoDeXe> GetChoDeXeConTrong();
    }
    public class ChoDeXeService : IChoDeXeService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ChoDeXeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public List<ChoDeXe> GetChoDeXeConTrong()
        {
            return _unitOfWork.ChoDeXeRepository
                .GetAll()
                .Where(c => c.TrangThai == "Trống")
                .ToList();
        }

        public ChoDeXe getChoDeXeById(int id)
        {
            return _unitOfWork.ChoDeXeRepository.GetById(id);
        }

        public void insertChoDeXe(ChoDeXe ChoDeXe)
        {
            _unitOfWork.ChoDeXeRepository.Add(ChoDeXe);
            Save();
        }

        public void Save()
        {
            _unitOfWork.SaveChanges();
        }

        public void updateChoDeXe(int id)
        {
            var ChoDeXe = _unitOfWork.ChoDeXeRepository.GetById(id);
            if (ChoDeXe != null)
            {
                _unitOfWork.ChoDeXeRepository.Update(ChoDeXe);
                Save();
            }
            else
            {
                throw new Exception("Chỗ để xe không tồn tại.");
            }
        }
        public IEnumerable<ChoDeXe> getAll()
        {
            return _unitOfWork.ChoDeXeRepository.GetAll();
        }
    }
}
