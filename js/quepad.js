function getLeadtime(pList) {
  //console.log(pList);
  return Math.floor((pList.LD[0] + pList.LD[1]) / 2.0);
}

function getWip(pList, inv) {
  return (pList.WIP == 0 ? inv : pList.WIP);
}

function getInn(pList) {
  return pList.INV.IN;
}

function multInventory(pList) {
  return pList.SPLIT[1] / pList.SPLIT[0];
}

function getColumnTitle(idx) {
  return document.getElementsByClassName("column")[idx].children[0].innerText;
}

function parseText(el, alt) {
  // Parse process notes for keywords and metadata
  props = {'TITLE': '', 'LD': [0,0], 'SPLIT': [1,1], 'CAP': 1, 'INV': {'IN': 0, 'OUT': 0}, 'WIP': 0};
  lines = el.innerText.split("\n");
  props.TITLE = lines[0].trim();

  for(j = 0; j < lines.length; j++) {
    line = lines[j];
    words = line.split(" ");

    switch (words[0].toUpperCase()) {
      case 'INN':
        // Set the inventory (for now as a static number - should only be used for first column)
        p = line.match(/([0-9]+)/i);
        if(p) {
          props.INV.IN = parseInt(p[1]);
        }
        break;
      case 'WIP':
          // Set the inventory (for now as a static number - should only be used for first column)
          p = line.match(/([0-9]+)/i);
          if(p) {
            props.WIP = parseInt(p[1]);
          }
          break;
      case 'LD':
      case 'LEADTIME':
        p = line.match(/([0-9]+)-([0-9]+)/i);
        if(p) {
          //console.log(line);
          props.LD = [parseInt(p[1]), parseInt(p[2])];
        }
        else {
          p = line.match(/([0-9]+)/i);
          if(p) {
            props.LD = [parseInt(p[1]), parseInt(p[1])];
          }
        }
        break;

      case 'SPLIT':
        p = line.match(/([0-9]+)\s?:\s?([0-9]+)/i);
        if(p)
          props.SPLIT = [parseInt(p[1]), parseInt(p[2])];
        else {
          p = line.match(/([0-9]+)/i);
          if(p)
            props.SPLIT = [1, parseInt(p[1])];
        }
        break;

      case 'TASKS':
        p = line.match(/([0-9]+)/i);
        if(p)
          props.SPLIT = [1, parseInt(p[1])];
        break;

      case 'JOIN':
        props.SPLIT = [999, 1];
        break;

      case 'CAP':
      case 'TEAM':
      case 'CAPACITY':
        p = line.match(/([0-9]+)/i);
        if(p)
          props.CAP = parseInt(p[1]);
        break;
      case 'ALT':
      case 'ALTERNATIVE':
        if(!alt)
          return props;

        break;
    }
  }
  return props;
}

function summarize(propList) {
  props = {'LD': [0,0], 'TASKS': 1, 'MTASKS': 1};

  for(j = 0; j < propList.length; j++) {
    pr = propList[j];

    props.TASKS = Math.floor(props.TASKS * (pr.SPLIT[1] / pr.SPLIT[0]));
    if(props.TASKS < 1)
      props.TASKS = 1

    props.MTASKS = Math.max(props.TASKS, props.MTASKS);

    // Lead time pr task?
    if(pr.CAP > props.TASKS) {
      props.LD[0] += (pr.LD[0]);
      props.LD[1] += (pr.LD[1]);
    }
    else {
      props.LD[0] += (pr.LD[0] * (props.TASKS / pr.CAP));
      props.LD[1] += (pr.LD[1] * (props.TASKS / pr.CAP));
    }

    // Perform a caculation based on LD * CAP * flow

  }
  return props;
}

function loadFromLocal(sid) {
  //
}

function storeToLocal(sid) {
  //
}
