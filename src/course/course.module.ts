import { HttpModule, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UserRepository } from "../user/repositories/user.repository";
import { JoinRandomGroupHandler } from "./commands/join-random-group.handler";
import { Controllers } from "./controllers";
import { AssessmentEvent } from "./entities/assessment-event.entity";
import { GroupRegistrationRelation } from "./entities/group-registration-relation.entity";
import { AssessmentScoreChangedHandler } from "./events/assessment/assessment-score-changed.event";
import { UserJoinedGroupHandler } from "./events/group/user-joined-group.event";
import {
	CloseEmptyGroupsHandler,
	UserLeftGroupHandler
} from "./events/group/user-left-group.event";
import { Guards } from "./guards";
import { CourseMemberGuard } from "./guards/course-member.guard";
import { ParticipantIdentityGuard } from "./guards/identity.guard";
import { TeachingStaffGuard } from "./guards/teaching-staff.guard";
import { QueryHandlers } from "./queries";
import { Repositories } from "./repositories";
import { Services } from "./services";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			...Repositories,
			UserRepository,
			AssessmentEvent,
			GroupRegistrationRelation
		]),
		CqrsModule,
		HttpModule,
		AuthModule
	],
	controllers: [...Controllers],
	providers: [
		...Services,
		...Guards,
		...QueryHandlers,
		JoinRandomGroupHandler,
		UserJoinedGroupHandler,
		UserLeftGroupHandler,
		CloseEmptyGroupsHandler,
		AssessmentScoreChangedHandler
	],
	exports: [
		TypeOrmModule,
		CourseMemberGuard,
		TeachingStaffGuard,
		ParticipantIdentityGuard,
		...Services
	]
})
export class CourseModule {}
