import { IStats } from "./Stats.interface";

interface ICharacterConstructor {
    id: number | string,
    stats: IStats,
    variation: number,
}

export { ICharacterConstructor }