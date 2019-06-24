import React from 'react';
import { connect } from 'react-redux';
import  { deleteStream, fetchStream } from '../../action';
import { Link } from 'react-router-dom';
import Modal from '../modal';
import history from '../../history';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button className="ui negative button" onClick={() => this.props.deleteStream(id)}>Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream?";
        }

        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;
    }

    render() {
        return (
            <Modal 
                title="Delete Stream"
                text={this.renderContent()}
                actions={this.renderActions()}
                onDissmiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    } 
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);