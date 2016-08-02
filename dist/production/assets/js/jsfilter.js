(function($, window, document, undifined) {
    "use strict";
    var pluginName = "jsFilter";
    /* Plugin Initialize
    -----------------------------------------------*/
    function Plugin(elem, options) {
        this.self = this;
        this.elem = elem;
        this.$elem = $(elem);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.inIt();
    };
    /* Plugin Prototype function
    -----------------------------------------------*/
    $.extend(Plugin.prototype, {
        inIt: function() {
            var self = this;
            self._declaration();
        },
        _declaration: function() {
            var self = this;
            self.$targets = self.options.selctor.targets;
            self.loadFilter = self.options.load.filter;
            self.$filter = self.options.selctor.filter;
            self.controls = self.options.controls.enable;
            self.filterType = self.options.filters.type;
            self.filterLogic = self.options.filters.logic;
            self.BtnLogic = self.options.filters.bntLogic;
            self.searchEnable = self.options.controls.search.enable;
            self.$show = null;
            self.$hide = null;

            /* Target Filter Start
            ----------------------------*/
            self._filtring(self.$targets, self.loadFilter);


            /* Check Controls enable: true or false
            -----------------------------------------*/
            if (self.controls) {
                self._filters();
            }

        },
        _filtring: function(target, filter) {
            var self = this;
            self.$targets = $(target);
            self.loadFilter = filter;
            self.$show = filter !== 'all' ? $(filter) : $(self.$targets);
            self.$hide = self.$targets.not(self.$show);

            // console.log("Targets: " + self.$targets.length);
            // console.log("Load Filter: " + self.loadFilter);
            // console.log("Filter selctor: " + self.$filter);
            // console.log("Controls: " + self.controls);
            // console.log("Filter Type: " + self.filterType);
            // console.log("Filter Logic: " + self.filterLogic);
            // console.log("Show: " + self.$show.length);
            // console.log("Hide: " + self.$hide.length);

            if (filter === 'all' || filter == '') {
                self._show($(self.options.selctor.targets));

            } else {
                //self._show($(self.$targets));
                self._show(self.$show);
                self._hide(self.$hide);
            }
        },
        _show: function(e) {
            var self = this;
            e.show();
            if (self.options.controls.animation.enable === true) {
                self.animateCss(self.options.animation.animationIn, e);
            }
            if (!e.length) {
                if (typeof self.options.callbacks.filterFail === 'function') {
                    self.options.callbacks.filterFail();
                }
            }

            setTimeout(function() {
                $(self.$filter).prop("disabled", false);
            }, 100);
            // Call back filter end
            //self.options.callbacks.filterEnd(self);
        },
        _hide: function(e) {
            var self = this;
            e.hide();
        },
        animateCss: function(animationName, elem) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(elem).addClass('animated ' + animationName).one(animationEnd, function() {
                $(elem).removeClass('animated ' + animationName);
            });
        },
        _filters: function() {
            var self = this;
            switch (self.filterType) {
                case 'select':
                    self._filterSelect();
                    break;
                default:
                    self._filterClick();
                    break;
            };
        },
        _filterSelect: function() {
            var self = this;
            switch (self.BtnLogic) {
                case 'toggle':
                    self._buttonToggle();
                    break;
                default:
                    self._buttonActive();
                    break;
            };
        },
        _filterClick: function() {
            var self = this;
            $(self.$filter).unbind().click(function() {
                var lodaFilter = $(this).attr("data-filter");
                self._filtring(self.$targets, lodaFilter);
                $(self.$filter).prop("disabled", true);
            });
        },
        _buttonActive: function() {
            var self = this;
            //console.log("hii Active");
            $(self.$filter).unbind().change(function() {
                var lodaFilter = $(this).val();
                self._filtring(self.$targets, lodaFilter);
                $(self.$filter).not(this).val('');
                $(self.$filter).prop("disabled", true);
            });
        },
        _buttonToggle: function() {
            var self = this;
            //console.log("hii toggle");
            switch (self.filterLogic) {
                case 'or':
                    self._orLogic();
                    break;
                default:
                    self._andLogic();
                    self._searchClick();
                    break;
            };
        },
        _andLogic: function() {
            var self = this;
            $(self.$filter).unbind().change(function() {
                var classNames = '';
                $(self.$filter).each(function() {
                    classNames += $(this).val();
                });
                //console.log(classNames);
                self._filtring(self.$targets, classNames);
                $(self.$filter).prop("disabled", true);
            });
        },
        _orLogic: function() {
            var self = this;
            $(self.$filter).unbind().change(function() {
                var classNames = [];
                $(self.$filter).each(function() {
                    classNames.push($(this).val());
                });
                var removeEmpty = classNames.filter(function(n) {
                    return n.length > 0
                });
                var withComma = removeEmpty.join();
                //console.log(addComma);
                self._filtring(self.$targets, withComma);
                $(self.$filter).prop("disabled", true);
            });
        },
        _searchClick: function() {
            var self = this;
            $(self.options.selctor.search.button).click(function() {
                var inputText = $(self.options.selctor.search.input).val().toLowerCase();
                switch (inputText.trim().length) {
                    case 0:
                        $(self.options.selctor.search.input).addClass("input-empty");
                        break;
                    default:
                        self._searchFunc(self.$show, inputText);
                        $(self.options.selctor.search.input).removeClass("input-empty");
                        break;
                };
                $(self.$filter).prop("disabled", true);
            });
        },
        _searchFunc: function(e, inputText) {
            var self = this;
            self.$matching = $();
            $(e).each(function() {
                if ($(this).text().toLowerCase().match(inputText)) {
                    self.$matching = self.$matching.add(this);
                }
            });
            self._filtring(self.$targets, self.$matching);
        }

    });
    /* Function Initialize
    -----------------------------------------------*/
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            new Plugin(this, options);
        });
    };
    /* Defaults Options
    -----------------------------------------------*/
    $.fn[pluginName].defaults = {
        selctor: {
            targets: '',
            filter: '',
            search: {
                input: '',
                button: ''
            }
        },
        controls: {
            enable: true,
            animation: {
                enable: true
            },
            search: {
                enable: false,
                onEnter: true
            }
        },
        load: {
            filter: 'all'
        },
        filters: {
            logic: '', // Defaul and, or
            type: '', // Defaul click, select,  what you want fire filter on click or on select
            bntLogic: '' // Default active,  toggle
        },
        callbacks: {
            filterStart: false,
            filterEnd: false,
            filterFail: false
        },
        animation: {
            animationIn: 'zoomIn'
        }
    };
}(jQuery, window, document));