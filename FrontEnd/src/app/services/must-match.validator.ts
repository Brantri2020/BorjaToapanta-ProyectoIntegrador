import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function ValidadorCedula(cedula:string){
    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[cedula];
        
       
        var bandera= true;
         
        if (control.errors && !control.errors['ValidadorCedula']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        //Preguntamos si la cedula consta de 10 digitos
        if(control.toString().length == 10){
           
           //Obtenemos el digito de la region que sonlos dos primeros digitos
           var digito_region = parseInt(control.toString().substring(0,2));
           
           //Pregunto si la region existe ecuador se divide en 24 regiones
           if( digito_region >= 1 && digito_region <=24 ){
             
             // Extraigo el ultimo digito
             var ultimo_digito   = parseInt(control.toString().substring(9,10));
   
             //Agrupo todos los pares y los sumo
             var pares = parseInt(control.toString().substring(1,2)) + parseInt(control.toString().substring(3,4)) + parseInt(control.toString().substring(5,6)) + parseInt(control.toString().substring(7,8));
   
             //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
             var numero1 = parseInt(control.toString().substring(0,1));
             var numero1 = (numero1 * 2);
             if( numero1 > 9 ){ var numero1 = (numero1 - 9); }
   
             var numero3 = parseInt(cedula.substring(2,3));
             var numero3 = (numero3 * 2);
             if( numero3 > 9 ){ var numero3 = (numero3 - 9); }
   
             var numero5 = parseInt(cedula.substring(4,5));
             var numero5 = (numero5 * 2);
             if( numero5 > 9 ){ var numero5 = (numero5 - 9); }
   
             var numero7 = parseInt(cedula.substring(6,7));
             var numero7 = (numero7 * 2);
             if( numero7 > 9 ){ var numero7 = (numero7 - 9); }
   
             var numero9 = parseInt(cedula.substring(8,9));
             var numero9 = (numero9 * 2);
             if( numero9 > 9 ){ var numero9 = (numero9 - 9); }
   
             var impares = numero1 + numero3 + numero5 + numero7 + numero9;
   
             //Suma total
             var suma_total = (pares + impares);
   
             //extraemos el primero digito
             var primer_digito_suma = String(suma_total).substring(0,1);
   
             //Obtenemos la decena inmediata
             var decena = (parseInt(primer_digito_suma) + 1)  * 10;
   
             //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
             var digito_validador = decena - suma_total;
   
             //Si el digito validador es = a 10 toma el valor de 0
             if(digito_validador == 10)
               var digito_validador = 0;
   
             //Validamos que el digito validador sea igual al de la cedula
             if(digito_validador == ultimo_digito){
               bandera=true;
             }else{
               bandera=false;
             }
             
           }else{
             // imprimimos en consola si la region no pertenece
             console.log('Esta cedula no pertenece a ninguna region');
           }
        }  
     
       
       
      

        // set error on matchingControl if validation fails
        if (!bandera) {
            control.setErrors({ ValidadorCedula: true });
        } else {
            control.setErrors(null);
        }
    }
    
    
  }

