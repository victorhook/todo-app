import { Trash } from 'react-bootstrap-icons';


export const DeleteButton = ({ onClick, tooltip }) => {
    return (
        <span className="delete-button" data-toggle="tooltip" title={tooltip}>
            <Trash className="delete-button-icon"
                onClick={onClick}
            />
        </span>
    )
}

export default DeleteButton

