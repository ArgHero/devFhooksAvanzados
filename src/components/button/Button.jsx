import "./Button.css"

function Button(props){
    const {innerText,clickHandler} = props;

    return(<>
        <button type="button" onClick={clickHandler}>{innerText}</button>
    </>)
}

export default Button;