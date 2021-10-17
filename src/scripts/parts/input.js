export default class Input {
    constructor(el) {
        this.container = el;
        this.input = el.querySelector('input');

        this.input.addEventListener('input', this.checkActive.bind(this));

        this.input.addEventListener('change', this.checkActive.bind(this));


        this.input.addEventListener('focus', () => {
            this.container.classList.add('focus');
        });

        this.input.addEventListener('blur', () => {
            this.container.classList.remove('focus');
        });

        this.checkActive();

    }

    checkActive() {
        this.input.value.length > 0
            ? this.container.classList.add('active')
            : this.container.classList.remove('active')
    }
}
