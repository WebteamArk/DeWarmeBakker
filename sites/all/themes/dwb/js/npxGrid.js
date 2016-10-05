/**
 *  NoPix Grid v1.0
 *  Gapless randomized grid
 *
 *  @author Jacek Szmit
 */

;( function( $, window, document, undefined ) {

  "use strict";

  var pluginName = "npxGrid",
    defaults = {
      gridSizer: ".masonry-grid-sizer",
      gridItem: ".views-row",
      fixedItem: ".node-action",
      forceSmall: false,
    };

  function Plugin ( container, options ) {
    this.container = container;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this._lastRow = 0;
    this._maxIterations = 100;
    this._resizeTimer = null;
    this._matrix = [];
    this._defaultMatrixSize = 200;
    this._tilesInfo = [];
    this._breakpoint = {};
    this._lastBreakpoint = '';
    this._breakpoint.refreshValue = function () {
      this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
    };
    this._commands = {
      processNewTiles: this._processNewTiles,
    };
    console.debug(this.settings.fixedItem);
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      this._breakpoint.refreshValue();
      this._lastBreakpoint = this._breakpoint.value;
      var ok = this.layout();
      var iteration = 0;
      while(!ok && iteration < this._maxIterations ) {
        ok = this.layout();
        console.debug('iteration: ' + iteration);
        iteration++;
      }
      this.positionTiles();
      var that = this;
      $(window).bind('resize', function(){
        that.resize();
      });
    },
    getColNumber: function () {
      var columns = 0;
      switch(this._breakpoint.value) {
        case 'smartphone-portrait':
          columns = 1;
          break;
        case 'smartphone':
          columns = 2;
          break;
        case 'tablet':
          columns = 3;
          break;
        case 'desktop':
          columns = 3;
          break;
        case 'bigscreen':
          columns = 4;
          break;
      }
      return columns;
    },
    processNewTiles: function () {
      console.debug('new tiles arrived!');
      var columns = this.getColNumber();
      var origMatrix = this.clone(this.matrix);
      var origLastRow = this._lastRow;
      
      var ok = false;
      var $tilesBeforeLoad = $(this.container).find(this.settings.gridItem + '.masonry-item');
      var offset = $tilesBeforeLoad.length;
      var $tiles = $(this.container).find(this.settings.gridItem + ':not(.masonry-item)');
      
      var iteration = 0;
      
      while(!ok && iteration < this._maxIterations ) {
        this.matrix = this.clone(origMatrix);
        this._lastRow = origLastRow;
        for(var i = 0; i < $tiles.length; i++) {
          if(columns > 1) {
            var rand = this.getRandomInt(1, 4);
            var item = $tiles.get(i);
            
            if(this.findGaps()) {
              rand = this.findSafeShape();
            }
            if($(item).find(this.settings.fixedItem).length) {
              rand = 4;
            }
            this.addTile(rand, i + offset);
          }
          else {
            this.addTile(1, i + offset);
          } 
        }
        ok = !this.findGaps();
        console.debug('new iteration: ' + iteration);
        iteration++;
      }
//      console.debug(JSON.stringify(this._tilesInfo));
//      this.dumpMatrix();
      if(!ok) {
        this.cleanup();
        this.init();
      }
      else {
//        this.dumpMatrix();
        this.positionTiles();
      }
    },
    layout: function() {
      var columns = this.getColNumber();
      this.matrix = this.createMatrix(this._defaultMatrixSize, columns, -1);
      this._tilesInfo = new Array();
      this._lastRow = 0;

      var $tiles = $(this.container).find(this.settings.gridItem);

      for(var i = 0; i < $tiles.length; i++) {
        if(columns > 1) {
          var rand = this.getRandomInt(1, 4);
          var item = $tiles.get(i);
          
          if(this.findGaps()) {
            rand = this.findSafeShape();
          }
          if($(item).find(this.settings.fixedItem).length) {
            rand = 4;
          }
          this.addTile(rand, i);
        }
        else {
          this.addTile(1, i);
        } 
      }
      return !this.findGaps();
    },
    addTile: function (type, value) {
      this._tilesInfo[value] = type;
      for(var i = 0; i < this.matrix.length; i++) {
        for(var j = 0; j < this.matrix[i].length; j++) {
          if( type === 1
              && (this.matrix[i][j] === -1 || this.matrix[i][j] === 'G')) {
            this.matrix[i][j] = value;
            if(this._lastRow < i) {
              this._lastRow = i;
            }
            return;
          }
          else if( type === 2
              && (this.matrix[i][j] === -1  || this.matrix[i][j] == 'G')
              && i+1 < this.matrix.length
              && (this.matrix[i+1][j] === -1  || this.matrix[i+1][j] == 'G')) {
            this.matrix[i][j] = value;
            this.matrix[i+1][j] = value;
            if(this._lastRow < i + 1) {
              this._lastRow = i + 1;
            }
            return;
          }
          else if( type === 3
              && (this.matrix[i][j] === -1  || this.matrix[i][j] == 'G')
              && j+1 < this.matrix[i].length
              && (this.matrix[i][j+1] === -1  || this.matrix[i][j+1] == 'G')) {
            this.matrix[i][j] = value;
            this.matrix[i][j+1] = value;
            if(this._lastRow < i) {
              this._lastRow = i;
            }
            return;
          }
          else if( type === 4
              && (this.matrix[i][j] === -1 || this.matrix[i][j] == 'G')
              && j+1 < this.matrix[i].length
              && (this.matrix[i][j+1] === -1 || this.matrix[i][j+1] == 'G')
              && i+1 < this.matrix.length
              && (this.matrix[i+1][j] === -1 || this.matrix[i+1][j] == 'G')
              && (this.matrix[i+1][j+1] === -1 || this.matrix[i+1][j+1] == 'G')) {
            this.matrix[i][j] = value;
            this.matrix[i][j+1] = value;
            this.matrix[i+1][j] = value;
            this.matrix[i+1][j+1] = value;
            if(this._lastRow < i + 1) {
              this._lastRow = i + 1;
            }
            return;
          }
        }
      }
    },
    findSafeShape: function () {
      for(var i = 0; i < this.matrix.length; i++) {
        for(var j = 0; j < this.matrix[i].length; j++) {
          if((this.matrix[i][j] == 'G')
              && i+1 < this.matrix.length
              && (this.matrix[i+1][j] == 'G')) {
            return 2;
          }
          else if((this.matrix[i][j] == 'G')
              && j+1 < this.matrix[i].length
              && (this.matrix[i][j+1] == 'G')) {
            return 3;
          }
          else {
            return 1;
          }
        }
      }
    },
    findGaps: function () {
      var hasGaps = false;
      for(var i = 0; i < this.matrix.length; i++) {
        for(var j = 0; j < this.matrix[i].length; j++) {
          if(this.matrix[i][j] === -1) {
            if(i < this._lastRow) {
              this.matrix[i][j] = 'G';
            }
          }
          if(this.matrix[i][j] === 'G') {
            hasGaps = true;
          }
        }
      }
      return hasGaps;
    },
    positionTiles: function () {
      var $tiles = $(this.container).find(this.settings.gridItem);
      var percentageWidth = this.getPercentageWidth();
      var pixelWidth = this.getPixelWidth();
      var usedBricks = [];

      for(var i = 0; i < this.matrix.length; i++) {
        for(var j = 0; j < this.matrix[i].length; j++) {
          var index = this.matrix[i][j];
          if($.inArray(index, usedBricks) === -1 && index !== -1 && index !== 'G') {
            var elem = $tiles.get(index);
            $(elem).css('position', 'absolute');
            switch(this._tilesInfo[index]) {
              case 1:
                $(elem).css('width', pixelWidth);
                $(elem).css('height', pixelWidth);
                break;
              case 2:
                $(elem).css('width', pixelWidth);
                $(elem).css('height', pixelWidth * 2);
                break;
              case 3:
                $(elem).css('width', pixelWidth * 2);
                $(elem).css('height', pixelWidth);
                break;
              case 4:
                $(elem).css('width', pixelWidth * 2);
                $(elem).css('height', pixelWidth * 2);
                break;
            }
            //$(elem).css('padding', '25px');
            $(elem).css('left', j * percentageWidth + '%');
            $(elem).css('top', i * pixelWidth + 1);
            $(elem).addClass('masonry-item');
            $(elem).addClass('tile-shape-' + this._tilesInfo[index]);
            usedBricks.push(index);
          }
        }
      }
//      $tiles.closest('.view-content').height((this._lastRow + 1) * pixelWidth);
      var viewContent = $(this.container).find('> .view-content');
      if(!viewContent.length) {
        viewContent = $tiles.closest('.view-content');
      }
//      $(this.container).find('> .view-content').height((this._lastRow + 1) * pixelWidth);
//      $(this.container).find('> .view-content').css('position', 'relative');
      $(viewContent).height((this._lastRow + 1) * pixelWidth);
      $(viewContent).css('position', 'relative');
    },
    cleanup: function () {
      var $tiles = $(this.container).find(this.settings.gridItem);
      for(var i = 0; i < $tiles.length; i++) {
        var tile = $tiles.get(i);
        $(tile).removeClass('tile-shape-' + this._tilesInfo[i]);
      }
      this._lastRow = 0;
      this._matrix = [];
      this._tilesInfo = [];
      this._lastBreakpoint = '';
    },
    resize: function () {
      var that = this;
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(function() {
        that._breakpoint.refreshValue();
        if(that._breakpoint.value === that._lastBreakpoint) {
          that.positionTiles();
        }
        else {
          that.cleanup();
          that.init();
        }
      }, 250);
    },
    getPercentageWidth: function () {
      $(this.container).find('.view-content').first().append('<div id="npxGridMeasurement" style="display: none;"><div class="masonry-grid-sizer">&nbsp;</div></div>');
      var width = $(this.container).find('.masonry-grid-sizer').width();
//      $(this.container).find('#npxGridMeasurement').remove();
      $('#npxGridMeasurement').remove();
      return width;
    },
    getPixelWidth: function () {
      $(this.container).find('.view-content').first().append('<div id="npxGridMeasurement" class="masonry-grid-sizer" style="opacity: 0;">&nbsp;</div>');
      var width = $(this.container).find('.masonry-grid-sizer').width();
      $('#npxGridMeasurement').remove();
      return width;
    },
    getRandomInt: function(min, max) {
      if (this.settings.forceSmall) {
        return 1;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    createMatrix: function ( rows, cols, defaultValue){
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
    clone: function (existingArray) {
      var newObj = (existingArray instanceof Array) ? [] : {};
      for (i in existingArray) {
        if (i == 'clone') continue;
          if (existingArray[i] && typeof existingArray[i] == "object") {
            newObj[i] = this.clone(existingArray[i]);
          } else {
            newObj[i] = existingArray[i]
        }
      }
      return newObj;
    },
    dumpMatrix: function () {
      var row = '';
      for(var i = 0; i < this.matrix.length; i++) {
        for(var j = 0; j < this.matrix[i].length; j++) {
          row += this.matrix[i][j] + ', ';
        }
        row += "\n";
      }
      console.debug(row);
    },
  });

  $.fn[ pluginName ] = function( options ) {
    return this.each( function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" +
          pluginName, new Plugin( this, options ) );
      }
    } );
  };
} )( jQuery, window, document );