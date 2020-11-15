import { defaultTodos } from './defaultTodos';

export class Organisation {
    name: string;
    todos: any[];
    admins: [];
    users: [];

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.todos = obj ? obj.todos : defaultTodos;
        this.admins = obj ? obj.admins : [];
        this.users = obj ? obj.users : [];
    }

    public toJSON() {
        return {
            name : this.name,
            todos : this.todos,
            admins : this.admins,
            users : this.users
        };
    }
}