export type ResponseType<T> = {
    data: T[];
    meta: {
        pagination: {
            current: number;
            first: number;
            prev: number;
            next: number;
            last: number;
            records: number;
        };
    };
    links: {
        self: string;
        current: string;
        first: string;
        prev: string;
        next: string;
        last: string;
    };
};
