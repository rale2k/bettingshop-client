import React from "react";
import { Navigate, NavigateFunction } from "react-router";
import HTTPClient from "../utils/HTTPClient";
import IRace from "../domain/IRace";
import IRaceHorse from "../domain/IRaceHorse";
import withNavigate from "../utils/withNavigate";

interface HorseFormProps {
    handleUpdate: Function
}

class HorseForm extends React.Component<HorseFormProps> {
    render() {
        return(
            <div className="mb-3">
                <label htmlFor="locationInput" className="form-label">Horse Name</label>
                <input type="text" className="form-control" id="locationInput"
                onChange={(e) => this.props.handleUpdate(e.target.value)}/>
            </div>
        );
    }
}

interface RaceCreateProps {
    navigate: NavigateFunction
}

interface RaceCreateState {
    name: string | null,
    location: string | null,
    time: Date | null,
    horses: IRaceHorse[]
    horseForms: JSX.Element[]
}

class RaceCreate extends React.Component<RaceCreateProps, RaceCreateState> {

    constructor(props: any) {
        super(props)

        this.state =  { 
            name: null,
            location: null,
            time: null,
            horses: [],
            horseForms: []
        }

        this.handleHorseFormUpdate = this.handleHorseFormUpdate.bind(this);
        this.submitRace = this.submitRace.bind(this);
        this.addHorseForm = this.addHorseForm.bind(this);
}

    addHorseForm() {
        let newHorse: IRaceHorse = { id: null, name: "", position: null };
        
        this.setState((prevstate) => ({
            horses: prevstate.horses.concat([newHorse]),
            horseForms: prevstate.horseForms.concat([<HorseForm handleUpdate={(value: string) =>
                 this.handleHorseFormUpdate(prevstate.horses.length, value)} />])
        }));
    }

    handleHorseFormUpdate(index: number, newValue: string) {
        let newHorses = this.state.horses.slice();
        newHorses[index].name = newValue;
        this.setState({ horses: newHorses });
    }

    async submitRace(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let result;
        try {
            let data: IRace = { 
                id: null,
                name: this.state.name,
                time: this.state.time?.toJSON()!,
                location: this.state.location,
                horses: this.state.horses
            }
            result = await HTTPClient.post("/Race", data);
        }
        catch (e) {
            alert(e);
        }
        this.props.navigate("/");
    }

    render() {
        return (
            <form className="col-lg-5 mx-auto" onSubmit={this.submitRace}>
                <h3>Create New Race</h3>
                <hr></hr>
                <div className="mb-3">
                    <label htmlFor="raceNameInput" className="form-label">Race Name</label>
                    <input type="text" className="form-control" id="raceNameInput"
                    onChange={(e) => {this.setState({ name : e.target.value})}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="locationInput" className="form-label">Location</label>
                    <input type="text" className="form-control" id="locationInput"
                    onChange={(e) => {this.setState({ location : e.target.value})}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="dateInput" className="form-label">Time</label>
                    <input type="datetime-local" className="form-control" id="dateInput"
                    onChange={(e) => {this.setState({ time : new Date(e.target.value)})}}/>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Horses</h4>
                    <div className="text-muted">Atleast 1 horse!</div>
                    <button type="button" className="ms-4 btn btn-primary" onClick={this.addHorseForm}>Add Horse</button>
                </div>
                <hr></hr>
                {this.state.horseForms.map((component, index) => (
                    <React.Fragment key={index}>
                        { component }
                    </React.Fragment>
                    ))
                }

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default withNavigate(RaceCreate);