import api from "../../libs/axios";
import type { ResponseType } from "../../types";
import type { DogType } from "../../types/dog";

type Payload = {
    page?: number;
};

export const getDogService = async ({ page }: Payload) => {
    let query = "/breeds";
    if (page) {
        query = `/breeds?page[number]=${page}`;
    }
    return api.get<ResponseType<DogType[]>>(`${query}`);
};
