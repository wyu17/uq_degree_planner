enum Page {
    RequestDegree,
    RequestDegreeType,
    RequestMajor,
    RequestNewDegree,
    Timetable,
}

enum MajorType {
    Major='major',
    Minor='minor',
    ExtendedMajor='extended_major',
}

enum SemesterType {
    SemOne='Semester One',
    SemTwo='Semester Two',
    SumSem='Summer Semester',
}

type DegreeConstraint = {
    constraint: string;
}

type Degree = {
    code: string;
    name: string;
    units: number;
    degreeOption?: DegreeOption;
    majorCodes: Array<Major>;
    minorCodes: Array<Major>;
    extendedMajorCodes: Array<Major>;
    elective?: Course;
    currentUnits: number;
    constraints: Array<DegreeConstraint>;
}

type DegreeOption = {
    majors: number;
    minors: number;
    extendedMajors: number;
}

type Major = {
    mcode: string;
    name: string;
    units: number;
    type: MajorType;
    sections: Array<Section>;
    currentUnits: number;
}

type SectionCodeWithOptions = {
    optionCode: string;
    courses: Array<Course>;
}

type SectionCodeWithoutOptions = {
    course: Course;
}

type Section = {
    dcode: string;
    mcode: string;
    name: string;
    max: number;
    min: number;
    sectionCodesWithOptions: Array<SectionCodeWithOptions>;
    sectionCodesWithoutOptions: Array<SectionCodeWithoutOptions>;
    currentUnits: number;
}

type Course = {
    dcode: string;
    mcode: string;
    name: string;
    code: string;
    title: string;
    units: number;
    sem1: boolean;
    sem2: boolean;
    sum: boolean;
    prereq: string;
    incomp: string;
}

type Year = {
    sem1: Array<Course>;
    sem2: Array<Course>;
    sum: Array<Course>;
    finalYear : boolean;
    id: number;
}

type User = {
    page: Page;
    degrees: Array<Degree>;
    years: Array<Year>;
    sectionsSelected: boolean;
}

// These types don't actually provide true type safety because the API can write anything, but good enough for now
type SingleDegreesAPI = {
    dcode: string;
    name: string;
    units: number;
    degreeConstraints: Array<DegreeConstraint>
}

type MajorAPI = {
    mcode: string;
    type: MajorType;
    name: string;
    units: number;
    degreeConstraints: Array<DegreeConstraint>
}

type CourseAPI = {
    code: string;
    title: string;
    units: number;
    sem1: boolean;
    sem2: boolean;
    sum: boolean;
    prereq: string;
    incomp: string;
}

type SectionCodeWithoutOptionsAPI = {
    dcode: string;
    mcode: string;
    section: string;
    course: CourseAPI;
}

type SectionCodeWithOptionsAPI = {
    dcode: string;
    mcode: string;
    section: string;
    optionCode: string;
    courses: CourseAPI[];
}

type SectionDataAPI = {
    min: number;
    max: number;
    dcode: string;
    mcode: string;
    sectionName: string;
    sectionCodesWithOptions: Array<SectionCodeWithOptionsAPI>;
    sectionCodesWithoutOptions: Array<SectionCodeWithoutOptionsAPI>;
}

export { Page, MajorType, SemesterType }
export type {
  SingleDegreesAPI, MajorAPI, SectionDataAPI, SectionCodeWithOptionsAPI, SectionCodeWithoutOptionsAPI, CourseAPI,
  Course, DegreeOption, DegreeConstraint, Degree, Major, Section, SectionCodeWithOptions, SectionCodeWithoutOptions, User, Year
}
