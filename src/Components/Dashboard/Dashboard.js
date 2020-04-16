import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Dashboard.css';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            postImage: ''
        }
    }

    componentDidMount(){
        if(!this.props.user.email){
            this.props.history.push('/');
        }
        this.getUserPosts()
    }

    handleInput = (val) => {
        this.setState({postImage: val})
    }

    getUserPosts = () => {
        axios.get(`/api/posts/${this.props.user.user_id}`)
        .then(res => this.setState({posts: res.data}))
        .catch(err => console.log(err));
    }

    createPost = () => {
        axios.post('/api/post', {id: this.props.user.user_id, postImage: this.state.postImage})
        .then(() => {
            this.getUserPosts();
            this.setState({postImage: ''});
        })
        .catch(err => console.log(err));
    }

    render(){
        const mappedPosts = this.state.posts.map((post, i) => (
            <img key={i} src={post.post_url} alt='mememountain post' className='post-image'/>
        ))
        return(
            <div className='dashboard'>
                <input 
                    value={this.state.postImage}
                    placeholder='Add Image URL'
                    onChange={(e) => this.handleInput(e.target.value)}/>
                <button onClick={this.createPost}>Post</button>
                <h1>Your Recent Posts</h1>
                <div className='post-flex'>
                    {mappedPosts}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);