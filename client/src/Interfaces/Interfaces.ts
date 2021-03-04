/**
 * UserInterface which we show only the necesary data. Excluding password
 *
 * @interface
 */
export interface UserInterface {
    id: string,
    username: string,
    isAdmin: boolean
}