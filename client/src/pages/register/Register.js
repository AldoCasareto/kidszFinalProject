import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import { Radio, RadioGroup } from '@chakra-ui/react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [shortBio, setShortBio] = useState('');
  const [value, setValue] = useState(1);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      email,
      shortBio,
    };

    try {
      const res = await axios.post('auth/register', newUser);
      setError(false);
      res.data && window.location.replace('/login');
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form action='' className='registerForm' onSubmit={handleRegistration}>
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          autoFocus={true}
          className='registerInput'
          type='text'
          placeholder='Enter your username...'
        />
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className='registerInput'
          type='text'
          placeholder='Enter your email...'
        />
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className='registerInput'
          type='password'
          placeholder='Enter your password...'
        />
       
        <label>Short Bio</label>
        <textarea
          cols='20'
          rows='10'
          onChange={(e) => setShortBio(e.target.value)}
          className='registerInput'
          type='text'
          placeholder='Enter short Bio...'
        ></textarea>
        <button type='submit' className='registerButton'>
          Register
        </button>
      </form>
      <button className='registerLoginButton'>
        <Link className='link' to='/login'>
          Login
        </Link>
      </button>
      {error && (
        <p style={{ color: 'red' }}>Registration failed, check your details</p>
      )}
    </div>
  );
};

export default Register;
