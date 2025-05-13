import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Banner */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Chào mừng đến với hệ thống bãi đỗ xe thông minh</h1>
          <p className="lead">Quản lý việc gửi và lấy xe dễ dàng, nhanh chóng và an toàn</p>
          <a href="/register" className="btn btn-light btn-lg mt-3">Bắt đầu ngay</a>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Quản lý gửi xe</h5>
                  <p className="card-text">Dễ dàng gửi xe với hệ thống quản lý thông minh và chính xác.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Xem lịch sử</h5>
                  <p className="card-text">Theo dõi chi tiết các lượt gửi và lấy xe của bạn mọi lúc mọi nơi.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Bảo mật & an toàn</h5>
                  <p className="card-text">Dữ liệu người dùng và phương tiện được bảo vệ an toàn tuyệt đối.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} Hệ thống bãi đỗ xe | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
