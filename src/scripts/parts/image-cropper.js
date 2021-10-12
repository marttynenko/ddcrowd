export default class ImageCropper {
    constructor(el) {
        this.img = el;

        this.cropper = new Cropper(this.img, {
            aspectRatio: 1 / 1,
            guides: false,
            center: false,
            highlight: false,
        });
    }
}
