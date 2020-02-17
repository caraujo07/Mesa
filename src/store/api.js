import axios from 'axios'

export const loginRoutine = user => new Promise((resolve, reject) => {
  axios({ url: 'https://reqres.in/api/login', data: user, method: 'POST' })
    .then(resp => {
      const token = resp.data.token
      localStorage.setItem('user-token', token)
      resolve(resp)
    })
    .catch(err => {
      localStorage.removeItem('user-token')
      reject(err)
    })
})
