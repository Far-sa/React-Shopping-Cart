import axios from 'axios'

const url = 'http://localhost:5000'

axios.defaults.headers.post['Content-Type'] = 'application/json'


export default {
  get: axios.get,
  post: axios.post,
  url
}
