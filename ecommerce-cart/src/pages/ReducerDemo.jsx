import { useReducer } from "react";

function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'INCREMENT_BY':
            return state + action.payload;
        case 'DECREMENT_BY':
            return state - action.payload;
        case 'RESET':
            return 0;
        default:
            return state;
    }
}

function ReducerDemo() {
const [count, dispatch] = useReducer(reducer, 0);

return (
    <>
    <h2>{count}</h2>
    <button onClick={() => dispatch({type: 'INCREMENT',})}>+1</button>
    <button onClick={() => dispatch({type: 'INCREMENT_BY', payload: 5})}>+5</button>
    <button onClick={() => dispatch({type: 'DECREMENT',})}>-1</button>
    <button onClick={() => dispatch({type: 'DECREMENT_BY', payload: 5})}>-5</button>
    <button onClick={() => dispatch({type: 'RESET',})}>Reset</button>
    </>
)
}

export default ReducerDemo;
