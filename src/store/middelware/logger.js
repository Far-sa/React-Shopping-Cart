const logger = params => store => next => action => {
  console.log('Logging', params)
  // console.log('Store', store)
  // console.log('Next', next)
  // console.log('Action', action)
  next(action)
}
export default logger
