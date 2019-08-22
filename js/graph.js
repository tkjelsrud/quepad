function renderGraph(data) {
  /*arr = new Array();

  for(i = 0; i < lastColumn().out.length; i++) {
    t = lastColumn().out[i];
    start = 999;
    end = 0;
    for(c in t.colDone) {
      if(t.colDone[c] < start)
        start = t.colDone[c];
      if(t.colDone[c] > end)
        end = t.colDone[c];
    }
    arr.push(end - start);
  }
  arr.sort(sortNumber);

  data = new Array();
  min = arr[0];
  max = arr[arr.length - 1];
  div = Math.floor((max - min) / 10.0);

  for(i = 0; i < 10; i++) {
      mi = min + (div * i);
      ma = min + (div * i) + div;
      cn = 0;
      for(j = 0; j < arr.length; j++) {
        if(arr[j] >= mi && arr[j] <= ma)
          cn += 1;
      }
      data.push({x: mi, y: cn});
   }*/

   //data = new Array({x: 10, y: 5}, {x: 15, y: 65});


   //graphSetColor = ["#FE938C" ,"#9CAFB7", "#D6DBB2", "#E24E1B", "#DB995A",  "#A5CBC3", "#ff6666", "#85CB33"];

   var ctx = document.getElementById("graphcanvas").getContext('2d');
   if(xgraph) {
    xgraph.clear();
    }
   xgraph = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: data,
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom'
              }],
              yAxes: [{
    						/*stacked: true,*/
    						scaleLabel: {
  							display: true,
  							labelString: 'Acc inventory'
    						}
    					}]
          }
      }
  });

    // Update graphed
    //graph.data.datasets.push({label: simu.desc, data: data, backgroundColor: graphSetColor.pop()});
    //graph.data.datasets.push({label: "In progress (" + simu.desc + ")", data: result.dayInProgress, backgroundColor: "#CCCCCC", radius: 1});
    //graph.update();
    //}

    //for(i = 0; i < group.length; i++) {
    //  $('#graph').append('<div class="bar" style="left:' + (i * 4) + 'px;height:' + (group[i] * 2) + 'px" />');
    //}
}

function sortNumber(a,b) {
  return a - b;
}
