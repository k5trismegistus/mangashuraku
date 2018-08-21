import { createHash } from 'crypto';
import { readdir, statSync } from 'fs';
import { join } from 'path';

readdir('import/', (err, files) => {
  if (err) { throw err }

  const zipList = files
    .filter((file) => (
      file.endsWith('.zip') && statSync(join('import', file)).isFile()
    ))

  console.log(zipList)
})
