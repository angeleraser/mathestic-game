// Niveles y pista 
const levels = [...document.querySelectorAll('.level')],
      hints = [...document.querySelectorAll('.hint_img')],
      // array con todas las respuestas 
      answers = ['2','50','28','12','20','13','324','10','26','13260','820','65536','5','60','196','25','6','1515',25, '77'],
      comment = document.getElementById('comment');
 //Botones
const answer_input = document.getElementById('input'),
      enter = document.getElementById('enter'),
      hint_button = document.getElementById('hint-button'),
      hint_img = document.getElementById('icon'),
      key = [...document.querySelectorAll('.key')],
      erase_button = document.getElementById('erase-button'),
      screen_button = [...document.querySelectorAll('.screen-button')],
      back_button = document.getElementById('back-button');
// Sonidos 
const sounds = [...document.querySelectorAll('.sound')],
      menu_back_sound = sounds[0],
      section_fail_sound = sounds[1],
      section_pass = sounds[2],
      hint_sound =  sounds[3],
      menu_button_click = sounds[4],
      win_sound = sounds[5];
// Pantallas
const screens = [...document.querySelectorAll('.screen-game')],
      final_screen = document.getElementById('final-screen');
const level_counter=document.getElementById('level-counter');
// CONTENEDOR 
const container = document.getElementById('container');
      // efecto de error 
      container.shaking = ()=>{
        if(levelIndex >= LEVEL.length){
          container.classList.add('error');
          playSound(win_sound);
          setTimeout(()=>{
            container.classList.remove('error')
          },6500)
        }
        else{
        container.classList.add('error');
        playSound(section_fail_sound);
        setTimeout(()=>{
          container.classList.remove('error')
        },300)
        }
      }
// Clase para construir los niveles 
class Level {
  constructor(name,lvl,hint,ans){
    // nombre 
    this.name=`Nivel ${name+1}`;
    // imagen del nivel 
    this.level=lvl;
    // imagen de la pista 
    this.hint=hint;
    // respuesta 
    this.answer=ans;
  }
  // mostrar nivel
  show(){
    this.level.style.display='block';
    this.hint.style.display='block'
  }
  // ocultar nivel
  hidden(){
    this.level.style.display='none';
    this.hint.style.transform='translateX(0%)';
  }
  // mostrar y ocultar pista 
  showHint(){
    if (innerWidth <= 1100 ){
      this.hint.style.zIndex='30'
      this.hint.style.transform = this.hint.style.transform == 'scale(1)'? 'scale(.001)' : 'scale(1)';
    }
    else{
      this.hint.style.zIndex='-10'
      this.hint.style.transform = this.hint.style.transform == 'translateX(100%)'? 'translateX(0%)' : 'translateX(100%)';
    }
    // ENCENDER/APAGAR BOMBILLO DE PISTA 
    if(this.hint.style.transform == 'scale(1)' || this.hint.style.transform == 'translateX(100%)'){
      hint_img.src='./icons/idea2.png'
    }
    else{
      hint_img.src='./icons/idea.png'
    }
  }
  // OCULTAR PISTA CUANDO SE PASA DE NIVEL 
  hiddenHint(){
    this.hint.style.display='none';
  }
}
// Clase para las pantallas 
class Screen {
  constructor(name,scr){
    this.name=`Screen ${name + 1}`;
    this.screen= scr;
  }
  showScreen(){
    this.screen.classList.remove('hidden');
  }
  hiddenScreen(){
    this.screen.classList.add('hidden');
  }
}
class Comments {
  constructor(el,comment){
    this.box = el;
    this.comment = comment;
  }
  showComment(txt){
    if(error_counter%5 == 0){
      let c_i = Math.ceil(Math.random()*19)
    txt = this.comment[c_i];
    this.box.style.top = '0%';
    this.box.innerHTML = `${txt}`
    setTimeout(()=>{
      this.box.style.top = '-100%';
    },2300)
  }
    }
}
const COMMENTS_txt = ['¿Al menos sabes cuanto es 2 + 2?','Mi perro resolvió esto más rápido y él no tiene internet',
                   'Deberías reconsiderar cursar primaria una vez más… ','¿A poco si está difícil? ','Ríndete y aprovecha en otra cosa la poca dignidad que te queda',
                   'Vamos, tu puedes, solo debes equivocarte inifinitamente hasta encontrar la respuesta', 'Aristóteles está llorando ahora mismo …',
                   'Creo que es más  fácil que dejes de jugar…','Me gusta cuando te equivocas', 'Tu y Bad Bunny son igual de inteligentes','Creo que esa no es la respuesta, creo no más..','La vida te dió limones, ¿sabes qué hacer?','Equivocarse es poder,¿ o cómo era?','Gracias a ti las matematicas son exactas','Detente, por favor..', 'No sigas, quiérete un poco','Anda, utiliza la calculadora','¿Sabes sumar y restar?', 'Einstein se revuelca en su tumba', '¿1 + 1 es igual a?']
