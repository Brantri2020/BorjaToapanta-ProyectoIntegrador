import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/model/evento';
import { MustMatch } from 'src/app/services/must-match.validator';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css'],
})
export class CrearEventoComponent implements OnInit {
  eventoForm: FormGroup;
  titulo = 'Crear evento';
  id: string | null;
  anho: string | null;
  mes: string | null;
  mensaje: string = '';
  arrayDias: string[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _eventoService: EventosService,
    private aRouter: ActivatedRoute
  ) {
    this.eventoForm = this.fb.group({
      nombreEvento: ['', Validators.required],
      tipoEvento: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.anho = this.aRouter.snapshot.paramMap.get('anho');
    this.mes = this.aRouter.snapshot.paramMap.get('mes');

    let anioString = this.anho?.toString();
    let diasMes = diasEnUnMes(convertirMes("Enero"), parseInt(anioString || "0"));
    let diaCount = "";
    for (let i = 1; i < diasMes + 1; i++) {
      if (i < 10) {
        diaCount = "0" + i.toString();
      } else {
        diaCount = i.toString();
      }
      this.arrayDias.push(diaCount);
    }
  }

  ngOnInit(): void {
    this.esEditar();
    this.habilitarHoraFin();
    this.horaInicioFin();
  }

  habilitarHoraFin() {
    const selectElementHoraInicio = document.getElementById('inicio');
    const selectElementHoraFin = document.getElementById('fin');

    let inicio = "";

    if (selectElementHoraInicio === null) {
    } else {
      selectElementHoraInicio.addEventListener('change', (event) => {
        inicio = (<HTMLInputElement>selectElementHoraInicio).value;
        if (inicio.length !== 0) {
          if (selectElementHoraFin === null) {
          } else {
            selectElementHoraFin.style.pointerEvents = "auto";
          }
        }
      });
    }
  }


  horaInicioFin() {
    const selectElementHoraInicio = document.getElementById('inicio');
    const selectElementHoraFin = document.getElementById('fin');
    let fin = "";
    let inicio = "";

    if (selectElementHoraInicio === null) {

    } else {
      selectElementHoraInicio.addEventListener('change', (event) => {
        inicio = (<HTMLInputElement>selectElementHoraInicio).value;
        if (selectElementHoraFin === null) {

        } else {
          selectElementHoraFin.addEventListener('change', (event) => {
            fin = (<HTMLInputElement>selectElementHoraFin).value;
            let iniArray = inicio.split(":");
            let finArray = fin.split(":");

            if (iniArray[0] < finArray[0]) {
              //paso
            } else if (iniArray[0] === finArray[0]) {
              if (iniArray[1] < finArray[1]) {
                //paso
              } else if (iniArray[1] === finArray[1]) {
                alert("La hora fin debe ser mayor a la hora inicio");
                this.eventoForm.controls['horaFin'].setValue("");
              } else {
                alert("La hora fin debe ser mayor a la hora inicio");
                this.eventoForm.controls['horaFin'].setValue("");
              }
            } else {
              alert("La hora fin debe ser mayor a la hora inicio");
              this.eventoForm.controls['horaFin'].setValue("");
            }
          });

        }
      });
    }




  }

  comprobarHoraInicioFin() {
    let bandera = true;

    const selectElementHoraInicio = document.getElementById('inicio');
    const selectElementHoraFin = document.getElementById('fin');
    let fin = "";
    let inicio = "";


    if (selectElementHoraInicio === null) {

    } else {
      inicio = (<HTMLInputElement>selectElementHoraInicio).value;
      if (selectElementHoraFin === null) {

      } else {
        fin = (<HTMLInputElement>selectElementHoraFin).value;
        let iniArray = inicio.split(":");
        let finArray = fin.split(":");
        
        if (iniArray[0] < finArray[0]) {
          bandera = true;
        } else if (iniArray[0] === finArray[0]) {
          if (iniArray[1] < finArray[1]) {
            bandera = true;
          } else if (iniArray[1] === finArray[1]) {
            alert("La hora fin debe ser mayor a la hora inicio");
            this.eventoForm.controls['horaFin'].setValue("");
            bandera = false
          } else {
            alert("La hora fin debe ser mayor a la hora inicio");
            this.eventoForm.controls['horaFin'].setValue("");
            bandera = false
          }
        } else {
          alert("La hora fin debe ser mayor a la hora inicio");
          this.eventoForm.controls['horaFin'].setValue("");
          bandera = false
        }
      }

    }
    return bandera;

  }

  agregarEvento() {

    if (!this.comprobarHoraInicioFin()) {

    } else {

      let fecha = "";
      let diaMes = this.eventoForm.get('fecha')?.value.toString();
      let mesString = convertirMes(this.mes || "").toString();

      if (diaMes.length == 1) {
        diaMes = "0" + diaMes;
      }
      if (mesString.length == 1) {
        mesString = "0" + mesString;
      }
      fecha = this.anho + "-" + mesString + "-" + diaMes;
      const EVENTO: Evento = {
        nombreEvento: this.eventoForm.get('nombreEvento')?.value,
        tipoEvento: this.eventoForm.get('tipoEvento')?.value,
        fecha: fecha,
        horaInicio: this.eventoForm.get('horaInicio')?.value,
        horaFin: this.eventoForm.get('horaFin')?.value,
        descripcion: this.eventoForm.get('descripcion')?.value,
      };
      if (this.id !== null) {
        //editamos evento

        this._eventoService
          .editarEvento(this.id, EVENTO, this.anho, this.mes)
          .subscribe(
            (data) => {

              if(data=="Cruce de horarios"){
                alert("Existe un cruce de eventos, rectifique por favor");
              }else{
                this.toastr.success(
                  'El evento fue actualizado con éxito!',
                  'Evento Actualizado!'
                );
                this.router.navigate(['/eventos']);
              }
              
            },
            (error) => {
              console.log(error);
              this.mensaje = error.error;
            }
          );
      } else {
        //agregamos evento
        this._eventoService.guardarEvento(EVENTO, this.anho, this.mes).subscribe(
          (data) => {
            if(data=="Cruce de horarios"){
              alert("Existe un cruce de eventos, rectifique por favor");
            }else{
              this.toastr.success(
                'El evento fue registrado con éxito!',
                'Evento Registrado!'
              );
              this.router.navigate(['/eventos']);
            }
            
          },
          (error) => {
            console.log(error);
            this.mensaje = error.error;
          }
        );
      }
    }
  }



  esEditar() {

    if (this.id !== null) {
      this.titulo = 'Editar evento';
      const selectElementHoraFin = document.getElementById('fin');
      if (selectElementHoraFin === null) {
      } else {
        selectElementHoraFin.style.pointerEvents = "auto";
      }

      this._eventoService
        .obtenerEvento(this.id, this.anho, this.mes)
        .subscribe((data) => {
          this.eventoForm.setValue({
            nombreEvento: data.nombreEvento,
            tipoEvento: data.tipoEvento,
            fecha: data.fecha.split("-")[2],
            horaInicio: data.horaInicio,
            horaFin: data.horaFin,
            descripcion: data.descripcion
          });
        });
    }
  }
}

function diasEnUnMes(mes: number, año: number) {
  return new Date(año, mes, 0).getDate();
}


function convertirMes(mesIn: string) {
  let contador = 1;
  let bandera = false;
  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  meses.forEach(function (mes) {


    if (mes !== mesIn && bandera === false) {
      contador++;
    } else {
      bandera = true;
    }

  })


  return contador;
}