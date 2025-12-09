import user from '../__mocks__/fakeUser.json'

export function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(user);
        }, 50)
    })
}