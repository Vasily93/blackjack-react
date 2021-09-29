import React, { Component } from "react";

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
            <form onSubmit={this.handleSubmit}>
                <label >Enter Your Name To start a Game:
                    <input type='text' onChange={this.handleChange} value={this.state.name} />
                </label>
                <button>Create player</button>
            </form>
        )
    }
}

export default PlayerForm;