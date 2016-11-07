var player = document.getElementById('player')
var enemy = document.getElementById('enemy')
var cobarde = document.getElementById('cobarde')

function comprobarPantallaX(incr_x) {
  var ancho = window.innerWidth;
  if (incr_x > ancho) {
    var resta = incr_x - ancho;
    incr_x = resta;
  }
  if (incr_x < 0) {
    var resta = 0 - incr_x;
    incr_x = ancho - resta;
  }
  console.log(incr_x);
  return incr_x;
}
function comprobarPantallaY(incr_y) {
  var alto = window.innerHeight;
  if (incr_y > alto) {
    var resta = incr_y - alto;
    incr_y = resta;
  }
  if (incr_y < 0) {
    var resta = 0 - incr_y;
    incr_y = alto - resta;
  }
  console.log(incr_y);
  return incr_y;
}

function updateElement(element, incx, incy) {
  var x = Number(element.getAttribute('data-x')) + incx
  var y = Number(element.getAttribute('data-y')) + incy
  element.style.transform = 'translate('+ x +'px, '+ y +'px)'
  x = comprobarPantallaX(x);
  y = comprobarPantallaY(y);
  // Update HTML
  element.setAttribute('data-x', x)
  element.setAttribute('data-y', y)
}

window.addEventListener('keydown', function(e) {
  //console.log(e)
  if (e.keyCode == 39) // Dcha
    updateElement(player, +10, 0)
  else if (e.keyCode == 37) // Izq
    updateElement(player, -10, 0)
  else if (e.keyCode == 38) // Arriba
    updateElement(player, 0, -10)
  else if (e.keyCode == 40) // Abajo
    updateElement(player, 0, +10)
})

function algorithmEnemy() {
  var player_x = Number(player.getAttribute('data-x'))
  var player_y = Number(player.getAttribute('data-y'))

  var enemy_x = Number(enemy.getAttribute('data-x'))
  var enemy_y = Number(enemy.getAttribute('data-y'))

  var incr_x = (player_x > enemy_x ? 1 : -1)
  var incr_y = (player_y > enemy_y ? 1 : -1)

  updateElement(enemy, incr_x, incr_y)
}

function algorithmCobarde() {
  var player_x = Number(player.getAttribute('data-x'))
  var player_y = Number(player.getAttribute('data-y'))

  var cobarde_x = Number(cobarde.getAttribute('data-x'))
  var cobarde_y = Number(cobarde.getAttribute('data-y'))

  var incr_x = (player_x > cobarde_x ? -1 : 1)
  var incr_y = (player_y > cobarde_y ? -1 : 1)

  updateElement(cobarde, incr_x, incr_y)
}

function inicializar(element) {
  element.setAttribute('data-x', 0)
  element.setAttribute('data-y', 0)
  updateElement(element,
                Math.floor(Math.random() * 800),
                Math.floor(Math.random() * 300))
}

inicializar(player)
inicializar(enemy)
inicializar(cobarde)

var id = setInterval(function() { algorithmEnemy() }, 10) // Cada 0,1 segundo
var id2 = setInterval(function() { algorithmCobarde() }, 20)
