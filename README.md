# RxState

Simple way to connect [rxjs](https://www.npmjs.com/package/rxjs) to React component in Redux
style... but without dispatch and constants.

## Installation

```
npm install --save rx_state
```

## Explanation

At the beginning I didn't plan to make it a library, it was only an idea described in
[Use RxJS with React](http://michalzalecki.com/use-rxjs-with-react). I've changed my mind
after couple people pinged me about it. I recommand to read the article if you want to learn
and understand rationale behind this approach.

Entire library source has 60 lines so you can start from the source code.

## How to use it

### Create actions

No magic here, action is just `new Rx.Subject`. Forget about CONSTANTs.

```js
import { createActions } from "rx_state";

export default createActions(["increment$", "decrement$", "reset$"]);
```

### Create reducer

As you can see our reducer is an observable of tiny functions which are going to
modify state. RxState won't help you here, just RxJS.

```js
import Rx from "rxjs";
import counterActions from "./counterActions";

const initialState = 0;

const CounterReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    counterActions.increment$.map(payload => state => state + payload),
    counterActions.decrement$.map(payload => state => state - payload),
    counterActions.reset$.map(_payload => _state => initialState),
  );

export default CounterReducer$;
```

That was the difficult part.

### Create root reducer

This strange-looking map makes reducer scoped.

```js
import Rx from "rxjs";
import CounterReducer$ from "../reducers/CounterReducer";

const reducer$ = Rx.Observable.merge(
  CounterReducer$.map(reducer => ["counter", reducer]),
);

export default reducer$;
```

### Create and provide state

```js
import { RxStateProvider, createState } from "./state/RxState";
import App from "./components/App";
import reducer$ from "./reducers";

ReactDOM.render(
  <RxStateProvider state$={createState(reducer$)}>
    <App />
  </RxStateProvider>,
  document.getElementById("root"),
);
```

### Connect your components

```js
import { connect } from "rx_state";

export default connect(state => ({
  counter: state.counter,
  increment(n) { counterActions.increment$.next(n); },
  decrement(n) { counterActions.decrement$.next(n); },
}))(Counter);
```

Read more about RxJS with React: [http://michalzalecki.com/use-rxjs-with-react](http://michalzalecki.com/use-rxjs-with-react)
