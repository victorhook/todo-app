import './css/NoList.css';


export const NoLists = ({ addList }) => {
    return (
        <div className="nolist-container container-fluid">

            <div className="w-50 m-auto">
                <p>Looks like you don't have any lists yet!</p>

                <button className="button"
                        onClick={addList}
                        >
                    Create new list
                </button>
            </div>
            

        </div>
    )
}

export default NoLists
