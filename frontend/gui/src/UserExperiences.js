import React from 'react';
import { withRouter } from 'react-router';
import { Menubar } from 'primereact/menubar';
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import UserStore from "./UserStore"
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';


class UserExperiences extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            experiences: [],
            isAddDialogShown: false,
            experience: {
                city: null,
                start: "",
                destination: "",
                transport: null,
                startTime: "",
                duration: "",
                congestion: "",
                observations: "",
                satisfaction: 0,
            }
        };

        this.store = new UserStore(this.props.user);

        this.handleExperienceChange = (evt) => {
            const experience = this.state.experience;
            experience[evt.target.name] = evt.target.value
            this.setState({
                experience: experience
            })
        }

        this.hideAddDialog = () => {
            this.setState({
                isAddDialogShown: false
            })
        }

        this.add = () => {
            //De facut validari inainte de a adauga:)
            this.store.addOne(this.state.experience);
            this.hideAddDialog();
        }

        this.showAddDialog = () => {
            this.setState({
                isAddDialogShown: true
            })
        }

        this.addDialogFooter = (
            <div className='centered'>
                <Button icon="pi pi-check" label='save' className="p-button-rounded p-button-outlined" onClick={this.add} />
            </div>
        )

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

        this.store.emitter.addListener('ADD_ONE_FAILED', () => {
            alert('Experience could not be added');
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
                    <Card title={data.city} style={{ marginBottom: '1em', padding: '1em' }}>
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

                            this.props.history.push('/experiences/add')
                        }} />

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
                <div className="centered-experiences">
                    <Button icon="pi pi-plus" className="centered-button p-button" label="New Experience" onClick={this.showAddDialog} />
                </div>
                <div>
                    <div className="card">
                        <DataView style={{ padding: '2em' }} value={this.state.experiences} layout={'grid'} itemTemplate={itemTemplate}></DataView>
                    </div>
                </div>

                <Dialog style={{ width: '35vw' }} header="Add an experience" visible={this.state.isAddDialogShown} onHide={this.hideAddDialog} className='p-fluid'
                    footer={this.addDialogFooter} >
                    <div className='p-field'>
                        <label htmlFor="row">City *</label>
                        <InputText type="text" id="city" name="city" value={this.state.experience.city} onChange={this.handleExperienceChange} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="col" >Transport *</label>
                        <InputText type="text" id="transport" name="transport" value={this.state.experience.transport} onChange={this.handleExperienceChange} />
                    </div>

                </Dialog>
            </div>
        )
    }
}

export default withRouter(UserExperiences); 