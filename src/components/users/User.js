import React, { Component, Fragment } from 'react'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Repos } from '../repos/Repos';

export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }
    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable,
            company

        } = this.props.user;
        const { loading, repos } = this.props;
        if (loading) return <Spinner />
        return (
            <div className="container">
                <Link to="/" className="btn btn-light">Back To Search</Link>
                Hireable: {' '}
                {hireable ? <i className="fa fa-check text-success" /> : <i className="text-danger fa fa-times-circle" />}
                <div className="card grid-2">
                    <div v className="all-center">
                        <img src={avatar_url} alt="" style={{ width: "150px" }} className="round-img" />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1" target="_blank">Visit Github Profile</a>
                        <ul><li>
                            {login && <Fragment>
                                <strong>Username:</strong>{login}
                            </Fragment>}
                        </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company:</strong>{company}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website:</strong>{blog}
                                </Fragment>}
                            </li></ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-secondary">Followers: {followers}</div>
                    <div className="badge badge-primary">Following: {following}</div>
                    <div className="badge badge-success">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos} />
            </div>
        )
    }
}

export default User
