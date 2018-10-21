import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Time from "d3-time-format";
import * as d3Time2 from "d3-time";
import * as d3Collection from "d3-collection";
import * as d3Transition from "d3-transition";
/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})

export class ChartPage {
  formatDate5:any=d3Time.timeFormat("%B-%Y");
  formatDateMonth: any = d3Time.timeFormat("%B");
  formatDate6:any=d3Time.timeFormat("%A");
  formatDate7:any=d3Time.timeFormat("%B %d, %Y")
  currentDate=new Date();
    currentMonth:any=this.formatDateMonth(this.currentDate);
    currentDay:any=this.formatDate6(this.currentDate);
    currentYear:any=this.currentDate.getFullYear();
  //newdata2:any;
  width: number;
  height: number;
  chartType:String="Month";

  yearClient:any=[];
  monthClient:any=[];
  dayClient:any=[];
  overallClient:any=[];

  margin = {top: 20, right: 20, bottom: 30, left: 40};
  

    data2:any={
      totalForMonth:492.34,
     
      monthBreakup:{hair:190.24, makeup:237,nails:65.50 },
      totalForYear:123,
   
      yearBreakup:{hair:190.24, makeup:237,nails:65.50 },
      totalForDay:50,
      
      dayBreakup:{hair:190.24, makeup:237,nails:65.50} ,
      totalForOverall:150,
      overallBreakup:{hair:190.24, makeup:237,nails:65.50},
      data:[
  
        {clientName:"Morgan Tully", service:"Hair",date:"2018-03-02T00:00:00-05:00" , value: 8000},
        {clientName:"Hailey Hughes", service:"Makeup",date:"2018-03-02T00:00:00-05:00" , value: 600},
        {clientName:"Ava Covington", service:"Hair & Makeup",date:"2015-03-02T00:00:00-05:00" , value: 7000},
        {clientName:"Melanie Augaie", service:"Hair",date:"2016-03-02T00:00:00-05:00" , value: 9000},
        {clientName:"Ava Covington", service:"Hair & Makeup",date: "2018-04-03T00:00:00-05:00", value: 2000},
        {clientName:"Morgan Tully", service:"Hair",date:"2015-05-03T00:00:00-05:00", value: 7000},
        {clientName:"Ava Covington", service:"Hair & Makeup",date: "2016-06-03T00:00:00-05:00", value: 1200},
        {clientName:"Morgan Tully", service:"Hair",date: "2017-07-03T00:00:00-05:00", value: 11000},
        {clientName:"Ava Covington", service:"Hair & Makeup",date: "2018-08-03T00:00:00-05:00", value: 500},
        {clientName:"Hailey Hughes", service:"Makeup",date: "2018-09-03T00:00:00-05:00", value: 400},
        {clientName:"Morgan Tully", service:"Hair",date:"2018-03-29T11:00:00-05:00", value: 7000},
        {clientName:"Ava Covington", service:"Hair & Makeup",date:"2018-04-02T17:00:00-05:00", value: 900},
        {clientName:"Morgan Tully", service:"Hair",date:"2018-04-02T12:00:00-05:00", value: 400},
        {clientName:"Hailey Hughes", service:"Makeup",date:"2018-04-25T12:00:00-05:00", value: 100},
      ] 
    }
    
// data:any=JSON.parse(JSON.stringify(this.data2.data));
  data: any = {};
  
  formatDate:any;
  formatDate3:any;
  formatDate4:any;
  formatDateDay: any;
  datYear:any;
  datMonth:any;
  datDay:any;
  datOverall:any;
parseTime:any;
parseDate:any;
formatDate2:any;
  activity: String = "act";

  walletData: any = {
    "totalForMonth": 0,
    "totalForOverall": 0,
    "totalForYear": 0,
    "monthBreakup": {
      "body": 0,
      "hair": 0,
      "makeup": 0
    },
    "overallBreakup": {
      "body": 0,
      "hair": 0,
      "makeup": 0
    },
    "yearBreakup": {
      "body": 0,
      "hair": 0,
      "makeup": 0
    },
    "data": []
  };

