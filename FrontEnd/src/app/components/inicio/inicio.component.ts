import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { EventosService } from 'src/app/services/eventos.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public events: any[];
  public options: any;

  constructor(private _eventoServices: EventosService) { }

  ngOnInit(): void {
   
    this.obtenerEventosFechas()
    this.options = {
      //dateClick: this.handleDateClick.bind(this),
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: false
    }
    
  }
/*
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr )
  }
*/

  obtenerEventosFechas() {
    this._eventoServices.obtenerEventosFechas().subscribe(data => {
      this.events = data;
      console.log(this.events)
    });
  }
 
}
