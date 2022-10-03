import { createElement } from 'lwc';
import Hello from 'c/helloBinding';

describe('c-hello-binding', () => {
    
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('onchage input', () => {
        // Create element
        const element = createElement('c-hello-binding', {
            is: Hello
        });
        document.body.appendChild(element);

        const EXPECTED = 'Welcome Message';
        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).not.toBe('Lightning Web Component');

        // Trigger new greeting
        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.value = EXPECTED;
        inputEl.label = 'Test Input';
        inputEl.name = 'test Name';
        // HTML Events
        // this
        inputEl.dispatchEvent(new CustomEvent('change'));
        // promise 

        return Promise.resolve().then(() => {
            expect(div.textContent).toBe(`${EXPECTED}`);
        });
    });

    test('displays button click', () => {
        // Create element
        const element = createElement('c-hello-binding', {
            is: Hello
        });
        document.body.appendChild(element);
        const EXPECTED = 'Button Clicked';
        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).not.toBe('Lightning Web Component');

        // Trigger new greeting
        const buttonEle = element.shadowRoot.querySelector('lightning-button');
        buttonEle.value = EXPECTED;
        buttonEle.vriant= 'brand';
        buttonEle.name = 'test button';
        buttonEle.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            expect(div.textContent).toBe(`${EXPECTED}`);
        });
    });
});