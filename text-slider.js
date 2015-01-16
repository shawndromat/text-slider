(function($) {
  $.TextSlider = function(el, options) {
    this.$el = $(el);
    this.verbIndex = 0;
    this.predicateIndex = 0;
    this.verbs = this.$el.find('.verb').children();
    this.findPredicates();
    this.setUp();
    // this.run();
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
    this.subject = $('<div></div>').addClass('base');
    this.subject.text(this.subjectText);
    this.$el.append(this.subject);
    this.verb = $('<div></div>').addClass('verb');
    this.$el.append(this.verb);
    this.predicate = $('<div></div>').addClass('predicate');
    this.$el.append(this.predicate);
  }

  $.TextSlider.prototype.run = function() {
    setInterval(this.tick.bind(this), 1500);
  }

  $.TextSlider.prototype.findPredicates = function() {
    var $verb = this.verbs.eq(this.verbIndex);
    var id = $verb.data('target');
    this.currPredicates = this.$el.find(id);
    this.currPredicates.addClass('active');
    this.currPredicates.children().first().addClass('active');
  }

  $.TextSlider.prototype.tick = function() {
    this.slidePredicate();
    var verb = this.verbs[this.verbIndex];
    var predicates = this.content[verb];
    this.verb.text(verb);
    this.predicate.text(predicates[this.predicateIndex]);
    this.predicateIndex++;
    if (this.predicateIndex >= predicates.length) {
      this.verbIndex = (this.verbs.length + this.verbIndex + 1) % this.verbs.length;
      this.predicateIndex = 0;
    }
  }

  $.TextSlider.prototype.slidePredicate = function() {
    var $oldItem = this.currPredicates.eq(this.predicateIndex);
    this.incrementIndex();
    var $newItem = this.currPredicates.eq(this.predicateIndex);
    $newItem.addClass('.active');
  }

  $.TextSlider.prototype.incrementIndex = function() {
    this.predicateIndex++;
    if (this.predicateIndex >= predicates.length) {
      this.verbIndex = (this.verbs.length + this.verbIndex + 1) % this.verbs.length;
      this.findPredicates;
      this.predicateIndex = 0;
    }
  }

  $.fn.textSlider = function(options) {
    return this.each(function() {
      return new $.TextSlider(this, options);
    });
  }
}(jQuery));
