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
            var lstCampos=$("#lstCampos");

            var lstFechaViaje  = $("#lstFechaViaje");
            var lstContactoPreferencia = $("#lstContactoPreferencia");
            var lstNivelIngles = $("#lstNivelIngles");
            var lstExperienciaTrabajo = $("#lstExperienciaTrabajo");
            var lstCarreraEstudiante = $("#lstCarreraEstudiante");
            var lstSemestre = $("#lstSemestre");
            var bolEmprendedor;



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
    		} else if(txtPassword.val()!=txtSecondPassword.val()){
    			swal("las contraseñas no coinciden");
    			return false;
    		}else if(lstCampos.val()==null){
                swal("Seleccione su área de preferencia");
                return false;
            }else if(lstFechaViaje.val()==null){
                swal("Seleccione su la fecha de viaje");
                return false;
            }
            else if(lstContactoPreferencia.val()==null){
                swal("Seleccione como prefiere se contactado");
                return false;
            }
             else if(lstNivelIngles.val()==null){
                swal("Seleccione su nivel de ingles");
                return false;
            }
            else if(lstExperienciaTrabajo.val()==null){
                swal("Seleccione su experiencia de trabajo");
                return false;
            }
            else if(lstCarreraEstudiante.val()==null){
                swal("Seleccione la carrera que estudio");
                return false;
            }
            else if(lstSemestre.val()==null){
                swal("Seleccione el semestre en el que esta actualmente");
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
            var strMensaje = "Registro correcto!";
            var url = " http://aieseccolombia.org/inscripcion-exitosa-talento/";
            if(bolEmprendedor){
                strMensaje = "Hola! Hemos analizado tu perfil y según la información que nos proporcionas,el producto que tenemos para ti es emprendedor global. Por eso, ya hemos hecho tu registro en este producto para que puedas iniciar el proceso y conseguir tu oportunidad."; 
                url =  "http://aieseccolombia.org/inscripcion-exitosa-emprendedor/";
            }
            
            swal({
              title: strMensaje,
              text: " ",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Aceptar",
              closeOnConfirm: false
            },
            function(){
                location.href = url;
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
                lstC = document.getElementById("lstCarreraEstudiante")
                universidadNombre=lstU.options[lstU.selectedIndex].innerHTML;
                carreraNombre = lstC.options[lstC.selectedIndex].innerHTML;
                
    			if(Validar() && ValidarClave($("#txtPassword").val())){
                    var url="index.php?r=talentoGlobal/InserExpa";
                    bolEmprendedor = false;
                    
                    if($("#lstExperienciaTrabajo").val() == "1"){
                        url="index.php?r=formulario/InserExpa";
                        bolEmprendedor = true;
                    }
                    if ($("#lstExperienciaTrabajo").val() == "2" 
                        && $("#lstNivelIngles").val() == "1"){
                        url="index.php?r=formulario/InserExpa";
                        bolEmprendedor = true;
                    }
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
                    data["lstCampos"]=$("#lstCampos").val();

                    data["lstFechaViaje"] = $("#lstFechaViaje").val();
                    data["lstContactoPreferencia"] = $("#lstContactoPreferencia").val();
                    data["lstNivelIngles"] = $("#lstNivelIngles").val();
                    data["lstExperienciaTrabajo"] = $("#lstExperienciaTrabajo").val();
                    data["lstCarreraEstudiante"] = carreraNombre;
                    data["lstSemestre"] = $("#lstSemestre").val();
                    
    				ajax.ajaxSinJson(data,url,saveEndAjax);
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
            ajax.ajax({},"index.php?r=talentoGlobal/UniversidadesColombia",endLoadList);


    	};

        $(document).ready(start);
    }
  );
