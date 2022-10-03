import { createElement } from 'lwc';
import ApexImperativeMethodWithParams from 'c/apexImperativeMethod';
import findCases from '@salesforce/apex/CaseController.getAllCases';

// Mocking imperative Apex method call
jest.mock(
    '@salesforce/apex/CaseController.getAllCases',
    () => { 
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);
// 1 - Data -> put our mock file
// 2 - mock inside the test case itself

// Sample data for imperative Apex call
const APEX_CASES_SUCCESS = [
    {
        Id: '0071700000pJRRSAA4',
        CaseNumber: '0243',
        Subject: 'Generator Motor is not working!',
        Status: 'New',
        Priorty: 'High'
    }
];

// Sample error for imperative Apex call
const APEX_CASES_ERROR = {
    body: { message: 'An internal server error has occurred' },
    ok: false,
    status: 403,
    statusText: 'Bad Request'
};

describe('c-apex-imperative-method-with-params', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    function flushPromises() {
        // eslint-disable-next-line no-undef
        return new Promise(resolve => setImmediate(resolve));
    } 

    it('renders one case', () => {
        const USER_INPUT = 'Generator';

        // Assign mock value for resolved Apex promise
        findCases.mockResolvedValue(APEX_CASES_SUCCESS);

        // Create initial element
        const element = createElement('c-apex-imperative-method-with-params', {
            is: ApexImperativeMethodWithParams
        });
        document.body.appendChild(element);

        // Select input field for simulating user input
        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.value = USER_INPUT;
        inputEl.dispatchEvent(new CustomEvent('change'));

        // Select button for executing Apex call
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        //buttonEl.dispatchEvent(new CustomEvent('click'));
        buttonEl.click();

        return flushPromises().then(() => {
            // Select div for validating conditionally changed text content
            const detailEls = element.shadowRoot.querySelectorAll('p');
            expect(detailEls.length).toBe(APEX_CASES_SUCCESS.length);
            expect(detailEls[0].textContent).toBe(
                APEX_CASES_SUCCESS[0].Subject
            );
        });
    });

    it('renders the error panel when the Apex method returns an error', () => {
        // Assing mock value for rejected Apex promise
        findCases.mockRejectedValue(APEX_CASES_ERROR);

        // Create initial element
        const element = createElement('c-apex-imperative-method-with-params', {
            is: ApexImperativeMethodWithParams
        }); 
        document.body.appendChild(element);

        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        return flushPromises().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'p'
            );
            expect(errorPanelEl).not.toBeNull();
        });
    });
});