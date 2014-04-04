/**
* activeImageMap v0.1
* https://github.com/Lugat/activeImageMap
*
* Copyright (c) 2014 Squareflower Websolutions - Lukas Rydygel
* Licensed under the MIT license
*/
;(function($, window, document, undefined) {
 
  var PLUGIN_NAME = 'activeImageMap',
      PLUGIN_VERSION = '0.1';
  
  function Plugin(element, settings) {
    
    this.settings = $.extend({
      click: true,
      hover: true,
      attr: 'alt',
      active: function() {},
      activeClass: '.active'
    }, settings);
    
    this.name = PLUGIN_NAME;
    this.version = PLUGIN_VERSION;
    this.element = element;
    this.$element = $(this.element);
    this.originalImage = this.$element.attr('src');
    this.map = this.$element.attr('usemap');
    this.$map = $(this.map);
    this.$areas = this.$map.children('area');
    this.init();
    
  };

  Plugin.prototype.init = function() {

    var plugin = this;

    if (this.settings.click) {
      
      this.$areas.click(function(e) {
        
        e.preventDefault();
        
        var i = $(this).index();
        
        plugin.setInactive();
        plugin.setActive(i);
        
      });
      
    }
    
    if (this.settings.hover) {
      
      this.$areas.hover(function() {
  
        var i = $(this).index();
  
        plugin.setInactive();
        plugin.setActive(i);
        
      }, function(i) {
        
        plugin.resetOriginalImage();
        plugin.setInactive(i);
        
      });
      
    }
    
    this.setActive();
    
  };
  
  Plugin.prototype.setInactive = function(i) {
    
    if (i === undefined) {
      this.$areas.removeClass(this.settings.activeClass);
    } else {
      this.$areas.eq(i).removeClass(this.settings.activeClass);
    }
    
  };
  
  Plugin.prototype.setActive = function(i) {
    
    if (i === undefined) {
      
      if (typeof this.settings.active === 'function') {
        i = this.settings.active(this.$areas);
      } else {
        i = $(this.settings.active).index();
      }
      
    }
    
    if (i > -1) {

      this.$areas.eq(i).addClass(this.settings.activeClass);

      var src = this.$areas.eq(i).attr(this.settings.attr);

      this.changeImage(src);
    
    }
    
  };
  
  Plugin.prototype.resetOriginalImage = function() {
    this.changeImage(this.originalImage);
  };
  
  Plugin.prototype.changeImage = function(src) {
    this.$element.attr('src', src);
  };
  
  $.fn[PLUGIN_NAME] = function(settings) {
    
    $(this).each(function() {
      new Plugin(this, settings);
    });
    
  };
  
  $.activeImageMap = function(settings) {
    $('img[usemap]').activeImageMap(settings);
  };

}(jQuery, window, document));