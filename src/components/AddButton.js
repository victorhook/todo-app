import { PlusSquare } from 'react-bootstrap-icons';


export const AddButton = ({ onClick, tooltip }) => {
    return (
        <span class="add-button" data-toggle="tooltip" title={tooltip}>
            <PlusSquare class="add-button-icon"
                        onClick={onClick}/>
        </span>
    )
}

export default AddButton
