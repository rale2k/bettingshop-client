import React from "react";
import { Link } from "react-router-dom";
import HTTPClient from "../utils/HTTPClient";
import IRace from "../domain/IRace";

interface RaceListState {
    loaded: Boolean
    races: IRace[] | null
}

class RaceList extends React.Component<any, RaceListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            loaded: false,
            races: null
        }
    }

    async componentDidMount() {
        try {
            let result = await HTTPClient.get("/Race");
            this.setState( {races: (result.data as IRace[])} );
        }
        catch (e) {
            alert(e);
        }

        this.setState({ loaded: true })
    }

    render() {
        if (!this.state.loaded) {
            return (<span>Loading.</span>)
        }

        if (this.state.races == null) {
            return (<span>Error</span>)
        }

        if (this.state.races!.length == 0) {
            return (<span>No races!</span>)
        }
        let raceListItems = this.state.races!.map((race) => {
            let date = new Date(race.time!);
            let statePill = ((date < new Date()) 
            ?   <span className="badge rounded-pill bg-primary me-3">Finished</span> : 
                <span className="badge rounded-pill bg-danger me-3">Planned</span>)

            return(
                <tr key={race.id}>
                    <td>{race.name}</td>
                    <td>{race.location}</td>
                    <td>
                        {statePill}
                        {date.toLocaleDateString() + " " +  date.toLocaleTimeString()}
                    </td>
                    <td>
                        <Link to={'/details/' + race.id}>
                            <button className="btn btn-primary btn-sm">Details</button>
                        </Link>
                    </td>
                </tr>
            )
        });
        
        return (
            <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Race Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Time</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {raceListItems}
                </tbody>
            </table>
        )
    }
}

export default RaceList;