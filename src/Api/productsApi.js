import http from './index'

export const getProducts = async () => {
  try {
    const response = await http.get(`${http.url}/api/products`)
    //console.log("Data",data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}
