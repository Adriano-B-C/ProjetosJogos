// Definição dos elementos
const passaro = document.querySelector('.passaro')
const celling = document.querySelector('.celling')
const ground = document.querySelector('.ground')
const area = document.querySelector('.area')
const espinhoDown = document.querySelector('.espinhoDown')
const espinhoUp = document.querySelector('.espinhoUp')
const colisaoUpX = document.querySelector('.colisaoUpX')
const colisaoUpY = document.querySelector('.colisaoUpY')
const colisaoDownX = document.querySelector('.colisaoDownX')
const colisaoDownY = document.querySelector('.colisaoDownY')
let placar = document.querySelector('.pontos')
placar.innerHTML = 0

// Função para registrar valor de um estilo de posição (em pixels)
const getPos = (elem, pos, unit) =>
  parseFloat(window.getComputedStyle(elem).getPropertyValue(pos).split(unit)[0])

// Variavel que define posição do jogador
let upDown = true

// Função que define principal função de pulo
function pular() {
  // Definição de posições dos elementos
  const getTerrainHeight = getPos(celling, 'height', 'px')
  const getAreaHeight = getPos(area, 'height', 'px')
  const getPlayerheight = getPos(passaro, 'height', 'px')
  // Valor passado para deixar jogador uniformizado
  passaro.style.width = `${getPlayerheight}px`

  // Retorne e define a posiçao 'Y'
  const getY = () => getPos(passaro, 'top', 'px')
  const setY = y => (passaro.style.top = `${y}px`)

  // Altera a orientação do jogador
  window.onkeydown = e => {
    upDown ? (upDown = false) : (upDown = true)
  }
  // Padroniza a gravidade para o 'resize'
  let gravidade = getAreaHeight / 35

  // Posição Y no próximo Frame
  let YNewFrame = getY() + (upDown ? -gravidade : gravidade)

  // definição para casos de posição extrema (chão, teto e ar)
  if (YNewFrame <= getTerrainHeight) {
    setY((YNewFrame = getTerrainHeight))
  } else if (
    YNewFrame >=
    getAreaHeight - getTerrainHeight - (getPlayerheight + 10)
  ) {
    setY(
      (YNewFrame = getAreaHeight - getTerrainHeight - (getPlayerheight + 10))
    )
  } else setY(YNewFrame)
}

function animarNivel() {
  let velocidade = 7

  const areaWidth = getPos(area, 'width', 'px')
  const getXDown = () => getPos(espinhoDown, 'left', 'px')
  const getXUp = () => getPos(espinhoUp, 'left', 'px')

  const setXDown = X => (espinhoDown.style.left = `${X}px`)
  const setXUp = X => (espinhoUp.style.left = `${X}px`)

  let DownXNewFrame = getXDown() - velocidade
  let UpXNewFrame = getXUp() - velocidade

  if (DownXNewFrame <= -50) {
    setXDown(areaWidth)
  } else setXDown(DownXNewFrame)

  if (UpXNewFrame <= -50) {
    setXUp(areaWidth)
  } else setXUp(UpXNewFrame)
}

function pontos() {
  return (contagem = setInterval(() => {
    placar.innerHTML++
  }, 500))
}

function colisao() {
  let colisores = [colisaoUpX, colisaoUpY, colisaoDownX, colisaoDownY]
  let objPlayer = passaro.getBoundingClientRect()
  function sobrepoem() {
    let ocorreu = false
    colisores.forEach(colisor => {
      let colisaoColisor = colisor.getBoundingClientRect()
      if (ocorreu == false) {
        ocorreu = !(
          objPlayer.right < colisaoColisor.left ||
          objPlayer.left > colisaoColisor.right ||
          objPlayer.bottom < colisaoColisor.top ||
          objPlayer.top > colisaoColisor.bottom
        )
      }
    })
    return ocorreu
  }
  ocorreu = sobrepoem()
  console.log(ocorreu)
  if (ocorreu) {
    passaro.style.backgroundColor = 'red'
    clearInterval(jogo)
    clearInterval(contagem)
  }
}

// Loop de execução principal do jogo
const jogo = setInterval(() => {
  pular()
  animarNivel()
  colisao()
}, 25)
pontos()
