import { AxiosError } from "axios";
import React from "react";
import { Params } from "react-router-dom";
import HTTPClient from "../utils/HTTPClient";
import IRace from "../domain/IRace";
import IUser from "../domain/IUser";
import IUserBet from "../domain/IUserBet";
import withParams from "../utils/withParams";
import { finished } from "stream";


interface RaceDetailsProps {
    params: Readonly<Params<string>>
    user: IUser | null
}

interface RaceDetailsState {
    race: IRace | null
    loaded: Boolean
    userHasBid: Boolean | null
    userBet: IUserBet | null
}

class RaceDetails extends React.Component<RaceDetailsProps, RaceDetailsState> {
   constructor(props: RaceDetailsProps) {
        super(props);

        this.state = {
            race: null,
            loaded: false,
            userHasBid: null,
            userBet: null
        }

        this.placeBid = this.placeBid.bind(this);
    }

    async placeBid(horseId: number){
        try {
            let data: IUserBet = {
                userId: this.props.user?.id!,
                raceId: this.state.race?.id!,
                horseId: horseId
            }
            let result = await HTTPClient.post("/user/" + this.props.user?.id + "/bet", data);
            this.setState({ userBet: (result.data as IUserBet), userHasBid: true  });
        }
        catch (e) {
            alert(e);
        }
    }

    async componentDidUpdate() {
        // try load user bid if we haven't loaded before
        if (this.props.user != null && this.state.userBet == null && this.state.userHasBid != false) {
            try {
                let result = await HTTPClient.get("/User/" + this.props.user.id + "/bet/" + this.state.race?.id);
                this.setState({ userBet: (result.data as IUserBet), userHasBid: true });
            }
            catch (e) {
                if ((e as AxiosError).response!.status != 404) {
                    alert(e);
                }
                this.setState({ userHasBid: false });
            }
        }
    }

    async componentDidMount() {
        // load race details
        try {
            let result = await HTTPClient.get("/Race/" + this.props.params.raceId);
            this.setState({ race: (result.data as IRace) });
        }
        catch (e) {
            alert(e);
        }

        this.setState({ loaded: true })
    }

    render() {
        if (!this.state.loaded) {
            return (<span>Loading...</span>);
        }
        else if (this.state.race == null) {
            return(<span>Race not found!</span>);
        }

        let raceFinished = new Date(this.state.race.time!) < new Date();

        let horseListItems = this.state.race.horses!.map((horse) => {
            return(
                <tr key={horse.id}>
                    <th scope="row">{horse.position!}</th>
                    <td>{horse.name}</td>
                    <td>
                        { // betting controls
                         (this.state.userHasBid == false && !raceFinished) ? 
                            <button className="btn btn-primary" 
                                onClick={() => {
                                        this.placeBid(horse.id!)
                                }
                            }>Place bid</button> : ""}

                        { (this.state.userHasBid == true && this.state.userBet?.horseId == horse.id) ? 
                            <span className="badge bg-primary">Your Bid!</span> : ""}
                    </td>
                </tr>
            )
        });
        
        return (
            <div className="container col-lg-10">
                <p className="h2">
                    Race: {this.state.race.name}
                    {raceFinished ? 
                        <span className="mx-1 badge rounded-pill bg-primary">Finished</span> : 
                        <span className="mx-1 badge rounded-pill bg-danger">Planned</span>}
                </p>
                <ul className="mb-3 list-group list-group-flush">
                    <li className="list-group-item"><b>When: </b>
                        {new Date(this.state.race.time!).toLocaleDateString() + " " +  new Date(this.state.race.time!).toLocaleTimeString()}
                    </li>
                    <li className="list-group-item"><b>Where: </b>{this.state.race.location}</li>
                </ul>
                    <p className="h3">Horses</p>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            { horseListItems }
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default withParams(RaceDetails);