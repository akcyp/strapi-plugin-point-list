#!/usr/bin/env node
const packageFile = require('../package.json');
const { spawn } = require('child_process');
const peers = Object.entries(packageFile.peerDependencies || {}).map(([name, version]) => `${name}@${version}`);
console.log(peers.join(' '));
