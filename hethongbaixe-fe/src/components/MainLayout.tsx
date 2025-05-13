import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Props {
  username: string | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ username, onLogout, children }) => {
  const sidebarWidth = 250;

  return (
    <>
      <Navbar username={username} onLogout={onLogout} />
      <div className="d-flex">
        {username && (
          <div
            className="d-none d-md-block"
            style={{
              width: `${sidebarWidth}px`,
              flexShrink: 0,
              position: 'fixed',
              top: '56px',
              bottom: 0,
              left: 0,
              zIndex: 1000,
              backgroundColor: '#fff',
              borderRight: '1px solid #dee2e6',
            }}
          >
            <Sidebar />
          </div>
        )}

        <main
          className="flex-grow-1 p-4"
          style={{
            marginLeft: username ? (window.innerWidth >= 768 ? `${sidebarWidth}px` : '0') : '0',
            width: '100%',
            transition: 'margin-left 0.3s',
            minHeight: 'calc(100vh - 56px)'
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
