import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, Subject } from "../../../types/definition";
import { ApiResponse, callApi } from "../../../customs/axiosLib";
import { domain } from "../../../constants/domain";
import { filterCoursesByClass, flattenCourses } from "../../../utils/objectUtils";
import { GlobalRootState } from "../../store/globalStore";

export interface resultfetchFilterCourse extends ApiResponse {
    metadata: {
        courses: [
            {
                courseClass: number,
                courses: Course[]
            }
        ]
        pagination: {
            totalPages: number;
            currentPage: number;
        }
    };
}

interface payloadActionProps {
    id: Subject['id']
};
interface filterStateProps {
    subjects:  payloadActionProps[],
    sectionCourse: Course[],
    searchValue: string,
    classType: string,
    coursesFiltered: resultfetchFilterCourse,
    isLoading: boolean
};

const initialFilterState: filterStateProps = {
    sectionCourse: [],
    subjects: [],
    searchValue: '',
    classType: 'all',
    coursesFiltered: {} as resultfetchFilterCourse,
    isLoading: true
};

const filterSlice = createSlice({
    name: 'fileterSlice',
    initialState: initialFilterState,
    reducers: {
        addSubject: (state, action: PayloadAction<payloadActionProps>) => {
            state.subjects.push({id: action.payload.id});
        },
        delSubject: (state, action: PayloadAction<payloadActionProps>) => {
            state.subjects = state.subjects.filter(item => item.id !== action.payload.id);
        },
        addSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        resetStore: () => {
            return initialFilterState;
        },
        setClassType: (state, action: PayloadAction<string>) => {
            state.classType = action.payload;
            if(action.payload === 'all') state.sectionCourse = flattenCourses(state.coursesFiltered);
            else {
                state.sectionCourse = filterCoursesByClass(state.coursesFiltered, parseInt(action.payload));
            }
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
            console.log(state.searchValue);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFilterCourse.fulfilled, (state, action) => {
                state.coursesFiltered = action.payload;
                state.sectionCourse = flattenCourses(action.payload);
                state.isLoading = false;
            })
    }
});





export const fetchFilterCourse = createAsyncThunk('filterCourse/callApi', async (props, { getState }) => {
    const state = getState() as GlobalRootState;
    const filterState = state.courseReducer.filterCourseReducer;
    const queryParams = `search=${filterState.searchValue}&filters=${filterState.subjects.map(el => el.id).join(',')}&_class=${filterState.classType ? filterState.classType : initialFilterState.classType}`;
    const url = domain + `/course/searchMobile?${queryParams}`;
    const response = await callApi<resultfetchFilterCourse>({url});
    return response;
})

export const filterCourseReducer = filterSlice.reducer;
export const filterCourseAction = filterSlice.actions;


