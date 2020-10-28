const React = require('react');
const { CacheProvider } = require('@emotion/core');
const createCache = require('@emotion/cache').default;

const cache = createCache();
cache.compat = true;

exports.wrapPageElement = ({ element }) => {
  return <CacheProvider value={cache}>{element}</CacheProvider>;
};
