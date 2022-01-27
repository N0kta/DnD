var Kits;
var list = document.getElementById('list');
var sll = document.getElementById('wep');
var categorizedtotal = [];
const m = new Map();
const ctd = new Map()

const isDOM = el => el instanceof Element

async function getKits() {
  await fetch('/api/kits').then(function(response) {
    response.text().then(function(res) { 
      Kits = JSON.parse(res);
      console.log(Kits)
      avaiablekits(Kits)
    })
  });
}
reset()
otherreset()

getKits();

async function avaiablekits(AKits) {
  var kits = AKits; 
  var KitsP = document.getElementById('KitsP');
  var select = document.createElement("select");
  select.id = 'kitselector'
  kits.forEach(function (k) {
    console.log(k.Kit)
      var opt = document.createElement('option');
      opt.value = k.Kit[0].Kitname;
      opt.innerHTML = k.Kit[0].Kitname;
      select.appendChild(opt);
  })
  KitsP.appendChild(select)
}

async function calculate() {
  var activeKit = document.getElementById('kitselector').value
  console.log(activeKit)
  for (let i = 0; i < Kits.length; i++) {
    if (Kits[i].Kit[0].Kitname == activeKit){
      var used = Kits[i].Kit[0];
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    createElement(false, 'p', used.Kitname, function (s) {
      s.color = 'rgb(116, 9, 235)'
    })
    var totaldmg = 0;
    for (let x = 0; x < used.WeaponsAndSpells.length; x++) {
      var wep = used.WeaponsAndSpells[x];
      console.log(wep)
      createElement(true)
      createElement(false, 'p', wep.name, function (s) {
        s.color = 'red';
      })
      var weptotal = 0;
      createElement(false, 'span', 'Attempted Rolls: ')
      for (let y = 0; y < wep.Roll.length; y++) {
        var rolls = wep.Roll[y][0];
        var rolltypes = wep.Roll[y][1];
        var random = Math.floor(Math.random() * rolls) + 1;
        weptotal = weptotal + random;
        m.set(rolltypes, m.get(rolltypes) + random)
        ctd.set(rolltypes, ctd.get(rolltypes) + random)
        createElement(false, 'p', random + ' ' + rolltypes + ' damage')
      }

      createElement(false, 'span', 'Extra Damage: ')
      for (let y = 0; y < wep.Extra.length; y++) {
        var extras = wep.Extra[y][0];
        var extratypes = wep.Extra[y][1];
        weptotal = weptotal + Number(extras);
        m.set(extratypes, m.get(extratypes) + Number(extras))
        ctd.set(extratypes, ctd.get(extratypes) + Number(extras))
        createElement(false, 'p', extras + ' ' + extratypes + ' damage')
      }
      
      totaldmg = totaldmg + weptotal;

      createElement(false, 'p', 'Categorized Weapon Damage: ', function (s) {
        s.color = 'darkgreen'
      })
      
     var iterator = m.entries();
       m.forEach(em => {
        var now = iterator.next().value;
        if (em !== 0) {

          createElement(false, 'p', now[1] + ' ' +  now[0] + ' damage');
        }
      });
      
      createElement(false, 'p', 'Weapon Damage: ' + weptotal)
      reset()
    }
    createElement(false, 'p', 'Categorized Total Damage: ', function (s) {
      s.color = 'blue'
    })

    var ctditerator = ctd.entries();
      ctd.forEach(cd => {
        var cow = ctditerator.next().value;
        if (cd !== 0) {
          createElement(false, 'p', cow[1] + ' ' +  cow[0] + ' damage');
        }
      });

    createElement(true);
    createElement(false, 'p', 'Total Kit Damage: ' + totaldmg, function (s) {
      s.color = 'darkred'
    })
   }
  }
  otherreset()
}

function createElement(br, type, content, style) {
  if (br) {
    document.createElement('br');
  } else {
    var item = document.createElement(type);
    item.innerHTML = content;
    var s = item.style
    if (typeof style === 'function') {
      style(s);
    }
    list.appendChild(item)
  }
}

function reset() {
  m.set('SLASHING', 0)
  m.set('ICE', 0)
  m.set('FIRE', 0)
  m.set('FORCE', 0)
  m.set('BLUDGEONING', 0)
  m.set('LIGHTNING', 0)
  m.set('NECROTIC', 0)
  m.set('PIERCING', 0)
  m.set('POISON', 0)
  m.set('PYSCHIC', 0)
  m.set('RADIANZE', 0)
}

function otherreset() {
  ctd.set('SLASHING', 0)
  ctd.set('ICE', 0)
  ctd.set('FIRE', 0)
  ctd.set('FORCE', 0)
  ctd.set('BLUDGEONING', 0)
  ctd.set('LIGHTNING', 0)
  ctd.set('NECROTIC', 0)
  ctd.set('PIERCING', 0)
  ctd.set('POISON', 0)
  ctd.set('PYSCHIC', 0)
  ctd.set('RADIANZE', 0)
}