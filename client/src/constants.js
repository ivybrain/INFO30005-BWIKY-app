import axios from 'axios'
import { useState, useEffect } from 'react'

export const API_URL = 'https://bwiky-api.herokuapp.com'

export const useConfig = () => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!config) {
      console.log('Getting global config')
      axios(`${API_URL}/config`, { 'Access-Control-Allow-Origin': '*' })
        .then((res) => {
          console.log(res.data)
          setConfig(res.data)
          setLoading(false)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
    }
  }, [config])

  return {
    loading,
    config,
    error,
  }
}
