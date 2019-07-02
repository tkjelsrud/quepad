
function parseText(el, alt) {
  // Parse process notes for keywords and metadata
  props = {'TITLE': '', 'LD': [0,0], 'SPLIT': [1,1], 'CAP': 1};
  lines = el.innerText.split("\n");
  props.TITLE = lines[0].trim();

  for(j = 0; j < lines.length; j++) {
    line = lines[j];
    words = line.split(" ");

    switch (words[0].toUpperCase()) {
      case 'LD':
      case 'LEADTIME':
        p = line.match(/([0-9]+).*?([0-9]+)/i);
        if(p) {
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
  props = {'LD': [0,0], 'TASKS': 1};

  for(j = 0; j < propList.length; j++) {
    pr = propList[j];

    props.TASKS = props.TASKS * pr.SPLIT[1] / pr.SPLIT[0];

    // Lead time pr task?

    props.LD[0] += (pr.LD[0] * (props.TASKS / pr.CAP));
    props.LD[1] += (pr.LD[1] * (props.TASKS / pr.CAP));

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
