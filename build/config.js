// import path from 'path';

const __DEV__ = (process.env.NODE_ENV || 'development') === 'development';

export default {
  dev: __DEV__,
  live: true,
  eslint: true,
  extract: true,
  serve: {
    base: 'public',
    port: 5000
  },
  alias: {
    // '@es': path.resolve('es')
  },
  px2rem: {
    use: false,
    unit: 16
  }
}
