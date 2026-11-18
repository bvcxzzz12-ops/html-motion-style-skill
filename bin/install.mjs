#!/usr/bin/env node
import {constants} from 'node:fs';
import {copyFile, lstat, mkdir, readFile, readdir} from 'node:fs/promises';
import {homedir} from 'node:os';
import {dirname, isAbsolute, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const name = 'html-motion-style-skill';
const source = join(packageRoot, 'skill', name);
const usage = 'html-motion-style-skill [--codex-home <absolute folder> | --help | --version]\n' +
  'Installs the skill in $CODEX_HOME/skills or ~/.codex/skills by default.';

async function exists(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return undefined;
  }
}

async function copyResources(from, to, root = false) {
  for (const item of await readdir(from, {withFileTypes: true})) {
    if (root && item.name === 'SKILL.md') continue;
    const input = join(from, item.name);
    const output = join(to, item.name);
    if (item.isDirectory()) {
      await mkdir(output);
      await copyResources(input, output);
    } else if (item.isFile()) {
      await copyFile(input, output, constants.COPYFILE_EXCL);
    } else {
      throw new Error('Unsupported packaged resource: ' + item.name);
    }
  }
}

async function install(codexDirectory = process.env.CODEX_HOME || join(homedir(), '.codex')) {
  const parent = resolve(codexDirectory, 'skills');
  const target = join(parent, name);
  await mkdir(parent, {recursive: true});

  try {
    await mkdir(target);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    const directory = await exists(target);
    const entry = directory?.isDirectory() ? await exists(join(target, 'SKILL.md')) : null;
    if (entry?.isFile()) {
      console.log('Existing skill preserved: ' + target);
      return;
    }
    throw new Error('The destination already exists and was preserved: ' + target);
  }

  try {
    await copyResources(source, target, true);
    // Publish the discovery entrypoint after all of its resources are present.
    await copyFile(join(source, 'SKILL.md'), join(target, 'SKILL.md'), constants.COPYFILE_EXCL);
  } catch (error) {
    throw new Error('Installation was incomplete. Files already written were preserved at ' + target, {cause: error});
  }
  console.log('Installed: ' + target);
}

const args = process.argv.slice(2);
try {
  if (args.length === 0) await install();
  else if (args.length === 2 && args[0] === '--codex-home') {
    if (!isAbsolute(args[1])) throw new Error('--codex-home requires an absolute folder.');
    await install(args[1]);
  }
  else if (args.length === 1 && args[0] === '--help') console.log(usage);
  else if (args.length === 1 && args[0] === '--version') {
    console.log(JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8')).version);
  } else {
    throw new Error('Unrecognized arguments. Run with --help for usage.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
