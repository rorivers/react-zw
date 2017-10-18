import { cleanDir } from './lib/fs';

function clean() {
  return Promise.all([
    cleanDir('dist/*', {
      nosort: true,
      dot: true,
      ignore: ['dist/.git'],
    }),
  ]);
}

export default clean;
