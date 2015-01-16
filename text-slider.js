(function($) {
  $.TextSlider = function(el, options) {
    this.$el = $(el);
    this.verbIndex = 0;
    this.predicateIndex = 0;
    this.content = options.content;
    this.verbs = this.getVerbs();
    this.populate();
    this.run();
  }

  // $.TextSlider.prototype.setUp = function() {
  //   this.verbs.first().addClass('active');
  // }

  $.TextSlider.prototype.getVerbs = function() {
    var verbs = [];
    for (var verb in this.content) {
      verbs.push(verb)
    }
    return verbs;
  }

  $.TextSlider.prototype.populate = function() {
    this.populateVerbs();
    this.populatePredicates();
    this.$verbs.children().first().addClass('active');
    this.$predicates.children().first().addClass('active');
  }

  $.TextSlider.prototype.populateVerbs = function() {
    var $verbs = [];
    for(var i = 0; i < this.verbs.length; i++) {
      var $verb = $('<p></p>').text(this.verbs[i]);
      $verbs.push($verb);
    }
    this.$verbs = this.$el.find('.verb').append($verbs);
  }

  $.TextSlider.prototype.populatePredicates = function() {
    var $predicates = [];
    for( var i = 0; i < this.verbs.length; i++) {
      var preds = this.content[this.verbs[i]];
      for (var j = 0; j < preds.length; j++) {
        var $predicate = $('<p></p>').text(preds[j]);
        $predicates.push($predicate);
      }
    }
    this.$predicates = this.$el.find('.predicate').append($predicates);
  }

  $.TextSlider.prototype.run = function() {
    setInterval(this.tick.bind(this), 2000);
  }

  // $.TextSlider.prototype.findPredicates = function() {
  //   if (this.currPredicates) {
  //     this.currPredicates.removeClass('active');
  //   }
  //   var $verb = this.verbs.eq(this.verbIndex);
  //   var id = $verb.data('target');
  //   this.currPredicates = this.$el.find(id);
  //   this.currPredicates.addClass('active');
  //   this.currPredicates.children().first().addClass('active');
  // }

  $.TextSlider.prototype.tick = function() {
    this.slidePredicate();
    // var verb = this.verbs[this.verbIndex];
    // var predicates = this.content[verb];
    // this.verb.text(verb);
    // this.predicate.text(predicates[this.predicateIndex]);
    // this.predicateIndex++;
    // if (this.predicateIndex >= predicates.length) {
    //   this.verbIndex = (this.verbs.length + this.verbIndex + 1) % this.verbs.length;
    //   this.predicateIndex = 0;
    // }
  }

  $.TextSlider.prototype.slidePredicate = function(group, index) {
    
    var $oldItem = this.$predicates.children().eq(this.predicateIndex);
    if (this.incrementPredicate()) {

    }
    var $newItem = this.$predicates.children().eq(this.predicateIndex);

    $newItem.addClass('bottom active');
    $oldItem.one("transitionend", (function() {
      $oldItem.removeClass("active top");
      this.transitioning = false;
    }).bind(this));

    setTimeout(function() {
      $newItem.removeClass('bottom');
      $oldItem.addClass('top');
    }, 0);

  }

  $.TextSlider.prototype.incrementPredicate = function() {
    this.predicateIndex++;
    if (this.predicateIndex >= this.$predicates.children().length) {
      // this.verbIndex = (this.verbs.length + this.verbIndex + 1) % this.verbs.length;
      // this.incrementVerb();
      this.predicateIndex = 0;
    }
    return this.predicateIndex === 0;
  }

  $.TextSlider.prototype.incrementVerb = function() {
    var len = this.verbs.length;
    this.verbIndex = (len + this.verbIndex + 1) % len;
    console.log(this.verbIndex)
    // this.slidePredicate(this.verbs, this.verbIndex);
  }

  $.fn.textSlider = function(options) {
    return this.each(function() {
      return new $.TextSlider(this, options);
    });
  }
}(jQuery));
