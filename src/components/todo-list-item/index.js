import React, {Component} from 'react'
import './style.css'

export default class TodoListItem extends Component {

    state = {
        isOpen: false,
        late: false,
        forEdit: false
    }

    render() {

        const {label, onDeleted, onToggleImportant, onToggleDone, done, important, text, startData, finalData} = this.props;

        let classNames = 'card-title todo-list-item'
        if (done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important';
        }

        const warning = this.state.late && <form className="border-bottom for-item-date float-left">{startData} - {finalData}</form>
        const buttons = this.state.isOpen && <form>
            <button type="button" className="btn btn-outline-warning btn-sm float-right for-warming"
                                                           onClick={this.warningTime}>
            deadline
        </button>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={onToggleDone}>
                done
            </button>
            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted}>
                delete
            </button>



            <button type="button"
                    className="btn btn-outline-info btn-sm float-right"
                    onClick={onToggleImportant}>
                important
            </button>
        </form>

        const body = this.state.isOpen && <form>{text}</form>



        return (
            <>
                <div className={classNames}>
        <span
            className="todo-list-item-label">
            <span>
                {label}
                <small>

            </small>
            </span>
        </span>



                    <button type="button"
                            className="btn btn-outline-primary btn-sm float-right"
                            onClick={this.onShowText}>
                       more
                    </button>
                </div>
                <div className="border-top">
                    {warning}
                    {body}
                    {buttons}
                </div>

            </>
        )
    }

    onShowText = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    warningTime = () => {
        this.setState({
            late: !this.state.late
        })
    }

    editItem = () => {
        this.setState({
            forEdit: !this.state.forEdit
        })
    }

    newText = () => {

    }

}