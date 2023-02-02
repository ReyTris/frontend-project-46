import { readFileSync } from 'fs';
import path from 'path';

const readFile = (filename) => readFileSync(path.resolve(process.cwd(), filename), 'utf-8');
export default readFile;
