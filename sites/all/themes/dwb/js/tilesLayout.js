/**
 * @file
 * A JavaScript file for the tiles Layout.
 * 
 * @author Jacek Szmit
(function ($, Drupal, window, document, undefined) {

var matrix = [];
var order = new Array();
var lastRow = 0;

Drupal.behaviors.dwbTiles = {
  attach: function(context, settings) {
    $('div.view-front-page', context).once('dwb-tiles').each(function () {
      //Drupal.DWBTheme.tilesLayout(this);
      $(this).npxGrid(this);
      //var $masonry = $(this).find('.masonry-processed');
      //console.debug($masonry.data('masonry').cols);
      //Drupal.attachBehaviors($(this));
    });
  },
};

Drupal.DWBTheme = {
  tilesLayout: function(container) {
    $(container).find('.view-content').append('<div class="masonry-grid-sizer" style="opacity: 0;">&nbsp;</div>');
    //console.debug('sizer: ' + $('.masonry-grid-sizer').outerWidth());
    //$('.masonry-grid-sizer').width(400);
    var $tiles = $(container).find('.views-row');
    matrix = Drupal.DWBTheme.matrix(100, 3, -1);
    
    $tiles.each(function (index) {
      //var baseWidth = $(container).find('.masonry-grid-sizer').outerWidth();
      var rand = Drupal.DWBTheme.getRandomInt(1, 4);
      
      if($(this).find('.node-action').length) {
        rand = 4;
      }
      
      $(this).addClass('tile-shape-' + rand);
      $(this).addClass('masonry-item');
      $(this).attr('data-shape', rand);
      
      Drupal.DWBTheme.addTile(rand, index);
    });
    lastRow = matrix.length - lastRow;
    matrix = matrix.reverse();
    //Drupal.DWBTheme.fillGaps($tiles);
    //Drupal.DWBTheme.dumpGrid();
    Drupal.DWBTheme.positionTiles($tiles);
  },
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  matrix: function ( rows, cols, defaultValue){
    var arr = [];
    for(var i=0; i < rows; i++){
      arr.push([]);
      arr[i].push( new Array(cols));
      for(var j=0; j < cols; j++){
        arr[i][j] = defaultValue;
      }
    }
    return arr;
  },
  addTile: function (type, value) {
    var r = -1;
    var c = -1;
    for(var i = 0; i < matrix.length; i++) {
      for(var j = 0; j < matrix[i].length; j++) {
        if( type === 1
            && (matrix[i][j] === -1 || matrix[i][j] === 'G')) {
          r = i;
          c = j;
          break;
        }
        else if( type === 2
            && (matrix[i][j] === -1  || matrix[i][j] == 'G')
            && i+1 < matrix.length
            && (matrix[i+1][j] === -1  || matrix[i+1][j] == 'G')) {
          r = i;
          c = j;
          break;
        }
        else if( type === 3
            && (matrix[i][j] === -1  || matrix[i][j] == 'G')
            && j+1 < matrix[i].length
            && (matrix[i][j+1] === -1  || matrix[i][j+1] == 'G')) {
          r = i;
          c = j;
          break;
        }
        else if( type === 4
            && (matrix[i][j] === -1 || matrix[i][j] == 'G')
            && j+1 < matrix[i].length
            && (matrix[i][j+1] === -1 || matrix[i][j+1] == 'G')
            && i+1 < matrix.length
            && (matrix[i+1][j] === -1 || matrix[i+1][j] == 'G')
            && (matrix[i+1][j+1] === -1 || matrix[i+1][j+1] == 'G')) {
          r = i;
          c = j;
          break;
        }
      }
    }
    if(r === -1 || c === -1) {
      console.debug('bad value!!');
    }
    //console.debug(r + '-' + c);
    switch(type) {
      case 1:
        matrix[r][c] = value;
        lastRow = r;
        break;
      case 2:
        matrix[r][c] = value;
        matrix[r+1][c] = value;
        lastRow = r + 1;
        break;
      case 3:
        matrix[r][c] = value;
        matrix[r][c+1] = value;
        lastRow = r;
        break;
      case 4:
        matrix[r][c] = value;
        matrix[r][c+1] = value;
        matrix[r+1][c] = value;
        matrix[r+1][c+1] = value;
        lastRow = r + 1;
        break;
    };
  },
  removeTile: function (index) {
    for(var i = 0; i < matrix.length; i++) {
      for(var j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j] === index) {
          matrix[i][j] = -1;
        }
      }
    }
  },
  findGaps: function () {
    var hasGaps = false;
    for(var i = 0; i < matrix.length; i++) {
      for(var j = 0; j < matrix[i].length; j++) {
        if(matrix[i][j] === -1) {
          if(i < lastRow -1) {
            matrix[i][j] = 'G';
          }
        }
        if(matrix[i][j] === 'G') {
          hasGaps = true;
        }
      }
    }
    return hasGaps;
  },
  fillGaps: function (tiles) {
    var iteration = 1;
    while(Drupal.DWBTheme.findGaps()) {
      var lastIndex = $(tiles).length - 1;
      var last = $(tiles).get(lastIndex);
      var type = $(last).attr('data-shape');
      $(last).attr('data-shape', 1);
      $(last).removeClass('tile-shape-' + type);
      $(last).addClass('tile-shape-1');
      matrix = matrix.reverse();
      //lastRow = matrix.length - lastRow;
      Drupal.DWBTheme.removeTile(lastIndex);
      Drupal.DWBTheme.addTile(1, lastIndex);
      matrix = matrix.reverse();
      lastRow = matrix.length - lastRow;
      iteration++;
      if(iteration > 20) {
        break;
      }
      console.debug('iteration: ' + iteration);
    }
  },
  positionTiles: function (tiles) {
    order = new Array();
    for(var i = 0; i < matrix.length; i++) {
      for(var j = 0; j < matrix[i].length; j++) {
        var index = matrix[i][j];
        if($.inArray(index, order) === -1 && index !== -1 && index !== 'G') {
          order.push(index);
        }
      }
    }
    for(var i = 0; i < order.length; i++) {
      if(i + 1 < order.length && (order[i+1] - order[i] !== 1)) {
        var before = $(tiles).get([order[i-1]]);
        var elem = $(tiles).get([order[i]]);
        $(elem).insertBefore(before);
      }
    }
    console.debug(JSON.stringify(order));
    //$(window).resize();
    var baseWidth = $('.masonry-grid-sizer').width();
    console.debug('baseWidth: ' + baseWidth);
    var usedBricks = new Array();
    var usedRows = 0;
    for(var i = 0; i < matrix.length; i++) {
      for(var j = 0; j < matrix[i].length; j++) {
        var index = matrix[i][j];
        if($.inArray(index, usedBricks) === -1 && index !== -1 && index !== 'G') {
          var elem = $(tiles).get(index);
          $(elem).css('position', 'absolute');
          $(elem).css('left', j * baseWidth + 1);
          $(elem).css('top', i * baseWidth + 1);
          usedBricks.push(index);
          usedRows = i+2;
        }
      }
    }
    $(tiles).closest('.view-content').height(usedRows * baseWidth);
  },
  dumpGrid: function () {
    var row = '';
    for(var i = 0; i < matrix.length; i++) {
      for(var j = 0; j < matrix[i].length; j++) {
        //row += matrix[i][j] + '[' + i + '|' + j + '], ';
        row += matrix[i][j] + ', ';
      }
      row += "\n";
    }
    console.debug(row);
  }
};

$(window).resize( function () {
  var $tiles = $('div.view-front-page').find('.views-row');
  //Drupal.DWBTheme.positionTiles($tiles);
});

})(jQuery, Drupal, this, this.document);

 */