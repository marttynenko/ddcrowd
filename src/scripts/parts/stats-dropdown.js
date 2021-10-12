import Dropdown from './dropdown';

export default class StatsDropdown {
    constructor(el) {
        this.container = el;
        tippy(el, {
            content: document.querySelector('.js-stats').innerHTML,
            allowHTML: true,
            trigger: 'click',
            theme: 'site',
            maxWidth: 'none',
            distance: '20rem',
            placement: window.matchMedia("(max-width: 649px)").matches ? 'bottom' : 'top',
            interactive: true,
            popperOptions: {
                modifiers: [{ name: 'flip', enabled: false }],
            },
        });
    }
}
