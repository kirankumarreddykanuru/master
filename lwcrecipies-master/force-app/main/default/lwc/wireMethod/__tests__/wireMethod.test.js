import { createElement } from 'lwc';
import wireMethodWithParam from 'c/wireMethod';
import { registerApexTestWireAdapter } from '@salesforce/lwc-jest';
import getAllCases from '@salesforce/apex/CaseController.getAllCases';

const mockFindCases = require('./data/allcases.json');

const mockFindCasesNoRecords = require('./data/nodata.json');

// Register as Apex wire adapter. 
const findCasesAdapter = registerApexTestWireAdapter(getAllCases);
// getLastConfig() { search : PARAM_NAME }
// .emit()
// .error()
// .error()

describe('c-apex-wire-method-with-params', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    describe('getAllCases @wire data', () => {
        it('gets called with data from user input', () => {
            const USER_INPUT = 'mo';
            const WIRE_PARAMETER = { subject: USER_INPUT };

            const element = createElement('c-apex-wire-method', {
                is: wireMethodWithParam
            });
            document.body.appendChild(element);

            const inputEl = element.shadowRoot.querySelector('lightning-input');
            inputEl.value = USER_INPUT;
            inputEl.dispatchEvent(new CustomEvent('change'));

            return Promise.resolve().then(() => {
                // Validate parameters of wire adapter
                expect(findCasesAdapter.getLastConfig()).toEqual(
                    WIRE_PARAMETER
                );
            });
        });

        it('renders data of one record', () => {
            const USER_INPUT = 'mo';

            const element = createElement('c-apex-wire-method', {
                is: wireMethodWithParam
            });
            document.body.appendChild(element);

            const inputEl = element.shadowRoot.querySelector('lightning-input');
            inputEl.value = USER_INPUT;
            inputEl.dispatchEvent(new CustomEvent('change'));

            jest.runAllTimers();  

            // Emit data from @wire
            findCasesAdapter.emit(mockFindCases);

            return Promise.resolve().then(() => {
                // Select elements for validation
                const detailEls = element.shadowRoot.querySelectorAll('p');
                expect(detailEls.length).toBe(mockFindCases.length);
                expect(detailEls[0].textContent).toBe(mockFindCases[0].Subject);
            });
        });

        it('renders no items when no record is available', () => {
            const USER_INPUT = 'does not exist';

            const element = createElement('c-apex-wire-method', {
                is: wireMethodWithParam
            });
            document.body.appendChild(element);

            const inputEl = element.shadowRoot.querySelector('lightning-input');
            inputEl.value = USER_INPUT;
            inputEl.dispatchEvent(new CustomEvent('change'));

            // Emit data from @wire
            findCasesAdapter.emit(mockFindCasesNoRecords);

            return Promise.resolve().then(() => {
                const detailEls = element.shadowRoot.querySelectorAll('p');
                expect(detailEls.length).toBe(mockFindCasesNoRecords.length);
            });
        });
    });

    describe('getAllCases @wire error', () => {
        it('shows error  element', () => {
            
            const element = createElement('c-apex-wire-method', {
                is: wireMethodWithParam
            });
            document.body.appendChild(element);

            // Emit error from @wire
            findCasesAdapter.error();

            return Promise.resolve().then(() => {
                const errorPanelEl = element.shadowRoot.querySelector(
                    'p'
                );
                expect(errorPanelEl).not.toBeNull();
                expect(errorPanelEl.textContent).toBe('There is an Error while fetching the cases');
            });
        });
    });
});