import { Suspense, lazy, useState } from 'react'
import './index.css'
import Login from './components/Login'
import Chatbot from './components/Chatbot'
import { auth } from './firebase'

const ElectionAssistant = lazy(() => import('./ElectionAssistant'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('janmitra_user'));

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('janmitra_user');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem', color: '#4F46E5' }}>Loading JanMitra...</div>}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '1rem', borderRadius: '8px' }}>
            Logout
          </button>
        </div>
        <ElectionAssistant />
      </Suspense>
      <Chatbot />
    </>
  )
}

export default App
