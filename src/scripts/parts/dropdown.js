export default class Dropdown {
    constructor(el, onShow, onHide) {
        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
        this.onClickDocument = this.onClickDocument.bind(this);
        this.onHide = onHide;
        this.onShow = onShow;

        this.el = el;
        this.active = false;
        this.toggler = el.querySelector('.js-dropdown-toggler');
        this.content = el.querySelector('.js-dropdown-content');
        this.items = el.querySelectorAll('.js-dropdown-item');

        this.items.forEach(item => item.addEventListener('click', this.hide));

        this.toggler.addEventListener('click', this.toggle);
    }

    toggle() {
        if (this.active) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        if (this.onShow) {
            this.onShow();
        }

        this.active = true;

        this.el.classList.add('active');

        this.toggler.removeEventListener('click', this.toggle);

        setTimeout(() => {
            document.addEventListener('click', this.onClickDocument);
        }, 0);
    }

    hide() {
        this.active = false;

        this.el.classList.remove('active');

        setTimeout(() => {
            document.removeEventListener('click', this.onClickDocument);
            this.toggler.addEventListener('click', this.toggle);

            if (this.onHide) {
                this.onHide();
            }
        }, 0)
    }

    onClickDocument(e) {
        if (e.target !== this.content && !this.content.contains(e.target)) {
            this.hide();
        }
    }
}
