import {resetModalMesssage} from '../__mocks__/modalMocks';

describe('modal', () => {
    test('should erase modal text', () => {
        let modalText = "This is a modal message.";

        modalText = resetModalMesssage(modalText);
        expect(modalText).toBe("");
    });
});
