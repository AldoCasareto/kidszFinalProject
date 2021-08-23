import React, { useContext, useState } from 'react';
import './write.css';
import axios from 'axios';
import { Context } from '../../context/Context';
import { Select } from '@chakra-ui/react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const Write = () => {
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [format, setFormat] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2021-08-22T21:11:54')
  );

  console.log(selectedDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(format);
  const handlePost = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
      price,
      duration,
      age,
      bio,
      format,
      selectedDate,

    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;

      try {
        await axios.post('/upload', data);
      } catch (error) {}
    }
    try {
      const res = await axios.post('/posts', newPost);
      window.location.replace(`/post/${res.data._id}`);
    } catch (error) {}
  };

  return (
    <div className='write'>
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
      )}

      <form className='writeForm' onSubmit={handlePost}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <PhotoCameraIcon />
          </label>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder='Course Title'
            className='writeInput'
            autoFocus={true}
          />
        </div>
        <div className='writeFormGroup'>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder='Course Description'
            type='text'
            className='writeInput writeText'
          ></textarea>
          <textarea
            onChange={(e) => {
              setBio(e.target.value);
            }}
            placeholder='Bio About yourself'
            type='text'
            className='writeInput writeText'
          ></textarea>
          <Grid container justifyContent='flex-start'>
            <input
              className=' writeText'
              onChange={(e) => setPrice(e.target.value)}
              type='text'
              placeholder='Price'
              autoFocus={true}
            />
            <input
              className=' writeText'
              onChange={(e) => setDuration(e.target.value)}
              type='text'
              placeholder='Duration'
              autoFocus={true}
            />
            <input
              className=' writeText'
              onChange={(e) => setAge(e.target.value)}
              type='text'
              placeholder='Age Recommendation'
              autoFocus={true}
            />
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent='flex-start'>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='Date'
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              <KeyboardTimePicker
                margin='normal'
                id='time-picker'
                label='Time'
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <Select
            className=' writeText'
            placeholder='Format'
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value='online'>Online</option>
            <option value='inPerson'>In Person</option>
          </Select>
        </div>
        {format === 'inPerson' ? (
          <div>
            
              
              <input
                className='writeInput '
                type='text'
                placeholder='Address'
              />
            
          </div>
        ) : null}
        <button type='submit' className='writeSubmit'>
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