  constructor(public zone: NgZone,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private utils: UtilsProvider) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.parseDate = d3Time.isoParse;
    this.formatDate3=d3Time.timeFormat("%b")
    this.formatDate=d3Time.timeFormat("%Y");
    this.formatDate2=d3Time.timeFormat("%a-%d");
    this.formatDate4=d3Time.timeFormat("%I:%M %p");
    this.formatDateDay = d3Time.timeFormat("%d");

    this.utils.walletTransactions().then((result)=>{
      if (result){
        this.walletData = result;
        let data = [];
        let wdata = JSON.parse(JSON.stringify(this.walletData.data));
        wdata.forEach((d)=>{
          d.service.forEach((o)=>{
            o.clientName = d.client_name;
            data.push(o);
          })
        });
        this.data = JSON.parse(JSON.stringify(data));
        this.monthChart();
      }
    });
  }

  ionViewDidLoad() {
   // this.monthChart();
  }
  
  changeChart(){
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    if (this.chartType=="Day") {
      this.dayChart();
    }
    else if(this.chartType == "Month"){
      this.monthChart();
    }
    else if(this.chartType == "Year"){
      this.yearChart();
    }
    else if(this.chartType == "Overall"){
      this.overallChart();
    }
  }
sortdata(dataReq){
  var sortByYear=[];
  var sortByMonth=[];
  var sortByDay=[];
  
  var promise=new Promise((resolve,reject)=>{

   let initialSort=JSON.parse(JSON.stringify(this.data));
   initialSort.sort((a,b)=><any> new Date(a.date)-<any> new Date(b.date));
    var overall= JSON.parse(JSON.stringify(this.data));
     var currentYear=new Date();
      sortByYear=[];
      sortByMonth=[];
      sortByDay=[];

   initialSort.forEach((d)=>{
   if(new Date(d.date).getFullYear() === currentYear.getFullYear()){
     sortByYear.push(d);
   }
   
   })
   
   
   sortByYear.forEach((d)=>{
     if(new Date(d.date).getMonth() === currentYear.getMonth()){
       sortByMonth.push(d);
     }
   })
  
   sortByMonth.forEach((d)=>{
     if(new Date(d.date).getDate() === currentYear.getDate()){
       sortByDay.push(d);
     }
   })
   
  
   if(dataReq=='year'){
    resolve(sortByYear);
    return;
   }
   if(dataReq=='month'){
    resolve(sortByMonth)
    return;
   }
   if(dataReq=='day'){
    resolve(sortByDay)
    
   }
   if(dataReq=='overall'){
    resolve(overall)
  
   }

  })
  return promise;
 
}
yearChart(){
  
 
  d3.select("#Chart").html("");
  
    // Parse the date / time
    let yearData:any=[];
  if(Object.keys(this.data).length > 0){
    this.sortdata('year').then((res)=>{
      yearData=res;

      this.yearClient=JSON.parse(JSON.stringify(res))
      this.yearClient.forEach((d) => {
        d.date=this.formatDate7(this.parseDate(d.date));
      });

      var x1 = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      var y1 = d3Scale.scaleLinear().range([this.height, 0]);
      var xAxis1 = d3Axis.axisBottom(x1)
        .scale(x1)
        .ticks(d3Time2.timeMonth)

      var yAxis1 = d3Axis.axisLeft(y1)
        .scale(y1)
        .ticks(10);
      var svg1 = d3.select("#Chart").append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 900 500')
        .append("g")
        .attr("transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")");


      /* this.data.forEach((d)=> {
           d.date = this.parseDate(d.date)
           d.value = +d.value;
       }) */
      yearData.forEach((d)=> {
        d.date = this.formatDate3(this.parseDate(d.date))
        d.cost = +d.cost;

      })
      var newdata1 = d3Collection.nest<any,any>()
        .key((d)=> { return d.date})
        .rollup(function(d) {
          return d3Array.sum(d, function(g) {return g.cost; });
        }).entries(yearData);




      x1.domain(newdata1.map(function(d) { return d.key; }));
      y1.domain([0, d3Array.max(newdata1, function(d:any) { return d.value; })]);

      var t1=d3Transition.transition().duration(400)
        .delay(function (d, i) { return i*50; })
      //this.x.domain(this.data.map(function(d) { return d.date; }));
      //this.y.domain([0, d3Array.max(this.data, function(d) { return d.value; })]);
      svg1.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis1)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.25em")
        .attr("dy", ".1em")
        .attr("transform", "translate(15,10)" );
      svg1.append("g")
        .attr("class", "y-axis")
        .call(yAxis1)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");
      svg1.selectAll("bar")
        .data(newdata1)
        .enter().append("rect")


        .style("fill", "#F9748F")
        .attr("x", (d) =>  x1(d.key) )

        .attr("width", x1.bandwidth()/4)
        .attr("transform","translate("+ x1.bandwidth()/2.8+",0)")
        .attr("y", this.height )
        .attr("height", 0)
        .transition(t1)
        .attr("y", (d)=>   y1(d.value) )
        .attr("height", (d)=> this.height - y1(d.value) );

    });
  }
}


