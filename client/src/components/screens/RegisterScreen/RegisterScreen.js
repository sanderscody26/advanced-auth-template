import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import './registerScreen.css'

const RegisterScreen = (history) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/')
    }
  }, [navigate])

  const registerHandler = async (e) => {
    e.preventDefault()

    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    if (password !== confirmPassword) {
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        setError('')
      }, 5000)
      return setError('Passwords do not match')
    }

    try {
      const { data } = await axios.post(
        '/api/auth/register',
        {
          username,
          email,
          password
        },
        config
      )

      localStorage.setItem('authToken', data.token)
      navigate('/')
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <div className='register-screen'>
      <form onSubmit={registerHandler} className='register-screen__form'>
        <h3 className='register-screen__title'>Register</h3>
        {error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='name'>Username:</label>
          <input
            type='text'
            required
            id='name'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            required
            id='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            required
            id='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='confirmpassword'>Confirm Password:</label>
          <input
            type='password'
            required
            id='confirmpassword'
            placeholder='Retype Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Register
        </button>

        <span className='register-screen__subtext'>
          Already have an account? <Link to='/login'>Login Here</Link>
        </span>
      </form>
    </div>
  )
}

export default RegisterScreen
