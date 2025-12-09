import {fetchUser} from '../__mocks__/fetchUser'
import user from '../__mocks__/fakeUser.json'

describe('fetchUser',() => {

    
    test('if user set all screens to false', async () => {
        const user = await fetchUser(1)
        expect(user.isInside).toEqual(false)
        expect(user.inTower).toEqual(false)
        expect(user.insideTower).toEqual(false)
        expect(user.inSwamp).toEqual(false)
        expect(user.inHall).toEqual(false)
    })


})