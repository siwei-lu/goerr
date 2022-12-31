type Result<T, E> = [T, E]

function goerr<T, E = Error>(asyncFunc: () => Promise<T>): Promise<Result<T, E>>
function goerr<T, E = Error>(func: () => T): Result<T, E>
function goerr<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>>

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
