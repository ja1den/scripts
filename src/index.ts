// Import
import path from 'path';
import fs from 'fs';

import parseArgs from 'minimist';
import prompts from 'prompts';

import { spawn } from 'child_process';

import 'colors';

// Choose Action
async function chooseAction(directory: string) {
	const actions = fs.readdirSync(directory, {
		withFileTypes: true
	}).filter(dirent => dirent.isDirectory());

	const { action }: { action: string } = await prompts({
		type: 'select',
		name: 'action',
		message: ' select a category',
		choices: actions.map(action => ({
			title: action.name,
			value: action.name
		}))
	});

	return action;
}

// Choose Script
async function chooseScript(action: string) {
	const scripts = fs.readdirSync(path.resolve(__dirname, '../scripts', action), {
		withFileTypes: true
	}).filter(dirent => !dirent.isDirectory());

	const { script }: { script: string } = await prompts({
		type: 'select',
		name: 'script',
		message: ' select a script',
		choices: scripts.map(script => ({
			title: script.name,
			value: script.name
		}))
	});

	return script;
}

// Spawn Script
async function spawnScript(script: string) {
	const child = spawn(script);

	child.stdout.on('data', data => process.stdout.write(data.toString()));
	child.stderr.on('data', data => process.stderr.write(data.toString()));

	child.on('error', err => console.error(err.message.red));
}

// Main
async function main() {
	const args = parseArgs(process.argv.slice(2));

	let action: string;
	let script: string;

	if (args._.length == 2) {
		action = args._[0];
		script = args._[1];
	} else {
		action = await chooseAction(path.resolve(__dirname, '../scripts'));
		script = await chooseScript(action);

		console.log();
	}

	spawnScript(path.resolve(__dirname, '../scripts', action, script));
}
main();
