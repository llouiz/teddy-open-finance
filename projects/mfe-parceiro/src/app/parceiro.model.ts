export default interface Parceiro {
    id?: number;
    name: string,
    description: string
    createdAt?: string,
    repositoryGit?: string,
    urlDoc?: string,
    clients?: any[],
    projects?: any[]
    editable?: boolean,
    validator?: any,
    [key: string]: any; // Adiciona um índice de string
};