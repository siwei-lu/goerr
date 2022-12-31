# goerr

Handle errors in a better way.

## Install

```sh
# install with npm
npm add goerr
# install with yarn
yarn add goerr
# install with pnpm
pnpm add goerr
```

## Import

```js
// ES Module
import goerr from 'goerr'
// CommonJS
const goerr = require('goerr').default
```

## Usage

### Handle A Synchronous Function Calling

`goerr` method expects a function (especially a lambda expression) as the argument, in which calling some throwable functions and returning a value.

The value will be the first element of an array returned by `goerr`. Any error throwed when calling the function will be the second element of the array.

**Note**: You cannot return a `Promise` object in the `throwableFunction`. If you want to handle asynchronous errors, see the next section.

#### API

```js
function goerr<T>(func: () => T): [T, Error]
```

#### Example

```js
const [result, err] = goerr(() => throwableFunction())

if (err) {
  // do something here
}

// go ahead with the result
console.log(result)
```

### Handle An Asynchronous Promise

`goerr` can accept a `Promise` object in order to handle cases you have to do asynchronously.

#### API

```js
function goerr<T>(promise: Promise<T>): Promise<[T, Error]>
```

#### Example

```js
const [result, err] = await goerr(axios.get('https://example.com'))

if (err) {
  // do something here
}

// go ahead with the result
console.log(result)
```

### Handle An Asynchronous Function Calling

`goerr` can accept an asynchronous function in which you could use `async/await`.

#### API

```js
function goerr<T>(asyncFunc: () => Promise<T>): Promise<[T, Error]>
```

#### Example

```js
const [result, err] = await goerr(async () => {
  const num1 = await calculateAsync()
  const num2 = await calculateAsync()
  return num1 + num2
})

if (err) {
  // do something here
}

// go ahead with the result
console.log(result)
```

## Why This

### Background

Since we all know that `try`/`catch` works good in JavaScript, you might be confused about if we really need `goerr` to handle errors.

Suppose now we are writing a function to return a list coming from a throwable function, and return an empty list when an error throwed out.

How could we do?

### Solution 1

```js
function listOf() {
  try {
    const list = throwable()
    return list
  } catch (_) {
    return []
  }
}
```

It looks good, but what if we need to do some operations on this list?

### Solution 2

```js
function listOf() {
  try {
    const list = throwable()

    for (let item of list) {
      // do something with items
    }

    return list
  } catch (_) {
    return []
  }
}
```

Good job! But if we have a better choise?

### Solution 3

The defect of solution 2 is about code smell. We should return as soon as we can to avoid nested code.

```js
function listOf() {
  const [list, err] = goerr(throwable)

  if (err) {
    return []
  }

  for (let item of list) {
    // do something with items
  }

  return list
}
```

Now you see the `for` loop comes to the top level of the function. It looks more clear, right?
