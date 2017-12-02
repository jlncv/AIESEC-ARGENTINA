define([]
    , function () {
        return {
            /*Resibe una cadena de texto y dice si es nul o vacia */
            isNoNullorEmpty: function (text) {
                if (text != undefined && text != null && text!="") {                    
                    if (typeof (text) == "string") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };
    });