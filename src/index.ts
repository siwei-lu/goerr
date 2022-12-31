type Result<T, E> = [T, E]

function goerr<T>(asyncFunc: () => Promise<T>): Promise<Result<T, Error>>
function goerr<T>(func: () => T): Result<T, Error>
function goerr<T>(promise: Promise<T>): Promise<Result<T, Error>>

function goerr(parameter: any): any {
  if (typeof parameter === 'function') {
    try {
      return goerr(parameter())
    } catch (err) {
      return [null, err]
    }
  }

  if (parameter instanceof Promise) {
    return parameter.then(goerr).catch((err) => [null, err])
  }

  return [parameter, null]
}

export default goerr
