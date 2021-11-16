import Dropdown from './dropdown';
import StatsDropdown from './stats-dropdown';
import Input from './input';
import Select from './select';
import ImageCropper from './image-cropper';
import Section from './section';



export default class Page {
    constructor() {
        const FARBA = {
            //lazy load для сторонних либ
            lazyLibraryLoad(scriptSrc,linkHref,callback) {
                let script = document.createElement('script');
                script.src = scriptSrc;
                document.querySelector('body').appendChild(script);
            
                if (linkHref !== '') {
                    let style = document.createElement('link');
                    style.href = linkHref;
                    style.rel = 'stylesheet';
                    document.querySelector('link').before(style);
                }
            
                script.onload = callback
            },
        }
        
        this.dropdowns = Array.from(document.querySelectorAll('.js-dropdown'))
            .map($dropdown => new Dropdown($dropdown));

        this.inputs = Array.from(document.querySelectorAll('.js-input'))
            .map($input => new Input($input));

        this.imageCroppers = Array.from(document.querySelectorAll('.js-image-cropper'))
            .map($el => new ImageCropper($el));

        this.statsDropdown = Array.from(document.querySelectorAll('.js-stats-dropdown'))
            .map($el => new StatsDropdown($el));

        this.selects = Array.from(document.querySelectorAll('.js-select'))
            .map($el => new Select($el));

        this.sections = Array.from(document.querySelectorAll('.js-section'))
        .map($el => new Section($el));


        document.querySelectorAll('.js-notifications-toggler').forEach($el => {
            tippy($el, {
                content: document.querySelector('.js-notifications').innerHTML,
                allowHTML: true,
                trigger: 'click',
                theme: 'notifications',
                interactive: true,
            });
        });

        document.querySelectorAll('.js-disabled-course').forEach($el => {
            tippy($el, {
                content: 'Урок будет доступен после 25 августа',
                theme: 'disabled-course',
            });
        })

        //тугглеры тегов на странице краудплатформы
        if (document.querySelector('.crowd-search-toggler')) {
            const crowdToggler = document.querySelectorAll('.crowd-search-toggler');

            crowdToggler.forEach((el,index,arr) => el.addEventListener('click', (e) => {
                e.preventDefault();
                el.classList.toggle('opened')
                const target = el.dataset.target || null
                if (!target || !document.querySelector(target)) return
                arr.forEach(item => {
                    if (item != el) {
                        document.querySelector(item.dataset.target).style.display = 'none'
                        item.classList.remove('opened')
                    }
                })
                const display = document.querySelector(target).style.display
                document.querySelector(target).style.display = display == 'block' ? 'none' : 'block'
            }))
        }

        //лениво подгружаем визуальный редактор
        if (document.querySelector('.visual-editor')) {
            tinymce.init({
                selector: 'textarea.visual-editor',
                menubar: false,
                statusbar: false,
                min_height: 200,
                max_height: 300,
                autoresize_overflow_padding: 0,
                plugins: [
                    'advlist autolink lists link image anchor',
                    'media table paste imagetools wordcount autoresize'
                ],
                toolbar: 'bold italic underline strikethrough | styleselect | alignleft aligncenter alignright alignjustify | bullist numlist | table link',
                content_style: `@font-face {
                    font-family: PPPangramSans;
                    src: url('./fonts/pangram/PPPangramSans-Medium.woff2') format('woff2'), url('./fonts/pangram/PPPangramSans-Medium.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                  }
                  body { font-family: PPPangramSans; }`,
                //путь загрузки изображений
                // images_upload_url: '...',
                //обработчик загрузки, смотреть https://www.tiny.cloud/docs/general-configuration-guide/upload-images/
                // images_upload_handler: function (blobInfo, success, failure) {},
            });
        }

        
        //предпросмотр имени загружаемых файлов
        const uifile = document.querySelectorAll('input.ui-file-file');
        uifile.forEach(el => {
            el.addEventListener('change', (e) => {
                const input = e.target
                if (!input.closest('.ui-file').nextElementSibling) return
                input.closest('.ui-file').nextElementSibling.innerHTML = ''
                if (input.files && input.files[0]) {
                    for (let file of input.files) {
                        const preview = document.createElement('span')
                        preview.textContent = file.name
                        preview.className = 'ui-file-preview'
                        input.closest('.ui-file').nextElementSibling.appendChild(preview)
                    }
                }
            })
        })


        //снимаем выделение с группы чекбоксов/радио
        const uncheckLink = document.querySelectorAll('.tags-uncheck')
        uncheckLink.forEach(el => {
            const group = el.dataset.group || null
            if (!group || !document.querySelector(group)) return

            //снимаем по выделение с группы чипсов
            el.addEventListener('click', (e) => {
                e.preventDefault();
                document
                    .querySelectorAll(group)
                    .forEach(item => item.checked = false)
                el.classList.remove('active')
            })

            //делаем кнопку видимой при активных чипсах
            document.querySelectorAll(group)
                .forEach(item => {
                    item.addEventListener('change',()=> {
                        if (item.checked === true) {
                            el.classList.add('active')
                        } else {
                            el.classList.remove('active')
                        }
                    })
                })
            

            
        });

        //добавляем поля с дополнительными вопросами вопросами
        const reqQuestions = {
            link: document.querySelectorAll('.create-req-add-question'),
            template(index) {
                this.index++
                return `<div class="row">
                    <div class="col-md-5">
                    <div class="input js-input js-input-${index} input__margin">
                    <input name="req_question_${index}" id="req_question_${index}" type="text" class="input__ctrl">
                    <label for="req_question_${index}" class="input__label">Вопрос №${index}</label>
                    </div>
                    </div>
                </div>`
            },
            index: 2
        }
        reqQuestions.link.forEach(el => el.addEventListener('click', (e) => {
            e.preventDefault()
            const target = el.dataset.target || null
            if (!target || !document.querySelector(target)) return
            const tmp = reqQuestions.template(reqQuestions.index)
            document.querySelector(target).insertAdjacentHTML('beforeend',tmp)
            //инитим новый экземпляр инпута
            const addedInput = document.querySelector(`.js-input-${reqQuestions.index - 1}`)
            new Input(addedInput)
        }))


        //переключаем срочность/бессрочность запроса
        if (document.querySelector('.create-req-noterm')) {
            const reqNoTerm = document.querySelector('.create-req-noterm')
            reqNoTerm.addEventListener('click',(e) => {
                e.preventDefault()
                const target = reqNoTerm.dataset.target || null
                if (!target || !document.querySelector(target)) return
                const disabled = document.querySelector(target).disabled
                document.querySelector(target).disabled = !disabled
            })
        }


        //сворачиваем/разворачиваем группы курсов
        const coursesGroupToggler = document.querySelectorAll('.courses-group-title')
        coursesGroupToggler.forEach(el => el.addEventListener('click',(e) => {
            e.preventDefault();
            const next = el.nextElementSibling
            el.classList.toggle('closed')
            next.style.display = next.style.display==='none' ? 'block' : 'none'
        }))


        if (document.querySelector('.date-mask')) {
            FARBA.lazyLibraryLoad(
                'https://cdnjs.cloudflare.com/ajax/libs/imask/6.2.2/imask.min.js',
                '',
                () => {
                    IMask(document.querySelector('.date-mask'), {
                        mask: Date,
                        pattern: '`d.`m.Y', 
                        blocks: {
                            d: {
                                mask: IMask.MaskedRange,
                                from: 1,
                                to: 31,
                                maxLength: 2,
                            },
                            m: {
                                mask: IMask.MaskedRange,
                                from: 1,
                                to: 12,
                                maxLength: 2,
                            },
                            Y: {
                                mask: IMask.MaskedRange,
                                from: 1900,
                                to: 2999,
                            }
                        }
                    })
                }
            )
        }
        

    }
}
