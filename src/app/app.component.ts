import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import echarts from 'echarts';
import * as d3 from 'd3';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Threat Map';
  threats: any = [];
  threatSubscription$;
  categories: any = {};
  mapData: any;
  virus: string[];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.threatSubscription$ = this.api.getThreatData().subscribe(data => {
      this.threats = this.threats.concat(data);
      this.getCategoryCount();
      this.drawBarChart();
    });
    this.mapData = this.api.getMapData();
    this.virus = this.api.getThreatType();
  }

  getCategoryCount() {
    this.threats.map(threat => {
      threat.virus.map(virus => {
        this.categories[virus] = (this.categories[virus]) ? (this.categories[virus] + 1) : 1;
      })
    });
  }

  drawBarChart() {
   
  }

  ngOnDestroy() {
    this.threatSubscription$.unsubscribe();
  }

}
