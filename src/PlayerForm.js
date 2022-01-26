import React, { Component } from "react";
import './PlayerForm.css'

class PlayerForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.registerPlayer(this.state.name)
    }

    handleChange = (e) => {
        const updatedName = e.target.value;
        this.setState({name: updatedName})
    }

    render() {
        return(
            <div className='PlayerForm'>
                <form className='PlayerForm-form' onSubmit={this.handleSubmit}>
                    <label >Enter Your Name To start a Game:
                        <input type='text' onChange={this.handleChange} value={this.state.name} />
                    </label>
                    <button className="PlayerForm-button">Create player</button>
                </form>
            </div>
        )
    }
}

export default PlayerForm;