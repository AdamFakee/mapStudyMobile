import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, callApi } from "../../../customs/axiosLib";
import { Course } from "../../../types/definition";
import { domain } from "../../../constants/domain";

interface Lesson {
    lessonId: number;
    lessonTitle: string;
}

export interface Chapter {
    title: string;
    lessons: Lesson[];
}

interface Metadata {
    detail_chapter: Chapter[];
    detail_course: Course;
}
interface resultFetchDetailCourse extends ApiResponse {
    metadata: Metadata
}

interface detailCourseStateProps {
    detailFetch: resultFetchDetailCourse,
    isLoading: boolean
}

const initialDetailCourseState: detailCourseStateProps = {
    detailFetch: {} as resultFetchDetailCourse,
    isLoading: true,
}

export const fetchDetailCourse = createAsyncThunk('detailCourse/callApi', async ({courseId}: {courseId: number}) => {
    const url = domain + '/course/detail/' + courseId;
    const res = await callApi<resultFetchDetailCourse>({url});
    return res;
})

export const detailCourseSlice = createSlice({
    name: 'detailCourseSclie',
    initialState: initialDetailCourseState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDetailCourse.fulfilled, (state, action) => {
                state.detailFetch = action.payload;
                state.isLoading = false;
            })
    }
})



export const detailCourseReducer = detailCourseSlice.reducer;
