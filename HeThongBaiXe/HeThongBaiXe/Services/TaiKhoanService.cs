using HeThongBaiXe.Models;
using QLKS.Data;

namespace HeThongBaiXe.Services
{
    public interface ITaiKhoanService
    {
        void Save();
        void insertTaiKhoan(TaiKhoan TaiKhoan);
        void updateTaiKhoan(int id);
        TaiKhoan checkLogin(string tenDN, string password);
        TaiKhoan getTaiKhoanById(int id);

        bool IsUserNameExist(string tenDN);
    }
    public class TaiKhoanService : ITaiKhoanService
    {
        private readonly IUnitOfWork _unitOfWork;
        public TaiKhoanService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public TaiKhoan getTaiKhoanById(int id)
        {
            return _unitOfWork.TaiKhoanRepository.GetById(id);
        }

        public void insertTaiKhoan(TaiKhoan TaiKhoan)
        {
            _unitOfWork.TaiKhoanRepository.Add(TaiKhoan);
            Save();
        }

        public void Save()
        {
            _unitOfWork.SaveChanges();
        }

        public void updateTaiKhoan(int id)
        {
            var taiKhoan = _unitOfWork.TaiKhoanRepository.GetById(id);
            if(taiKhoan != null)
            {
                _unitOfWork.TaiKhoanRepository.Update(taiKhoan);
                Save();
            }
            else
            {
                throw new Exception("Tài khoản không tồn tại.");
            }
        }
        public TaiKhoan checkLogin(string tenDN, string password)
        {
            var user = _unitOfWork.TaiKhoanRepository.GetAll().FirstOrDefault(u => u.TenDangNhap == tenDN && u.MatKhau == password);
            return user;
        }
        public bool IsUserNameExist(string tenDN)
        {
            return _unitOfWork.TaiKhoanRepository
                .GetAll()
                .Any(u => u.HoTen == tenDN);
        }
    }
}
