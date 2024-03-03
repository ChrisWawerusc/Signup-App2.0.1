import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SignupForm.css';

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      console.log(response.data); // handle success
    } catch (error) {
      setError(error.response.data.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Apply slide-in animation when component mounts
    document.querySelector('.signup-form-container').classList.add('slide-in');
  }, []);

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      </form>
    </div>
  );
}

export default SignupForm;
