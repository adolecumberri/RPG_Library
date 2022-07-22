import Character from "../classes/Character"
import PermanentStatus from "../classes/status/PermanentStatus"
import { STATUS_TYPE } from "../constants/status"



describe('Permanen Status works fine', () => {

    test('Status created correctly', () => {

        let status = new PermanentStatus({
            statAffected: 'hp'
        })

        expect(status).toEqual({
            "activate": expect.any(Function),
            "appliedOn": "AFTER_TURN",
            "character": undefined,
            "load": expect.any(Function),
            "statAffected": "hp",
            "type": "BUFF_FIXED",
            "value": 0
        })
    })

    test('Status can be applied to a Character', () => {
        let char = new Character()
        let status = new PermanentStatus({
            statAffected: 'hp'
        })

        status.load(char)

        expect(status.character).toBe(char)
    })

    test('Status changes by buff_fixed', () => {
        let char = new Character({
            stats: { hp: 100 }
        })
        let status = new PermanentStatus({
            value: 20,
            statAffected: 'hp'
        })
        status.load(char)
        status.activate()

        expect(char.stats.hp).toBe(120)
    })

    test('Status changes by debuff_fixed', () => {
        let char = new Character({
            stats: { hp: 100 }
        })
        let status = new PermanentStatus({
            value: 20,
            statAffected: 'hp',
            type: STATUS_TYPE.DEBUFF_FIXED,
        })

        status.load(char)
        status.activate()

        expect(char.stats.hp).toBe(80)
    })

    test('Status changes by buff_percentage', () => {
        let char = new Character({
            stats: { hp: 1000 }
        })
        let status = new PermanentStatus({
            value: 20,
            statAffected: 'hp',
            type: STATUS_TYPE.BUFF_PERCENTAGE,
        })

        status.load(char)
        status.activate()

        expect(char.stats.hp).toBe(1200)
    })

    test('Status changes by debuff_percentage', () => {
        let char = new Character({
            stats: { hp: 1000 }
        })
        let status = new PermanentStatus({
            value: 20,
            statAffected: 'hp',
            type: STATUS_TYPE.DEBUFF_PERCENTAGE,
        })

        status.load(char)
        status.activate()

        expect(char.stats.hp).toBe(800)
    })
})