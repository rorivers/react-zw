import path from 'path';
import chokidar from 'chokidar';
import { makeDir, copyDir, copyFile, cleanDir } from './lib/fs';
import { format } from './run';

async function copy() {
  await makeDir('dist');

  await Promise.all([copyDir('public', 'dist/public')]);

  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch(['public/**/*'], { ignoreInitial: true });

    watcher.on('all', async (event, filePath) => {
      const start = new Date();
      const src = path.relative('./', filePath);
      const dist = path.join(
        'dist/',
        src.startsWith('src') ? path.relative('src', src) : src,
      );

      switch (event) {
        case 'add':
        case 'change':
          await makeDir(path.dirname(dist));
          await copyFile(filePath, dist);
          break;

        case 'unlink':
        case 'unlinkDir':
          cleanDir(dist, { nosort: true, dot: true });
          break;

        default:
          return;
      }

      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.info(`[${format(end)}] ${event} '${dist}' after ${time} ms`);
    });
  }
}

export default copy;
