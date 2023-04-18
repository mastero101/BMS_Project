import { Component, OnInit } from '@angular/core';
import {
  getDatabase,
  ref,
  onValue,
} from 'firebase/database';

import 'firebase/database';

import axios from 'axios';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  voltage: any;
  voltagefix: any;
  voltage2: any;
  voltage3: any;
  voltagefix3: any;
  voltageTotal: any;
  percent: any;
  percent2: any;
  date2: any;
  msgwhats: any;
  msgsms: any;

  constructor() { }

  ngOnInit(): void {
    this.voltage = this.getValue();
    this.voltage2 = this.getValue();
    this.voltage3 = this.getValue();
    this.voltageTotal = this.getValue();
    this.percent = this.getValue();
  }

  getValue() {
    const db = getDatabase();
    const starCountR = ref(db, '/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage');
    onValue(starCountR, (snapshot) => {
      this.voltage = Number(snapshot.val());
      this.voltagefix = (this.voltage).toFixed(2);
    });
    const starCountRe = ref(db, '/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage2');
    onValue(starCountRe, (snapshot) => {
      this.voltage2 = Number(snapshot.val());
    });
    const starCountRef = ref(db, '/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage3');
    onValue(starCountRef, (snapshot) => {
      this.voltage3 = Number(snapshot.val());
      this.voltagefix3 = (this.voltage3).toFixed(2);
      this.voltageTotal = (this.voltage+this.voltage2+this.voltage3).toFixed(2);
    });
    const starCountReff = ref(db, '/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Percent');
    onValue(starCountReff, (snapshot) => {
      this.percent = Number(snapshot.val());
      this.percent2 = Number(this.percent);
    });
    const starCountRefff = ref(db, '/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/timestamp');
    onValue(starCountRefff, (snapshot) => {
      const timestamp = (snapshot.val());
      const date = new Date(parseInt(timestamp) * 1000); // Multiplica por 1000 para obtener el valor en milisegundos
      const localTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.date2 = date.toLocaleString('es-ES', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: localTimeZone });
    });
  }

  reload() {
    window.location.reload();
  }

  sms() {
    const twilioURL = 'https://api.twilio.com/2010-04-01/Accounts/AC100cb9d640b55673e2b655f9d0229498/Messages.json'
    const messageBody = {
      Body: this.voltage+'V , '+this.voltage2+'V , '+this.voltage3+'V = '+this.voltageTotal+' V',
      From: "+12766006674",
      To: '+529811402316'
    };
    axios
      .post(`${twilioURL}`, new URLSearchParams(messageBody), {
        auth: {
          username: 'AC100cb9d640b55673e2b655f9d0229498',
          password: '570ef2ec9440fee41fa9ad8bb515e438'
        }
      })
      .then(
        response => {
          console.log(response);
        },
        error => {
          console.log('error in response', error);
        }
      );
  }

  input2(){
    this.msgsms = (<HTMLInputElement>document.getElementById('text2')).value;
  }

  sms2(){
    const twilioURL = 'https://api.twilio.com/2010-04-01/Accounts/AC100cb9d640b55673e2b655f9d0229498/Messages.json'
    const messageBody = {
      Body: this.msgsms,
      From: "+12766006674",
      To: '+529811402316'
    };
    axios
      .post(`${twilioURL}`, new URLSearchParams(messageBody), {
        auth: {
          username: 'AC100cb9d640b55673e2b655f9d0229498',
          password: '570ef2ec9440fee41fa9ad8bb515e438'
        }
      })
      .then(
        response => {
          console.log(response);
        },
        error => {
          console.log('error in response', error);
        }
      );
  }

  async whatsapp(){
    const response = await axios.post(
      'https://api.twilio.com/2010-04-01/Accounts/AC100cb9d640b55673e2b655f9d0229498/Messages.json',
      new URLSearchParams({
        'To': 'whatsapp:+5219811402316',
        'From': 'whatsapp:+14155238886',
        'Body': 'Your appointment is coming up on July 21 at 3PM'
                + ' - ' 
                + ' ' + this.voltage + ' V'
                + ' ' + this.voltage2 + ' V' 
                + ' ' + this.voltage3 + ' V' 
                + ' ' + this.voltageTotal + ' V'
      }),
      {
        auth: {
          username: 'AC100cb9d640b55673e2b655f9d0229498',
          password: '570ef2ec9440fee41fa9ad8bb515e438'
        }
      }
    );
  }

  input(){
    this.msgwhats = (<HTMLInputElement>document.getElementById('text')).value;
  }

  async whatsapp2(){
    const response = await axios.post(
      'https://api.twilio.com/2010-04-01/Accounts/AC100cb9d640b55673e2b655f9d0229498/Messages.json',
      new URLSearchParams({
        'To': 'whatsapp:+5219811402316',
        'From': 'whatsapp:+14155238886',
        'Body': 'Your appointment is coming up on July 21 at 3PM'
                + ' ' + this.msgwhats
      }),
      {
        auth: {
          username: 'AC100cb9d640b55673e2b655f9d0229498',
          password: '570ef2ec9440fee41fa9ad8bb515e438'
        }
      }
    );
  }

}
