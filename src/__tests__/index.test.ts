import goerr from '..'

test('should return a tuple which has an error message as the last element', () => {
  const [err] = goerr(() => {
    throw new Error('test')
  })

  expect(err).toBeInstanceOf(Error)
})

test('should return a null as the error', () => {
  const [err] = goerr(() => {})
  expect(err).toBeNull()
})

test('should return what the func returns as the first element', () => {
  const [err, result] = goerr(() => 10)

  expect(result).toBe(10)
  expect(err).toBeNull()
})

test('should handle when a Promise given', async () => {
  const [err, result] = await goerr(Promise.resolve(10))

  expect(result).toBe(10)
  expect(err).toBeNull()
})

test('should return an error when the promise rejected', async () => {
  const [err] = await goerr(Promise.reject(new Error('error')))

  expect(err.message).toEqual('error')
})
