import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
  }

  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};


const styles = {
  container: {
    backgroundColor: '#d3d3d3',
    minHeight: '100vh', // Ensures the background covers the full height
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
};

export default Layout;
