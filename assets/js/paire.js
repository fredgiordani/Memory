

"use strict";

$(document).ready(function()
{
    
    //DEFINITION DE VARIABLE

    // table with super-heroes names
    
    var characters = ['aquaman','batman','captainman','deadpool','durotan','ironman','mario','optimus','palpatine','superman'
    ];


    var double=[];
    var score = 0;
    var number_of_pair = characters.length;

    // variable for display

    var answer = '<div class="attempts"><input type="text" id="painter" placeholder="nom du peintre"></input></div><div class="attempts"><input id="painting" type="text" id="tableau" placeholder="nom du tableau"></input></div><div><button type="" id="answer">confirmer</button></div>';
    var info = '<h1>USER</h1><h2 style="color:green">C\'est votre tour</h2><h3>Score: '+score+'</h3>';

    const two_cards = '<h1 style="color:green;">Vous avez une paire</h1>';

    const not_two_cards = '<h1 style="color:red;">Vous n\'avez pas de paire</h1>';

    const game_over = '<h1 style="color:red;">Fin de partie</h1>';
    


    //BOUCLE POUR IMPLEMENTER LES IMAGES
    
    for (let i = 0; i < characters.length; i++){
        const character = characters[i];

        if(i < characters.length/2){
            $('.content_1').append('<div class="box box1" name="' + character + '"><img src="assets/images/original/'+ character +'.jpg" alt="..." class="img-thumbnail picture"><img src="assets/images/hide/riddler.jpg" class="img-thumbnail riddler"></div>');

            $('.content_3').append('<div class="box box1" name="' + character + '"><img src="assets/images/original/'+ character +'.jpg" alt="..." class="img-thumbnail picture"><img src="assets/images/hide/riddler.jpg" class="img-thumbnail riddler"></div>');
            
        }

        if(i>=characters.length/2 && i<characters.length){

            $('.content_2').append('<div class="box box1" name="'+character+'"><img src="assets/images/original/'+character+'.jpg" alt="..." class="img-thumbnail picture"><img src="assets/images/hide/riddler.jpg" class="img-thumbnail riddler"></div>');

            $('.content_4').append('<div class="box box1" name="'+character+'"><img src="assets/images/original/'+character+'.jpg" alt="..." class="img-thumbnail picture"><img src="assets/images/hide/riddler.jpg" class="img-thumbnail riddler"></div>');
            

        }
        
    }

    //display info player
    
    $('.info_player_1').html(info);

    // this function check if you find two of a kind cards and handle proposition of the player
    // the function handle what to do if the player's answer is right or wrong
    
    function proposition(double){
        
        if( double.length===2 && double[0]===double[1]){
            $('.comment').append('<div class="attempts"><input type="text" id="painter" placeholder="nom du peintre"></input></div><div class="attempts"><input id="painting" type="text" id="tableau" placeholder="nom du tableau"></input></div><div><button type="" id="answer">confirmer</button></div>')
        
        
        
    
        $('#answer').on('click',function(){
             if($('#painter').val()=== "Theodore Gericault" && $('#painting').val()=== "Le radeau de la meduse"){
                $('.comment').empty(answer)

                $('.comment').append('<h1 style="color:green" >VICTOIRE</h1>')
                
                

             }else{
                
                  $('.comment').empty(answer)

                  $('.comment').append('<h1 style="color:red" >MAUVAISE REPONSE</h1>')
                  
                  double.splice(0,2)
                }  
            })
        } 
        
        if(double.length===2 && double[0] !== double[1]){
            $('.attempts').hide();    
        }
        
        if(double.length === 1){
            $('.attempts').hide();     
        }
        
    }
    
    //function to know if we have two of a kind

    function two_of_a_kind(double)
    {   
        // if the length of double is less than 2 the function return by default undefined
        if(double.length!==2) return;
        
        // We know here that double.length===2
        // so we can check if the first element of the array double is the same than the second
        if(double[0] === double[1])
        {   
            // name has the value of the first element of the array double
            var name =double[0];
            // decrementation of number_of_pair and incrementation of score
            number_of_pair -=1;
            score += 1;
            // we target the div containing the attribute name with the value of the first element of the array double
            // $( "div[name|="+name+"]" ).find('.riddler').attr({src:''});
            $( "div[name|="+name+"]" ).find('.riddler').css({zIndex:'-1'});
            $( "div[name|="+name+"]" ).find('.picture').css({zIndex:'-2'});
            
            
            info='<h1>JOUEUR 1</h1><h2 style="color:green">C\'est votre tour</h2><h3>Score: '+score+'</h3>';
            
            $('.info_player_1').html(info);
            $('.comment').html(two_cards);

            if(number_of_pair===0)
            {
                $('.comment').empty(answer);
                $('.comment').html(game_over);
                double.splice(0,2);
            }

        }else{
            if(number_of_pair >= 0)
            {
            $('.comment').html(not_two_cards);
            }
        }  
    }

    // this function return true if you can click and false if you can't

    function click_authorized(double){
        if( double.length===2 && double[0]===double[1] ){
            return false;
        }

        if( double.length===2 && double[0]!==double[1] ){
            
            double.splice(0, 2);
            return true;
        }

        if(double.length===1){
            return true;
        }

        if(double.length===0 ){
            return true;
        }
            

        
        
    }
    
    	
           
    $('.box').on('click',function(){
     if(click_authorized(double)){
    $(this).find('.riddler').slideUp(1000);
    $(this).find('.riddler').slideDown(1000);
            
    double.push($(this).attr('name'));
                
    if(number_of_pair >0){
        two_of_a_kind(double);
        proposition(double);
                
    }else if(number_of_pair === 0){
        $('.comment').html(game_over);
        $('.comment').empty(answer);
    } }
    })
       
            
    if(double.length===2){
    double.splice(0,2)}
})