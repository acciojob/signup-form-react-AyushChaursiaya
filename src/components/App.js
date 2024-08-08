

import React, { useState } from 'react'

function App() {
  const [formValue, setFormValue] = useState({ name: '', email: '', gender: 'male', password: '', phone: '' });
  const [error, setError] = useState('');
  const [sucess, setSucess] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log('name =>', name)
    console.log('value =>', value)
  }


  const validData = () => {
    const { name, email, gender, phone, password } = formValue;

    if (!name || !email || !phone || !password) {
      return 'All fields are mandatory';
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
      return 'Name is not alphanumeric.';
    }

    if (!email.includes('@')) {
      return 'Email must contain @.';
    }

    if (!['male', 'female', 'other'].includes(gender)) {
      return ' Please identify as male, female or others';
    }

    if (!/^\d+$/.test(phone)) {
      return 'Phone Number must contain only numbers';
    }

    if (password.length < 6) {
      return 'Password must contain at least 6 letters';
    }

    return '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validData();
    console.log(validationError);
    if (validationError) {
      setError(validationError);
      setSucess('');
    } else {
      const username = formValue.email.split('@')[0];
      setSucess(`Hello ${username}`);
      setError('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type='text' placeholder='Enter Name' name='name' data-testid='name' value={formValue.name} onChange={handleChange} />
        </div>

        <div>
          <label>Email address:</label>
          <input type='text' placeholder='Enter Email' name='email' data-testid='email' value={formValue.email} onChange={handleChange} />
        </div>

        <div>
          <label>Gender</label>
          <select value={formValue.gender} onChange={handleChange} name='gender' data-testid='gender' >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div>
          <label>Phone Number:</label>
          <input type='text' placeholder='Phone Numbe' name='phone' data-testid='phoneNumber' value={formValue.phone} onChange={handleChange} />
        </div>

        <div>
          <label>Password:</label>
          <input type='text' placeholder='Enter Password' name='password' data-testid='password' value={formValue.password} onChange={handleChange} />
        </div>

        <button type='submit' data-testid='submit'>Submit button</button>
      </form>
      {error && <span>{error}</span>}
      {sucess && <span>{sucess}</span>}
    </div>
  )
}

export default App;
