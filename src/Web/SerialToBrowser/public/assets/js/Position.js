var POSITION = 'Supine Position';

function Position(labelId, imgId) {
    this.label = document.getElementById(labelId);
    this.label.textContent = POSITION;
    this.img = document.getElementById(imgId);
    this.img.src = 'assets/images/sitting.png';
}

Position.prototype = {
    constructor: Position,
    update: function (data) {
        var text;
        var imgSrc;
        switch(parseInt(data)) {
            case 1:
                text = 'Supine Position';
                imgSrc = 'assets/images/supine.png';
                break;
            case 2:
                text = 'Left Lateral Decubitus';
                imgSrc = 'assets/images/left_lat.png';
                break;
            case 3:
                text = 'Right Lateral Decubitus';
                imgSrc = 'assets/images/right_lat.png';
                break;
            case 4:
                text = 'Prone Position';
                imgSrc = 'assets/images/prone.png';
                break;
            case 5:
                text = 'Standing or Sitting';
                imgSrc = 'assets/images/sitting.png';
                break;
            default:
                break;
        }
        this.label.textContent = text;
        this.img.src = imgSrc;
    }
};
