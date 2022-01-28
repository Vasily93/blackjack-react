import './MessageModal.css'

const MessageModal = ({ message, visible, hideModal }) => {
    let visibleState = visible ? 'flex' : 'none';
    return (
        <div style={{display: visibleState}} className='Modal'>
            <div className='Modal-content'>
                <h3>{message}</h3>
                <button onClick={hideModal}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default MessageModal;