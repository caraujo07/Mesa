import axios from 'axios'

const apiCall = async ({ url, method, ...args }) => {
  const resp = await axios.post(`${url}/login`, {
    email: args.data.email,
    password: args.data.password
  })
  const { token } = resp.data
  return token
}

export default apiCall
