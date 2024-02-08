import { promises as fs } from 'fs';

export async function fileReader(path) {
  const file = await fs.readFile(process.cwd() + '/' + path, 'utf8');
  return JSON.parse(file)
}