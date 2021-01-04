import { EventEmitter } from 'fbemitter';
const SERVER = 'http://localhost:8080';

class ExperienceStore {
    constructor() {
        this.data = [];
        this.emitter = new EventEmitter();
    }

    async getAll(queryParams) {
        try {
            const response = await fetch(`${SERVER}/experiences?filter=${queryParams}`);
            const data = await response.json();
            this.data = data;
            this.emitter.emit('GET_ALL_SUCCESS');

        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_ALL_ERROR'); 
        }
    }
}

const expStore = new ExperienceStore();

export default expStore;