dayChart(){
  d3.select("#Chart").html("");
  let dayData:any=[];
  if(Object.keys(this.data).length > 0){
    this.sortdata('day').then((res)=>{
      dayData=res;
      this.dayClient=JSON.parse(JSON.stringify(res))
      this.dayClient.forEach((d) => {
        d.date=this.formatDate7(this.parseDate(d.date));
      });
      var x2 = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      var y2 = d3Scale.scaleLinear().range([this.height, 0]);
      var xAxis2 = d3Axis.axisBottom(x2)
        .scale(x2)
        .ticks(d3Time2.timeHour)

      var yAxis2 = d3Axis.axisLeft(y2)
        .scale(y2)
        .ticks(10);
      var svg2 = d3.select("#Chart").append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 900 500')
        .append("g")
        .attr("transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")");


      /* this.data.forEach((d)=> {
           d.date = this.parseDate(d.date)
           d.value = +d.value;
       }) */
      dayData.forEach((d)=> {
        d.date = this.formatDate4(this.parseDate(d.date))
        d.cost = +d.cost;
      })
      var newdata2 = d3Collection.nest<any,any>()
        .key((d)=> { return d.date})
        .rollup(function(d) {
          return d3Array.sum(d, function(g) {return g.cost; });
        }).entries(dayData);




      x2.domain(newdata2.map(function(d) { return d.key; }));
      y2.domain([0, d3Array.max(newdata2, function(d:any) { return d.value; })]);

      var t1=d3Transition.transition().duration(400)
        .delay(function (d, i) { return i*50; })
      //this.x.domain(this.data.map(function(d) { return d.date; }));
      //this.y.domain([0, d3Array.max(this.data, function(d) { return d.value; })]);
      svg2.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis2)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.25em")
        .attr("dy", ".1em")
        .attr("transform", "translate(15,10)" );
      svg2.append("g")
        .attr("class", "y-axis")
        .call(yAxis2)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");
      svg2.selectAll("bar")
        .data(newdata2)
        .enter().append("rect")


        .style("fill", "#F9748F")
        .attr("x", (d) =>  x2(d.key) )
        .attr("width", x2.bandwidth()/4)
        .attr("transform","translate("+x2.bandwidth()/2.8+",0)")
        .attr("y", this.height )
        .attr("height", 0)
        .transition(t1)
        .attr("y", (d)=>   y2(d.value) )
        .attr("height", (d)=> this.height - y2(d.value) );

    });
  }
}

