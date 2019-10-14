import React, {Component} from "react";
import './style.css'

export default class ItemAddForm extends Component {

    state = {
        label: '',
        text: '',
        startData: '',
        finalData: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onTextChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    onStartDataChange = (e) => {
        this.setState({
            startData: e.target.value
        })
    }

    onFinalDataChange = (e) => {
        this.setState({
            finalData: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label, this.state.text, this.state.startData, this.state.finalData)
        this.setState({
            label: '',
            text: '',
            startData: '',
            finalData: ''
        })

    }

    render() {

        const maxLen = 20;

        return (
            <div onSubmit={this.onSubmit}>
                        <span className="d-flex">
                            <form>
                    <input type="text"
                           maxLength={maxLen}
                           required
                           className="form-control item-add-form d-flex"
                           onChange={this.onLabelChange}
                           placeholder="Write name of a plan here"
                           value={this.state.label}/>
                            </form>
                <form className="item-add-hui">
                    <input type="date"
                           className="form-control d-flex"
                           onChange={this.onStartDataChange}
                           value={this.state.startData}/>
                </form>
                            <form>
                     <input type="date"
                            className="form-control d-flex"
                            onChange={this.onFinalDataChange}
                            value={this.state.finalData}/>
                </form>
                </span>
                        <form>
                    <input type="text"
                           className="form-control item-add-button"
                           onChange={this.onTextChange}
                           placeholder="Write text of a plan here"
                           value={this.state.text}/>
                        </form>
            </div>
        )
    }
}
