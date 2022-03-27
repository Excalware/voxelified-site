/**
 * @type {import('next').NextConfig}
 */
const withTM = require('next-transpile-modules')(['ky', 'uuid'], {
    debug: false,
});

module.exports = withTM({
    reactStrictMode: true,
    optimizeFonts: true,

    redirects() {
        return [
            {
                source: '/my',
                destination: '/my/account',
                permanent: true
            },
            {
                source: '/verification',
                destination: '/my/verification',
                permanent: true
            },
            {
                source: '/verification/containers',
                destination: '/my/verification/containers',
                permanent: true
            }
        ];
    }
});