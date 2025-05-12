using HeThongBaiXe.Models;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface IPhuongTienService
    {
        void Save();
        void insertPhuongTien(PhuongTien PhuongTien);
        void updatePhuongTien(int id);
        PhuongTien getPhuongTienById(int id);

        void DangKyPhuongTien(PhuongTien phuongTien);
        List<PhuongTien> GetPhuongTienByTaiKhoanId(int taiKhoanId);
    }
    public class PhuongTienService : IPhuongTienService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PhuongTienService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public void DangKyPhuongTien(PhuongTien phuongTien)
        {
            _unitOfWork.PhuongTienRepository.Add(phuongTien);
            _unitOfWork.SaveChanges();
        }

        public List<PhuongTien> GetPhuongTienByTaiKhoanId(int taiKhoanId)
        {
            return _unitOfWork.PhuongTienRepository.GetAll()
                .Where(x => x.TaiKhoanId == taiKhoanId)
                .ToList();
        }

        public PhuongTien getPhuongTienById(int id)
        {
            return _unitOfWork.PhuongTienRepository.GetById(id);
        }

        public void insertPhuongTien(PhuongTien PhuongTien)
        {
            _unitOfWork.PhuongTienRepository.Add(PhuongTien);
            Save();
        }

        public void Save()
        {
            _unitOfWork.SaveChanges();
        }

        public void updatePhuongTien(int id)
        {
            var PhuongTien = _unitOfWork.PhuongTienRepository.GetById(id);
            if (PhuongTien != null)
            {
                _unitOfWork.PhuongTienRepository.Update(PhuongTien);
                Save();
            }
            else
            {
                throw new Exception("Phương tiện không tồn tại.");
            }
        }
    }
}
