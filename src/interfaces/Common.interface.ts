import discriminators from "../constants/discriminators"

interface IAttackObject{
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
    IAttackObject,
	IDefenceObject
}