import React from 'react';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'font-awesome/css/font-awesome.min.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import RaceCreate from './components/RaceCreate';
import RaceList from './components/RaceList';
import RaceDetails from './components/RaceDetails';
import IUser from './domain/IUser';
import Guide from './components/Guide';

interface AppState {
    user: IUser | null
}

class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: null
        };

        this.handleUserLogon = this.handleUserLogon.bind(this);
    }

    handleUserLogon(newUser: IUser) {
        this.setState({ user: newUser })
    }

    render() {
        return (
        <div className='container'>
            <header>
                <Header user={this.state.user} handleLogon={this.handleUserLogon} />
            </header>
            <hr />
            <main>
                <Routes>
                    <Route path="/*" element={ <RaceList /> } />
                    <Route path="create" element={ <RaceCreate />} />
                    <Route path="details/:raceId" element={ <RaceDetails user={this.state.user}/> } />
                    <Route path="guide" element={ <Guide />} />
                </Routes>
            </main>
        </div>
        )
    }
}

export default App;
