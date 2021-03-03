export interface DBUserInterface {
    username: string;
    password: string;
    isAdmin: boolean;
    _id: string;
}

export interface UserInterface {
    id: string;
    username: string;
    isAdmin: boolean;
}