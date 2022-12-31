import goerr from '..'

test('should return a tuple which has an error message as the last element', () => {
  const [result, err] = goerr((): void => {
    throw new Error('test')
  })

  expect(result).toBeNull()
  expect(err).toBeInstanceOf(Error)
})

test('should return a null as the error', () => {
  const [result, err] = goerr(() => {})

  expect(result).toBeUndefined()
  expect(err).toBeNull()
})

test('should return what the func returns as the first element', () => {
  const [result, err] = goerr(() => 10)

  expect(result).toBe(10)
  expect(err).toBeNull()
})

test('should handle when a Promise given', async () => {
  const [result, err] = await goerr(Promise.resolve(10))

  expect(result).toBe(10)
  expect(err).toBeNull()
})

test('should return an error when the promise rejected', async () => {
  const [result, err] = await goerr(Promise.reject(new Error('error')))

  expect(result).toBeNull()
  expect(err.message).toEqual('error')
})

test('handle async function', async () => {
  const [] = await goerr(() => Promise.resolve(10))
})
