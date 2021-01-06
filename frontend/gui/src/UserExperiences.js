import React from 'react';
import { withRouter } from 'react-router';
import { Menubar } from 'primereact/menubar';
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import UserStore from "./UserStore"

class UserExperiences extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            experiences: []
        };

        this.store = new UserStore(this.props.user);

        this.getMenuItems = () => {
            let items;

            items = [
                {
                    label: 'Experiences',
                    command: (event) => {
                        this.props.history.push('/');
                    }
                },
                {
                    label: this.props.user.username,
                    items: [
                        {
                            label: 'My Experiences',
                        }
                    ]
                }
            ]

            return items;
        }

        this.logout = () => {
            this.props.onLogout({
                username: '',
                id: '',
                token: ''
            })
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.store.getExperiences();

        this.store.emitter.addListener('GET_EXPERIENCES_SUCCESS', () => {
            this.setState({
                experiences: this.store.data
            })
        });
        this.store.emitter.addListener('GET_EXPERIENCES_FAILED', () => {

        });

        this.store.emitter.addListener('GET_EXPERIENCES_FAILED', () => {
            this.props.history.push('/')
        });
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
                    <Card title={data.city} style={{ marginBottom: '1em', padding: '1em'}}>
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
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                                Observations: {data.observations}
                            </p>
                        }
                        {
                            data.satisfaction &&
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                                satisfaction: {data.satisfaction}
                            </p>
                        }
                        <Button icon="pi pi-trash" className="p-button-rounded user-buttons" onClick={() => {
                            this.store.deleteOne(data.id);
                        }} />
                        <Button icon="pi pi-pencil" className="p-button-rounded user-buttons" onClick={() => {
                            //aici faci edit-ul
                            //this.store.saveOne()
                        }}/>


                    </Card>

                </div>

            );
        }

        return (
            <div>
                <div>
                    <Menubar model={this.getMenuItems()} className="menubar"
                        end={<Button label="Log Out" onClick={this.logout} />} />
                </div>
                <div>
                    <h1>Experiences of user {this.props.user.username}:</h1>
                    <div className="card">
                        <DataView style={{ padding: '2em' }} value={this.state.experiences} layout={'grid'} itemTemplate={itemTemplate}></DataView>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserExperiences); 