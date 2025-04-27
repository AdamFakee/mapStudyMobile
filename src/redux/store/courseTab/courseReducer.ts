import { combineReducers } from "@reduxjs/toolkit";
import { filterCourseReducer } from "../../slices/filterCourse/filterCourseSlice";
import { detailCourseReducer } from "../../slices/detailCourse/detailCourseSlice";

export const CourseReducers = combineReducers({
    filterCourseReducer, detailCourseReducer
})