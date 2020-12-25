import { checkForName } from "../src/client/js/nameChecker.js"

global.Client = { checkForName: checkForName }
global.externalLibrary = {
    logError: err => {
        console.log(err) // will output errors during Jest run
    }
}

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({ score_tag: 'NONE' })
}))

global.window.alert = () => {}
