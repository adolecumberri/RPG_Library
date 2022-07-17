import discriminators from "../constants/discriminators"

interface IDamageObject{
	discriminator: typeof discriminators['ATTACK_OBJECT']
	value: number
	type: 'normal' | 'critical' | 'miss'
}

interface IDefenceObject{
	discriminator: typeof discriminators['DEFENCE_OBJECT']
	value: number
	type: 'normal' | 'evasion'
}

export {
    IDamageObject,
	IDefenceObject
}