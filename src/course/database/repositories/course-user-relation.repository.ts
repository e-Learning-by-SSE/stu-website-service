import { Repository, EntityRepository, EventSubscriber, EntitySubscriberInterface, InsertEvent, QueryFailedError } from "typeorm";
import { CourseUserRelation } from "../../../shared/entities/course-user-relation.entity";
import { UserRoles } from "../../../shared/enums";
import { ConflictException } from "@nestjs/common";

@EntityRepository(CourseUserRelation)
export class CourseUserRelationRepository extends Repository<CourseUserRelation> {
	
	async addUserToCourse(courseId: string, userId: string, role: UserRoles): Promise<CourseUserRelation> {
		const courseUserRelation = new CourseUserRelation();
		courseUserRelation.courseId = courseId;
		courseUserRelation.userId = userId;
		courseUserRelation.role = role

		await courseUserRelation.save()
			.catch((error) => {
				if (error.code === "23505") { // TODO: Store error codes in enum
					throw new ConflictException("This user is already signed up to the course.");
				}
			});

		return courseUserRelation;
	}
}
