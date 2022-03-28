import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public events: any[];
  public options: any;


  constructor() { }

  ngOnInit(): void {

    this.options = {
      dateClick: this.handleDateClick.bind(this),
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
    

    this.events = [
      {
        title: "Evento 1",
        start: new Date(),
        description: "Evento 1aaa"
      },
      {
        title: "Evento 2",
        start: new Date(new Date().getTime() + 86400000),
        description: "Evento 2"
      },
      {
        title: "Evento 3",
        start: new Date(new Date().getTime() + (86400000 * 2)),
        end: new Date(new Date().getTime() + (86400000 * 3)),
        description: "Evento 3"
      },
    ]

  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

}
