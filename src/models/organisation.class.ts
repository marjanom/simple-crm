import { defaultTodos } from './defaultTodos';

export class Organisation {
    name: string;
    defaultTodos: [];
    admins: [];
    users: [];

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.defaultTodos = obj ? obj.defaultTodos : defaultTodos;
        this.admins = obj ? obj.admins : [];
        this.users = obj ? obj.users : [];
    }

    public toJSON() {
        return {
            name : this.name,
            defaultTodos : this.defaultTodos,
            admins : this.admins,
            users : this.users
        };
    }
}