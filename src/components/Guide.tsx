import React from "react";

class Guide extends React.Component {
    render() {
        return (
            <div className="container col-lg-5">
                <p className="h3">Guide</p>
                <p>
                    Any user can create a race, but only "authenticated" users can bid on races. 
                    <br/><br/>
                    Every field when creating a race is required and has requirements, but validation is only serverside currently.
                    <br/><br/>
                    Bidding can happen only before the deadline.
                    Races can also be created that happened in the past, but they cannot be bid on.
                    <br/><br/>
                    Authentication is only username based, and only the userId will serve as an identifier. 
                    If the user doesn't exist, it will be created automatically.
                    Login session is not stored locally.
                    <br/><br/>
                    Race will be automatically "completed" when the deadline is passed. 
                    Results are chosen randomly.
                    <br/><br/>
                    If an user bids on the winning horse, they "win", though its not expressed or tracked in any way.
                </p>
            </div>
        )
    }
}

export default Guide;