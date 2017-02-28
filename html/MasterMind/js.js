$(document).ready(function(){
  // Declaration des variable
  var $li_nbr_essai = 0;
  var $solution = new Array();
  $solution['toute'] = new Array();
  var $mindEnCours = 0;
  // Deactivation du bouton test si pas de combinaison de générer
  $('#tester').attr('disabled','disabled');

  // Création de la première combinaison
  $solution['toute'] = [];
  var $i = 0;
  for($i = 0; $i<4; $i++)
  {
    $solution[$i] = Math.floor(Math.random()*8);
    while($.inArray($solution[$i],$solution['toute']) !== -1)
    {
      $solution[$i] = Math.floor(Math.random()*8);
    }
    $solution['toute'].push($solution[$i]);

  }
  $li_nbr_essai = 0;
  $('#ancienEssai').empty();
  $('#tester').removeAttr('disabled');

  // Génération d'une nouvelle combinaison au click sur le bouton generateur
  $('#generateur').on('click', function(){

    $solution['toute'] = [];
    var $i = 0;
  	for($i = 0; $i<4; $i++)
  	{
      $solution[$i] = Math.floor(Math.random()*8);
      // Verification que le nombre générer n'a pas été choisis.
      while($.inArray($solution[$i],$solution['toute']) !== -1)
      {
        $solution[$i] = Math.floor(Math.random()*8);
      }
      $solution['toute'].push($solution[$i]);
  	}
  	$li_nbr_essai = 0;
  	$('#ancienEssai').empty();
    $('#tester').removeAttr('disabled');
    alert("Un nouveau code a été générer. A vous de le trouver.");
  });

  // Lance la vérification de la combinaison
  $('#tester').on('click', function(){
    // Test que les choix soit différent (à amélioré)
    $mind0 = $('#mind0').data('couleur');
    $mind1 = $('#mind1').data('couleur');
    $mind2 = $('#mind2').data('couleur');
    $mind3 = $('#mind3').data('couleur');
    if( $mind0 == $mind1 || $mind0 == $mind2 || $mind0 == $mind3 || $mind1 == $mind2 || $mind1 == $mind3 || $mind2 == $mind3 )
    {
      alert("Veuillez choisir des couleurs différentes");
      return false;
    }

    $li_nbr_essai ++;
    $li_nbr_position_ok = 0;
    $li_nbr_couleur_ok = 0;
    $ls_ancien_essai = "<div class='essai' data-essai='"+$li_nbr_essai+"'> essai "+$li_nbr_essai+" : ";
    for($i = 0; $i<4; $i++)
    {
      $nom = '#mind'+$i;
      $li_nbr_choisi = $($nom).data('couleur');
      // Verification couleur ET position
      if($li_nbr_choisi == $solution[$i])
      {
        $li_nbr_position_ok ++;
      }
      else if($li_nbr_choisi == $solution[0] || $li_nbr_choisi == $solution[1] || $li_nbr_choisi == $solution[2] || $li_nbr_choisi == $solution[3] )
      {
        $li_nbr_couleur_ok ++;
      }
      else
      {
      }
      // Si tout est ok on informe le joueur
      if($li_nbr_position_ok == 4)
      {
        alert("Victoire! en "+$li_nbr_essai+" essai(s)");
        $(this).attr('disabled','disabled');
      }
      $ls_ancien_essai += '<div data-essai="'+$li_nbr_essai+'" data-position=1 class=" couleur couleur'+$li_nbr_choisi+'"></div>';
    }
    $ls_ancien_essai += '<div class="resultat">';
    for($i = 0; $i<$li_nbr_position_ok; $i++)
    {
      $ls_ancien_essai += '<div class="positionOk"></div>';
    }

    for($i = 0; $i<$li_nbr_couleur_ok; $i++)
    {
      $ls_ancien_essai += '<div class="couleurOk"></div>';
    }
    $ls_ancien_essai += '</div>';
    $ls_ancien_essai += '</div>';

    $('#ancienEssai').prepend($ls_ancien_essai);
  });
  // Affiche ou masque le choix de couleur
  $('.choix').on('click', function(){
    if($(this).hasClass('selected'))
    {
      $('.selected').removeClass('selected');
      $('#mindChoix').addClass('invisible');
      return false;
    }
    $('#mindChoix').removeClass('invisible');
    $mindEnCours = $(this).attr('id');
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
  });

  $('.choixcouleur').on('click', function(){
    $('#mindChoix').addClass('invisible');
    $mindEnCours = "#"+$mindEnCours;
    $($mindEnCours).removeClass("couleur0");
    $($mindEnCours).removeClass("couleur1");
    $($mindEnCours).removeClass("couleur2");
    $($mindEnCours).removeClass("couleur3");
    $($mindEnCours).removeClass("couleur4");
    $($mindEnCours).removeClass("couleur5");
    $($mindEnCours).removeClass("couleur6");
    $($mindEnCours).removeClass("couleur7");
    $('.selected').removeClass('selected');
    $($mindEnCours).addClass("couleur"+$(this).data('couleur'));
    $($mindEnCours).data('couleur', $(this).data('couleur'));

  });

});
