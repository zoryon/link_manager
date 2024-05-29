export type MetaType = 'Pag' | 'Zante' | 'Gallipoli' | 'Corfu' | 'SanTeodoro';
export type metatype = 'pag' | 'zante' | 'gallipoli' | 'corfu' | 'sanTeodoro';

export type AddLinkActionProps = {
    link: string,
    meta: MetaType,
    data: Date,
    nome_cognome: string,
    turn: number,
}

export type DeleteActionParams = {
    link_id: number
}