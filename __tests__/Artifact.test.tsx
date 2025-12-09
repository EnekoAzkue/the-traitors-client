import { twoActiveTwoCollected, fourCollected, setActiveArtifacts, setCollectedArtifacts, getDistanceFromLatLonInMeters, artifactCoords, userCoords } from '../__mocks__/artifactsMocks'

describe('Artifacts', () => {
    describe('Check if four artifacts are active or collected', () => {
        test('case of two artifacts collected and two active', () => {

            const activatedArtifacts = setActiveArtifacts(twoActiveTwoCollected)
            expect(activatedArtifacts.length).toBe(4)
        })
    });
    describe('Chech if all artifacts are collected', () => {
        let allArtifactsCollected = false;
        test('if four artifacts are collected', () => {

            allArtifactsCollected = setCollectedArtifacts(fourCollected)
            expect(allArtifactsCollected).toBe(true)

        });
        test('if there are not four artifacts collected', () => {

            allArtifactsCollected = setCollectedArtifacts(twoActiveTwoCollected)
            expect(allArtifactsCollected).not.toBe(true)

        })
    })
    describe('Check distance with artifacts', () => {
        test('if user is near two artifact', () => {
            const distances: any = []
            
            artifactCoords.map((artifactCoord, i) => {
                distances.push(getDistanceFromLatLonInMeters(artifactCoord.latitude, artifactCoord.longitude, userCoords.latitude, userCoords.longitude))
            })

            //Arround 0.32m
            expect(distances[0]).toBeLessThan(1)
            //Arround 5m
            expect(distances[1]).not.toBeLessThan(1)
            //Arround 1.03m
            expect(distances[2]).not.toBeLessThan(1)
            //Arround 0.87m
            expect(distances[3]).toBeLessThan(1)

        })
    })
})