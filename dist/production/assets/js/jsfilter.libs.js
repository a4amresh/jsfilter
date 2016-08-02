(function($, window, document, undifined) {
    "use strict";
    var pluginName = "apPagination";
    /* Plugin Initialize
    -----------------------------------------------*/
    function Plugin(elem, options) {
        this.self = this;
        this.elem = elem;
        this.$elem = $(elem);
        this.metadata = this.$elem.data("options");
        this.options = $.extend({}, $.fn[pluginName].defaults, this.metadata, options);
    };
    /* Plugin Prototype function
    -----------------------------------------------*/
    $.extend(Plugin.prototype, {
        inIt: function() {
            var self = this;
            if (self.options.mixiTupState === false) {
                self.$targets = $(self.options.selctor.target);
            } else {
                self.$targets = self.options.mixiTupState.$show;
            }
            self.reset();
        },
        reset: function() {
            var self = this;
            $(self.options.selctor.paginationWrap).empty();
            self.createPage();
        },
        createPage: function() {
            var self = this;
            self.AllPage = Math.ceil(self.$targets.length / self.options.perPage);
            if (self.AllPage !== 1) {
                var k = 0;
                for (var i = 1; i <= self.AllPage; i++) {
                    switch (i) {
                        case 1:
                            $(self.options.selctor.paginationWrap).append($('<' + self.options.button.btnWrap + '>', {
                                class: self.options.button.prevClass,
                                html: self.options.button.prevText
                            }));
                            $(self.options.selctor.paginationWrap).append($('<' + self.options.button.btnWrap + '>', {
                                class: self.options.button.btnClass + ' ' + self.options.button.activeClass,
                                html: i,
                                'data-page': k
                            }));
                            break;
                        case self.AllPage:
                            $(self.options.selctor.paginationWrap).append($('<' + self.options.button.btnWrap + '>', {
                                class: self.options.button.btnClass,
                                html: i,
                                'data-page': k
                            }));
                            $(self.options.selctor.paginationWrap).append($('<' + self.options.button.btnWrap + '>', {
                                class: self.options.button.nextClass,
                                html: self.options.button.nextText
                            }));
                            break;
                        default:
                            $(self.options.selctor.paginationWrap).append($('<' + self.options.button.btnWrap + '>', {
                                class: self.options.button.btnClass,
                                html: i,
                                'data-page': k
                            }));
                            break;
                    }
                    k = k + 1;
                }
            }
            self.wrapElem();
        },
        wrapElem: function() {
            var self = this;
            self.pageElem = [];
            for (var i = 0; i < self.AllPage; i++) {
                self.pageElem.push(self.$targets.splice(0, self.options.perPage));
                $(self.pageElem[i]).addClass('page-' + i);
            }
            $(self.options.selctor.target).not($(".page-0")).fadeOut("fast");
            self.buttonsClick();
        },
        AddStyle: function(elem) {
            var self = this;
            if (self.options.animation.enabled) {
                $(self.options.selctor.target).not($(elem)).hide();
                $(elem).fadeIn();
                self.animateIn(elem, self.options.animation.animationIn);
            } else {
                $(self.options.selctor.target).not($(elem)).hide();
                $(elem).fadeIn();
            }
        },
        animateIn: function(elem, animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(elem).addClass('animated ' + animationName).one(animationEnd, function() {
                $(elem).removeClass('animated ' + animationName);
            });
        },
        buttonsClick: function() {
            var self = this;
            $(self.options.selctor.paginationWrap + " ." + self.options.button.btnClass).unbind('click').bind('click', function() {
                var activeClass = $(this).hasClass("active")
                if (!activeClass) {
                    $(self.options.selctor.paginationWrap + " ." + self.options.button.btnClass).removeClass("active");
                    $(this).addClass("active");
                    var attr = parseInt($(this).attr("data-page"));
                    self.AddStyle($('.page-' + attr));
                }
            });
            $(self.options.selctor.paginationWrap + " ." + self.options.button.nextClass).unbind('click').bind('click', function() {
                var activeBtn = $(self.options.selctor.paginationWrap + " ." + self.options.button.btnClass + ".active");
                var nextBtn = activeBtn.next();
                var attr = parseInt(nextBtn.attr("data-page"));
                if (attr < self.AllPage) {
                    activeBtn.removeClass("active");
                    nextBtn.addClass("active");
                    self.AddStyle($('.page-' + attr));
                }
            });
            $(self.options.selctor.paginationWrap + " ." + self.options.button.prevClass).unbind('click').bind('click', function() {
                var activeBtn = $(self.options.selctor.paginationWrap + " ." + self.options.button.btnClass + ".active");
                var prveBtn = activeBtn.prev();
                var attr = parseInt(prveBtn.attr("data-page"));
                if (attr >= 0) {
                    activeBtn.removeClass("active");
                    prveBtn.addClass("active");
                    self.AddStyle($('.page-' + attr));
                }
            });
        }
    });

    /* Function Initialize
    -----------------------------------------------*/
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            new Plugin(this, options).inIt();
        });
    };
    /* Defaults Options
    -----------------------------------------------*/
    $.fn[pluginName].defaults = {
        selctor: {
            target: '',
            targetWrap: '',
            paginationWrap: '.ap-pagination'
        },
        animation: {
            enabled: true,
            animationIn: 'zoomIn',
            animationOut: 'zoomOut'
        },
        button: {
            btnWrap: 'li',
            btnClass: 'page-btn',
            prevClass: 'prev', // Class name without . (dot)
            nextClass: 'next', // Class name without . (dot)
            activeClass: 'active', // Class name without . (dot)
            nextText: 'Next > ',
            prevText: ' < Prev'
        },
        perPage: '3',
        mixiTupState: false
    };
}(jQuery, window, document));