import React from 'react';
import { withRouter } from 'react-router';
import { Menubar } from 'primereact/menubar';
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import UserStore from "./UserStore"
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';


class UserExperiences extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            experiences: [],
            isAddDialogShown: false,
            editDialog: false,
            experience: {
                city: null,
                start: "",
                destination: "",
                transport: null,
                startTime: "",
                duration: "",
                congestion: "",
                observations: "",
                satisfaction: null,
                id: null
            },
            invalidCity: false,
            invalidTransport: false,
            invalidObservations: false
        };

        this.levels = ['High', 'Medium', 'Low'];

        this.store = new UserStore(this.props.user);

        this.handleExperienceChange = (evt) => {
            const experience = this.state.experience;
            experience[evt.target.name] = evt.target.value
            this.setState({
                experience: experience
            })
        }

        this.hideAddDialog = () => {
            const experience = this.state.experience;
            experience['city'] = null;
            experience['start'] = "";
            experience['destination'] = "";
            experience['transport'] = null;
            experience['startTime'] = "";
            experience['duration'] = "";
            experience['congestion'] = "";
            experience['observations'] = "";
            experience['satisfaction'] = null;
            this.setState({
                isAddDialogShown: false,
                experience: experience,
                invalidCity: false,
                invalidTransport: false,
                invalidObservations: false
            })
        }

        this.hideEditDialog = () => {
            this.setState({
                isAddDialogShown: false
            })
        }

        this.add = () => {
            //Validari 
            let invalid = false;
            if (this.state.experience.city === null || this.state.experience.city === "" || this.state.experience.city.startsWith(" ")) {
                this.setState({
                    invalidCity: true
                })
                invalid = true;
            } else {
                this.setState({
                    invalidCity: false
                })
            }
            if (this.state.experience.transport === null || this.state.experience.transport === "" || this.state.experience.transport.startsWith(" ")) {
                this.setState({
                    invalidTransport: true
                })
                invalid = true;
            } else {
                this.setState({
                    invalidTransport: false
                })
            }
            if (this.state.experience.observations && this.state.experience.observations.length > 140) {
                this.setState({
                    invalidObservations: true
                })
                invalid = true;
            } else {
                this.setState({
                    invalidObservations: false
                })
            }

            if (invalid) {
                return;
            }

            //Format Time
            let hours, minutes, time;
            const experience = this.state.experience;
            //startTime
            if (this.state.experience.startTime) {
                hours = this.state.experience.startTime.getHours();
                minutes = this.state.experience.startTime.getMinutes();
                time = hours + ":" + minutes;
                experience['startTime'] = time;
            }
            //duration
            if (this.state.experience.duration) {
                hours = Math.floor(this.state.experience.duration / 60);
                minutes = this.state.experience.duration % 60;
                time = hours + ":" + minutes;
                experience['duration'] = time;
            }
            this.setState({
                experience: experience
            })

            if (this.state.editDialog) {
                this.store.saveOne(this.state.experience.id, this.state.experience);
                this.hideEditDialog();
            } else {
                this.store.addOne(this.state.experience);
                this.hideAddDialog();
            }
        }

        this.showAddDialog = () => {
            const experience = this.state.experience;
            experience['city'] = null;
            experience['start'] = "";
            experience['destination'] = "";
            experience['transport'] = null;
            experience['startTime'] = "";
            experience['duration'] = "";
            experience['congestion'] = "";
            experience['observations'] = "";
            experience['satisfaction'] = null;
            this.setState({
                experience: experience,
                isAddDialogShown: true,
                editDialog: false
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
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'My Experiences',
                        },
                        {
                            label: 'User Settings',
                            command: (event) => {
                                this.props.history.push(`/user-settings/${this.props.user.id}`)
                            }
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
                            <div className="p-m-0" style={{ lineHeight: '1.5' }}>
                                <Rating value={data.satisfaction} readonly stars={5} cancel={false} />
                            </div>
                        }
                        <Button icon="pi pi-trash" className="p-button-rounded user-buttons" onClick={() => {
                            this.store.deleteOne(data.id);
                        }} />
                        <Button icon="pi pi-pencil" className="p-button-rounded user-buttons" onClick={() => {
                            const experience = this.state.experience;
                            experience['city'] = data.city;
                            experience['start'] = data.start;
                            experience['destination'] = data.destination;
                            experience['transport'] = data.transport;
                            let startTime = new Date();
                            startTime.setHours(data.startTime.split(":")[0]);
                            startTime.setMinutes(data.startTime.split(":")[1]);
                            experience['startTime'] = startTime;
                            experience['duration'] = parseInt(data.duration.split(":")[0]) * 60 + parseInt(data.duration.split(":")[1]);
                            experience['congestion'] = data.congestion;
                            experience['observations'] = data.observations;
                            experience['satisfaction'] = data.satisfaction;
                            experience['id'] = data.id;
                            this.setState({
                                experience: experience,
                                editDialog: true,
                                isAddDialogShown: true
                            })
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

                <Dialog style={{ width: '35vw' }} header={this.editDialog ? "Add an experience" : "Edit experience"} visible={this.state.isAddDialogShown}
                    onHide={this.state.editDialog === true ? this.hideEditDialog : this.hideAddDialog} className='p-fluid'
                    footer={this.addDialogFooter} >
                    <div className='p-field'>
                        <label htmlFor="row">City * {this.state.invalidCity && <small className='validation'>This field is required.</small>}</label>
                        <InputText type="text" id="city" name="city" value={this.state.experience.city} onChange={this.handleExperienceChange} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="row">Start</label>
                        <InputText type="text" id="start" name="start" value={this.state.experience.start} onChange={this.handleExperienceChange} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="row">Destination</label>
                        <InputText type="text" id="destination" name="destination" value={this.state.experience.destination} onChange={this.handleExperienceChange} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="col" >Transport * {this.state.invalidTransport && <small className='validation'>This field is required.</small>}</label>
                        <InputText type="text" id="transport" name="transport" value={this.state.experience.transport} onChange={this.handleExperienceChange} />
                    </div>
                    <div className="p-field ">
                        <label htmlFor="time12">Start time</label>
                        <Calendar id="startTime" name="startTime" value={this.state.experience.startTime} onChange={this.handleExperienceChange} timeOnly={true} hourFormat="24" />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="row">Duration (minutes)</label>
                        <InputText type="number" min="0" id="duration" name="duration" value={this.state.experience.duration} onChange={this.handleExperienceChange} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="row">Congestion</label>
                        <Dropdown id="congestion" name="congestion" value={this.state.experience.congestion} options={this.levels} onChange={this.handleExperienceChange} placeholder="Select a level of congestion" />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="row">Observations {this.state.invalidObservations && <small className='validation'>Too large text.</small>}</label>
                        <InputTextarea id="observations" name="observations" value={this.state.experience.observations} onChange={this.handleExperienceChange} rows={3} cols={30} />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="row">Satisfaction</label>
                        <Rating id="satisfaction" name="satisfaction" value={this.state.experience.satisfaction} cancel={false} onChange={this.handleExperienceChange} />
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(UserExperiences); 