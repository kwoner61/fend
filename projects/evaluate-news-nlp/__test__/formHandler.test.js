import { handleSubmit } from "../src/client/js/formHandler"

// Resolve ReferenceError: regeneratorRuntime is not defined
require("babel-polyfill")

describe("Testing the formHandler functionalities", () => {

    const eventMock = { preventDefault: () => {} }
    let fetchMock = {}
    let alertMock = {}
    let inputMessageElement = {}
    let resultsElement = {}
    let resultsPrefixElement = {}

    beforeAll(() => {
        jest.spyOn(eventMock, 'preventDefault')
        fetchMock = jest.spyOn(global, 'fetch')
        alertMock = jest.spyOn(global, 'alert')

        inputMessageElement = document.createElement('textarea')
        inputMessageElement.id = 'name'

        resultsElement = document.createElement('div')
        resultsElement.id = 'results'

        resultsPrefixElement = document.createElement('strong')
        resultsPrefixElement.id = 'results_prefix'

        document.body.appendChild(inputMessageElement)
        document.body.appendChild(resultsElement)
        document.body.appendChild(resultsPrefixElement)
    })

    beforeEach(() => {
        inputMessageElement.value = ''
        resultsPrefixElement.style.visibility = 'hidden'
    })

    test("Testing the handleSubmit() function existence", () => {
        expect(handleSubmit).toBeDefined()
    })

    test("Testing the handleSubmit() function call with an empty input", async () => {
        handleSubmit(eventMock)

        // Wait for the mocked fetch to return a response
        await Promise.resolve().then()

        // Wait for the catch error
        await Promise.resolve().then()

        // Wait for the promise to resolve
        await Promise.resolve().then()

        expect(eventMock.preventDefault).toBeCalled()
        expect(resultsPrefixElement.style.visibility).toBe('hidden')
        expect(inputMessageElement.value).toBe('')
        expect(fetchMock).not.toHaveBeenCalled()
        expect(alertMock).toHaveBeenCalled()
    })

    test("Testing the handleSubmit() function call", async () => {
        inputMessageElement.value = 'Hello World.'
        const expectedOutput = 'Not Sentimental at all'

        handleSubmit(eventMock)

        // Wait for the mocked fetch to return a Promise with json
        await Promise.resolve().then()

        // Wait for the catch error
        await Promise.resolve().then()

        // Wait for the Promise to resolve to json
        await Promise.resolve().then()

        expect(eventMock.preventDefault).toBeCalled()
        expect(resultsPrefixElement.style.visibility).toBe('visible')
        expect(inputMessageElement.value).toBe('')
        expect(resultsElement.innerHTML).toBe(expectedOutput)
        expect(fetchMock).toHaveBeenCalled()
    })

    test("Testing the handleSubmit() function when server unreachable", async () => {
        global.fetch = jest.fn().mockImplementation(() => Promise.reject())
        
        inputMessageElement.value = 'Hello JS.'
        const expectedOutput = 'Not Sent'
        handleSubmit(eventMock)
        await Promise.resolve().then()
        await Promise.resolve().catch()
        await Promise.resolve().then()
        
        expect(eventMock.preventDefault).toBeCalled()
        expect(resultsPrefixElement.style.visibility).toBe('visible')
        expect(inputMessageElement.value).toBe('Hello JS.')
        expect(resultsElement.innerHTML).toBe(expectedOutput)
        expect(fetchMock).toHaveBeenCalled()
        expect(alertMock).toHaveBeenCalled()

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ score_tag: 'NONE' })
        }))
    })

})
