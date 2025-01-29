import { Component, OnInit } from "@angular/core";
import { getDatabase, ref, onValue } from "firebase/database";
import "firebase/database";
import axios from "axios";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"],
})
export class PanelComponent implements OnInit {
  voltage: number = 0;
  voltagefix: string = '0';
  voltage2: number = 0;
  voltage3: number = 0;
  voltagefix3: string = '0';
  voltageTotal: string = '0';
  percent: number = 0;
  percent2: number = 0;
  energy: any;
  watts: number = 0;
  date2: string = '';
  date3: any;
  date4: string = '';

  public canvasWidth = 260;
  public needleValue = 70;
  public centralLabel = "%";
  public options = {
    hasNeedle: true,
    needleColor: "#757575",
    needleUpdateSpeed: 1000,
    arcColors: ["#2196F3", "#E0E0E0"],
    arcDelimiters: [70],
    rangeLabel: ["0", "100"],
    needleStartValue: 0,
    arcPadding: 0,
    arcWidth: 15,
    arcOverEffect: false,
  };

  // Arrays para los gráficos y valores con tipos definidos
  gauges: Array<{ title: string; value: string | number }> = [];
  values: Array<{ 
    title: string; 
    value: string | number; 
    unit: string; 
    date?: string;
  }> = [];

  constructor() {}

  ngOnInit(): void {
    this.getValue();
    this.recoverWatts();
  }

  getValue() {
    const db = getDatabase();
    const starCountR = ref(db, "/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage");
    onValue(starCountR, (snapshot) => {
      this.voltage = Number(snapshot.val());
      this.voltagefix = this.voltage.toFixed(2);
      this.updateGaugesAndValues();
    });

    const starCountRe = ref(db, "/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage2");
    onValue(starCountRe, (snapshot) => {
      this.voltage2 = Number(snapshot.val());
      this.updateGaugesAndValues();
    });

    const starCountRef = ref(db, "/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Voltage3");
    onValue(starCountRef, (snapshot) => {
      this.voltage3 = Number(snapshot.val());
      this.voltagefix3 = this.voltage3.toFixed(2);
      this.voltageTotal = (this.voltage + this.voltage2 + this.voltage3).toFixed(2);
      this.updateGaugesAndValues();
    });

    const starCountReff = ref(db, "/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/Percent");
    onValue(starCountReff, (snapshot) => {
      this.percent = Number(snapshot.val());
      this.percent2 = this.percent;
      this.updateGaugesAndValues();
    });

    const starCountRefff = ref(db, "/UsersData/N5GOhtaSNhOkN2eXtA0sMhWss4I2/readings/timestamp");
    onValue(starCountRefff, (snapshot) => {
      const timestamp = snapshot.val();
      const date = new Date(Number.parseInt(timestamp) * 1000);
      const localTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.date2 = date.toLocaleString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: localTimeZone,
      });
    });
  }

  recoverWatts() {
    axios
      .get("http://132.145.206.61:3000/data")
      .then((response) => {
        this.watts = response.data[response.data.length - 1].watts;
        const timestamp2 = response.data[response.data.length - 1].time;
        const date3 = new Date(Number.parseInt(timestamp2) * 1000);
        const localTimeZone2 = new Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.date4 = date3.toLocaleString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZone: localTimeZone2,
        });
        this.updateGaugesAndValues();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reload() {
    window.location.reload();
  }

  // Función actualizada para manejar el evento de drag and drop
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      const array = event.container.id === 'gauges-list' ? this.gauges : this.values;
      moveItemInArray(array, event.previousIndex, event.currentIndex);
    }
  }

  // Función para actualizar los arrays `gauges` y `values`
  updateGaugesAndValues() {
    this.gauges = [
      { title: "Voltage", value: this.voltagefix + " V"},
      { title: "Voltage 2", value: this.voltage2 + " V"},
      { title: "Voltage 3", value: this.voltagefix3 + " V"},
      { title: "Voltage Total", value: this.voltageTotal + " V"},
      { title: "Watts", value: this.watts + " W" },
    ];

    this.values = [
      { title: "Voltage", value: this.voltagefix, unit: "V" },
      { title: "Voltage", value: this.voltage2, unit: "V" },
      { title: "Voltage", value: this.voltagefix3, unit: "V" },
      { title: "Percent", value: this.percent, unit: "%" },
      { title: "Voltage Total", value: this.voltageTotal, unit: "V" },
      { title: "Watts Total", value: this.watts, unit: "W", date: this.date4 },
    ];
  }
}