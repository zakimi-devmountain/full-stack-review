import React, {Component} from 'react';
import './Profile.css';

class Profile extends Component {
    render(){
        return (
            <div className='profile'>
                <h1>Hey look, it's you!</h1>
                <img className='profile-picture'src='https://i.kym-cdn.com/photos/images/original/001/516/899/f31.jpg'/>
                <h2>Profile username here</h2>
                <h2>Profile email here</h2>
                <button>Logout</button>
            </div>
        )
    }
}

export default Profile;