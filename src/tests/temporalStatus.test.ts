import Character from "../classes/Character"
import TemporalStatus from "../classes/status/TemporalStatus"
import { STATUS_TYPE } from "../constants/status"



describe('Permanen Status works fine', () => {

    test('Status created correctly', () => {

        let status = new TemporalStatus({
            statAffected: 'hp'
        })

        expect(status).toEqual({
            "activate": expect.any(Function),
            "addDuration": expect.any(Function),
            "appliedOn": "AFTER_TURN",
            "character": undefined,
            "load": expect.any(Function),
            "duration": 1,
            "isActive": true,
            "statAffected": "hp",
            "type": "BUFF_FIXED",
            "value": 0
        })
    })

    test('Status can be applied to a Character', () => {
        let char = new Character()
        let status = new TemporalStatus({
            statAffected: 'hp'
        })
        status.load(char)

        expect(status.character).toBe(char)
    })

    test('Status changes by buff_fixed', () => {
        let char = new Character({
            stats: { hp: 100 }
        })
        let status = new TemporalStatus({
            value: 20,
            statAffected: 'hp'
        })
        status.load(char)
        
        expect(status.isActive).toBe(true)

        status.activate()

        expect(char.stats.hp).toBe(120)
        expect(status.duration).toBe(0)
        expect(status.isActive).toBe(false)
    })

    test('Status changes by debuff_fixed', () => {
        let char = new Character({
            stats: { hp: 100 }
        })
        let status = new TemporalStatus({
            value: 20,
            statAffected: 'hp',
            type: STATUS_TYPE.DEBUFF_FIXED,
        })

        status.load(char)        
        expect(status.isActive).toBe(true)

        status.activate()

        expect(char.stats.hp).toBe(80)
        expect(status.duration).toBe(0)
        expect(status.isActive).toBe(false)
    })

    test('Status changes by buff_percentage', () => {
        let char = new Character({
            stats: { hp: 1000 }
        })
        let status = new TemporalStatus({
            value: 20,
            statAffected: 'hp',
            type: STATUS_TYPE.BUFF_PERCENTAGE,
        })

        status.load(char)
        expect(status.isActive).toBe(true)

        status.activate()

        expect(char.stats.hp).toBe(1200)
        expect(status.duration).toBe(0)
        expect(status.isActive).toBe(false)
    })

    test('Status changes by debuff_percentage', () => {
        let char = new Character({
            stats: { hp: 1000 }
        })
        let status = new TemporalStatus({
            value: 20,
            statAffected: 'hp',
            type: STATUS_TYPE.DEBUFF_PERCENTAGE,
        })

        status.load(char)
        expect(status.isActive).toBe(true)

        status.activate()

        expect(char.stats.hp).toBe(800)
        expect(status.duration).toBe(0)
        expect(status.isActive).toBe(false)
    })

    test('Status changes by debuff_percentage', () => {
        let status = new TemporalStatus({
            value: 20,
            statAffected: 'hp',
            type: STATUS_TYPE.DEBUFF_PERCENTAGE,
        })

        expect(status.isActive).toBe(true)

        status.activate()

        expect(status.duration).toBe(0)
        expect(status.isActive).toBe(false)
        
        status.addDuration(1)
        expect(status.duration).toBe(1)
        expect(status.isActive).toBe(true)

        status.addDuration(0)
        expect(status.duration).toBe(0)
        expect(status.isActive).toBe(false)

        status.addDuration(-1)
        expect(status.duration).toBe(0)
    })
})