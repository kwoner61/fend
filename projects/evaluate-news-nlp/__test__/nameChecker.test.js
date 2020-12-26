import { checkForName } from "../src/client/js/nameChecker"

describe("Testing the nameChecker functionalities", () => {

    let alertMock = {}

    beforeAll(() => {
        alertMock = jest.spyOn(global, 'alert')
    })

    test("Testing the checkForName() function existence", () => {
        expect(checkForName).toBeDefined()
    })

    test("Testing the checkForName() function call with a Captain", () => {
        checkForName('Archer')
        expect(alertMock).toHaveBeenCalled()
    })
})
