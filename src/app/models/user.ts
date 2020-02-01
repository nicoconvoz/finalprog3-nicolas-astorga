export interface Roles{
    editor?: boolean;
    admin?: boolean;
}
export interface UserInterface{
    id?: string;
    name?: string;
    email?: string;
    passtowe?: string;
    photoUrl?: string;
    roles?: Roles;
}