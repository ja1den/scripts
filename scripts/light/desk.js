#!/usr/bin/env node

// Import
require('colors');

const Lifx = require('node-lifx-lan');

// Variables
let desk = null;

// Main
async function main() {
	desk = await Lifx.createDevice({
		ip: '192.168.1.123',
		mac: 'D0:73:D5:29:45:CB'
	});

	await desk.deviceSetPower({ level: 1 });

	await desk.multiZoneSetColorZones({
		start: 0,
		end: 7,
		color: { css: '#7D0080', brightness: 0.25 }
	});

	await desk.multiZoneSetColorZones({
		start: 8,
		end: 15,
		color: { css: '#33FF00', brightness: 0.45 }
	});

	console.log('#7D0080'.magenta + ' - ' + '#33FF00'.green);
}
main();

// Handle Signals
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach(signal =>
	process.once(signal, async function () {
		await desk.deviceSetPower({ level: 0 });
		await Lifx.destroy();
	})
);
