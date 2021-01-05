import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import expStore from './ExperienceStore';
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { withRouter } from 'react-router';
import { Button } from 'primereact/button';


class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            experiences: [],
            test:"asd"
        }

        this.handleChange = (evt) => {
            //preluare experiente pe baza de queryparams
            expStore.getAll(evt.target.value);
        }

        this.items = [
            {
                label: 'Experiences',
                command: (event) => {
                    window.location.reload();
                }
            },
            {
                label: 'Login',
                command: (event) => {
                    this.props.history.push('/login');   
                }
            }
        ];

    }

    componentDidMount() {
        expStore.getAll("");
        expStore.emitter.addListener('GET_ALL_SUCCESS', () => {
            this.setState({
                experiences: expStore.data
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
                   <Card title={data.city} style={{marginBottom: '1em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                            start: {data.start}
                        </p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                            destination: {data.destination}
                        </p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                            transport: {data.transport}
                        </p>
                    </Card>
                </div>

            );
        }

        return (
            <div>
                <div>
                    <Menubar model={this.items} className="menubar" end={<Button label="Sign Up"/>} />
                </div>
                <div className="center">
                    <InputText type="text" className="p-inputtext-lg p-d-block main-input-text" 
                    placeholder="Search for cities, transport, destinations..."
                    onChange={this.handleChange} />
                </div>
                <div className="card">
                    <DataView style={{padding: '2em'}} value={this.state.experiences} layout={'grid'} itemTemplate={itemTemplate}></DataView>
                </div>
            </div>
        )
    }
}

export default withRouter(Main);