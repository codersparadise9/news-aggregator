import { GenericRepository } from '../core/repositories/generic-repository.interface'
import { UserEntity } from '../entities/user.entity'

export class InMemoryDb implements GenericRepository<UserEntity> {
    private readonly userEntity: UserEntity[]

    constructor() {
        this.userEntity = [] as UserEntity[]
    }

    async create(createDTO: UserEntity): Promise<UserEntity> {
        this.userEntity.push(createDTO)
        return createDTO
    }

    async delete(id: any): Promise<UserEntity> {
        const indexToRemove = this.userEntity.findIndex(
            (element) => element.id === id
        )
        if (indexToRemove !== -1) {
            this.userEntity.splice(indexToRemove, 1)
            return this.userEntity[indexToRemove]
        } else {
            throw new Error(`user with id ${id} not found`)
        }
    }

    async find(filter: Partial<UserEntity>): Promise<UserEntity[]> {
        return this.userEntity.filter((obj) =>
            this.userEntity.every((filter) =>
                Object.entries(filter).every(
                    ([key, value]) => obj[key as keyof UserEntity] === value
                )
            )
        )
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userEntity
    }

    async findByID(id: any): Promise<UserEntity> {
        return this.userEntity.filter((obj) => obj.id === id)[0]
    }

    async update(updateDTO: UserEntity): Promise<UserEntity | null> {
        const index = this.userEntity.findIndex(
            (element) => element.id === updateDTO.id
        )

        this.userEntity[index] = updateDTO
        return this.userEntity[index]
    }
}
