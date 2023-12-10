export interface ItemType {
    id: number;
    image: string | undefined;
    description: string;
    tag: string;
    dropoff_point_id: number;
    state: string;
}