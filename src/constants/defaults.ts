import { IAttackObject, IDefenceObject } from "../interfaces";
import discriminators from "./discriminators";

export const DEFAULT_ATTACK_OBJECT: IAttackObject = {
    discriminator: discriminators.ATTACK_OBJECT,
    type: 'normal',
    value: 0
}

export const DEFAULT_DEFENCE_OBJECT: IDefenceObject = {
    discriminator: discriminators.DEFENCE_OBJECT,
    type: 'normal',
    value: 0
}

export const DEFENCE_EVASION_OBJECT: IDefenceObject = {
    discriminator: discriminators.DEFENCE_OBJECT,
    type: 'evasion',
    value: 0
}

