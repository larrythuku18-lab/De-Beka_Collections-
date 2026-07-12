import { StrictMode, lazy, Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import './index.css';

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

function isAdminRoute() {
  return window.location.hash.startsWith('#/admin');
}

function Root() {
  const [admin, setAdmin] = useState(isAdminRoute);

  useEffect(() => {
    const onHashChange = () => setAdmin(isAdminRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (admin) {
    return (
      <Suspense fallback={<p style={{ padding: '3rem', textAlign: 'center' }}>Loading admin…</p>}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
