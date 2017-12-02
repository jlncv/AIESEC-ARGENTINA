define(["js/clases/objetos"
        ,"js/clases/string"]
    , function (Objetos
                ,string ) {
        return {
            _AjaxFinalizar: null,
            _AjaxInicio: null,
            _AjaxError: null,
            _AjaxComplete: null,
            /*Finaliza el ajax*/
            _Finalizar: function (objeto, exito) {
               
                if (Objetos.isNoNullorEmpty(this.objThis._AjaxFinalizar)) {
                    this.objThis._AjaxFinalizar((exito == "success" ? true : false));
                }
            },
            /*Cuando inicia el ajax*/
            _Inicio: function (objeto) {                
                
                if (Objetos.isNoNullorEmpty(this.objThis._AjaxInicio)) {
                    this.objThis._AjaxInicio(objeto);
                }
            },
            /*Error del ajax*/
            _Error: function (objeto, quepaso, otroobj) {
               console.log(objeto);
                if (Objetos.isNoNullorEmpty(this.objThis._AjaxError)) {
                    this.objThis._AjaxError(quepaso);
                }
            },
            /*Complete ajax*/
            _Complete: function (datos) {
                console.log(datos);
                if (this.objThis._AjaxComplete != undefined && this.objThis._AjaxComplete != null) {                    
                    this.objThis._AjaxComplete(datos);                    
                }
             
            },
            /*Metodo Ajax*/
            ajax: function (Datos, Url, Complete, Error, Finalizar, Inicio,objLlamada) {   

                /*agrego los metodos con los que voy a ejecutar el ajax*/                
                this._AjaxFinalizar = Finalizar;
                this._AjaxInicio = Inicio;
                this._AjaxError = Error;
                this._AjaxComplete = Complete;               
                var objThis = this;
                
                jQuery.ajax({
                    type: "post",
                    url: Url,
                    data: { "parametros": Datos },
                    //contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: this._Inicio,
                    complete: this._Finalizar,
                    error: this._Error,
                    success: this._Complete,
                    objThis: objThis,
                    objLlamada:objLlamada
                });
            }
            /*Metodo ajax con parametros Personalizados*/
            ,ajaxSinJson: function (Datos, Url, Complete, Error, Finalizar, Inicio,objLlamada) {                
                /*agrego los metodos con los que voy a ejecutar el ajax*/
             
                /*agrego los metodos con los que voy a ejecutar el ajax*/                
                this._AjaxFinalizar = Finalizar;
                this._AjaxInicio = Inicio;
                this._AjaxError = Error;
                this._AjaxComplete = Complete;               
                var objThis = this;
                
                jQuery.ajax({
                    type: "post",
                    url: Url,
                    data: { "parametros": Datos },
                    //contentType: "application/json; charset=utf-8",
                    //dataType: "json",
                    beforeSend: this._Inicio,
                    complete: this._Finalizar,
                    error: this._Error,
                    success: this._Complete,
                    objThis: objThis,
                    objLlamada:objLlamada
                });
            }
        };
    });