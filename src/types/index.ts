export type MetaType = 'Pag' | 'Zante' | 'Gallipoli' | 'Corfu' | 'SanTeodoro';
export type metatype = 'pag' | 'zante' | 'gallipoli' | 'corfu' | 'sanTeodoro';

export type AddLinkActionProps = {
    link: string,
    meta: MetaType,
    data: Date,
    creator_email: string,
}
