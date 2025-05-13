using HeThongBaiXe.Models;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface IChoDeXeService
    {
        Task Save();
        Task insertChoDeXe(ChoDeXe ChoDeXe);
        Task updateChoDeXe(int id, ChoDeXe choDeXe);
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

        public async Task insertChoDeXe(ChoDeXe ChoDeXe)
        {
            _unitOfWork.ChoDeXeRepository.Add(ChoDeXe);
            await Save();
        }

        public async Task Save()
        {
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task updateChoDeXe(int id, ChoDeXe choDeXe)
        {
            var ChoDeXe = _unitOfWork.ChoDeXeRepository.GetById(id);
            if (ChoDeXe != null)
            {
                ChoDeXe.ViTri = choDeXe.ViTri;
                ChoDeXe.TrangThai = choDeXe.TrangThai;
                _unitOfWork.ChoDeXeRepository.Update(ChoDeXe);
                await Save();
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
