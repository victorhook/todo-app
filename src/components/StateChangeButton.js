import { ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons';


export const StateChangeButton = ({ left, onClick, visible, nextState }) => {
    
    let Arrow = left ? ArrowLeftShort : ArrowRightShort;

    return (

        <span className={left ? "arrow arrow-left" : "arrow arrow-right"} 
              data-toggle="tooltip" 
              title={`Move to ${nextState}`}>
            <Arrow className="arrow-icon"
               onClick={onClick} 
               style={{visibility: visible ? 'visible' : 'hidden' }}
            /> 
        </span>

    )
}

export default StateChangeButton
