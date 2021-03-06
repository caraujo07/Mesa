import axios from 'axios'

export const apiCall = async ({ url, method, ...args }) => {
  const resp = await axios.post(`${url}/login`, {
    email: args.data.email,
    password: args.data.password
  })
  const { data } = resp
  return data
}

export const api = axios.create({
  baseURL: 'https://reqres.in/api'
})

export const nearby = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
})

export default apiCall
