import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExamQuestionProps {
    reduce: any;
    [id: number]: string,
}

export interface ExamQuestionReducerChangeSelectedResultType {
    id: number,
    answer: string
}

const initalExamQuestionProps: ExamQuestionProps = [];

const slice = createSlice({
    name: 'examQuestionSlice',
    initialState: initalExamQuestionProps,
    reducers: {
        changeSelectedResult: (state, action: PayloadAction<ExamQuestionReducerChangeSelectedResultType>) => {
            const { id, answer } = action.payload;
            state[id] = answer;
        }
    }
})


const selectResult = createSelector(
    [
        (state: ExamQuestionProps, questionId: number) => state[questionId],
    ], (state) => {
        console.log('xx')
        return state
    }
)

export const ExamQuestionSelector = {
    selectResult
}
export const ExamQuestionReducer = slice.reducer;
export const ExamQuestionAction = slice.actions;