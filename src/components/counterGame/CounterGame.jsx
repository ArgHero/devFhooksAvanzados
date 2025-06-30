import { useCallback, useEffect, useReducer, useRef } from "react";
import "./CounterGame.css"
import Button from "../button/Button";

function CounterGame(props){

    const initialState = {
        count: 0,
        history: []
    }//initial

    const txtNumberRef = useRef(null);

    function reducer(state,action){
        const incremento = Number(txtNumberRef.current.value)
        switch(action.type){
            case "increment":
                if(incremento === 0)
                    return state;
                return{
                    count: state.count+incremento,
                    history: [...state.history, `+${incremento} (Nuevo valor: ${state.count+incremento})`]
                }//increment
            case "decrement":
                if(incremento === 0)
                    return state;
                return{
                    count: state.count-incremento,
                    history: [...state.history, `-${incremento}  (Nuevo valor: ${state.count-incremento})`]
                }//decrement
            case "undo":
                if(state.history.length < 1)
                    return state;                
                return{
                    count: state.count-Number(state.history.pop().split(" ")[0]),
                    history: state.history
                }//decrement
            case "reset":
                txtNumberRef.current.value = "0"
                txtNumberRef.current.focus()
                localStorage.removeItem("historial")
                return initialState;
            default:
                return state;
        }//swiitch
    }//reducer()

    const [state,dispatch] = useReducer(reducer,JSON.parse(localStorage.getItem("historial"))||initialState);

    const btnIncrementRef = useRef(null);
    
    useEffect(()=>{
        btnIncrementRef.current.focus();
    },[])

    useEffect(()=>{localStorage.setItem("historial",JSON.stringify(state))},[state])

    const handleIncrement = useCallback(()=>{
        dispatch({type:"increment"})
    },[])//handleIncrement()

    const handleDecrement = useCallback(()=>{
        dispatch({type:"decrement"})
    },[])//handleDecrement()

    const handleReset = useCallback(()=>{
        dispatch({type:"reset"})
    },[])//handleReset()

    const handleDeshacer = useCallback(()=>{
        dispatch({type:"undo"})
    },[])


    return(<section>
        <h2>Contador: {state.count}</h2>
        <form>
            <label htmlFor="txtNumber">Ingresa el incremento</label>
            <input type="number" name="txtNumber" id="txtNumber" placeholder="0" ref={txtNumberRef}/>
        </form>
        <button ref={btnIncrementRef} type="button" onClick={handleIncrement}>+</button>
        <button type="button" onClick={handleDecrement}>-</button>
        <button type="button" onClick={handleReset}>reset</button>
        <button type="button" onClick={handleDeshacer}>deshacer</button>
   
        <h3>Historial de cambios: </h3>
        <ul>
            {state.history.map((entry,index)=>{
                return (<li key={index}>{entry}</li>)
            })}
        </ul>

    </section>)
}

export default CounterGame;