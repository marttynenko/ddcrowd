export default class Input {
    constructor(el, options = {}) {
        this.container = el;
        this.choices = new Choices(this.container, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            ...options,
        });
    }
}
