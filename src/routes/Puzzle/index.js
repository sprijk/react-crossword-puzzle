import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'puzzle',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Puzzle = require('./containers/PuzzleContainer').default
      const reducer = require('./modules/puzzle').default

      /*  Add the reducer to the store on key 'puzzle'  */
      injectReducer(store, { key: 'puzzle', reducer })

      /*  Return getComponent   */
      cb(null, Puzzle)

    /* Webpack named bundle   */
    }, 'puzzle')
  }
})
