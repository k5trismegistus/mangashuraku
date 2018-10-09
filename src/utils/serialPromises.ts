export const serialPromises = (promises: Array<Promise<any>>) => {
  return new Promise((resolve, reject) => {
    promises
      .reduce((prev, curr) => prev.then(() => curr), Promise.resolve())
      .then(resolve)
      .catch(reject)
  })
}
