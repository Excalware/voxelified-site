/**
 * @type {import('next').NextConfig}
 */
const withTM = require('next-transpile-modules')(['ky', 'uuid'], {
    debug: false,
});

module.exports = withTM({
    reactStrictMode: true,
    optimizeFonts: true
});