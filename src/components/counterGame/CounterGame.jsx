import { useEffect, useReducer, useRef } from "react";
import "./CounterGame.css"
import Button from "../button/Button";

function CounterGame(props){

    const initialState = {
        count: 0,
        history: []
    }//initial

    function reducer(state,action){
        switch(action.type){
            case "increment":
                return{
                    count: state.count+1,
                    history: [...state.history, `+1 (Nuevo valor: ${state.count+1})`]
                }//increment
            case "decrement":
                return{
                    count: state.count-1,
                    history: [...state.history, `-1 (Nuevo valor: ${state.count-1})`]
                }//decrement
            case "reset":
                return initialState;
            default:
                return state;
        }//swiitch
    }//reducer()

    const [state,dispatch] = useReducer(reducer,initialState);
    const btnIncrementRef = useRef(null);

    useEffect(()=>{
        btnIncrementRef.current.focus();
    },[])


    return(<section>
        <h2>Contador: {state.count}</h2>
        <Button innerText="+" clickHandler={()=>dispatch({type:"increment"})} />
        <Button innerText="-" clickHandler={()=>dispatch({type:"decrement"})} />
        <Button innerText="Reset" clickHandler={()=>dispatch({type:"reset"})} />
        
        <h3>Historial de cambios: </h3>
        <ul>
            {state.history.map((entry,index)=>{
                return (<li key={index}>{entry}</li>)
            })}
        </ul>

    </section>)
}

export default CounterGame;