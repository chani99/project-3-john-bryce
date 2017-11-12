var validation = function() {

    function NotEmpty(input) {
        if ((inputtxt == "") || (inputtxt == undefined)) {
            return "You must fill all input fields!";
        } else {
            return true;
        }
    }

    function matchTextPattern(input) {
        var pattern = /[0-9a-zA-Zא-ת\s!?=+-.,']+$/m;
        if (!pattern.test(input)) {
            return "The field contains invalid characters, only letters or numbers must be entered!";

        } else {
            return true;
        }

    }

    function matchPhonePattern(input) {
        let phoneno = /^\d{10}$/;
        if (!input.value.match(phoneno)) {
            return "Tho phone number is invalid!";
        } else {
            return true;
        }

    }

    function matchEmailPattern(input) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!input.value.match(mailformat)) {
            return "Tho email is invalid!";
        } else {
            return true;
        }

    }



    return {
        validat_input: function(type, input) {
            switch (type) {
                case 'name':
                    let empty = NotEmpty(input);
                    let pattern = matchTextPattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'phone':
                    let empty = NotEmpty(input);
                    let pattern = matchPhonePattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'email':
                    let empty = NotEmpty(input);
                    let pattern = matchEmailPattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'image':
                    let empty = NotEmpty(input);
                    let tolarge = checkSize(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;





                    break;
                default:
            }
        }
    }



}