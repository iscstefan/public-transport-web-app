import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import ExperienceStore from './ExperienceStore';
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { withRouter } from 'react-router';
import { Button } from 'primereact/button';
import {Rating} from 'primereact/rating';


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            experiences: []
        }

        //daca nu este autentificat utilizatorul, se va afisa "Login" in meniu, altfel, numele utilizatorului
        this.expStore = new ExperienceStore();

        this.handleChange = (evt) => {
            //preluare experiente pe baza de queryparams
            this.expStore.getAllWithQuery(evt.target.value);
        }

        this.getMenuItems = () => {
            let items;
            if (this.props.loggedUser.username === "") {
                items = [
                    {
                        label: 'Experiences',
                    },
                    {
                        label: "Login",
                        command: (event) => {
                            this.props.history.push('/login');
                        }
                    }
                ]
            } else {
                items = [
                    {
                        label: 'Experiences',
                    },
                    {
                        label: this.props.loggedUser.username,
                        icon:'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'My Experiences',
                                command: (event) => {
                                    this.props.history.push('/experiences');
                                },
                            },
                            {
                                label: 'User Settings',
                                command: (event) => {
                                    this.props.history.push(`/user-settings/${this.props.loggedUser.id}`)
                                }
                            }
                        ]
                    }
                ]
            }

            return items;
        }

        this.signup = () => {
            this.props.history.push('/signup');
        }

        this.logout = () => {
            this.props.onLogout({
                username: '',
                id: '',
                token: ''

            })
        }

    }

    componentDidMount() {
        this.expStore.getAll();
        this.expStore.emitter.addListener('GET_ALL_SUCCESS', () => {
            this.setState({
                experiences: this.expStore.data
            })
        })
        this.expStore.emitter.addListener('GET_ALL_QUERY_SUCCESS', () => {
            this.setState({
                experiences: this.expStore.data
            })
        })
    }

    render() {
        const itemTemplate = (experience) => {
            if (!experience) {
                return;
            }

            return renderGridItem(experience);

        };

        const renderGridItem = (data) => {
            return (
                <div className='experience'>
                    <Card title={data.city} style={{ marginBottom: '1em', padding: '1em'}} className="p-shadow-4">
                        {
                            data.start &&
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                                Start: {data.start}
                            </p>
                        }
                        {
                            data.destination &&
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                                Destination: {data.destination}
                            </p>
                        }
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                            Transport: <b>{data.transport}</b>
                        </p>
                        {
                            data.startTime &&
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                                Start time: {data.startTime}
                            </p>
                        }
                        {
                            data.duration &&
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                                Duration: {data.duration}
                            </p>
                        }
                        {
                            data.congestion &&
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                                Congestion: {data.congestion}
                            </p>
                        }
                        {
                            data.observations &&
                            <div className="p-m-0" style={{ lineHeight: '1.5' }}>
                                Observations: {data.observations}
                            </div>
                        }
                        {
                            <div className="p-m-0" style={{ lineHeight: '1.5' }}>
                                <Rating value={data.satisfaction} readonly stars={5} cancel={false} />
                            </div>
                        }
                    </Card>
                </div>

            );
        }

        return (
            <div>
                <div>
                    <Menubar model={this.getMenuItems()} className="menubar"
                        end={this.props.loggedUser.username === '' ? <Button label="Sign Up" onClick={this.signup} /> : <Button label="Log Out" onClick={this.logout} />} />
                </div>
                <div className="center">
                    <InputText type="text" className="p-inputtext-lg p-d-block main-input-text p-shadow-4"
                        placeholder={"Search by city, transport, destinations..."}
                        onChange={this.handleChange} />
                </div>
                <div className="card">
                    <DataView style={{ padding: '2em'}} value={this.state.experiences} layout={'grid'} itemTemplate={itemTemplate}></DataView>
                </div>
            </div>
        )
    }
}

export default withRouter(Main);