import React, { useContext, useState } from 'react';
import SideBar from '../../components/sidebar/SideBar';
import { Context } from '../../context/Context';
import './settings.css';
import axios from 'axios';

const Settings = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const publicFolder = 'http://localhost:9000/images/';

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updateUser.profilePicture = filename;

      try {
        await axios.post('/upload', data);
      } catch (error) {}
    }
    try {
      const res = await axios.put('/users/' + user._id, updateUser);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsUpdateTitle'>Update your account</span>
          <span className='settingsDeleteTitle'>Delete your account</span>
        </div>
        <form onSubmit={handleUpdate} className='settingsForm'>
          <label htmlFor=''>Profile Picture</label>
          <div className='settingsPP'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : publicFolder + user.profilePicture
              }
              alt=''
            />
            <label htmlFor='fileInput'>
              <i className='settingsPPIcon far fa-user-circle'></i>
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder={user.username}
          />
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder={user.email}
          />
          <label>Password</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='settingsSubmit'>
            Update
          </button>
          {success && (
            <span style={{ color: 'green', textAlign: 'center' }}>
              Profile has been updated
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default Settings;
