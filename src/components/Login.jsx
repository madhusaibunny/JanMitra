import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('janmitra_user')) {
      onLogin();
    }
  }, [onLogin]);

  const saveUserToBackend = async (uid, userData) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        ...userData,
        lastLogin: serverTimestamp(),
      }, { merge: true });
    } catch (err) {
      console.error("Error saving user data:", err);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      const user = userCredential.user;
      await saveUserToBackend(user.uid, { email: user.email, provider: 'email' });
      
      localStorage.setItem('janmitra_user', email);
      onLogin();
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('janmitra_user', 'Guest');
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-header fade-in">
        <h1>Welcome to JanMitra</h1>
        <p>Your Personal Election Guide</p>
      </div>

      <div className="login-form fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', textAlign: 'center' }}>
          {isRegistering ? "Create an Account" : "Sign In to Continue"}
        </h2>

        {error && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@example.com"
              required
              className="login-input"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            <span>{loading ? "Loading..." : (isRegistering ? "Register" : "Login")}</span>
          </button>
        </form>

        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button 
            type="button" 
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            style={{ background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500 }}
          >
            {isRegistering ? "Already have an account? Login here" : "Don't have an account? Register"}
          </button>

          <div style={{ margin: '10px 0', color: '#94A3B8', fontSize: '0.9rem' }}>— OR —</div>

          <button 
            type="button" 
            onClick={handleGuestLogin}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
