# RxState

Simple way to connect [rxjs](https://www.npmjs.com/package/rxjs) to React component in Redux
style... but without dispatch and constants.

## Installation

## How to use it

```js
export default connect(state => ({
  counter: state.counter,
  increment(n) { counterActions.increment$.next(n); },
  decrement(n) { counterActions.decrement$.next(n); },
}))(Counter);
```

Read more about RxJS with React: [http://michalzalecki.com/use-rxjs-with-react](http://michalzalecki.com/use-rxjs-with-react)
