import axios from 'axios'

const apiCall = ({ url, method, ...args }) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      axios.post(`${url}/login`, {
        email: args.data.email,
        password: args.data.password
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      console.log(`${url}/login`)
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default apiCall




const mocks = {
    auth: { POST: { token: 'This-is-a-mocked-token' } },
    'user/me': { GET: { name: 'doggo', title: 'sir' } }
  }
  
  const apiCall = ({ url, method, ...args }) => new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method || 'GET'])
        console.log(`Mocked '${url}' - ${method || 'GET'}`)
        console.log('response: ', mocks[url][method || 'GET'])
      } catch (err) {
        reject(new Error(err))
      }
    }, 1000)
  })
  
  export default apiCall
  