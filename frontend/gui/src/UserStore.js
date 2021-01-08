import { EventEmitter } from 'fbemitter';
const SERVER = 'http://localhost:8080';

class UserStore {
    constructor(user) {
        this.user = user;
        this.data = [];
        this.emitter = new EventEmitter();
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

    async saveOne(id, experience){
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