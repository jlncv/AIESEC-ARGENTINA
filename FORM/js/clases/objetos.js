define([]
    , function () {
        return {
            /*Pregunta si un Objeto es null o undifeni */
            isNoNullorEmpty: function (Objeto) {
                if (Objeto != undefined && Objeto != null) {
                    if (typeof (Objeto) == "object" || typeof (Objeto) == 'function') {
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