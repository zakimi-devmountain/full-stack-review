import React, {Component} from 'react';
import './Landing.css';
import axios from 'axios';
import {connect} from 'react-redux';
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

const mapStateToProps = reduxState => reduxState;

// const mapStateToProps = reduxState => {
//     const {user} = reduxState;
//     return {
//         user
//     }
// }

export default connect(mapStateToProps, {getUser})(Landing);