#!/usr/bin/env node

// Import
const Lifx = require('node-lifx-lan');

require('colors');

// Main
async function main() {
	const desk = await Lifx.createDevice({
		ip: '192.168.1.123',
		mac: 'D0:73:D5:29:45:CB'
	});

	const { level } = await desk.deviceGetPower();

	if (level === 0) {
		await desk.multiZoneSetColorZones({
			start: 0,
			end: 8,
			color: { css: '#7D0080', brightness: 0.25 }
		});

		await desk.multiZoneSetColorZones({
			start: 9,
			end: 15,
			color: { css: '#33FF00', brightness: 0.45 }
		});
	}

	await desk.deviceSetPower({ level: 1 - level });

	console.log('#7D0080'.magenta + ' - ' + '#33FF00'.green);

	await Lifx.destroy();
}
main();
