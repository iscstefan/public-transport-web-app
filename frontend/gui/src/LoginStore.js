import { EventEmitter } from 'fbemitter';
const SERVER = 'http://localhost:8080';

class LoginStore {
    constructor() {
        this.user = {
            username: '',
            id: '',
            token: ''
        };

        this.emitter = new EventEmitter();
    }

    async login(username, password) {
        const user = {
            username: username,
            password: password
        }

        try {
            const response = await fetch(`${SERVER}/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if(response.status === 200) {
                //autentificare cu succes
                this.user.username = username;

                const loginResponse = await response.json();

                this.user.id = loginResponse.id;
                this.user.token = loginResponse.token;
                
                this.emitter.emit('LOGIN_SUCCESS');
                
            } else {
                this.emitter.emit('LOGIN_FAILED');
            }
            
        } catch (err) {
            console.warn(err);
            this.emitter.emit('LOGIN_FAILED');
        }
    }
}

const loginStore = new LoginStore();

export default loginStore;