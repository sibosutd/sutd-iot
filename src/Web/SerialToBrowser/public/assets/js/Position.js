var POSITION = 'Supine Position';

function Position(labelId) {
    this.label = document.getElementById(labelId);
    this.label.textContent = POSITION;
}

Position.prototype = {
    constructor: Position,
    update: function (data) {
        var text;
        switch(parseInt(data)) {
            case 1:
                text = 'Supine Position';
                break;
            case 2:
                text = 'Left Lateral Decubitus';
                break;
            case 3:
                text = 'Right Lateral Decubitus';
                break;
            case 4:
                text = 'Prone Position';
                break;
            case 5:
                text = 'Standing or Sitting';
                break;
            default:
                break;
        }
        this.label.textContent = text;
    }
};
