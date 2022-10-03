import { createElement } from 'lwc';
// createElement is only for test cases

import Hello from 'c/helloWorld';

afterAll(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
});

describe('c-hello', () => {
    
    it('displays greeting', () => {

        // Create element
        const element = createElement('c-hello', {
            is: Hello
        });
        // adding out component into DOM
        document.body.appendChild(element);
        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('p');
        // assert => System.assert
        expect(div.textContent).toBe('Lightning Web Component');
    });
    it('displays not greeting', () => {
        // Create element
        const element = createElement('c-hello-world', {
            is: Hello
        });
        document.body.appendChild(element);
        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('p');
        expect(div.textContent).not.toBe('Lightning Web Component!');
        
    });
});