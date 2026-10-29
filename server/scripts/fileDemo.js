// Experiment 8: Node.js built-in file system module
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const folder = path.dirname(fileURLToPath(import.meta.url)); 

const filePath = path.join(folder, 'sample.txt');

fs.writeFileSync(filePath, 'SkillSwapify Node.js file-system experiment.\n');

const content = fs.readFileSync(filePath, 'utf8');

console.log('File content:', content);

fs.appendFileSync(filePath, 'This line was added with appendFileSync.\n');

console.log('Updated the sample file:', filePath);
