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
  },
  linkIsExternal: function(link_element) {
    return (link_element.host !== window.location.host);
  },
};

Drupal.behaviors.dwbTiles = {
    attach: function(context, settings) {
      $('div.view-front-page', context).once('dwb-tiles').each(function () {
        var that = this;
        $(this).npxGrid(this);
        $(this).on('views_load_more.new_content', function(event, content) {
          $(that).data('plugin_npxGrid').processNewTiles();
        });
      });
    },
};

Drupal.behaviors.dwbAnimateTiles = {
  attach: function(context, settings) {
    $('div.view-front-page .views-row', context).once('dwb-animate-tiles').each(function () {
      $(this).fadeTo(0, 0);
      $(this).waypoint(function(event, direction) {
        Drupal.behaviors.dwbAnimateTiles.animateObject(this, (Math.random() * 1000) + 300);
      },
      { offset: '100%', triggerOnce: false});
    });
    $('div.view-front-page', context).on('views_load_more.new_content', function(event, content) {
      Drupal.attachBehaviors(document, settings);
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
};


Drupal.behaviors.dwbTileLink = {
  attach: function(context, settings) {
    $('.tile-shape-2 .field-name-ds-link-to-node a', context).once('dwb-tile-link').each(function () {
      Drupal.behaviors.dwbTileLink.setLinkSize(this);
    });
  },
  setLinkSize: function (elem) {
    var $container = $(this).closest('.tile-shape-2');
    var height = $container.height();
    $(elem).height(height);
  }
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

$(window).resize( function () {
  $('.tile-shape-2 .field-name-ds-link-to-node a').once('dwb-tile-link').each(function () {
    Drupal.behaviors.dwbTileLink.setLinkSize(this);
  });
});

})(jQuery, Drupal, this, this.document);
