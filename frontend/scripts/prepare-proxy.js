const fs = require('fs');
const path = require('path');

function readBackendPort() {
  const portFile = path.join(__dirname, '..', '..', 'backend', 'target', 'backend-port.txt');
  if (!fs.existsSync(portFile)) {
    return 8080;
  }

  const content = fs.readFileSync(portFile, 'utf8').trim();
  return Number(content) || 8080;
}

function updateProxyConfig() {
  const proxyPath = path.join(__dirname, '..', 'proxy.conf.json');
  const backendPort = readBackendPort();
  const proxyConfig = {
    "/api": {
      target: `http://localhost:${backendPort}`,
      secure: false,
      changeOrigin: true,
      logLevel: "debug"
    }
  };

  fs.writeFileSync(proxyPath, JSON.stringify(proxyConfig, null, 2) + '\n');
}

updateProxyConfig();
