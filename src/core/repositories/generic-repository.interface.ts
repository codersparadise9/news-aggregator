export abstract class GenericRepository<T> {
    abstract create(createDTO: Omit<T, 'id'>): Promise<T>

    abstract update(updateDTO: T): Promise<T | null>

    abstract delete(id: any): Promise<T>

    abstract findByID(id: any): Promise<T>

    abstract findAll(): Promise<T[]>

    abstract find(filter: Partial<T>): Promise<T[]>
}
