import { readdirSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { File } from './common/types';

export default function readFiles(path: string): File[] {
  const fileInfos = readdirSync(path).map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
    filePath: pathJoin(path, fileName),
  }));
  const files = fileInfos.map<File>((fileInfo) => ({
    ...fileInfo,
    content: readFileSync(fileInfo.filePath, 'utf-8'),
  }));
  return files;
}
