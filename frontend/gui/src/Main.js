import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import expStore from './ExperienceStore';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Card } from 'primereact/card';


class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            experiences: []
        }

        this.handleChange = (evt) => {
            expStore.getAll(evt.target.value);
        }

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
        const items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            },

                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    },

                ]
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus',

                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus',

                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            },

                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off'
            }
        ];

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
                    </Card>
                </div>

            );
        }

        return (
            <div>
                <div>
                    <Menubar model={items} className="menubar" />
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

export default Main;