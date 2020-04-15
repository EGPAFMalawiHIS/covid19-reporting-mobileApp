//declare var require: any
declare var require: any;
import { Component, OnInit} from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from "highcharts";
require('highcharts/highcharts-more')(Highcharts);


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

Highcharts = Highcharts; 

chartOptions = {

    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    
    title: {
        text: 'Number of Tested Samples per facility '
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<h3>{point.name}</h3> <br> <b>Tested Samples:</b>{point.value} <br> <b>Positive Samples:</b>{point.positive}<br> <b>Negative Samples:</b>{point.negative}<br> <b>Returned Samples:</b>{point.returned}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '100%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries:false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled:true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name: 'Southern Zone',
        data: [{
            name: 'Queens Elizabeth Central',
            value: 767,
            positive: 4,
            negative: 760,
            returned: 3
        }, {
            name: 'Zingwangwa Clinic',
            value: 20,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Limbe Clinic",
            value: 97,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Mwaiwathu",
            value: 111,
            positive: 0,
            negative: 0,
            returned: 0
        }]
    }, {
        name: 'Central Zone',
        data: [{
            name: "KCH",
            value: 8,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Bwaila",
            value: 9,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Area 18",
            value: 13,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Daeyang Hospital",
            value: 392,
            positive: 0,
            negative: 0,
            returned: 0
        }]
    }, {
        name: 'Northern Zone',
        data: [{
            name: "Mzimba",
            value: 7,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Mzuzu Hospital",
            value: 5334,
            positive: 0,
            negative: 0,
            returned: 0
        }]
    }, {
        name: 'South East Zone',
        data: [
        {
            name: "Mangochi",
            value: 501,
            positive: 0,
            negative: 0,
            returned: 0
            
        }, {
            name: "Machinga",
            value: 199,
            positive: 0,
            negative: 0,
            returned: 0
        }]
    }]

  };

  constructor() {}

  ngOnInit() {
  	this.plotSimpleBarChart();
  }

  plotSimpleBarChart() {
  	/*let myChart = new Chart( {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Number of Tested Samples per facility '
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<h3>{point.name}</h3> <br> <b>Tested Samples:</b>{point.value} <br> <b>Positive Samples:</b>{point.positive}<br> <b>Negative Samples:</b>{point.negative}<br> <b>Returned Samples:</b>{point.returned}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '100%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries:false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled:true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name: 'Southern Zone',
        data: [{
            name: 'Queens Elizabeth Central',
            value: 767,
            positive: 4,
            negative: 760,
            returned: 3
        }, {
            name: 'Zingwangwa Clinic',
            value: 20,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Limbe Clinic",
            value: 97,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Mwaiwathu",
            value: 111,
            positive: 0,
            negative: 0,
            returned: 0
        }]
    }, {
        name: 'Central Zone',
        data: [{
            name: "KCH",
            value: 8,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Bwaila",
            value: 9,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Area 18",
            value: 13,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Daeyang Hospital",
            value: 392,
            positive: 0,
            negative: 0,
            returned: 0
        }]
    }, {
        name: 'Northern Zone',
        data: [{
            name: "Mzimba",
            value: 7,
            positive: 0,
            negative: 0,
            returned: 0
        },
        {
            name: "Mzuzu Hospital",
            value: 5334,
            positive: 0,
            negative: 0,
            returned: 0
        }]
    }, {
        name: 'South East Zone',
        data: [
        {
            name: "Mangochi",
            value: 501,
            positive: 0,
            negative: 0,
            returned: 0
            
        }, {
            name: "Machinga",
            value: 199,
            positive: 0,
            negative: 0,
            returned: 0
        }]
    }]
});*/
  }


}
