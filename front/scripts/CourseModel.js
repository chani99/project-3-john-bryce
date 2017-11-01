    //  module
    function Course(data) {
        // let valN = validate.ValidateName(data);
        // if (!valN)
        //     throw "error";

        this.id = data.id;
        this.name = data.name;
        this.decrip = data.description;
        this.image = data.image
    }