import './MessageModal.css'

const AceModal = ({ visible, aceChoice }) => {
    let visibleState = visible ? 'flex' : 'none';
    return (
        <div style={{display: visibleState}} className='Modal'>
            <div className='Modal-content'>
                <h3>You got Ace. Choose a value to add to your sum of cards</h3>
                <button onClick={() => aceChoice(1)}>
                    1
                </button>
                <button onClick={() => aceChoice(11)}>
                    11
                </button>
            </div>
        </div>
    )
}

export default AceModal;