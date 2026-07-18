const { spawn, execFileSync } = require('child_process');
const net = require('net');
const path = require('path');
const fs = require('fs');

function getCliPath() {
  const candidates = [
    path.join(__dirname, '..', 'node_modules', '@angular', 'cli', 'bin', 'ng.js'),
    path.join(__dirname, '..', 'node_modules', '.bin', process.platform === 'win32' ? 'ng.cmd' : 'ng'),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) || 'ng';
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
}

async function findAvailablePort(startPort = 4200, endPort = 4299) {
  for (let port = startPort; port <= endPort; port += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  return startPort;
}

async function main() {
  const scriptDir = path.join(__dirname);
  execFileSync(process.execPath, [path.join(scriptDir, 'prepare-proxy.js')], { stdio: 'inherit' });

  const selectedPort = await findAvailablePort();
  const child = spawn(process.execPath, [getCliPath(), 'serve', '--proxy-config', 'proxy.conf.json', '--port', String(selectedPort)], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, PORT: String(selectedPort) },
    shell: false,
  });

  child.on('exit', (code) => process.exit(code ?? 0));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
