import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs-2.2/canvasjs.min';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';


export class SosCase {
  public key: string = "";
  public date: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dd: any;
  dodak: any;
  soscase: SosCase[] = new Array();
  countSun: number = 0;
  countMon: number = 0;
  countTue: number = 0;
  countWed: number = 0;
  countThu: number = 0;
  countFri: number = 0;
  countSat: number = 0;
  typeChart: any;
  dataChart: any;
  optionsChart: any;
  typeChart1: any;
  dataChart1: any;
  optionsChart1: any;
  constructor(private route: Router,
    private afDb: AngularFireDatabase) {
    afDb.list<SosCase>("SOS_Case").snapshotChanges().subscribe(noti => {
      this.soscase = []
      noti.forEach(n => {
        n.payload.val().key = n.payload.key
        const s: SosCase = n.payload.val()
        s.key = n.payload.key
        this.soscase.push(s)

      })
      this.soscase.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)
      this.soscase.forEach(n => {
        // console.log("AAAAA : " + n.date)
        this.call(n.date)

      })
    })

  }
  call(date) {
    const d = new Date(date)
    const dd = d.getDay()
    //  console.log(dd)

    if (dd === 0) {
      //  console.log("อาทิตย์")
      this.countSun += 1;
      return;
    } else if (dd === 1) {
      //  console.log("จันทร์")
      this.countMon += 1;
    }
    else if (dd === 2) {
      //  console.log("อังคาร")
      this.countTue += 1;
    }
    else if (dd === 3) {
      //  console.log("พุธ")
      this.countWed += 1;
    }
    else if (dd === 4) {
      //  console.log("พฤหัสบดี")
      this.countThu += 1;
    }
    else if (dd === 5) {
      //  console.log("ศุกร์")
      this.countFri += 1;
    }
    else if (dd === 6) {
      //  console.log("เสาร์")
      this.countSat += 1;
    }

    //  console.log("asdasd" + this.countSun)

    /*    let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "สถิติการแจ้งเหตุ"
          },
    
          data: [{
            type: "column",
            dataPoints: [
              { y: this.countMon, label: "จันทร์" },
              { y: this.countTue, label: "อังคาร" },
              { y: this.countWed, label: "พุธ" },
              { y: this.countThu, label: "พฤหัสบดี" },
              { y: this.countFri, label: "ศุกร์" },
              { y: this.countSat, label: "เสาร์" },
              { y: this.countSun, label: "อาทิตย์" }
            ]
          }]
        });
        let chart2 = new CanvasJS.Chart("chartContainer2", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: ""
          },
          data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: this.countMon, name: "จันทร์" },
              { y: this.countTue, name: "อังคาร" },
              { y: this.countWed, name: "พุธ" },
              { y: this.countThu, name: "พฤหัสบดี" },
              { y: this.countFri, name: "ศุกร์" },
              { y: this.countSat, name: "เสาร์" },
              { y: this.countSun, name: "อาทิตย์" }
            ]
          }]
        });
        chart.render();
        chart2.render();
        */
    this.typeChart = 'bar';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart = {
      labels: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],
      datasets: [
        {
          label: "สถิติการแจ้งเหตุ",
          data: [this.countMon, this.countTue, this.countWed, this.countThu, this.countFri, this.countSat, this.countSun],
          backgroundColor: ['#ffff00', '#ff00ff', '#40ff00', '#ff8000', '#00ffff', '#bf00ff', '#ff0000']
        }
      ]
    };
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false,
      pieceLabel: {
        render: 'value',  // สามารถเปลี่ยนการตั้งค่าตามต้องการได้ 'value','label','percentage'
        fontSize: 10,
        fontStyle: 'bold',
        fontColor: '#000000',
        fontFamily: '"db_heaventmed_cond"'
      }
    };

    this.typeChart1 = 'pie';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.dataChart1 = {
      labels: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],
      datasets: [
        {
          label: "สถิติการแจ้งเหตุ",
          data: [this.countMon, this.countTue, this.countWed, this.countThu, this.countFri, this.countSat, this.countSun],

          backgroundColor: ['#ffff00', '#ff00ff', '#40ff00', '#ff8000', '#00ffff', '#bf00ff', '#ff0000']
        }
      ]
    };
    this.optionsChart1 = {
      responsive: true,
      maintainAspectRatio: false,
      pieceLabel: {
        render: 'value',  // สามารถเปลี่ยนการตั้งค่าตามต้องการได้ 'value','label','percentage'
        fontSize: 10,
        fontStyle: 'bold',
        fontColor: '#000000',
        fontFamily: '"db_heaventmed_cond"'
      }
    };
  }
  ngOnInit() {


  }

}