import axios from 'axios'

export const loginRoutine = user => new Promise((resolve, reject) => {
  axios({ url: 'https://reqres.in/api/login', data: user, method: 'POST' })
    .then(resp => {
      const token = resp.data.token
      localStorage.setItem('user-token', token) // store the token in localstorage
      resolve(resp)
    })
    .catch(err => {
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      reject(err)
    })
})
