import { AssessmentDto } from "../../src/course/dto/assessment/assessment.dto";
import { GROUP_1_JAVA, GROUP_2_JAVA } from "./groups/groups.mock";
import { ASSIGNMENT_JAVA_EVALUATED, ASSIGNMENT_JAVA_TESTAT_EVALUATED_SINGLE, ASSIGNMENT_JAVA_IN_REVIEW } from "./assignments.mock";
import { USER_STUDENT_JAVA, USER_STUDENT_3_JAVA_TUTOR } from "./users.mock";

export const ASSESSMENT_JAVA_EVALUATED_GROUP_1: AssessmentDto = {
	id: "8f60f844-4129-48a4-a625-7a74c7defd0d",
	assignmentId: ASSIGNMENT_JAVA_EVALUATED.id,
	achievedPoints: 75,
	comment: "ASSESSMENT_JAVA_EVALUATED_GROUP_1 for GROUP_1_JAVA (ASSIGNMENT_JAVA_EVALUATED)",
	groupId: GROUP_1_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id,
};

export const ASSESSMENT_JAVA_EVALUATED_GROUP_2: AssessmentDto = {
	id: "e44f43fe-d39e-4f19-b7df-9bc5ff58b3b0",
	assignmentId: ASSIGNMENT_JAVA_EVALUATED.id,
	achievedPoints: 25,
	comment: "ASSESSMENT_JAVA_EVALUATED_GROUP_2 for GROUP_2_JAVA (ASSIGNMENT_JAVA_EVALUATED)",
	groupId: GROUP_2_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id,
};

export const ASSESSMENT_JAVA_TESTAT_USER_1: AssessmentDto = {
	id: "932c7bd8-2338-4e60-955a-39da5f858212",
	assignmentId: ASSIGNMENT_JAVA_TESTAT_EVALUATED_SINGLE.id,
	achievedPoints: 25,
	comment: "ASSESSMENT_JAVA_TESTAT_USER_1",
	userId: USER_STUDENT_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id,
};

export const ASSESSMENT_JAVA_IN_REVIEW: AssessmentDto = {
	id: "680dd44a-93b0-4d1c-a947-9b50a4bbb68e",
	assignmentId: ASSIGNMENT_JAVA_IN_REVIEW.id,
	achievedPoints: 50,
	comment: "ASSESSMENT_JAVA_IN_REVIEW",
	userId: USER_STUDENT_JAVA.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id,
};

export const ASSESSMENT_JAVA_IN_REVIEW_NO_PARTIALS: AssessmentDto = {
	id: "08ea9724-fe3f-461c-9b3c-5d44ab9907e9",
	assignmentId: ASSIGNMENT_JAVA_IN_REVIEW.id,
	achievedPoints: 42,
	comment: "ASSESSMENT_JAVA_IN_REVIEW_WITH_PARTIALS",
	userId: USER_STUDENT_3_JAVA_TUTOR.id,
	creatorId: USER_STUDENT_3_JAVA_TUTOR.id,
};

export const AssessmentsMock: AssessmentDto[] = [
	ASSESSMENT_JAVA_EVALUATED_GROUP_1,
	ASSESSMENT_JAVA_EVALUATED_GROUP_2,
	ASSESSMENT_JAVA_TESTAT_USER_1,
	ASSESSMENT_JAVA_IN_REVIEW,
	ASSESSMENT_JAVA_IN_REVIEW_NO_PARTIALS
];
