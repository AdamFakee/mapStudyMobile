import { resultfetchFilterCourse } from "../redux/slices/filterCourse/filterCourseSlice";
import { Course } from "../types/definition";

// export function flattenCourses(groupedData: resultfetchFilterCourse) {
//     return groupedData.metadata.courses.reduce((acc, group) => {
//         console.log('groipppp:::::', group);
//         console.log('accc::::', acc)
//         // return acc.concat(group.courses);
//     }, []);
// }

export function flattenCourses(data: resultfetchFilterCourse): Course[] {
    return data.metadata.courses.flatMap(group => group.courses);
}

export function filterCoursesByClass(data: resultfetchFilterCourse, courseClass: number): Course[] {
    let result: Course[] = [];
    data.metadata.courses.forEach(item => {
        if(item.courseClass === courseClass) {
            result = [...item.courses];
        }
    });
    return result;
}