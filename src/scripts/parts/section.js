export default class Section {
    constructor(el) {
        this.container = el;
        this.toggler = el.querySelector('.js-section-toggler');
        this.content = el.querySelector('.js-section-content');

        this.toggler.addEventListener('click', () => {
            this.container.classList.toggle('active')
        })
    }
}
