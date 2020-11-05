#!/usr/bin/env ts-node

// Import
import 'colors';

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

import { createCanvas } from 'canvas';

// Main
const root = resolve(__dirname, '../../build/anchorage');
if (!existsSync(root)) mkdirSync(root, { recursive: true });

// Logo
const i1 = createCanvas(1080, 1080);
const c1 = i1.getContext('2d');

const w = i1.width * 0.5;
const h = w * Math.cos(Math.PI / 6);

c1.translate(i1.width / 2, i1.height / 2);

c1.beginPath();

c1.moveTo(0 - w / 2, h / 2);
c1.lineTo(w / 2, h / 2);
c1.lineTo(0, 0 - h / 2);

c1.closePath();

c1.strokeStyle = '#FFF';
c1.lineWidth = 80;

c1.stroke();

c1.clearRect(0 - w, h / 2 - 120, i1.width, 80);

// Black
const i2 = createCanvas(1080, 1080);
const c2 = i2.getContext('2d');

c2.fillStyle = '#111';
c2.fillRect(0, 0, i2.width, i2.height);

c2.drawImage(i1, 0, 0);

// Export
i2.createPNGStream()
	.pipe(createWriteStream(resolve(root, 'black.png')))
	.on('finish', () => console.log('black.png'.cyan));

i1.createPNGStream()
	.pipe(createWriteStream(resolve(root, 'clear.png')))
	.on('finish', () => console.log('clear.png'.cyan));
