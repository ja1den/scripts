// Import
import path from 'path';

import child_process from 'child_process';
import readline from 'readline';

import 'colors';

// Commands
const commands: Record<string, [string, string]> = {
	'm': ['myriad icon', 'ts-node-script image/myriad.ts'],
	'd': ['desk light', 'node light/desk.js']
}

// Spawn Script
async function spawnScript(script: string) {
	const child = child_process.spawn(script, { cwd: path.resolve(__dirname, '..', 'scripts'), shell: true });

	child.stdout.on('data', data => process.stdout.write(data.toString()));
	child.stderr.on('data', data => process.stderr.write(data.toString()));

	child.on('error', err => console.error(err.message.red));
}

// Main
async function main() {
	// Read Option
	let option = process.argv.slice(2)[0];

	// Interactive
	if (option === undefined) {
		// Log
		console.log('select an option:\n');

		// Print Options
		Object.entries(commands).forEach(entry => console.log(entry[0] + '	' + entry[1][0]));

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

	// Spawn Script
	spawnScript(commands[option][1]);
}
main();
