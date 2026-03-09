import type { SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { courseType } from "./courseType";
import { enrollmentType } from "./enrollmentType";
import { lessonType } from "./lessonType";
import { moduleType } from "./moduleType";
import { sponsorApplicationType } from "./sponsorApplicationType";
import { studentStoryType } from "./studentStoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [courseType, moduleType, lessonType, categoryType, enrollmentType, sponsorApplicationType, studentStoryType],
};
