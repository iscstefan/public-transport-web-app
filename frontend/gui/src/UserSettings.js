import UserStore from "./UserStore"
import React from 'react';
import { withRouter } from 'react-router';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

class UserSettings extends React.Component {
    constructor(props) {
        super(props)
        this.store = new UserStore({ username: this.props.user.username, id: this.props.match.params.uid, token: this.props.user.token });

        this.state = {
            username: '',
            password: '',
            invalidUsername: '',
            invalidPassword: '',
            displayConfirmation: false
        }

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
                            command: (event) => {
                                this.props.history.push('/experiences');
                            },
                        },
                        {
                            label: 'User Settings'
                        }
                    ]
                }
            ]

            return items;
        }

        this.showDialog = () => {
            this.setState({
                displayConfirmation: !this.state.displayConfirmation
            })
        }

        this.logout = () => {
            this.props.onLogout({
                username: '',
                id: '',
                token: ''
            })
            this.props.history.push('/');
        }

        this.updateUser = () => {
            if (this.state.username.length === 0 || this.state.username.startsWith(' ')) {
                this.setState({
                    invalidUsername: 'Invalid Username.'
                })

                return;
            }

            this.store.updateUser({ username: this.state.username })
        }

        this.updatePass = () => {
            if (this.state.password.length < 3 || this.state.password.startsWith(' ')) {
                this.setState({
                    invalidPassword: 'Invalid password (it should contain at least 3 characters).'
                })

                return;
            }

            this.store.updateUser({ password: this.state.password })
        }

        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        }
    }

    componentDidMount() {
        if (this.props.user.username === "" || this.props.user.token === "") {
            this.props.history.push('/')
        }

        this.store.isLoggedIn()

        this.store.emitter.addListener('USER_AUTH_FAILED', () => {
            this.props.history.push('/')
        })

        this.store.emitter.addListener('USER_UPDATE_SUCCESS', () => {
            this.props.onUserChange({ username: this.state.username, id: this.props.match.params.uid, token: this.props.user.token })

            this.setState({
                invalidUsername: '',
                username: ''
            })

        })

        this.store.emitter.addListener('PASS_UPDATE_SUCCESS', () => {
            this.setState({
                invalidPassword: '',
                password: ''
            })
        })

        this.store.emitter.addListener('USER_UPDATE_422', () => {
            this.setState({
                invalidUsername: "Username already taken."
            })
        })
    }

    render() {
        const renderFooter = (name) => {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => this.showDialog()} />
                    <Button label="Yes" icon="pi pi-check" autoFocus onClick={() => {
                        this.store.deleteUser()

                        this.logout();
                    }} />
                </div>
            );
        }

        return (
            <div>
                <div>
                    <Menubar model={this.getMenuItems()} className="menubar"
                        end={<Button label="Log Out" onClick={this.logout} />} />
                </div>
                <div className='centered-form'>
                    <div className='centered-form-items'>
                        <small className="p-invalid p-d-block">{this.state.invalidUsername}</small>
                    </div>
                    <div className='centered-form-items'>
                        <label htmlFor="username" className="p-col-fixed" style={{ width: '100px' }}>Username:</label>
                        <div className="p-col">
                            <InputText id="username" type="text" value={this.state.username} name='username' onChange={this.handleChange} />
                        </div>
                        <Button style={{ margin: '5px' }} onClick={() => this.updateUser()} className="p-button-raised p-button-text" label='Update' />
                    </div>
                    <div className='centered-form-items'>
                        <small className="p-invalid p-d-block">{this.state.invalidPassword}</small>
                    </div>
                    <div className='centered-form-items'>
                        <label htmlFor="password" className="p-col-fixed" style={{ width: '100px' }}>Password:</label>
                        <div className="p-col">
                            <InputText id="password" type="password" name='password' onChange={this.handleChange} value={this.state.password} />
                        </div>
                        <Button onClick={() => this.updatePass()} className="p-button-raised p-button-text" label='Update' style={{ margin: '5px' }} />
                    </div>
                    <div className='centered-form-items'>
                        <Button label="Delete Account" icon="pi pi-external-link" onClick={() => this.setState({ displayConfirmation: true })} style={{ position: 'relative', top: '10vh' }} />
                        <Dialog header="Confirmation" visible={this.state.displayConfirmation} modal style={{ width: '350px' }} footer={renderFooter('displayConfirmation')} onHide={() => this.setState({ displayConfirmation: false })}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to proceed?</span>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserSettings)