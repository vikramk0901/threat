import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import echarts from 'echarts';
import { NbThemeService } from '@nebular/theme';



@Component({
  selector: 'threat-map',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  constructor(private theme: NbThemeService) {
  }

  bubbleTheme: any;
  geoColors: any;
  chartData = [];
  updateOptions: any;

  @Input() geoData: any;
  @Input() threats: any;

  options = {
    tooltip: {
      trigger: 'item',
      formatter: params => {
        return `${params.name}: Threat Count = ${params.value[2]}`;
      },
    },
    geo: {
      name: 'Threat Data',
      type: 'map',
      map: 'world',
      roam: true,
      label: {
        emphasis: {
          show: false,
        },
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: this.chartData
      }
    ]
  };

  ngOnInit() {
    echarts.registerMap('world', this.geoData);
  }

  ngOnChanges(changes) {
    console.log(changes);
    if (changes.threats && this.options) {
      this.updateOptions = {
        series: [{
          data: changes.threats.currentValue.map(threat => {
            return {
              name: threat.ip,
              value: [
                threat.geo[1],
                threat.geo[0],
                threat.virus.length,
                threat.virus,
                threat.owner
              ]
            };
          })
        }]
      };
    }
  }

}
