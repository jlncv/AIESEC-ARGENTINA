 require( ["js/control"
        ,"js/clases/ajax"
        ,"js/clases/constantes"],
    function(control,ajax,constantes) {
        var JsonUniversidades;
    	var Validar=function(){
    		var txtFirstName=$("#txtFirstName");
    		var txtLastName=$("#txtLastName");
    		var txtPhone=$("#txtPhone");
    		var txtMobil=$("#txtMobil");
    		var txtmail=$("#txtmail");
    		var lstUniversidad=$("#lstUniversidad");
    		var txtPassword=$("#txtPassword");
    		var txtSecondPassword=$("#txtSecondPassword");
    		var lstConocioOrganizacion=$("#lstConocioOrganizacion");
            var lstFechaViaje = $("#lstFechaViaje");
            var lstContactoPreferencia = $("#lstContactoPreferencia");
            

    		if(txtFirstName.val()==""){
    			swal("Ingrese su nombre");
    			return false;
    		}else if(txtLastName.val()==""){
    			swal("Ingrese su apellido");
    			return false;
    		} 
    		else if(txtPhone.val()==""){
    			swal("Ingrese su numero de telefono");
    			return false;
    		} 
    		else if(txtMobil.val()==""){
    			swal("Ingrese su telefono celular");
    			return false;
    		} 
    		else if(txtmail.val()==""){
    			swal("Ingrese su email");
    			return false;
    		} 
    		else if(lstUniversidad.val()==null){
    			swal("Seleccione su universidad");
    			return false;
    		} else if(txtPassword.val()==""){
    			swal("Ingrese la clave");
    			return false;
    		} 
    		else if(txtSecondPassword.val()==""){
    			swal("Repita la clave");
    			return false;
    		} 
    		else if(lstConocioOrganizacion.val()==null){
    			swal("Seleccione como conocio la organización");
    			return false;
    		}else if(lstFechaViaje.val()==null){
                swal("Seleccione la fecha del viaje");
                return false;
            }else if(lstContactoPreferencia.val()==null){
                swal("Seleccione como desea ser contactado");
                return false;
            } else if(txtPassword.val()!=txtSecondPassword.val()){
    			swal("las contraseñas no coinciden");
    			return false;
    		}
            else if(!($("#rbAceptoTerminos").is(":checked"))){
                swal("Debe aceptar los términos y condiciones de privacidad");
            }
            else{
    			return true;
    		}

    	}

        var saveEndAjax=function(data){
            window.open("https://auth.aiesec.org/users/sign_in");
            swal({
              title: "Registro correcto!",
              text: " ",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Aceptar",
              closeOnConfirm: false
            },
            function(){
               location.href ="http://aieseccolombia.org/inscripcion-exitosa-voluntario/";
            });

        }

        var endLoadList=function(data){
            JsonUniversidades=data.alignments;
            $.each(data.alignments,function(index,value){
                $("#lstUniversidad").append('<option value="'+value.id+'">'+value.value+'</option>');
            });
            var list=$(".listas");
            control.loadList(list);
        }
        var ValidarClave=function(text){
            var pswd = text;
                //validate the length
                if ( pswd.length < 8 ) {
                   swal("La contraseña deben tener minimo 8 digitos");
                   return false;
                }
                else if (!( pswd.match(/[A-z]/)) ) {
                    swal("La contraseña debe tener mayusculas y minusculas");
                    return false;
                }else if (!( pswd.match(/\d/) )) {
                    swal("La contraseña deben tener numeros");
                    return false;
                }else{
                    return true;
                }
        };
    	var start=function(){
            $.each(constantes.actividades(),function(index, value){
                    $("#lstCampos").append('<option value="'+value.name+'">'+value.name+'</option>');

                });
    		$("#btnIngresar").click(function(){
                var universidadNombre;
                lstU= document.getElementById("lstUniversidad");
                universidadNombre=lstU.options[lstU.selectedIndex].innerHTML;
                
    			if(Validar() && ValidarClave($("#txtPassword").val())){
                    var url="index.php?r=voluntarioGlobal/InserExpa";
                    var data={};                   
                    data["txtFirstName"]=$("#txtFirstName").val();
                    data["txtLastName"]=$("#txtLastName").val();
                    data["txtPhone"]=$("#txtPhone").val();
                    data["txtMobil"]=$("#txtMobil").val();
                    data["txtmail"]=$("#txtmail").val();
                    data["valUniversidad"]=$("#lstUniversidad").val();
                    data["nombreUniversidad"]=universidadNombre;
                    data["txtPassword"]=$("#txtPassword").val();
                    data["txtSecondPassword"]=$("#txtSecondPassword").val();
                    data["lstConocioOrganizacion"]=$("#lstConocioOrganizacion").val();
                    data["lstFechaViaje"]=$("#lstFechaViaje").val();
                    data["lstContactoPreferencia"]=$("#lstContactoPreferencia").val();
                   
                    
    				ajax.ajaxSinJson(data,url,saveEndAjax,errorEnd);
                    $.blockUI({ 
                        message: $(' <div class="progress"><div class="indeterminate"></div></div>'), 
                        css: { top: '20%' } 
                    }); 
                }
    		});
            $("#btnTerminosCondiciones").click(function(e){
                e.preventDefault();
                 window.open("http://aieseccolombia.org/wp-content/uploads/2017/02/AVISO-DE-PRIVACIDAD-1.pdf");
            });
            ajax.ajax({},"index.php?r=voluntarioGlobal/UniversidadesColombia",endLoadList);


    	};

        var errorEnd=function(error){
            console.log(error);
        }

        $(document).ready(start);
    }
  );
