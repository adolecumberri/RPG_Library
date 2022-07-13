import discriminators from "../constants/discriminators"

interface IDamageObject{
	discriminator: discriminators.ATTACK_OBJECT
	value: number
	type: 'normal' | 'critical' | 'miss'
}

interface IDefenceObject{
	value: number
	type: 'normal' | 'critical' | 'miss'
}

export {
    IDamageObject,
	IDefenceObject
}