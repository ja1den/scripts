#!/usr/bin/env ts-node

// Import
import 'colors';

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

import { createCanvas } from 'canvas';

// Image
const [w, h] = [1080, 1080];

const canvas = createCanvas(w, h);
const c = canvas.getContext('2d');

// Background
c.fillStyle = '#111';
c.fillRect(0, 0, w, h);

// Myriad
c.strokeStyle = '#FFF';

c.lineJoin = c.lineCap = 'round';
c.lineWidth = 40;

c.beginPath();

c.moveTo(w / 2 - 200, h / 2 + 100);
c.lineTo(w / 2, h / 2 - 100);

c.stroke();

c.closePath();

c.beginPath();

c.moveTo(w / 2, h / 2 + 100);
c.lineTo(w / 2 + 200, h / 2 - 100);
c.lineTo(w / 2 + 200, h / 2 + 100);

c.stroke();

c.closePath();

// Export
const root = resolve(__dirname, '../../build/myriad');
if (!existsSync(root)) mkdirSync(root, { recursive: true });

const stream = createWriteStream(resolve(root, 'myriad.png'));
const out = canvas.createPNGStream().pipe(stream);

out.once('finish', () => console.log('myriad.png'.cyan));