overallChart(){
 
  // Parse the date / time

  d3.select("#Chart").html("");
  let dat:any=[];
  if(Object.keys(this.data).length > 0){
    this.sortdata('overall').then((res)=>{
      dat=res;

      this.overallClient=JSON.parse(JSON.stringify(res))
      this.overallClient.forEach((d) => {
        d.date=this.formatDate7(this.parseDate(d.date));
      });
      var x3 = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      var y3 = d3Scale.scaleLinear().range([this.height, 0]);
      var xAxis3 = d3Axis.axisBottom(x3)
        .scale(x3).ticks(d3Time2.timeYear)


      var yAxis3 = d3Axis.axisLeft(y3)
        .scale(y3)
        .ticks(10);
      var svg3 = d3.select("#Chart").append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 900 500')
        .append("g")
        .attr("transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")");


      /* this.data.forEach((d)=> {
           d.date = this.parseDate(d.date)
           d.value = +d.value;
       }) */

      dat.forEach((d)=> {
        d.date = this.formatDate( this.parseDate(d.date))
        d.cost = +d.cost;


      })

      var newdata3 = d3Collection.nest<any,any>()
        .key((d)=> { return d.date})
        .rollup(function(d) {
          return d3Array.sum(d, function(g) {return g.cost; });
        }).entries(dat);
      x3.domain(newdata3.map(function(d) { return d.key; }));
      y3.domain([0, d3Array.max(newdata3, function(d:any) { return d.value; })]);

      var t1=d3Transition.transition().duration(400)
        .delay(function (d, i) { return i*50; })
      //this.x.domain(this.data.map(function(d) { return d.date; }));
      //this.y.domain([0, d3Array.max(this.data, function(d) { return d.value; })]);
      svg3.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis3)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.25em")
        .attr("dy", ".1em")
        .attr("transform", "translate(15,10)" );
      svg3.append("g")
        .attr("class", "y-axis")
        .call(yAxis3)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");
      svg3.selectAll("bar")
        .data(newdata3)
        .enter().append("rect")

        .style("fill", "#F9748F")
        .attr("x", (d) =>  x3(d.key) )
        .attr("width", x3.bandwidth()/4)
        .attr("transform","translate("+x3.bandwidth()/2.8+",0)")
        .attr("y", this.height )
        .attr("height", 0)
        .transition(t1)
        .attr("y", (d)=>   y3(d.value) )
        .attr("height", (d)=> this.height - y3(d.value) );

    });
  }
}

monthChart(){
  d3.select("#Chart").html("");
  let monthData:any=[];
  if(Object.keys(this.data).length > 0){
    this.sortdata('month').then((res)=>{
      monthData=res;
      this.monthClient=JSON.parse(JSON.stringify(res))
      // Parse the date / time
      this.monthClient.forEach((d) => {
        d.date=this.formatDate7(this.parseDate(d.date));
      });
      console.log(monthData);
      var x4 = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      var y4 = d3Scale.scaleLinear().range([this.height, 0]);
      var xAxis4 = d3Axis.axisBottom(x4)
        .scale(x4).ticks(d3Time2.timeWeek);
      var yAxis4 = d3Axis.axisLeft(y4)
        .scale(y4)
        .ticks(10);
      var svg4 = d3.select("#Chart").append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 900 500')
        .append("g")
        .attr("transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")");
      /* this.data.forEach((d)=> {
           d.date = this.parseDate(d.date)
           d.value = +d.value;
       }) */
      monthData.forEach((d)=> {
        d.date = this.formatDateDay( this.parseDate(d.date))
        d.cost = +d.cost;
      });
      var newdata4 = d3Collection.nest<any,any>()
        .key((d)=> { return d.date})
        .rollup(function(d) {
          return d3Array.sum(d, function(g) {return g.cost; });
        }).entries(monthData);
      x4.domain(newdata4.map(function(d) { return d.key; }));
      y4.domain([0, d3Array.max(newdata4, function(d:any) { return d.value; })]);

      var t1=d3Transition.transition().duration(400)
        .delay(function (d, i) { return i*50; })
      //this.x.domain(this.data.map(function(d) { return d.date; }));
      //this.y.domain([0, d3Array.max(this.data, function(d) { return d.value; })]);
      svg4.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis4)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.25em")
        .attr("dy", ".1em")
        .attr("transform", "translate(15,10)" );
      svg4.append("g")
        .attr("class", "y-axis")
        .call(yAxis4)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");
      svg4.selectAll("bar")
        .data(newdata4)
        .enter().append("rect")

        .style("fill", "#F9748F")
        .attr("x", (d) =>  x4(d.key) )
        .attr("width", x4.bandwidth()/4)
        .attr("transform","translate("+x4.bandwidth()/2.8+",0)")
        .attr("y", this.height )
        .attr("height", 0)
        .transition(t1)
        .attr("y", (d)=>   y4(d.value) )
        .attr("height", (d)=> this.height - y4(d.value) );
    });
  }
}


}
