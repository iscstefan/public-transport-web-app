import { EventEmitter } from 'fbemitter';
const SERVER = 'http://localhost:8080';

class ExperienceStore {
    constructor() {
        this.data = [];
        this.emitter = new EventEmitter();
    }

    async getAll() {
        try {
            const response = await fetch(`${SERVER}/experiences`);
            const data = await response.json();
            this.data = data;
            this.emitter.emit('GET_ALL_SUCCESS');

        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_ALL_ERROR'); 
        }
    }
    
    async getAllWithQuery(query) {
        try {
            const response = await fetch(`${SERVER}/experiences/?filter=${query}`);
            const data = await response.json();
            this.data = data;
            this.emitter.emit('GET_ALL_QUERY_SUCCESS');

        } catch (err) {
            console.warn(err);
            this.emitter.emit('GET_ALL_QUERY_ERROR'); 
        }
    }
}

export default ExperienceStore;