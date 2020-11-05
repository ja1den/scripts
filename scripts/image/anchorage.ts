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
const logo = createCanvas(1080, 1080);
const cL = logo.getContext('2d');

const w = logo.width * 0.5;
const h = w * Math.cos(Math.PI / 6);

cL.translate(logo.width / 2, logo.height / 2);

cL.beginPath();

cL.moveTo(0 - w / 2, h / 2);
cL.lineTo(w / 2, h / 2);
cL.lineTo(0, 0 - h / 2);

cL.closePath();

cL.strokeStyle = '#FFF';
cL.lineWidth = 80;

cL.stroke();

cL.clearRect(0 - w, h / 2 - 120, logo.width, 80);

// Back
const back = createCanvas(1080, 1080);
const cB = back.getContext('2d');

cB.fillStyle = '#111';
cB.fillRect(0, 0, back.width, back.height);

cB.drawImage(logo, 0, 0);

// Export
logo.createPNGStream()
	.pipe(createWriteStream(resolve(root, 'anchorage.png')))
	.on('finish', () => console.log('anchorage.png'.cyan));

back.createPNGStream()
	.pipe(createWriteStream(resolve(root, 'anchorage-back.png')))
	.on('finish', () => console.log('anchorage-back.png'.cyan));
