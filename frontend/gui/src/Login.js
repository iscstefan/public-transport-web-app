import React from 'react';
import { withRouter } from 'react-router';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import loginStore from './LoginStore';

class Login extends React.Component {
    constructor(props) {
        super(props);

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
            alert('Nu te-ai logat');
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Menubar model={this.menuItems} className="menubar" />
                </div>
                <div className="centeredLogin">
                    <h1>Log In</h1>
                    <span className="p-float-label centeredLoginInput">
                        <InputText style={{width: '100%'}} id="username" value={this.state.username} name="username" onChange={this.handleChange} />
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className="p-float-label centeredLoginInput">
                        <InputText style={{width: '100%'}} type='password' id="password" value={this.state.password} name="password" onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                    </span>
                    <div className="submitBtnParent">
                        <Button label="Submit" onClick={this.handleLogin}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login); 