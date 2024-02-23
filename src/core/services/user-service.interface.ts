export abstract class GenericService<T> {
    abstract create(createDTO: Partial<T>): Promise<any>

    abstract update(updateDTO: T): Promise<any | null>

    abstract delete(id: any): Promise<any>

    abstract findByID(id: any): Promise<any>

    abstract findAll(): Promise<Partial<any>[]>

    abstract find(filter: Partial<T>): Promise<any[]>
}
