var validation = function() {

    function NotEmpty(input) {
        if ((inputtxt == "") || (inputtxt == undefined)) {
            alert("You must fill all input fields!");
            return false;
        } else {
            return true;
        }
    }

    function matchTextPattern(input) {
        var pattern = /[0-9a-zA-Zא-ת\s!?=+-.,']+$/m;
        if (!pattern.test(input)) {
            alert("The field contains invalid characters, only letters or numbers must be entered!");
            return false;
        } else {
            return true;
        }

    }


    return {
        validat_input: function(type, input) {
            switch (type) {
                case 'name':
                    if ((NotEmpty(input) == true) && (matchTextPattern(input) == true)) {
                        return true;
                    }
                    break;
                case 'phone':

                    break;
                case 'email':

                    break;
                case 'image':

                    break;
                default:
            }
        }
    }



}
var validate = {

        // checks if the field is not empty
    },

    // Validation for name input
    ValidateName: function(name) {
        var pattern = /[0-9a-zA-Zא-ת\s!?=+-.,']+$/m;
        if (this.NotEmpty(name) == false) {
            alert("You must fill all input fields!");
            return false;

        } else if (!pattern.test(name)) {
            alert("The field contains invalid characters, only letters or numbers must be entered!");
            return false;

        } else {
            return true;
        }
    },

    // Validation for id/number input
    ValidateId: function(id) {
        if (this.NotEmpty(id) == false) {
            alert("You must fill all input fields!");
            return false;

        } else if (isNaN(id)) {
            alert("the id can contian only numbers!");
            return false;

        } else {
            return true;
        }
    },

    // Checks if a selection was choosen
    isSelected: function(selectid) {
        if (selectid == "Select a director") {
            alert("Please select a director");
            return false;

        } else {
            return true;

        }
    }

}