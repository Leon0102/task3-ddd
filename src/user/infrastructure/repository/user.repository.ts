/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { IUserRepository } from 'src/user/domain/user.repository';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements IUserRepository {
    async checkExistEmail(email: string): Promise<boolean> {
        const userExist = await this.findOneByEmail(email);
        return !!userExist;
    }

    async saveOne(user: UserEntity): Promise<UserEntity> {
        return await getRepository(UserEntity).save(user);
    }

    async checkExist(id: number): Promise<boolean> {
        const userExist = await getRepository(UserEntity).findOne(id);
        return !!userExist;
    }

    async findAll(): Promise<UserEntity[]> {
        return await getRepository(UserEntity).find();
    }

    async getOne(id: number): Promise<UserEntity | null> {
        return getRepository(UserEntity).createQueryBuilder('user')
            .leftJoinAndSelect('user.projects', 'project')
            .where('user.id = :id', { id })
            .getOne();
    }


    async findOneUser(id: number): Promise<UserEntity | null> {
        return await getRepository(UserEntity).findOne(id);
    }


    async createOne(entity: UserEntity): Promise<UserEntity> {
        return await getRepository(UserEntity).save(entity);
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return getRepository(UserEntity).createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    async updateOne(id: number, entity: UserEntity): Promise<any> {
        await getRepository(UserEntity).update(id, entity);
        return getRepository(UserEntity).save(entity);
    }

    async deleteOne(id: number): Promise<any> {
        return await getRepository(UserEntity).softDelete(id);
    }

    async restoreOne(id: number): Promise<any> {
        return await getRepository(UserEntity).restore(id);
    }

    async getUsersOfProjects(projectId: number): Promise<UserEntity[]> {
        return await getRepository(UserEntity).createQueryBuilder('user')
            .leftJoinAndSelect('user.projects', 'project')
            .where('project.id = :projectId', { projectId })
            .getMany();
    }

    async getUsersOfTask(taskId: number): Promise<UserEntity[]> {
        return await getRepository(UserEntity).createQueryBuilder('user')
            .leftJoinAndSelect('user.tasks', 'task')
            .where('task.id = :taskId', { taskId })
            .getMany();
    }
}