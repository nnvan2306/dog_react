import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DogType } from "../types/dog";

interface DogState {
    dogs: DogType[];
}

const initialState: DogState = {
    dogs: [],
};

const dogSlice = createSlice({
    name: "dog",
    initialState,
    reducers: {
        setDogs: (state, action: PayloadAction<DogType[]>) => {
            state.dogs = action.payload;
        },
        addDog: (state, action: PayloadAction<DogType>) => {
            state.dogs.push(action.payload);
        },
    },
});

export const { setDogs, addDog } = dogSlice.actions;
export const dogReducer = dogSlice.reducer;
