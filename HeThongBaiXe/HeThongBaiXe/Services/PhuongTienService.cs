using HeThongBaiXe.Models;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface IPhuongTienService
    {
        Task Save();
        Task insertPhuongTien(PhuongTien PhuongTien);
        Task updatePhuongTien(int id);
        PhuongTien getPhuongTienById(int id);

        Task DangKyPhuongTien(PhuongTien phuongTien);
        List<PhuongTien> GetPhuongTienByTaiKhoanId(int taiKhoanId);
    }
    public class PhuongTienService : IPhuongTienService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PhuongTienService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task DangKyPhuongTien(PhuongTien phuongTien)
        {
            _unitOfWork.PhuongTienRepository.Add(phuongTien);
            await _unitOfWork.SaveChangesAsync();
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

        public async Task insertPhuongTien(PhuongTien PhuongTien)
        {
            _unitOfWork.PhuongTienRepository.Add(PhuongTien);
            await Save();
        }

        public async Task Save()
        {
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task updatePhuongTien(int id)
        {
            var PhuongTien = _unitOfWork.PhuongTienRepository.GetById(id);
            if (PhuongTien != null)
            {
                _unitOfWork.PhuongTienRepository.Update(PhuongTien);
                await Save();
            }
            else
            {
                throw new Exception("Phương tiện không tồn tại.");
            }
        }
    }
}
