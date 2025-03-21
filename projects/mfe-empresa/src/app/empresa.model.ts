export default interface Empresa {
    id?: number;
    name: string,
    collaboratorsCount: number;
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