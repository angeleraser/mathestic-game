const
  button_key= document.querySelectorAll('.button-key'),
  button= document.querySelectorAll('.button'),
  input= document.getElementById('input'),
  enter= document.getElementById('enter'),
  erase_button= document.getElementById('erase'),
  container= document.getElementById('container'),
  main_screen_buttons= document.querySelectorAll('.main-screen'),
  game_screen= document.querySelectorAll('.game-screen'),
  answers= [2,50,28,12,20,13,324,10,26,13260],
  levels= document.getElementsByClassName('level'),
  social= document.getElementById('social'),
  back= document.getElementById('backnote'),
  hints= document.querySelectorAll('.hint_img'),
  hint_button= document.getElementById('hint'),
  idea_icon=document.getElementById('icon'),
  keys= document.querySelectorAll('.key'),
  sounds=document.getElementsByClassName('sounds'),
  keyboard=document.getElementById('keyboard'),
  about=document.getElementById('about'),
  win_sound=document.getElementById('win-sound'),
  level_counter=document.getElementById('level-counter');
// para los clicks
button_key.forEach(key=>{
  key.addEventListener('click',()=>{
    input.value=`${input.value}${key.innerHTML}`;
  });
});
// indice que sincroniza nivel y pistas 
let index=0;
// click en enter 
enter.addEventListener('click',()=>{
  if(input.value==answers[index]){
    index++;
    levels[index].style.display='block';
    hints[index-1].style.transform='translateX(0%)';
    input.value="";
    sound(sounds[2]);
  }
  else{
    input.value="";
    sound(sounds[1]);
    container.classList.add('error');
    setTimeout(()=>{
      container.classList.remove('error');
    },300)
  }
 for (let index2 = 0; index2 < levels.length; index2++) {
  if(index2==answers.indexOf(answers[index])){
    continue;
  }
  levels[index2].style.display='none';
 };
 if(index==10){
   levels[index].style.display='block';
   keyboard.style.display='none';
   sound(sounds[5]);
   level_counter.style.display='none';
   container.classList.add('error')
   setTimeout(()=>{
    container.classList.remove('error');
  },7000)
  }
 if(innerWidth<=1024){
  back.style.display='inline-block'
  hints[index-1].style.transform='scale(.0001)'
}
else{
  hints[index].style.transform == 'translateX(100%)' ?  idea_icon.src='./icons/idea2.png' : idea_icon.src='./icons/idea.png';
}
level_counter.innerHTML=`Level ${index + 1}`
});
// hint button 
hint_button.addEventListener('click',()=>{
  if(innerWidth<=1024){  
    hints[index].style.transform = hints[index].style.transform == 
                                                                  'scale(1)'?
                                                                  'scale(.001)':
                                                                  'scale(1)';
    hints[index].style.zIndex='10';
    hints[index].style.transform == 'scale(1)' ?  idea_icon.src='./icons/idea2.png' : idea_icon.src='./icons/idea.png';
  }
  else{
    hints[index].style.transform = hints[index].style.transform == 
                                                                'translateX(100%)'?
                                                                'translateX(0%)':
                                                                'translateX(100%)';
   hints[index].style.transform == 'translateX(100%)' ?  idea_icon.src='./icons/idea2.png' : idea_icon.src='./icons/idea.png';                                                            
  }
  sound(sounds[3]);
});
// borrar
erase_button.addEventListener('click', ()=>{
  input.value="";
})
// botones de la pantalla principal 
for (let index = 0; index < main_screen_buttons.length; index++) {
  // boton play
  if(index==1){
    main_screen_buttons[index].addEventListener('click',()=>{
      sound(sounds[4]);
      main_screen_buttons.forEach((btn=>{
        btn.classList.add('hidden');
        input.value="";
      }));
      game_screen.forEach((elmnt=>{
        elmnt.classList.remove('hidden');
      }));
      back.style.display='inline-block';
    })
  }
  // boton follow 
  if(index==2){
    main_screen_buttons[index].addEventListener('click',()=>{
      sound(sounds[4]);
      social.classList.remove('hidden');
      main_screen_buttons.forEach((btn=>{
        btn.classList.add('hidden');
      }));
      back.style.display='block'
    });                                                         
  };
  if(index==3){
    main_screen_buttons[index].addEventListener('click',()=>{
      about.classList.remove('hidden')
      sound(sounds[4]);
      main_screen_buttons.forEach((btn=>{
        btn.classList.add('hidden');
      }));
      back.style.display='block';
    });
  }
};
// boton de regresar 
back.addEventListener('click',()=>{
  sound(sounds[0]);
  back.style.display='none';
  game_screen.forEach((elmnt=>{
    elmnt.classList.add('hidden');
  main_screen_buttons.forEach((btn=>{
    btn.classList.remove('hidden');
    }))
  }));
  social.classList.add('hidden');
  about.classList.add('hidden');
  hints[index].style.transform == 'translateX(100%)' ?  idea_icon.src='./icons/idea2.png' : idea_icon.src='./icons/idea.png';                                                            
});
// sonido 
function sound(sd){
  sd.currentTime=0;
  sd.play();
};