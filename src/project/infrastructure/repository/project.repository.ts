/* eslint-disable prettier/prettier */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { IProjectRepository } from 'src/project/domain/project.repository';

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> implements IProjectRepository {
    async checkExist(id: number): Promise<boolean> {
        const exist = await getRepository(ProjectEntity).findOne(id);
        return exist ? true : false;
    }

    async saveOne(entity: ProjectEntity): Promise<ProjectEntity> {
        return await getRepository(ProjectEntity).save(entity);
    }

    async findAll(): Promise<ProjectEntity[]> {
        return await getRepository(ProjectEntity).find();
    }

    async updateOne(id: number, entity: ProjectEntity): Promise<any> {
        return await getRepository(ProjectEntity).update(id, entity);
    }

    async findProjectById(id: number): Promise<boolean> {
        const exist = await getRepository(ProjectEntity).findOne({ id });
        return exist ? true : false;
    }

    async deleteOne(id: number): Promise<any> {
        return await getRepository(ProjectEntity).softDelete(id);
    }

    async findByName(name: string): Promise<ProjectEntity> {
        return await getRepository(ProjectEntity).findOne({ name });
    }

    async createOne(entity: ProjectEntity): Promise<ProjectEntity> {
        return await getRepository(ProjectEntity).save(entity);
    }


    async getOne(projectId: number): Promise<ProjectEntity> {
        return await getRepository(ProjectEntity).createQueryBuilder('project')
            .leftJoinAndSelect('project.users', 'user')
            .leftJoinAndSelect('project.lists', 'list')
            .where('project.id = :projectId', { projectId })
            .getOne();
    }

    async getProjectsOfUser(userId: number): Promise<ProjectEntity[]> {
        return await getRepository(ProjectEntity).createQueryBuilder('project')
            .leftJoinAndSelect('project.users', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
    }

    async checkProjectOfUser(projectId: number, userId: number): Promise<boolean> {
        const exist = await getRepository(ProjectEntity).createQueryBuilder('project')
            .where('project.id = :projectId', { projectId })
            .leftJoinAndSelect('project.users', 'user')
            .andWhere('user.id = :userId', { userId })
            .getOne()
            .then(project => project ? true : false);
        return exist;
    }

}