import React, {Component} from 'react'
import './style.css'
 export default class DeleteAll extends Component {
    render () {
        const {deleteAll} = this.props;
        return (

            <button type="button"
                    className="btn btn-outline-danger delete-btn float-right"
                     onClick = {deleteAll}>
                Delete all
            </button>

        )
    }
}
