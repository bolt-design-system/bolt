module.exports = {
  // server: {
  //   baseDir: './sandbox/pattern-library/public'
  // },
  // httpModule: 'http2',
  // https: {
  //   key: `${__dirname}/certs/key.pem`,
  //   cert: `${__dirname}/certs/cert.pem`
  // },
  open: false,
  installCert: false,
  serverName: 'bolt-server',
  certNames: 'bolt',
  files: [
    '**/*.html'
  ]
};
