/**
 * @file
 * A JavaScript file for the theme.
 * 
 * @author Jacek Szmit
 */
(function ($, Drupal, window, document, undefined) {

Drupal.behaviors.dwbExternalLinks = {
  attach: function(context, settings) {
    $('a', context).once('dwb-external-links').each(function () {
      if (Drupal.behaviors.dwbExternalLinks.linkIsExternal(this)) {
        $(this).attr('target', '_blank');
      }
    });
  },
  linkIsExternal: function(link_element) {
    return (link_element.host !== window.location.host);
  },
};

Drupal.behaviors.dwbWebformSubmit = {
  attach: function(context, settings) {
    $('.webform-client-form input[type="submit"]', context).once('dwb-webform-submit').each(function () {
      var classes = $(this).attr('class');
      var name = $(this).attr('name');
      var value = $(this).attr('value');

      $(this).replaceWith('<button type="submit" name="' + name + '" class="' + classes + '"><span>' + value + '</span></button>');
    });
//    $('#views-exposed-form-find-dwb-block #edit-submit-find-dwb', context).once('dwb-webform-submit').each(function () {
    $('#views-exposed-form-find-dwb-block #edit-submit-find-dwb', context).once('dwb-webform-submit').each(function () {
      var value = $(this).attr('value');
      
      $(this).closest('.views-submit-button').append('<button class="npxSearchMap"><span>' + value + '</span></button>');
      var that = this;
      $('button.npxSearchMap', context).click( function (e) {
        e.preventDefault();
        $(that).click();
      });
    });
  },
};

Drupal.behaviors.dwbTiles = {
    attach: function(context, settings) {
      $('div.view-front-page', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid();
        $(this).on('views_load_more.new_content', function(event, content) {
          $(that).data('plugin_npxGrid').processNewTiles();
        });
      });
      $('div.view-products-overview', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid({fixedItem: '.seasonal-product'});
        $(this).on('views_load_more.new_content', function(event, content) {
          $(that).data('plugin_npxGrid').processNewTiles();
        });
      });
      $('div.view-recipes-overview', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid();
        $(this).on('views_load_more.new_content', function(event, content) {
          $(that).data('plugin_npxGrid').processNewTiles();
        });
      });
      $('div.view-related-recipes', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid({forceSmall: true});
      });
      $('div.view-news-overview', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid();
        $(this).on('views_load_more.new_content', function(event, content) {
          $(that).data('plugin_npxGrid').processNewTiles();
        });
      });
      $('div.view-related-news', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid({forceSmall: true});
      });
      $('div.view-about-bread-overview', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid();
        $(this).on('views_load_more.new_content', function(event, content) {
          $(that).data('plugin_npxGrid').processNewTiles();
        });
      });
      $('div.view-taxonomy-term', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid({fixedItem: '.seasonal-product'});
        $(this).on('views_load_more.new_content', function(event, content) {
          $(that).data('plugin_npxGrid').processNewTiles();
        });
      });
      $('div.view-y-random-6-recipes', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid({forceSmall: true});
      });
      $('div.view-y-overview-to-recipes', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid({forceSmall: true});
      });
      $('div.view-about-bread-related-6-random', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid({forceSmall: true});
      });
    },
};

