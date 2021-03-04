/**
 * DBUserInterface all the user data from database. Including password
 *
 * @interface
 */
export interface DBUserInterface {
    username: string;
    password: string;
    isAdmin: boolean;
    _id: string;
}

/**
 * UserInterface which we show only the necesary data. Excluding password
 *
 * @interface
 */
export interface UserInterface {
    id: string;
    username: string;
    isAdmin: boolean;
}