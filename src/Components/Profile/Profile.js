import React, {Component} from 'react';
import './Profile.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser} from '../../redux/reducer';

class Profile extends Component {
    componentDidMount(){
        if(!this.props.user.email){
            this.props.history.push('/');
        }
    }

    handleLogout = () => {
        axios.get('/auth/logout')
        .then(() => {
            //clear the user from redux or local state
            this.props.clearUser();
            //route the user to the landing page
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    render(){
        return (
            <div className='profile'>
                <h1>Hey look, it's you!</h1>
                <img 
                    className='profile-picture'
                    src={this.props.user.profile_picture}
                    alt={this.props.user.username}/>
                <h2>{this.props.user.username}</h2>
                <h2>{this.props.user.email}</h2>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {clearUser})(Profile);