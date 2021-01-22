import React from 'react';
import { withRouter } from 'react-router';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import loginStore from './LoginStore';
import { Toast } from 'primereact/toast';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.toast = React.createRef();

        this.state = {
            username: "",
            password: ""
        };

        this.handleLogin = (evt) => {
            loginStore.login(this.state.username, this.state.password);
        }

        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            })
        }

        this.menuItems = [
            {
                label: 'Experiences',
                command: (event) => {
                    this.props.history.push('/');
                }
            }
        ];
    }

    componentDidMount() {
        loginStore.emitter.addListener('LOGIN_SUCCESS', () => {
            this.props.onLogin(loginStore.user);
            this.props.history.push('/')
        });
        loginStore.emitter.addListener('LOGIN_FAILED', () => {
            if (this.toast.current !== null)
                this.toast.current.show({ severity: 'info', summary: 'Login Failed', detail: 'Invalid credentials', life: 3000 });

        });
    }

    render() {
        return (
            <div>
                <div>
                    <Menubar model={this.menuItems} className="menubar" />
                </div>
                <Toast ref={this.toast} position="bottom-right" />
                <div className="centeredLogin">
                    <h1 style={{ fontFamily: 'Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif' }}>Log In</h1>
                    <span className="p-float-label centeredLoginInput">
                        <InputText style={{ width: '100%' }} id="username" value={this.state.username} name="username" onChange={this.handleChange} />
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className="p-float-label centeredLoginInput">
                        <InputText style={{ width: '100%' }} type='password' id="password" value={this.state.password} name="password" onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                    </span>
                    <div className="submitBtnParent">
                        <Button label="Submit" onClick={this.handleLogin} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login); 