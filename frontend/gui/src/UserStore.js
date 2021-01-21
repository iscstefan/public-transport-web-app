import { EventEmitter } from 'fbemitter';
const SERVER = 'http://localhost:8080';

class UserStore {
    constructor(user) {
        this.user = user;
        this.data = [];
        this.emitter = new EventEmitter();
    }

    async isLoggedIn() {
        try {
            const response = await fetch(`${SERVER}/users/${this.user.id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${this.user.token}`
                }
            })

            if (response.status !== 200) {
                this.emitter.emit('USER_AUTH_FAILED')
            }

        } catch (err) {
            console.warn(err)
            this.emitter.emit('USER_AUTH_FAILED')
        }
    }

    async getExperiences() {
        try {
            const response = await fetch(`${SERVER}/users/${this.user.id}/experiences`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${this.user.token}`
                }
            });
            const data = await response.json();
            this.data = data;

            if (response.status === 200) {
                this.emitter.emit('GET_EXPERIENCES_SUCCESS');
            } else if (response.status === 401) {
                this.emitter.emit('UNAUTHORIZED');
            } else {
                this.emitter.emit('GET_EXPERIENCES_FAILED');
            }

        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_EXPERIENCES_FAILED');
        }
    }

    async deleteUser() {
        try {
            await fetch(`${SERVER}/users/${this.user.id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${this.user.token}`
                }
            })

        } catch (err) {
            console.warn(err);
            this.emitter.emit('DELETE_USER_ERROR');
        }
    }

    async deleteOne(id) {
        try {
            await fetch(`${SERVER}/users/${this.user.id}/experiences/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${this.user.token}`
                }
            })

            this.getExperiences();
        } catch (err) {
            console.warn(err);
            this.emitter.emit('DELETE_ONE_ERROR');
        }
    }



    async addOne(experience) {
        try {
            await fetch(`${SERVER}/users/${this.user.id}/experiences`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${this.user.token}`
                },
                body: JSON.stringify(experience)
            })

            this.getExperiences();
        } catch (err) {
            console.warn(err);
            this.emitter.emit('ADD_ONE_ERROR');
        }
    }

    async updateUser(user) {
        try {
            const response = await fetch(`${SERVER}/users/${this.user.id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${this.user.token}`
                },
                body: JSON.stringify(user)
            })
            
            if(response.status === 200) {
                if(user.password == null)
                    this.emitter.emit('USER_UPDATE_SUCCESS')
                else
                    this.emitter.emit('PASS_UPDATE_SUCCESS')
            } else if (response.status === 422) {
                this.emitter.emit('USER_UPDATE_422')
            } else {
                this.emitter.emit('USER_AUTH_FAILED')
            }

        } catch (err) {
            console.warn(err)
            this.emitter.emit('USER_AUTH_FAILED')
        }
    }

    async saveOne(id, experience) {
        try {
            await fetch(`${SERVER}/users/${this.user.id}/experiences/${id}`, {
                method: 'put',
                headers: {
                    "Content-Type": 'application/json',
                    "token": `${this.user.token}`
                },
                body: JSON.stringify(experience)
            });
            this.getExperiences();
        } catch (error) {
            console.warn(error);
            this.emitter.emit('SAVE_ONE_ERROR')
        }
    }
}

export default UserStore;