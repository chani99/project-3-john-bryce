var validation = function() {

    function NotEmpty(input) {
        if ((input == "") || (input == undefined)) {
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
        if (!phoneno.test(parseInt(input))) {
            return "Tho phone number is invalid!";
        } else {
            return true;
        }

    }

    function matchEmailPattern(input) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!mailformat.test(input)) {
            return "Tho email is invalid!";
        } else {
            return true;
        }

    }



    return {
        validat_input: function(input, type) {
            let empty;
            let pattern;
            switch (type) {
                case 'name':
                    empty = NotEmpty(input);
                    pattern = matchTextPattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'phone':
                    empty = NotEmpty(input);
                    pattern = matchPhonePattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'email':
                    empty = NotEmpty(input);
                    pattern = matchEmailPattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'image':
                    empty = NotEmpty(input);
                    if (empty == true) {
                        return true;
                        return empty;
                    }
                    break;





                    break;
                default:
            }
        }
    }



}