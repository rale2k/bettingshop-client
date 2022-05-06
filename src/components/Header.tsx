import React from "react";
import { Link } from "react-router-dom";
import HTTPClient from "../utils/HTTPClient";
import IUser from "../domain/IUser";

interface HeaderProps {
    user: IUser | null
    handleLogon: Function
}

interface HeaderState {
    username: string | null
}

class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps) {
        super(props);

        this.state = {
            username: null
        }

        this.login = this.login.bind(this);
    }

    async login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            let data: object = { name: this.state.username! };

            let result = await HTTPClient.post("/User/Login", data);
            this.props.handleLogon((result.data as IUser))
        }
        catch (e) {
            alert(e);
        }
    }

    authNav() {
        if (this.props.user != null) {
            return (
                <div className="col-md-5 d-flex justify-content-lg-end justify-content-center">
                    <a className="nav-link link-dark">
                        Hello, {this.props.user.name}!
                    </a>
                </div>
            );
        }
        return(
            <div className="col-md-5 d-flex justify-content-lg-end justify-content-center">
                <div>
                    <a href="#" className="nav-link link-dark dropdown dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Login
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <form className="container" onSubmit={this.login} noValidate>
                            <div className="mb-3">
                                <label htmlFor="userNameInput" className="form-label">  
                                    <p className="mb-0">
                                        Username
                                        <span className="ms-2 text-muted"><i>Required, 1-64</i></span>
                                    </p>
                                </label>
                                <input type="email" className="form-control" id="userNameInput" 
                                onChange={(e) => {this.setState({ username : e.target.value})}}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="px-4 pt-5 text-center">
                <img className="d-block mx-auto mb-4" src="https://www.svgrepo.com/show/207135/horse.svg" alt="" width="72" height="57"></img>
                <h1 className="display-5 fw-bold">Betting shop</h1>
                <div className="col-md-12 mx-auto">
                    <p className="lead mt-0 bt-0 pt-0  mb-4">Create horse races and bet on them!</p>
                    <nav className="row row-md-12 mx-auto">
                        <Link className="col-md-1 nav-link link-dark" to="/">
                            <b>Home</b>
                        </Link>
                        <Link className="col-md-2 nav-link link-dark" to="/create">
                            Create New Race
                        </Link>
                        <Link className="col-md-2 nav-link link-dark" to="/guide">
                            Guide
                        </Link>
                        <a className="col-md-2 nav-link link-dark" href="https://bettingshop-api.herokuapp.com/swagger/index.html">
                            API Reference
                        </a>
                        { this.authNav() }
                    </nav>
                </div>
            </div>
        );
    }
}


export default Header;