// Import
import path from 'path';

import child_process from 'child_process';
import readline from 'readline';

import 'colors';

// Scripts
const scripts: Record<string, [string, string]> = {
	'm': ['Myriad Icon', 'ts-node-script image/myriad.ts'],
	'd': ['Desk Light', 'node light/desk.js']
}

// Main
async function main() {
	// Read Option
	let option = process.argv.slice(2)[0];

	// Interactive
	if (option === undefined) {
		// Log
		console.log('Select an option:'.gray);
		console.log('');

		// Print Options
		Object.entries(scripts).forEach(entry => {
			console.log(entry[1][0].green + ' ' + '.'.repeat(28 - entry[1][0].length - 1).gray + (' [' + entry[0] + ']').cyan);
		});

		// Log
		console.log('');

		// Read Option
		const rl = readline.createInterface({ input: process.stdin });

		rl.prompt();

		option = await new Promise(resolve => rl.once('line', line => resolve(line.trim())));

		rl.close();

		// Log
		console.log('');
	}

	// Script Exists
	if (scripts[option]?.[1] === undefined) {
		return console.error(('option \'' + option + '\' not found').red);
	}

	// Spawn Script
	const child = child_process.spawn(scripts[option][1], { cwd: path.resolve(__dirname, '..', 'scripts'), shell: true });

	child.stdout.on('data', data => process.stdout.write(data.toString()));
	child.stderr.on('data', data => process.stderr.write(data.toString()));

	child.on('error', err => console.error(err.message.red));
}
main();
