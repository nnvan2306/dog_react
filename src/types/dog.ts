export type DogType = {
    id: string;
    type: string;
    attributes: {
        name: string;
        description: string;
        life: {
            max: number;
            min: number;
        };
        male_weight: {
            max: number;
            min: number;
        };
        female_weight: {
            max: number;
            min: number;
        };
        hypoallergenic: boolean;
    };
    relationships: {
        group: {
            data: {
                id: string;
                type: string;
            };
        };
    };
};
