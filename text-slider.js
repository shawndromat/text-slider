(function($) {
  $.TextSlider = function(el, options) {
    this.$el = $(el);
    this.verbIndex = 0;
    this.predicateIndex = 0;
    this.content = options.content;
    // this.verbs = this.$el.find('.verb').children();
    this.findPredicates();
    this.setUp();
    this.run();
  }

  $.TextSlider.prototype.setUp = function() {
    this.verbs.first().addClass('active');
  }

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
  }

  $.TextSlider.prototype.populateVerbs = function() {
    var verbs = this.content.verbs;
    var $verbs = [];
    for(var i = 0; i < verbs.length; i++) {
      var $verb = $('<p></p>').text(verbs[i]);
      $verbs.push($verb);
    }
    this.verbs = this.$el.find('.verb').append($verbs);
  }

  $.TextSlider.prototype.populateVerbs = function() {
  }

  $.TextSlider.prototype.run = function() {
    setInterval(this.tick.bind(this), 2000);
  }

  $.TextSlider.prototype.findPredicates = function() {
    if (this.currPredicates) {
      this.currPredicates.removeClass('active');
    }
    var $verb = this.verbs.eq(this.verbIndex);
    var id = $verb.data('target');
    this.currPredicates = this.$el.find(id);
    this.currPredicates.addClass('active');
    this.currPredicates.children().first().addClass('active');
  }

  $.TextSlider.prototype.tick = function() {
    console.log(this.currPredicates)
    console.log(this.predicateIndex)
    this.slidePredicate(this.currPredicates.children(), this.predicateIndex);
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
    if (this.transitioning) {
      return;
    }
    this.transitioning = true;
    
    var $oldItem = group.eq(index);
    // var $oldItem = this.currPredicates.children().eq(this.predicateIndex);
    // if (group === this.verbs) {
    // } else {
      index = this.incrementPredicate();
    // }
    var $newItem = group.eq(index);

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
    debugger
    this.predicateIndex++;
    if (this.predicateIndex >= this.currPredicates.children().length) {
      // this.verbIndex = (this.verbs.length + this.verbIndex + 1) % this.verbs.length;
      this.incrementVerb();
      this.findPredicates();
      this.predicateIndex = 0;
    }
    return this.predicateIndex;
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
