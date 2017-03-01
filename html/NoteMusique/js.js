$(document).ready(function(){
    var $nbr_tour = 0;
    var $speed = 9000; // Durée de l'animation (en ms)
    var sauver = document.querySelector('#sauver');
    var depart = document.querySelector('#depart');
    $('#lancement').on('click', function(){

      $('html').css('cursor', 'crosshair');
      $ls_meteor_touche = 0;
      depart.loop();
      $('#explosion').hide()
      $('#explosion').removeClass('position0');
      $('#explosion').removeClass('position1');
      $('#explosion').removeClass('position2');
      $('#explosion').removeClass('position3');
      $('#explosion').removeClass('position4');
      $('#explosion').removeClass('position5');
      $('#explosion').removeClass('position6');
      $('#explosion').removeClass('position7');
      $('#explosion').removeClass('position8');
      $('#explosion').removeClass('position9');

      $('#echec').empty();
      var $nbr_tour = 0;
      var $speed = 9000;
      $(this).attr('disabled', 'disabled');
      intervalnote = setInterval(function(){
        if($speed>7000)
        {
          $speed = $speed - 100;
        }
        if($nbr_tour>50)
        {
          $speed = $speed - 100;
        }
        $nbr_tour ++;
        $ls_position_nombre = Math.floor(Math.random()*10);
        $ls_position_note = "position"+$ls_position_nombre;
        $ls_note = '<div data-position ="'+$ls_position_nombre+'" id="note'+$nbr_tour+'" class="note '+$ls_position_note+'"></div>';
        $('#bodyJeu').append($ls_note);
        $('#note'+$nbr_tour).animate({bottom:'0px'}, $speed, function(){
          clearInterval(intervalnote);
          $('#echec').html("La terre a été détruite! Mais vous avez touché "+$ls_meteor_touche+" météorites");
          $('.note').stop();
          $('.note').hide();
          $('#lancement').removeAttr('disabled');
          $('#bodyJeu').empty();
          $ls_left_explosion = (($(this).data('position')-1.8)*100);
          $ls_left_explosion = $ls_left_explosion+"px";
          $('#explosion').css('left', $ls_left_explosion);
          $('#explosion').show();
          var player = document.querySelector('#audioPlayer');
          player.play();
          $('html').css('cursor', 'crosshair');
        });
        $('#note'+$nbr_tour).on('click',function(){
          $(this).stop();
          $(this).hide();
          sauver.play();
          $ls_meteor_touche++;
        });

        if($speed <= 7000)
        {
          $nbr_tour ++;
          $ls_position_nombre2 = Math.floor(Math.random()*10);
          while($ls_position_nombre2 == $ls_position_nombre)
          {
            $ls_position_nombre2 = Math.floor(Math.random()*10);
          }
          $ls_position_note2 = "position"+$ls_position_nombre2;
          $ls_note = '<div data-position ="'+$ls_position_nombre2+'" id="note'+$nbr_tour+'" class="note '+$ls_position_note2+'"></div>';
          $('#bodyJeu').append($ls_note);
          $('#note'+$nbr_tour).animate({bottom:'0px'}, $speed, function(){
            clearInterval(intervalnote);
            $('#echec').html("La terre a été détruite! Mais vous avez touché "+$ls_meteor_touche+" météorites");
            $('.note').stop();
            $('.note').hide();
            $('#lancement').removeAttr('disabled');
            $('#bodyJeu').empty();
            $ls_left_explosion = (($(this).data('position')-1.8)*100);
            $ls_left_explosion = $ls_left_explosion+"px";
            $('#explosion').css('left', $ls_left_explosion);
            $('#explosion').show();
            var player = document.querySelector('#audioPlayer');
            player.play();
            $('html').css('cursor', 'default');
          });
          $('#note'+$nbr_tour).on('click',function(){
            $(this).stop();
            $(this).hide();
            sauver.play();
            $ls_meteor_touche++;
          });
        }
      },1000);
    });













});
