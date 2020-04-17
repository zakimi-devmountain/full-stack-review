//Landing pages are the first page your users will see. In the case of many 
//websites, the landing page is an authentication page. Below includes authentication
//functions for logging in and creating an account.
import React, {Component} from 'react';
import './Landing.css';
import axios from 'axios';
//connect needs to be brought into components that are subscribing to values from 
//redux.
import {connect} from 'react-redux';
//actions need to be brought into components that are subscribing to them.
import {getUser} from '../../redux/reducer';

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            verPassword: '',
            picture: '',
            registerView: false
        }
    }

    //This functionality will ensure that a logged in user can't visit the 
    //authentication page, and instead route them to the dashboard view.
    componentDidMount(){
        if(this.props.user.email){
            this.props.history.push('/dash');
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleToggle = () => {
        this.setState({registerView: !this.state.registerView})
    }

    //On the client-side your authentication functions should allow the user to 
    //send the information that you need on the server (email, password). Once 
    //their information comes from the server, it is common to set that to redux or
    //local state for the client to use.
    handleRegister = () => {
        const {username, email, password, verPassword, picture} = this.state;
        if(password !== '' && password === verPassword){
            axios.post('/auth/register', {username, email, password, picture})
            .then(res => {
                //set user in redux or local state
                this.props.getUser(res.data)
                //route user to the dashboard
                this.props.history.push('/dash');
            })
            .catch(err => console.log(err));
        } else {
            alert("Passwords don't match");
        }
    }

    handleLogin = () => {
        const {email, password} = this.state;
        axios.post('/auth/login', {email, password})
        .then(res => {
            //set user to redux or local state
            this.props.getUser(res.data)
            //route the user to dashboard
            this.props.history.push('/dash');
        })
        .catch(err => console.log(err));
    }

    render(){
        // console.log(this.props);
        return(
            <div className='landing-container'>
                <section className='authentication-info'>
                    <h1>Welcome to MemeMountain</h1>
                    {this.state.registerView
                    ? (<>
                        <h3>Register Below</h3>
                        <input 
                            value={this.state.username}
                            name='username'
                            placeholder='Username'
                            onChange={(e) => this.handleInput(e)}/>
                       </>)
                    : <h3>Login Below</h3>}
                    <input 
                        value={this.state.email}
                        name='email'
                        placeholder='Email'
                        onChange={(e) => this.handleInput(e)}/>
                    <input 
                        type='password'
                        value={this.state.password}
                        name='password'
                        placeholder='Password'
                        onChange={(e) => this.handleInput(e)}/>
                    {this.state.registerView
                    ? (<>
                        <input 
                            type='password'
                            value={this.state.verPassword}
                            name='verPassword'
                            placeholder='Verify Password'
                            onChange={(e) => this.handleInput(e)}/>
                        <input
                            value={this.state.picture}
                            name='picture'
                            placeholder='Profile image URL'
                            onChange={(e) => this.handleInput(e)}/>
                        <button onClick={this.handleRegister}>Register</button>
                        <p>Have an account? <span onClick={this.handleToggle}>Login Here</span></p>
                       </>)
                    : (<>
                        <button onClick={this.handleLogin}>Login</button>
                        <p>Don't have an account? <span onClick={this.handleToggle}>Register Here</span></p>
                       </>)}
                </section>
            </div>
        )
    }
}

//mapStateToProps allows you to define what redux state values this component is
//subscribing to.
const mapStateToProps = reduxState => reduxState;

// const mapStateToProps = reduxState => {
//     const {user} = reduxState;
//     return {
//         user
//     }
// }

//connect is what will place state and action values from redux onto your component.
//Pass it mapStateToProps and any actions you are subscribing to.
export default connect(mapStateToProps, {getUser})(Landing);