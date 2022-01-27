const types = ["SLASHING", "ICE", "FIRE", "FORCE", "ACID", "BLUDGEONING", "LIGHTNING", "NECROTIC", "PIERCING", "POISON", "PYSCHIC", "RADIANZE"]
const dice = [4, 6, 8, 10, 12, 20, Number.MAX_VALUE]

var kit;
var WandS = [];


function addFields(){
  // Number of inputs to create
  var roll = document.getElementById("roll").value;
  var extra = document.getElementById("extra").value;
  // Container <div> where dynamic content will be placed
  var container = document.getElementById("container");
  // Clear previous contents of the container
  while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
  }

  container.appendChild(document.createElement("br"));

  container.appendChild(document.createTextNode("Weapon/Spell Name:"));
    var name = document.createElement("input");
    name.type = "text";
    name.id = "name"
    container.appendChild(name);

  container.appendChild(document.createElement("br"));
  container.appendChild(document.createElement("br"));

  container.appendChild(document.createTextNode("Rolls:"));
  container.appendChild(document.createElement("br"));

  for (i=0;i<roll;i++){
      // Append a node with a random text
      container.appendChild(document.createTextNode("Roll " + (i+1)));
      // Create an <input> element, set its type and name attributes
      var input = document.createElement("select")
      dice.forEach(function (d) {
          var opt = document.createElement('option');
          opt.value = d;
          opt.innerHTML = d;
          input.appendChild(opt);
      })
      input.id = "r" + i
      container.appendChild(input)
      var type = document.createElement("select")
      types.forEach(function (t) {
          var opt = document.createElement('option');
          opt.value = t;
          opt.innerHTML = t;
          type.appendChild(opt);
      })
      type.id = "rt" + i
      container.appendChild(type)

      // Append a line break 
      container.appendChild(document.createElement("br"));
  }

  container.appendChild(document.createTextNode("Extras:"));
  container.appendChild(document.createElement("br"));

  for (i=0;i<extra;i++){
    // Append a node with a random text
    container.appendChild(document.createTextNode("Extra " + (i+1)));
    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "number";
    input.id = "e" + i
    container.appendChild(input);
    var type = document.createElement("select")
    types.forEach(function (t) {
        var opt = document.createElement('option');
        opt.value = t;
        opt.innerHTML = t;
        type.appendChild(opt);
    })
    type.id = "et" + i
    container.appendChild(type)
    // Append a line break 
    container.appendChild(document.createElement("br"));
  }
}

function order() {
  var rollA = document.getElementById("roll").value;
  var extraA = document.getElementById("extra").value;
  var stage = document.getElementById("stage");

  var roll = [];
  var extra = [];
  var name = document.getElementById("name").value;

  for (let i = 0; i < rollA; i++) {
    var r = document.getElementById('r' + i).value;
    var rt = document.getElementById('rt' + i).value;
    roll.push([r, rt])
  }

  for (let x = 0; x < extraA; x++) {
    var e = document.getElementById('e' + x).value;
    var et = document.getElementById('et' + x).value;
    extra.push([e, et])
  }
  var WorS = {
    "name": name,
    "Roll": roll,
    "Extra": extra
  }
  WandS.push(WorS)
  while (stage.hasChildNodes()) {
    stage.removeChild(stage.lastChild);
  }
  friendly()
}

async function addkit() {
  var Nkit = document.getElementById('Nkit').value;

  kit = {
    "Kitname": Nkit,
    "WeaponsAndSpells": WandS
  }
  await fetch('/api/kit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({kit})
    })
    console.log(JSON.stringify(kit))
    window.location.replace('/cal')
}

function friendly() {
  for (let x = 0; x < WandS.length; x++) {
      createElement(false, 'p', 'Weapon Name: ' + WandS[x].name, function (s) {
        s.color = 'rgb(116, 9, 235)'
      })
      for (let i = 0; i < WandS[x].Roll.length; i++) {
        createElement(false, 'p', '1d' + WandS[x].Roll[i][0] + ' ' + WandS[x].Roll[i][1] + ' damage')
      }

      for (let i = 0; i < WandS[x].Extra.length; i++) {
        createElement(false, 'p',WandS[x].Extra[i][0] +  ' ' +  WandS[x].Extra[i][1] + ' Extra damage')
      }
    }
    createElement(true)
  }


function createElement(br, type, content, style) {
  if (br) {
    document.createElement('br');
  } else {
    var item = document.createElement(type);
    item.innerHTML = content;
    stage.appendChild(item)
    var s = item.style
    if (typeof style === 'function') {
      style(s);
    }
  }
}

console.log(WandS)