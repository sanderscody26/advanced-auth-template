import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './privateScreen.css'

const PrivateScreen = () => {
  const [error, setError] = useState('')
  const [privateData, setPrivateData] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      }

      try {
        const { data } = await axios.get('/api/private', config)
        setPrivateData(data.data)

        
      } catch (error) {
        localStorage.removeItem('authToken')
        setError('You are not authorized please login')
      }
    }

    fetchPrivateDate()
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return error ? (
    <span className='error-message'>{error}</span>
  ) : (
    <>
      <div style={{ background: 'green', color: 'white' }}>{privateData}</div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default PrivateScreen