Drupal.behaviors.dwbAnimateTiles = {
  attach: function(context, settings) {
    $('div.view-front-page .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-front-page', context).on('views_load_more.new_content', function(event, content) {
      Drupal.attachBehaviors(document, settings);
    });
    $('div.view-products-overview .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-products-overview', context).on('views_load_more.new_content', function(event, content) {
      Drupal.attachBehaviors(document, settings);
    });
    $('div.view-recipes-overview .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-recipes-overview', context).on('views_load_more.new_content', function(event, content) {
      Drupal.attachBehaviors(document, settings);
    });
    $('div.view-news-overview .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-news-overview', context).on('views_load_more.new_content', function(event, content) {
      Drupal.attachBehaviors(document, settings);
    });
    $('div.view-about-bread-overview .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-about-bread-overview', context).on('views_load_more.new_content', function(event, content) {
      Drupal.attachBehaviors(document, settings);
    });
    $('div.view-taxonomy-term .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-taxonomy-term', context).on('views_load_more.new_content', function(event, content) {
      Drupal.attachBehaviors(document, settings);
    });
    $('div.view-y-random-6-recipes .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-y-overview-to-recipes .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-about-bread-related-6-random .views-row', context).once('dwb-animate-tiles').each(function () {
      Drupal.behaviors.dwbAnimateTiles.trimTexts(this);
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
  },
  animateObject: function(object, delay) {
    if($(window).width() < 768) {
      delay = 0;
    }
    setTimeout( function() {
      $(object).fadeTo(1000, 1);
      $(object).addClass('come-in');
    }, delay);
  },
  trimTexts: function(object) {
    return;
    if($(object).hasClass('tile-shape-4')) {
      $(object).find('.tile-title').ellipsis({ lines: 2+1, responsive: true });
      $(object).find('.tile-text').ellipsis({ lines: 3+1, responsive: true });
    }
    else if($(object).hasClass('tile-shape-3')) {
      $(object).find('.tile-title').ellipsis({ lines: 2+1, responsive: true });
      $(object).find('.tile-text').ellipsis({ lines: 3+1, responsive: true });
    }
    else {
      $(object).find('.tile-title').ellipsis({ lines: 3+1, responsive: true });
      $(object).find('.tile-text').ellipsis({ lines: 3+1, responsive: true });
    }
  },
};

Drupal.behaviors.dwbMultiselect = {
  attach: function(context, settings) {
    $('#edit-field-course-of-the-meal-tid', context).once('dwb-multiselect').each(function() {
      $(this).multiselect({
        columns: 1,
        placeholder: Drupal.t('Gang'),
        onLoad: function (element) {
          $(element).hide();
          var $optionsWrapper = $(element).next('.ms-options-wrap').find('.ms-options');
          $optionsWrapper.append('<div class="dwb-submit"><button type="submit"><span>' + Drupal.t('bevestigen') + '</span></button></div>');
          $optionsWrapper.append('<button class="reset"><span>' + Drupal.t('reset') + '</span></button></div>');
          $optionsWrapper.find('.reset').click(function(e){
            e.preventDefault();
            $optionsWrapper.find('input[type="checkbox"]:checked').click();
          });
          $optionsWrapper.find('button[type="submit"]').click(function(e){
            e.preventDefault();
            $('#edit-submit-recipes-overview').click();
          });
        },
      });
    });
    $('#edit-field-bread-type-tid', context).once('dwb-multiselect').each(function() {
      $(this).multiselect({
        columns: 1,
        placeholder: Drupal.t('Broodsoort'),
        onLoad: function (element) {
          $(element).hide();
          var $optionsWrapper = $(element).next('.ms-options-wrap').find('.ms-options');
          $optionsWrapper.append('<div class="dwb-submit"><button type="submit"><span>' + Drupal.t('bevestigen') + '</span></button></div>');
          $optionsWrapper.append('<button class="reset"><span>' + Drupal.t('reset') + '</span></button></div>');
          $optionsWrapper.find('.reset').click(function(e){
            e.preventDefault();
            $optionsWrapper.find('input[type="checkbox"]:checked').click();
          });
          $optionsWrapper.find('button[type="submit"]').click(function(e){
            e.preventDefault();
            $('#edit-submit-recipes-overview').click();
          });
        },
      });
    });
    $('#views-exposed-form-find-dwb-block #edit-field-bakery-products-tid', context).first().once('dwb-multiselect').each(function() {
      $(this).multiselect({
        columns: 1,
        placeholder: Drupal.t('filter op'),
        onLoad: function (element) {
          $(element).hide();
        },
      });
    });
    $('.webform-client-form #edit-submitted-kies-jouw-warme-bakker', context).first().once('dwb-multiselect').each(function() {
      var wrapper = this;
      $(this).multiselect({
        columns: 1,
        placeholder: Drupal.t('Mijn warme bakker'),
        onOptionClick : function () {
          console.debug(JSON.stringify(wrapper));
          var $optionsWrapper = $(wrapper).next('.ms-options-wrap').find('.ms-options');
          $optionsWrapper.find('input[type="checkbox"]:checked').click();
          
        },
      });
//      $(this).wrap('<div class="inner"></div>');
    });
    $('#views-exposed-form-news-overview-block #edit-sort-order', context).first().once('dwb-multiselect').each(function() {
      $(this).multiselect({
        columns: 1,
        placeholder: Drupal.t('Sorteer'),
      });
    });
  },
};

Drupal.behaviors.dwbAnimateAnchor = {
  attach: function(context, settings) {
    $('a.animate-anchor', context).once('dwb-animate-anchor', function () {
      $(this).click(function(){
        $('html, body').animate({
          scrollTop: $('[id="' + $.attr(this, 'href').substr(1) + '"]').offset().top
        }, 500);
        return false;
      });
    });
  },
};

Drupal.behaviors.dwbMobileMenu = {
  attach: function(context, settings) {
//    console.debug('dwbMobileMenu');
    $('#superfish-2 #superfish-2-accordion', context).once('dwb-mobile-menu', function () {
      var $that = $(this);
      $('#block-locale-language .language-switcher-locale-url li', context).each(function () {
        $that.append($(this));
      });
    });
  },
};

Drupal.behaviors.dwbLinkToButton = {
  attach: function(context, settings) {
    $('a.change-to-button', context).once('dwb-link-to-button', function () {
      var text = $(this).text();
      var html = '<div class="squareToRound"><p>' + text + '</p></div>';
      $(this).addClass('squaretoRoundLink');
      $(this).html(html);
    });
  },
};

Drupal.behaviors.dwbLinkFix = {
    attach: function(context, settings) {
      $('.field-name-field-p-basic .field-name-field-link a', context).once('dwb-link-fix', function () {
        var text = $(this).text();
        var html = '<span>' + text + '</span>';
        $(this).html(html);
      });
    },
};

Drupal.behaviors.dwbPlaceholder = {
  attach: function(context, settings) {
    $('#views-exposed-form-find-dwb-block #edit-city', context).once('dwb-placeholder', function () {
      $(this).attr('placeholder', Drupal.t('Stad'));
    });
    $('#views-exposed-form-find-dwb-block #edit-distance-postal-code', context).once('dwb-placeholder', function () {
      $(this).attr('placeholder', Drupal.t('Postcode'));
    });
  },
};

$(document).ajaxComplete(function(){
  Drupal.attachBehaviors();
});

$(window).resize( function () {
  Drupal.attachBehaviors('#superfish-2');
});

})(jQuery, Drupal, this, this.document);
