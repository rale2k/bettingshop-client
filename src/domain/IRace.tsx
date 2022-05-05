import IRaceHorse from "../domain/IRaceHorse";

export default interface IRace {
    id: number | null,
    name: string | null,
    time: string | null,
    location: string | null,
    horses: IRaceHorse[]
}