import { makeAutoObservable, observable, runInAction } from 'mobx';
import { IChart } from '../models/IChart';


export class RootStore {
    departments: IChart[] = [];


    constructor() {
        makeAutoObservable(this, {
            departments: observable,

        });
    }

    setDepartments(departments: IChart[]) {
        runInAction(() => {
            this.departments = departments;
        });
    }

    
   
    async fetchDepartments() {
        const departments = ''

        return departments;
    }

}