export interface Console {
    _id: string;

    name: string;
    model: string;
    overall_time_played: number;
    today_time_played: number;

    games: string;
    status: string;
    playing: boolean;
    start_time: string;
}
