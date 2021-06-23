import Bouncer from "formbouncerjs";
import {formValidateSettings} from '../../js/constants';

$(document).ready(function () {
    // Валидация полей форм
    let validator = new Bouncer('.form', formValidateSettings);

});
