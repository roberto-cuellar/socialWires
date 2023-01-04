

export interface CreateMessageInterface {
    title: string;
    messages: string;
    usuario: string;
    fecha?: string;
}

export interface Usuario {
    uid: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;
    data?: any[]
}