const SCREEN = []; //Array con todas las pantallas
const LEVEL = []; // Array con todos los niveles
const BOX_COMMENT = new Comments(comment,COMMENTS_txt)
// Funcion constructora del nivel que toma como parametros tres listas : nivel, pistas y respuestas
function createLevel(lvl,hnt,ans){
  // Nombre e imagen del nivel 
  lvl.forEach( l => {
    let lvl= new Level(levels.indexOf(l),l);
    LEVEL.push(lvl);
  });
  // Imagen de la pista 
  hnt.forEach( h => {
    LEVEL[hints.indexOf(h)].hint=h;
  })
  // respuesta 
  ans.forEach( a  => {
    LEVEL[answers.indexOf(a)].answer=a;
  })
};
createLevel(levels,hints,answers);
function createScreen(scn){
  scn.forEach( s =>{
    let screen= new Screen(screens.indexOf(s), s);
    SCREEN.push(screen);
  })
};
createScreen(screens);
// Sonidos 
function playSound(s){
  s.currentTime=0;
  s.play();
}
const main_screen = SCREEN[0],game_screen = SCREEN [1];
// AQUI EMPIEZAN LAS INTERACCIONES 
let levelIndex = 0;
let error_counter = 1;
// Click enter
enter.addEventListener('click',()=>{
  if(answer_input.value == LEVEL[levelIndex].answer){
    levelIndex++;
    // CUANDO LLEGA AL NIVEL FINAL 
    if(levelIndex >= LEVEL.length){
      // OCULTA NIVEL Y PISTA FINAL 
        LEVEL[levelIndex - 1].hidden();
        LEVEL[levelIndex - 1].hiddenHint();
        game_screen.hiddenScreen();
        final_screen.classList.remove('hidden');
        container.shaking();
        answer_input.value="";
        // SE REINICIA EL INDICE PARA JUGAR DE NUEVO 
        levelIndex=0;
        LEVEL[levelIndex].hiddenHint();
        error_counter = 0;
    }
    // SI TODAVIA NO HA LLEGADO 
    else{
    LEVEL[levelIndex].show()
    levelIndex > 0 ? LEVEL[levelIndex - 1].hidden() : LEVEL[levelIndex].show();
    answer_input.value="";
    playSound(section_pass);
    LEVEL[levelIndex - 1].hiddenHint();
    level_counter.innerHTML=`${LEVEL[levelIndex].name}`;
    }
  }
  // RESPUESTA EQUIVOCADA 
  else{
    BOX_COMMENT.showComment();
    answer_input.value="";
    answer_input.setAttribute('placeholder','ERROR!');
    setTimeout(()=>{
      answer_input.setAttribute('placeholder','RESPUESTA')
    },1000);
    container.shaking();
    error_counter++;
  }
});
// boton de pista 
hint_button.addEventListener('click', ()=>{
  LEVEL[levelIndex].showHint();
  playSound(hint_sound);
});
// boton de X para borrar 
erase_button.addEventListener('click',()=>{
  answer_input.value=``;
})
// Numeros 
key.forEach( k => {
  k.addEventListener('click',()=>{
    answer_input.value = `${answer_input.value}${k.innerHTML}`
  })
});
// Cambio entre pantallas con los botones principales 
screen_button.forEach( btn =>{
  btn.addEventListener('click', ()=>{
    main_screen.hiddenScreen();
    SCREEN[screen_button.indexOf(btn)+1].showScreen();
    back_button.style.display = back_button.style.display == 'inline-block' ? 'none' : 'inline-block';
    playSound(menu_button_click);
    level_counter.innerHTML=`${LEVEL[levelIndex].name}`;
    LEVEL[levelIndex].show();
    final_screen.classList.add('hidden');
  });
  // BACK BOTON 
  back_button.addEventListener('click',()=>{
    back_button.style.display = back_button.style.display == 'inline-block' ? 'none' : 'inline-block';
    main_screen.showScreen();
    SCREEN[screen_button.indexOf(btn)+1].hiddenScreen();
    playSound(menu_back_sound);
    final_screen.classList.add('hidden');
    answer_input.value=``;
  })
});
