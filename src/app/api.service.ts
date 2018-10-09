import { Injectable } from '@angular/core';
import * as data from '../assets/data.json';
import { interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as faker from 'faker';
import shuffle from 'lodash/shuffle';
import * as world from '../assets/world.json';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }
  virus: string[] = [
    'Trojan',
    'Spam',
    'Botnet',
    'StealCreds',
    'APT1'
  ];
  serverTypes: string[] = [
    'Web server',
    'Mail server',
    'Ftp server'
  ];

  getMapData() {
    return world;
  }
  
  getThreatType() {
    return this.virus;
  }

  getRandomIp() {
    return (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0) + "." + (Math.floor(Math.random() * 255) + 0);
  }

  getRandomGeoLocation() {
    return [(Math.random() * 180 - 90).toFixed(3), (Math.random() * 360 - 180).toFixed(3)];
  }

  generateRandomThreatData(count): any {
    let threats = [];
    for (let i = 0; i < count; i++) {
      threats.push({
        ip: this.getRandomIp(),
        geo: this.getRandomGeoLocation(),
        owner: faker.name.firstName() + ' ' + faker.name.lastName(),
        virus: shuffle(this.virus).slice(0, Math.floor(Math.random() * this.virus.length) || 1)
      });
    }
    return threats;
  }

  getThreatData() {
    let threatData = (<any>data).threatData;
    return interval(5000).pipe(map(() => this.generateRandomThreatData(2)), startWith(threatData));
  }
}