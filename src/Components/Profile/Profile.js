import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser, clearUser} from '../../redux/reducer';
import './Profile.css';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            editView: false
        }
    }

    componentDidMount = () => {
        if(!this.props.user.email) {
            this.props.history.push('/');
        }
    }

    handleInput = (val) => {
        this.setState({username: val})
    }

    handleEditView = () => {
        this.setState({editView: !this.state.editView})
    }

    updateUsername = () => {
        const {username} = this.state;
        axios.put(`/api/user/${this.props.user.user_id}`, {username})
        .then(res => {
            this.props.getUser(res.data[0]);
            this.handleEditView();
            this.setState({username: ''});
        })
        .catch(err => console.log(err));
    }

    handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            //clear the user from redux
            this.props.clearUser();
            //route the user back to landing
            this.props.history.push('/');
        })
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div className='profile'>
                <h1>Hey look, it's you!</h1>
                <img 
                    className='profile-picture'
                    src={this.props.user.profile_picture}
                    alt={this.props.user.username}/>
                {!this.state.editView
                ? <h2>{this.props.user.username} <button id='edit-button' onClick={this.handleEditView}>Edit</button></h2>
                : (<div>
                    <input 
                        value={this.state.username}
                        placeholder='New Username'
                        onChange={(e) => this.handleInput(e.target.value)}/>
                    <button id='edit-button' onClick={this.updateUsername}>Submit</button>
                   </div>)}
                <h2>{this.props.user.email}</h2>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps, {getUser, clearUser})(Profile);