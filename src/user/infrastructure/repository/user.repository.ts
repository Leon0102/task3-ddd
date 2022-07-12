/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { IUserRepository } from 'src/user/domain/user.repository';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements IUserRepository {
    async checkExistEmail(email: string): Promise<boolean> {
        const userExist = await this.findOneByEmail(email);
        return !!userExist;
    }

    async checkExist(id: number): Promise<boolean> {
        const userExist = await this.findOne(id);
        return !!userExist;
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.find();
    }

    async getOne(id: number): Promise<UserEntity | null> {
        return this.createQueryBuilder('user')
            .leftJoinAndSelect('user.projects', 'project')
            .where('user.id = :id', { id })
            .getOne();
    }


    async findOneUser(id: number): Promise<UserEntity | null> {
        return await this.findOne(id);
    }


    async createOne(entity: UserEntity): Promise<UserEntity> {
        return await this.save(entity);
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    async updateOne(id: number, entity: UserEntity): Promise<any> {
        await this.update(id, entity);
        return this.save(entity);
    }

    async deleteOne(id: number): Promise<any> {
        return await this.softDelete(id);
    }

    async restoreOne(id: number): Promise<any> {
        return await this.restore(id);
    }

    async getUsersOfProjects(projectId: number): Promise<UserEntity[]> {
        return await this.createQueryBuilder('user')
            .leftJoinAndSelect('user.projects', 'project')
            .where('project.id = :projectId', { projectId })
            .getMany();
    }
}