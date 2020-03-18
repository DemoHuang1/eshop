"function" !== typeof Object.create && (Object.create = function (f) {
    function g() {
    }

    g.prototype = f;
    return new g
});
(function (f, g, k) {
    var l = {
        init: function (a, b) {
            this.$elem = f(b);
            this.options = f.extend({}, f.fn.owlCarousel.options, this.$elem.data(), a);
            this.userOptions = a;
            this.loadContent()
        }, loadContent: function () {
            function a(a) {
                var d, e = "";
                if ("function" === typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [a]); else {
                    for (d in a.owl) a.owl.hasOwnProperty(d) && (e += a.owl[d].item);
                    b.$elem.html(e)
                }
                b.logIn()
            }

            var b = this, e;
            "function" === typeof b.options.beforeInit && b.options.beforeInit.apply(this, [b.$elem]);
            "string" === typeof b.options.jsonPath ?
                (e = b.options.jsonPath, f.getJSON(e, a)) : b.logIn()
        }, logIn: function () {
            this.$elem.data("owl-originalStyles", this.$elem.attr("style"));
            this.$elem.data("owl-originalClasses", this.$elem.attr("class"));
            this.$elem.css({opacity: 0});
            this.orignalItems = this.options.items;
            this.checkBrowser();
            this.wrapperWidth = 0;
            this.checkVisible = null;
            this.setVars()
        }, setVars: function () {
            if (0 === this.$elem.children().length) return !1;
            this.baseClass();
            this.eventTypes();
            this.$userItems = this.$elem.children();
            this.itemsAmount = this.$userItems.length;
            this.wrapItems();
            this.$owlItems = this.$elem.find(".owl-item");
            this.$owlWrapper = this.$elem.find(".owl-wrapper");
            this.playDirection = "next";
            this.prevItem = 0;
            this.prevArr = [0];
            this.currentItem = 0;
            this.customEvents();
            this.onStartup()
        }, onStartup: function () {
            this.updateItems();
            this.calculateAll();
            this.buildControls();
            this.updateControls();
            this.response();
            this.moveEvents();
            this.stopOnHover();
            this.owlStatus();
            !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle);
            !0 === this.options.autoPlay &&
            (this.options.autoPlay = 5E3);
            this.play();
            this.$elem.find(".owl-wrapper").css("display", "block");
            this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility();
            this.onstartup = !1;
            this.eachMoveUpdate();
            "function" === typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
        }, eachMoveUpdate: function () {
            !0 === this.options.lazyLoad && this.lazyLoad();
            !0 === this.options.autoHeight && this.autoHeight();
            this.onVisibleItems();
            "function" === typeof this.options.afterAction && this.options.afterAction.apply(this,
                [this.$elem])
        }, updateVars: function () {
            "function" === typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]);
            this.watchVisibility();
            this.updateItems();
            this.calculateAll();
            this.updatePosition();
            this.updateControls();
            this.eachMoveUpdate();
            "function" === typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
        }, reload: function () {
            var a = this;
            g.setTimeout(function () {
                a.updateVars()
            }, 0)
        }, watchVisibility: function () {
            var a = this;
            if (!1 === a.$elem.is(":visible")) a.$elem.css({opacity: 0}),
                g.clearInterval(a.autoPlayInterval), g.clearInterval(a.checkVisible); else return !1;
            a.checkVisible = g.setInterval(function () {
                a.$elem.is(":visible") && (a.reload(), a.$elem.animate({opacity: 1}, 200), g.clearInterval(a.checkVisible))
            }, 500)
        }, wrapItems: function () {
            this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
            this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
            this.wrapperOuter = this.$elem.find(".owl-wrapper-outer");
            this.$elem.css("display", "block")
        },
        baseClass: function () {
            var a = this.$elem.hasClass(this.options.baseClass), b = this.$elem.hasClass(this.options.theme);
            a || this.$elem.addClass(this.options.baseClass);
            b || this.$elem.addClass(this.options.theme)
        }, updateItems: function () {
            var a, b;
            if (!1 === this.options.responsive) return !1;
            if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall =
                !1, this.options.itemsMobile = !1;
            a = f(this.options.responsiveBaseWidth).width();
            a > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems);
            if (!1 !== this.options.itemsCustom) for (this.options.itemsCustom.sort(function (a, b) {
                return a[0] - b[0]
            }), b = 0; b < this.options.itemsCustom.length; b += 1) this.options.itemsCustom[b][0] <= a && (this.options.items = this.options.itemsCustom[b][1]); else a <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]),
            a <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), a <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), a <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), a <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
            this.options.items > this.itemsAmount &&
            !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
        }, response: function () {
            var a = this, b, e;
            if (!0 !== a.options.responsive) return !1;
            e = f(g).width();
            a.resizer = function () {
                f(g).width() !== e && (!1 !== a.options.autoPlay && g.clearInterval(a.autoPlayInterval), g.clearTimeout(b), b = g.setTimeout(function () {
                    e = f(g).width();
                    a.updateVars()
                }, a.options.responsiveRefreshRate))
            };
            f(g).resize(a.resizer)
        }, updatePosition: function () {
            this.jumpTo(this.currentItem);
            !1 !== this.options.autoPlay && this.checkAp()
        }, appendItemsSizes: function () {
            var a =
                this, b = 0, e = a.itemsAmount - a.options.items;
            a.$owlItems.each(function (c) {
                var d = f(this);
                d.css({width: a.itemWidth}).data("owl-item", Number(c));
                if (0 === c % a.options.items || c === e) c > e || (b += 1);
                d.data("owl-roundPages", b)
            })
        }, appendWrapperSizes: function () {
            this.$owlWrapper.css({width: this.$owlItems.length * this.itemWidth * 2, left: 0});
            this.appendItemsSizes()
        }, calculateAll: function () {
            this.calculateWidth();
            this.appendWrapperSizes();
            this.loops();
            this.max()
        }, calculateWidth: function () {
            this.itemWidth = Math.round(this.$elem.width() /
                this.options.items)
        }, max: function () {
            var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
            this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = a);
            return a
        }, min: function () {
            return 0
        }, loops: function () {
            var a = 0, b = 0, e, c;
            this.positionsInArray = [0];
            this.pagesInArray = [];
            for (e = 0; e < this.itemsAmount; e += 1) b += this.itemWidth, this.positionsInArray.push(-b), !0 === this.options.scrollPerPage && (c = f(this.$owlItems[e]),
                c = c.data("owl-roundPages"), c !== a && (this.pagesInArray[a] = this.positionsInArray[e], a = c))
        }, buildControls: function () {
            if (!0 === this.options.navigation || !0 === this.options.pagination) this.owlControls = f('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem);
            !0 === this.options.pagination && this.buildPagination();
            !0 === this.options.navigation && this.buildButtons()
        }, buildButtons: function () {
            var a = this, b = f('<div class="owl-buttons"/>');
            a.owlControls.append(b);
            a.buttonPrev =
                f("<div/>", {"class": "owl-prev", html: a.options.navigationText[0] || ""});
            a.buttonNext = f("<div/>", {"class": "owl-next", html: a.options.navigationText[1] || ""});
            b.append(a.buttonPrev).append(a.buttonNext);
            b.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (a) {
                a.preventDefault()
            });
            b.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (b) {
                b.preventDefault();
                f(this).hasClass("owl-next") ? a.next() : a.prev()
            })
        }, buildPagination: function () {
            var a = this;
            a.paginationWrapper =
                f('<div class="owl-pagination"/>');
            a.owlControls.append(a.paginationWrapper);
            a.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (b) {
                b.preventDefault();
                Number(f(this).data("owl-page")) !== a.currentItem && a.goTo(Number(f(this).data("owl-page")), !0)
            })
        }, updatePagination: function () {
            var a, b, e, c, d, g;
            if (!1 === this.options.pagination) return !1;
            this.paginationWrapper.html("");
            a = 0;
            b = this.itemsAmount - this.itemsAmount % this.options.items;
            for (c = 0; c < this.itemsAmount; c += 1) 0 === c % this.options.items &&
            (a += 1, b === c && (e = this.itemsAmount - this.options.items), d = f("<div/>", {"class": "owl-page"}), g = f("<span></span>", {
                text: !0 === this.options.paginationNumbers ? a : "",
                "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
            }), d.append(g), d.data("owl-page", b === c ? e : c), d.data("owl-roundPages", a), this.paginationWrapper.append(d));
            this.checkPagination()
        }, checkPagination: function () {
            var a = this;
            if (!1 === a.options.pagination) return !1;
            a.paginationWrapper.find(".owl-page").each(function () {
                f(this).data("owl-roundPages") ===
                f(a.$owlItems[a.currentItem]).data("owl-roundPages") && (a.paginationWrapper.find(".owl-page").removeClass("active"), f(this).addClass("active"))
            })
        }, checkNavigation: function () {
            if (!1 === this.options.navigation) return !1;
            !1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem ===
            this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")))
        }, updateControls: function () {
            this.updatePagination();
            this.checkNavigation();
            this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
        }, destroyControls: function () {
            this.owlControls && this.owlControls.remove()
        }, next: function (a) {
            if (this.isTransition) return !1;
            this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1;
            if (this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) if (!0 === this.options.rewindNav) this.currentItem = 0, a = "rewind"; else return this.currentItem = this.maximumItem, !1;
            this.goTo(this.currentItem, a)
        }, prev: function (a) {
            if (this.isTransition) return !1;
            this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ?
                this.options.items : 1);
            if (0 > this.currentItem) if (!0 === this.options.rewindNav) this.currentItem = this.maximumItem, a = "rewind"; else return this.currentItem = 0, !1;
            this.goTo(this.currentItem, a)
        }, goTo: function (a, b, e) {
            var c = this;
            if (c.isTransition) return !1;
            "function" === typeof c.options.beforeMove && c.options.beforeMove.apply(this, [c.$elem]);
            a >= c.maximumItem ? a = c.maximumItem : 0 >= a && (a = 0);
            c.currentItem = c.owl.currentItem = a;
            if (!1 !== c.options.transitionStyle && "drag" !== e && 1 === c.options.items && !0 === c.browser.support3d) return c.swapSpeed(0),
                !0 === c.browser.support3d ? c.transition3d(c.positionsInArray[a]) : c.css2slide(c.positionsInArray[a], 1), c.afterGo(), c.singleItemTransition(), !1;
            a = c.positionsInArray[a];
            !0 === c.browser.support3d ? (c.isCss3Finish = !1, !0 === b ? (c.swapSpeed("paginationSpeed"), g.setTimeout(function () {
                c.isCss3Finish = !0
            }, c.options.paginationSpeed)) : "rewind" === b ? (c.swapSpeed(c.options.rewindSpeed), g.setTimeout(function () {
                c.isCss3Finish = !0
            }, c.options.rewindSpeed)) : (c.swapSpeed("slideSpeed"), g.setTimeout(function () {
                    c.isCss3Finish = !0
                },
                c.options.slideSpeed)), c.transition3d(a)) : !0 === b ? c.css2slide(a, c.options.paginationSpeed) : "rewind" === b ? c.css2slide(a, c.options.rewindSpeed) : c.css2slide(a, c.options.slideSpeed);
            c.afterGo()
        }, jumpTo: function (a) {
            "function" === typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]);
            a >= this.maximumItem || -1 === a ? a = this.maximumItem : 0 >= a && (a = 0);
            this.swapSpeed(0);
            !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1);
            this.currentItem =
                this.owl.currentItem = a;
            this.afterGo()
        }, afterGo: function () {
            this.prevArr.push(this.currentItem);
            this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2];
            this.prevArr.shift(0);
            this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp());
            "function" === typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
        }, stop: function () {
            this.apStatus = "stop";
            g.clearInterval(this.autoPlayInterval)
        },
        checkAp: function () {
            "stop" !== this.apStatus && this.play()
        }, play: function () {
            var a = this;
            a.apStatus = "play";
            if (!1 === a.options.autoPlay) return !1;
            g.clearInterval(a.autoPlayInterval);
            a.autoPlayInterval = g.setInterval(function () {
                a.next(!0)
            }, a.options.autoPlay)
        }, swapSpeed: function (a) {
            "slideSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" !== typeof a && this.$owlWrapper.css(this.addCssSpeed(a))
        },
        addCssSpeed: function (a) {
            return {
                "-webkit-transition": "all " + a + "ms ease",
                "-moz-transition": "all " + a + "ms ease",
                "-o-transition": "all " + a + "ms ease",
                transition: "all " + a + "ms ease"
            }
        }, removeTransition: function () {
            return {"-webkit-transition": "", "-moz-transition": "", "-o-transition": "", transition: ""}
        }, doTranslate: function (a) {
            return {
                "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" +
                    a + "px, 0px, 0px)",
                transform: "translate3d(" + a + "px, 0px,0px)"
            }
        }, transition3d: function (a) {
            this.$owlWrapper.css(this.doTranslate(a))
        }, css2move: function (a) {
            this.$owlWrapper.css({left: a})
        }, css2slide: function (a, b) {
            var e = this;
            e.isCssFinish = !1;
            e.$owlWrapper.stop(!0, !0).animate({left: a}, {
                duration: b || e.options.slideSpeed, complete: function () {
                    e.isCssFinish = !0
                }
            })
        }, checkBrowser: function () {
            var a = k.createElement("div");
            a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
            a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
            this.browser = {
                support3d: null !== a && 1 === a.length,
                isTouch: "ontouchstart" in g || g.navigator.msMaxTouchPoints
            }
        }, moveEvents: function () {
            if (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) this.gestures(), this.disabledEvents()
        }, eventTypes: function () {
            var a = ["s", "e", "x"];
            this.ev_types = {};
            !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] :
                !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]);
            this.ev_types.start = a[0];
            this.ev_types.move = a[1];
            this.ev_types.end = a[2]
        }, disabledEvents: function () {
            this.$elem.on("dragstart.owl", function (a) {
                a.preventDefault()
            });
            this.$elem.on("mousedown.disableTextSelect", function (a) {
                return f(a.target).is("input, textarea, select, option")
            })
        },
        gestures: function () {
            function a(a) {
                if (void 0 !== a.touches) return {x: a.touches[0].pageX, y: a.touches[0].pageY};
                if (void 0 === a.touches) {
                    if (void 0 !== a.pageX) return {x: a.pageX, y: a.pageY};
                    if (void 0 === a.pageX) return {x: a.clientX, y: a.clientY}
                }
            }

            function b(a) {
                "on" === a ? (f(k).on(d.ev_types.move, e), f(k).on(d.ev_types.end, c)) : "off" === a && (f(k).off(d.ev_types.move), f(k).off(d.ev_types.end))
            }

            function e(b) {
                b = b.originalEvent || b || g.event;
                d.newPosX = a(b).x - h.offsetX;
                d.newPosY = a(b).y - h.offsetY;
                d.newRelativeX = d.newPosX - h.relativePos;
                "function" === typeof d.options.startDragging && !0 !== h.dragging && 0 !== d.newRelativeX && (h.dragging = !0, d.options.startDragging.apply(d, [d.$elem]));
                (8 < d.newRelativeX || -8 > d.newRelativeX) && !0 === d.browser.isTouch && (void 0 !== b.preventDefault ? b.preventDefault() : b.returnValue = !1, h.sliding = !0);
                (10 < d.newPosY || -10 > d.newPosY) && !1 === h.sliding && f(k).off("touchmove.owl");
                d.newPosX = Math.max(Math.min(d.newPosX, d.newRelativeX / 5), d.maximumPixels + d.newRelativeX / 5);
                !0 === d.browser.support3d ? d.transition3d(d.newPosX) : d.css2move(d.newPosX)
            }

            function c(a) {
                a = a.originalEvent || a || g.event;
                var c;
                a.target = a.target || a.srcElement;
                h.dragging = !1;
                !0 !== d.browser.isTouch && d.$owlWrapper.removeClass("grabbing");
                d.dragDirection = 0 > d.newRelativeX ? d.owl.dragDirection = "left" : d.owl.dragDirection = "right";
                0 !== d.newRelativeX && (c = d.getNewPosition(), d.goTo(c, !1, "drag"), h.targetElement === a.target && !0 !== d.browser.isTouch && (f(a.target).on("click.disable", function (a) {
                    a.stopImmediatePropagation();
                    a.stopPropagation();
                    a.preventDefault();
                    f(a.target).off("click.disable")
                }),
                    a = f._data(a.target, "events").click, c = a.pop(), a.splice(0, 0, c)));
                b("off")
            }

            var d = this, h = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null,
                minSwipe: null,
                maxSwipe: null,
                sliding: null,
                dargging: null,
                targetElement: null
            };
            d.isCssFinish = !0;
            d.$elem.on(d.ev_types.start, ".owl-wrapper", function (c) {
                c = c.originalEvent || c || g.event;
                var e;
                if (3 === c.which) return !1;
                if (!(d.itemsAmount <= d.options.items)) {
                    if (!1 === d.isCssFinish && !d.options.dragBeforeAnimFinish || !1 === d.isCss3Finish && !d.options.dragBeforeAnimFinish) return !1;
                    !1 !== d.options.autoPlay && g.clearInterval(d.autoPlayInterval);
                    !0 === d.browser.isTouch || d.$owlWrapper.hasClass("grabbing") || d.$owlWrapper.addClass("grabbing");
                    d.newPosX = 0;
                    d.newRelativeX = 0;
                    f(this).css(d.removeTransition());
                    e = f(this).position();
                    h.relativePos = e.left;
                    h.offsetX = a(c).x - e.left;
                    h.offsetY = a(c).y - e.top;
                    b("on");
                    h.sliding = !1;
                    h.targetElement = c.target || c.srcElement
                }
            })
        }, getNewPosition: function () {
            var a = this.closestItem();
            a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem =
                a = 0);
            return a
        }, closestItem: function () {
            var a = this, b = !0 === a.options.scrollPerPage ? a.pagesInArray : a.positionsInArray, e = a.newPosX,
                c = null;
            f.each(b, function (d, g) {
                e - a.itemWidth / 20 > b[d + 1] && e - a.itemWidth / 20 < g && "left" === a.moveDirection() ? (c = g, a.currentItem = !0 === a.options.scrollPerPage ? f.inArray(c, a.positionsInArray) : d) : e + a.itemWidth / 20 < g && e + a.itemWidth / 20 > (b[d + 1] || b[d] - a.itemWidth) && "right" === a.moveDirection() && (!0 === a.options.scrollPerPage ? (c = b[d + 1] || b[b.length - 1], a.currentItem = f.inArray(c, a.positionsInArray)) :
                    (c = b[d + 1], a.currentItem = d + 1))
            });
            return a.currentItem
        }, moveDirection: function () {
            var a;
            0 > this.newRelativeX ? (a = "right", this.playDirection = "next") : (a = "left", this.playDirection = "prev");
            return a
        }, customEvents: function () {
            var a = this;
            a.$elem.on("owl.next", function () {
                a.next()
            });
            a.$elem.on("owl.prev", function () {
                a.prev()
            });
            a.$elem.on("owl.play", function (b, e) {
                a.options.autoPlay = e;
                a.play();
                a.hoverStatus = "play"
            });
            a.$elem.on("owl.stop", function () {
                a.stop();
                a.hoverStatus = "stop"
            });
            a.$elem.on("owl.goTo", function (b, e) {
                a.goTo(e)
            });
            a.$elem.on("owl.jumpTo", function (b, e) {
                a.jumpTo(e)
            })
        }, stopOnHover: function () {
            var a = this;
            !0 === a.options.stopOnHover && !0 !== a.browser.isTouch && !1 !== a.options.autoPlay && (a.$elem.on("mouseover", function () {
                a.stop()
            }), a.$elem.on("mouseout", function () {
                "stop" !== a.hoverStatus && a.play()
            }))
        }, lazyLoad: function () {
            var a, b, e, c, d;
            if (!1 === this.options.lazyLoad) return !1;
            for (a = 0; a < this.itemsAmount; a += 1) b = f(this.$owlItems[a]), "loaded" !== b.data("owl-loaded") && (e = b.data("owl-item"), c = b.find(".lazyOwl"), "string" !== typeof c.data("src") ?
                b.data("owl-loaded", "loaded") : (void 0 === b.data("owl-loaded") && (c.hide(), b.addClass("loading").data("owl-loaded", "checked")), (d = !0 === this.options.lazyFollow ? e >= this.currentItem : !0) && e < this.currentItem + this.options.items && c.length && this.lazyPreload(b, c)))
        }, lazyPreload: function (a, b) {
            function e() {
                a.data("owl-loaded", "loaded").removeClass("loading");
                b.removeAttr("data-src");
                "fade" === d.options.lazyEffect ? b.fadeIn(400) : b.show();
                "function" === typeof d.options.afterLazyLoad && d.options.afterLazyLoad.apply(this,
                    [d.$elem])
            }

            function c() {
                f += 1;
                d.completeImg(b.get(0)) || !0 === k ? e() : 100 >= f ? g.setTimeout(c, 100) : e()
            }

            var d = this, f = 0, k;
            "DIV" === b.prop("tagName") ? (b.css("background-image", "url(" + b.data("src") + ")"), k = !0) : b[0].src = b.data("src");
            c()
        }, autoHeight: function () {
            function a() {
                var a = f(e.$owlItems[e.currentItem]).height();
                e.wrapperOuter.css("height", a + "px");
                e.wrapperOuter.hasClass("autoHeight") || g.setTimeout(function () {
                    e.wrapperOuter.addClass("autoHeight")
                }, 0)
            }

            function b() {
                d += 1;
                e.completeImg(c.get(0)) ? a() : 100 >= d ? g.setTimeout(b,
                    100) : e.wrapperOuter.css("height", "")
            }

            var e = this, c = f(e.$owlItems[e.currentItem]).find("img"), d;
            void 0 !== c.get(0) ? (d = 0, b()) : a()
        }, completeImg: function (a) {
            return !a.complete || "undefined" !== typeof a.naturalWidth && 0 === a.naturalWidth ? !1 : !0
        }, onVisibleItems: function () {
            var a;
            !0 === this.options.addClassActive && this.$owlItems.removeClass("active");
            this.visibleItems = [];
            for (a = this.currentItem; a < this.currentItem + this.options.items; a += 1) this.visibleItems.push(a), !0 === this.options.addClassActive && f(this.$owlItems[a]).addClass("active");
            this.owl.visibleItems = this.visibleItems
        }, transitionTypes: function (a) {
            this.outClass = "owl-" + a + "-out";
            this.inClass = "owl-" + a + "-in"
        }, singleItemTransition: function () {
            var a = this, b = a.outClass, e = a.inClass, c = a.$owlItems.eq(a.currentItem),
                d = a.$owlItems.eq(a.prevItem),
                f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem],
                g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;
            a.isTransition = !0;
            a.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": g + "px", "-moz-perspective-origin": g +
                    "px", "perspective-origin": g + "px"
            });
            d.css({
                position: "relative",
                left: f + "px"
            }).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
                a.endPrev = !0;
                d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                a.clearTransStyle(d, b)
            });
            c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
                a.endCurrent = !0;
                c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                a.clearTransStyle(c, e)
            })
        }, clearTransStyle: function (a,
                                      b) {
            a.css({position: "", left: ""}).removeClass(b);
            this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
        }, owlStatus: function () {
            this.owl = {
                userOptions: this.userOptions,
                baseElement: this.$elem,
                userItems: this.$userItems,
                owlItems: this.$owlItems,
                currentItem: this.currentItem,
                prevItem: this.prevItem,
                visibleItems: this.visibleItems,
                isTouch: this.browser.isTouch,
                browser: this.browser,
                dragDirection: this.dragDirection
            }
        }, clearEvents: function () {
            this.$elem.off(".owl owl mousedown.disableTextSelect");
            f(k).off(".owl owl");
            f(g).off("resize", this.resizer)
        }, unWrap: function () {
            0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove());
            this.clearEvents();
            this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
        }, destroy: function () {
            this.stop();
            g.clearInterval(this.checkVisible);
            this.unWrap();
            this.$elem.removeData()
        }, reinit: function (a) {
            a = f.extend({}, this.userOptions,
                a);
            this.unWrap();
            this.init(a, this.$elem)
        }, addItem: function (a, b) {
            var e;
            if (!a) return !1;
            if (0 === this.$elem.children().length) return this.$elem.append(a), this.setVars(), !1;
            this.unWrap();
            e = void 0 === b || -1 === b ? -1 : b;
            e >= this.$userItems.length || -1 === e ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(e).before(a);
            this.setVars()
        }, removeItem: function (a) {
            if (0 === this.$elem.children().length) return !1;
            a = void 0 === a || -1 === a ? -1 : a;
            this.unWrap();
            this.$userItems.eq(a).remove();
            this.setVars()
        }
    };
    f.fn.owlCarousel = function (a) {
        return this.each(function () {
            if (!0 ===
                f(this).data("owl-init")) return !1;
            f(this).data("owl-init", !0);
            var b = Object.create(l);
            b.init(a, this);
            f.data(this, "owlCarousel", b)
        })
    };
    f.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1E3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: g,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    }
})(jQuery, window, document);


"use strict";
if (!GY) {
    var GY = {};
    GY.host = {
        imgSource: "http://img.yao123.cn/",
        rethost: "http://" + window.location.host,
        main: "http://" + window.location.host,
        testParam: "testParam",
        usercenterUrl: "http://login.yao123.com/"
    }
}
GY.plat = GY.host.current_platform, GY.interface = {
    getChannel: {url: GY.host.main + "/cmowChannelAction.do", method: "getChannel"},
    getPrice: {url: GY.host.main + "/cmowStockAndPriceAction.do?", method: "getPrice"},
    checkStatus: {url: GY.host.main + "/cmowStockAndPriceAction.do", method: "checkStatus"},
    buyAgain: {url: GY.host.main + "/cmowTradeAction.do", method: "buyAgain"},
    leftStorey: {url: GY.host.main + "/cmowStoreyAction.do", method: "leftStorey"},
    skuPrice: {url: GY.host.main + "/cmowGoodsDetailAction.do", method: "skuPrice"},
    getHotLike: {url: GY.host.main + "/cmowChannelAction.do", method: "getHotLike"},
    ChannelList: {url: GY.host.main + "/cmowChannelAction.do", method: "getChannelList"},
    leftSideAd: {url: GY.host.main + "/product/leftSideAd"},
    detailAd: {url: GY.host.main + "/product/detailAd"},
    getLimit: {url: GY.host.main + "/cmowLimitedTimeLimitAction.do", method: "getLimit"},
    getNewsList: {url: GY.host.main + "/cmowNewsAction.do", method: "getNewsList"},
    getWebsiteNavigation: {url: GY.host.main + "/cmowWebsiteNavigationAdminAction.do", method: "getWebsiteNavigation"},
    getNewsDetails: {url: GY.host.main + "/cmowNewsAction.do", method: "getNewsDetails"},
    getStorey: {url: GY.host.main + "/cmowChannelAction.do", method: "getStorey"},
    Collection: {url: GY.host.main + "/cmowUserCollectionAction.do", method: "userCollection"},
    getStock: {url: GY.host.main + "/cmowStockAndPriceAction.do?", method: "getStock"},
    getMayNeed: {url: GY.host.main + "/cmowMayNeedAction.do", method: "getMayNeed"},
    getRecords: {url: GY.host.main + "/cmowTransactionRecordsAction.do", method: "getRecords"},
    getBrandShop: {url: GY.host.main + "/CmowBrandShopAction.do", method: "getBrandShop"},
    getFriendlyLink: {url: GY.host.main + "/CmowFriendlyLinkAction.do", method: "getFriendlyLink"},
    DaiXiaDanAction: {url: GY.host.main + "/cmowDaiXiaDanAction.do", method: "xiadan"},
    cmowFrontUserWatchRepeatAction: {
        url: GY.host.main + "/cmowFrontUserWatchRepeatAction.do",
        method: "getWatchRepeat"
    },
    getGoodSaleStatus: {url: GY.host.main + "/cmowStockAndPriceAction.do", method: "getGoodSaleStatus"},
    skuGroupLs: {url: GY.host.main + "/cmowGoodsDetailAction.do", method: "skuGroup"},
    getGoodsSales: {url: GY.host.main + "/cmowGoodsDetailAction.do", method: "goodsSku"},
    getGroupSales: {url: GY.host.main + "/cmowGoodsDetailAction.do", method: "groupSku"},
    getOwnCategories: {url: GY.host.goods + "/goodsCenter-interface-gwFront/service/baseData/getOwnCategories"},
    hotWord: {url: GY.host.main + "/cmowSuggestWordAdminAction.do", method: "hotWord"},
    getGoods: {url: GY.host.search + "/search/cmowGoodRetrievalAdminAction.do", method: "getGoods"},
    getGoodsSort: {url: GY.host.search + "/search/cmowGoodRetrievalAdminAction.do", method: "getGoodsSort"},
    getWatchRepeat: {url: GY.host.main + "/cmowFrontUserWatchRepeatAction.do", method: "getWatchRepeat"},
    getTypeInfo: {url: GY.host.search + "/search/cmowGoodRetrievalAdminAction.do", method: "getTypeInfo"},
    getTypeInfoCategory: {url: GY.host.search + "/search/cmowCategorySearchAdminAction.do", method: "getTypeInfo"},
    getGoodsSortCategory: {url: GY.host.search + "/search/cmowCategorySearchAdminAction.do", method: "getGoodsSort"},
    getGoodsCategory: {url: GY.host.search + "/search/cmowCategorySearchAdminAction.do", method: "getGoods"},
    getParam: {url: GY.host.main + "/cmowHelpAction.do", method: "getParam"},
    getUser: {url: GY.host.main + "/getUser"},
    login: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "frontUserLogin"},
    code4register: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "userGetTelPhoneIdentifyingCode"},
    code4login: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "getTelIdentifyingCode"},
    code4image: {url: GY.host.main + "/cmowFrontUserAccountInfoAction.do", method: "getIdentifyingCode"},
    checkCode: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "checkTelIdentifyingCode"},
    register4phone: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "useTelphoneRegister"},
    beforeUpdateEmailCheck: {
        url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do",
        method: "beforeUpdateEmailCheck"
    },
    beforeUpdatePasswordCheck: {
        url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do",
        method: "beforeUpdatePasswordCheck"
    },
    sendUpdatePswdEmail: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "sendUpdatePswdEmail"},
    sendUpdatePswdEmailYH: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "sendUpdatePswdEmail"},
    updateEmail: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "updateEmail"},
    updateOrValidateEmail: {
        url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do",
        method: "updateOrValidateEmail"
    },
    updateOrValidateEmailYH: {
        url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do",
        method: "updateOrValidateEmail"
    },
    checkUserEmail: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "checkUserEmail"},
    checkUserEmailYH: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "checkUserEmail"},
    checkMail: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "checkUserEmail"},
    sendMail: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "getSendEmailFlag"},
    register4mail: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "userEmailRegister"},
    automaticLogin: {url: GY.host.usercenterUrl + "/userAccountInfoAction.do", method: "automaticLogin"},
    addShopCar: {url: GY.host.main + "/cmowShopCarAction.do", method: "addShopCar"},
    changeNum: {url: GY.host.main + "/cmowShopCarAction.do", method: "changeNum"},
    delShopCar: {url: GY.host.main + "/cmowShopCarAction.do", method: "delShopCar"},
    carCollection: {url: GY.host.main + "/cmowUserCollectionAction.do", method: "carCollections"},
    checkCar: {url: GY.host.main + "/cmowShopCarAction.do", method: "checkCar"},
    userCar: {url: GY.host.main + "/cmowShopCarAction.do", method: "userCar"},
    carNum: {url: GY.host.main + "/cmowShopCarAction.do", method: "carNum"},
    MyCollectiond: {url: GY.host.main + "/CmowFrontUserAddressAction.do"},
    checkStock: {url: GY.host.main + "/cmowStockAndPriceAction.do", method: "checkStock"},
    getUserCollection: {url: GY.host.main + "/cmowUserCollectionAction.do", method: "getUserCollection"},
    getMyAddress: {url: GY.host.main + "/CmowFrontUserAddressAction.do", method: "getMyAddress"},
    saveAddress: {url: GY.host.main + "/CmowFrontUserAddressAction.do", method: "saveAddress"},
    updateAddress: {url: GY.host.main + "/CmowFrontUserAddressAction.do", method: "updateAddress"},
    deleteAddress: {url: GY.host.main + "/CmowFrontUserAddressAction.do", method: "deleteAddress"},
    setDefaultAddress: {url: GY.host.main + "/CmowFrontUserAddressAction.do", method: "setDefaultAddress"},
    figureCar: {url: GY.host.main + "/cmowShopCarAction.do", method: "figureCar"},
    getUserInvoices: {url: GY.host.main + "/cmowUserInvoicesTitleAction.do", method: "getUserInvoices"},
    delUserInvoices: {url: GY.host.main + "/cmowUserInvoicesTitleAction.do", method: "delUserInvoices"},
    updateUserInvoices: {url: GY.host.main + "/cmowUserInvoicesTitleAction.do", method: "updateUserInvoices"},
    saveUserInvoices: {url: GY.host.main + "/cmowUserInvoicesTitleAction.do", method: "saveUserInvoices"},
    saveTrade: {url: GY.host.main + "/cmowTradeAction.do", method: "saveTrade"},
    getPostFee: {url: GY.host.main + "/cmowTradeAction.do", method: "getPostFee"},
    getCanUseCard: {url: GY.host.main + "/cmowB2cCouponAction.do", method: "getCanUseCard"},
    goodGroupDetail: {url: GY.host.main + "/cmowGoodAndGroupDetailAction.do", method: "goodGroupDetail"},
    getTradeByNo: {url: GY.host.main + "/cmowTradeAction.do", method: "getTradeByNo"},
    frontUserHomePage1: {url: GY.host.main + "/cmowFrontUserInformationAction.do", method: "frontUserHomePage"},
    getActivePayPlatformPromotionList: {
        url: GY.host.main + "/cmowTradeAction.do",
        method: "getActivePayPlatformPromotionList"
    },
    getPromotionPrice: {url: GY.host.main + "/cmowTradeAction.do", method: "getPromotionPrice"},
    checkIsPay: {url: GY.host.main + "/cmowTradeAction.do", method: "checkIsPay"},
    checkUserTelphone: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "checkUserTelphone"},
    updateValidateTel: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "updateValidateTel"},
    updateValidateTelYH: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "updateValidateTel"},
    updatePassword: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "updatePassword"},
    updatePasswordYH: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "updatePassword"},
    bugAgain: {url: GY.host.main + "/cmowTradeAction.do", method: "bugAgain"},
    checkTrade: {url: GY.host.main + "/cmowTradeAction.do", method: "checkTrade"},
    cancelTrade: {url: GY.host.main + "/cmowTradeAction.do", method: "cancelTrade"},
    getUserCoupon: {url: GY.host.main + "/cmowB2cCouponAction.do", method: "getUserCoupon"},
    drawCoupon: {url: GY.host.main + "/cmowB2cCouponAction.do", method: "drawCoupon"},
    accountindex: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "index"},
    getTradeById: {url: GY.host.main + "/cmowTradeAction.do", method: "getTradeById"},
    saveFeedBack: {url: GY.host.main + "/cmowFeedBackAction.do", method: "saveFeedBack"},
    getExpress: {url: GY.host.main + "/cmowExpressAction.do", method: "getExpress"},
    getExpressDetail: {url: GY.host.main + "/cmowExpressAction.do", method: "getExpressDetail"},
    MyCollection: {url: GY.host.main + "/cmowUserCollectionAction.do", method: "getMyCollection"},
    deleteMyCollection: {url: GY.host.main + "/cmowUserCollectionAction.do", method: "deleteMyCollection"},
    frontUserHomePage: {url: GY.host.main + "/cmowFrontUserInformationAction.do?", method: "getFrontUserInformation"},
    updateFrontUserInformation: {
        url: GY.host.main + "/cmowFrontUserInformationAction.do?",
        method: "updateFrontUserInformation"
    },
    upload: {url: GY.host.main + "/cmowFrontUserInformationAction.do?", method: "upload"},
    getTradeByUser: {url: GY.host.main + "/cmowTradeAction.do", method: "getTradeByUser"},
    userCollection: {url: GY.host.main + "/cmowUserCollectionAction.do", method: "userCollection"},
    getTelPhoneIdentifyCode: {
        url: GY.host.usercenterUrl + "/userAccountSafetyAction.do",
        method: "getTelPhoneIdentifyCode"
    },
    getTelPhoneIdentifyCodeYH: {
        url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do",
        method: "getTelPhoneIdentifyCode"
    },
    findUserByName: {url: GY.host.usercenterUrl + "/userAccountSafetyAction.do", method: "findUserByName"},
    findUserByNameYH: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "findUserByName"},
    checkTelValidateCode: {url: GY.host.usercenterUrl + "/userAccountSafetyAction.do", method: "checkTelValidateCode"},
    checkTelValidateCodeYH: {
        url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do",
        method: "checkTelValidateCode"
    },
    resetPassword: {url: GY.host.usercenterUrl + "/userAccountSafetyAction.do", method: "resetPassword"},
    resetPasswordYH: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "resetPassword"},
    findBackPswdByTel: {url: GY.host.usercenterUrl + "/userAccountSafetyAction.do", method: "findBackPswdByTel"},
    findBackPswdByTelYH: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "findBackPswdByTel"},
    findBackPswdByEmail: {url: GY.host.usercenterUrl + "/userAccountSafetyAction.do", method: "findBackPswdByEmail"},
    findBackPswdByEmailYH: {url: GY.host.main + "/cmowFrontUserAccountSafetyAction.do", method: "findBackPswdByEmail"},
    beforeResetPasswordCheck: {
        url: GY.host.usercenterUrl + "/userAccountSafetyAction.do",
        method: "beforeResetPasswordCheck"
    },
    userDemandOrder: {url: GY.host.main + "/cmowDemandOrderAction.do", method: "userDemandOrder"}
}, GY.settings = {defaultImg: "/static/image/base/default.jpg"};
var returnUrlEn = encodeURIComponent(GY.host.main) + encodeURIComponent("/usercenterLogin");

function genId(o) {
    return (o || "GY") + ++GY.idSeed
}

function regular() {
    return {
        isphone: function (o) {
            return /^(13[0-9]|15[012356789]|18[0123456789]|14[0123456789]|166|199|17[0-9])\d{8}$/.test(o)
        }, ismall: function (o) {
            return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(o)
        }, isTel: function (o) {
            return /^0\d{2,3}-?\d{7,8}$/.test(o)
        }
    }
}

GY.loginReturnUrl = GY.host.usercenterUrl + "/login?plat=" + GY.plat + "&returnUrl=" + returnUrlEn + "&retUrl=" + encodeURIComponent(window.location.href), GY.io = function (o) {
    return $.ajax({url: o.url, data: o.data || {}, dataType: "json"})
}, GY.iop = function (o) {
    return $.ajax({url: o.url, data: o.data || {}, dataType: "jsonp"})
}, GY.iophtml = function (o) {
    return $.ajax({url: o.url, data: o.data || {}, dataType: "html", jsonp: "jsonpcallback"})
}, GY.iopa = function (o) {
    return $.ajax({url: o.url, async: !1, data: o.data || {}, dataType: "jsonp"})
}, GY.iopost = function (o) {
    return $.ajax({url: o.url, type: "POST", data: o.data || {}, dataType: "jsonp"})
}, GY.iopw = function (o, e) {
    return $.ajax({url: o.url, data: o.data || {}, dataType: "jsonp"}).done(function (o) {
        GY.apistatus(o, e)
    }).fail(function (o) {
    })
}, GY.apistatus = function () {
    var o = arguments[0], e = arguments[1];
    switch (o.status) {
        case 0:
            e(o);
            break;
        case-3:
            window.location.href = o.data;
            break;
        case-2:
            GY.dialogInfo({title: "错误信息", text: o.msg, auto: 3e3, fooder: "closed"});
            break;
        default:
            GY.dialogInfo({title: "信息", text: o.msg, auto: 3e3, fooder: "closed"})
    }
}, GY.getUrlQuery = function (o) {
    var e = new RegExp("(^|&)" + o + "=([^&]*)(&|$)"), t = window.location.search.substr(1).match(e);
    return null != t ? decodeURIComponent(t[2]) : null
}, GY.idSeed = 0, GY.dialogInfo = function (o, e) {
    var t = $.extend({title: "提示", cls: "", auto: !1, id: ""}, o), n = genId("dialog");

    function r(o) {
        $(o).parents(".dialogInfo").detach(), $("#mask").detach()
    }

    $("body").append(function (o) {
        var e = [];
        e.push('<div class="dialogInfo dialog dialogP' + t.cls + '" id="' + o + '"><div class="mask"></div>'), e.push('<div class="dialog-content date ' + t.cls + '">'), e.push('<div class="dialog-header">' + t.title + "<i data-closed></i></div>"), e.push('<div class="dialog-body"><p>' + t.text + "</p></div>"), e.push('<div class="dialog-action">'), 1 == t.fooder && (e.push('<span data-enter class="btn">确定</span>'), e.push('<span data-closed class="btn ml12">取消</span>'));
        "closed" == t.fooder && e.push('<div style="width:100%; text-align:center;"><span data-closed class="btn">确定</span></div>');
        return e.push("</div>"), e.push("</div></div>"), e.join("")
    }(n)), !0 === t.isMask && $("body").append('<div id="mask"></div>'), $(".dialogInfo").on("click", "[data-enter]", r).on("click", "[data-closed]", function () {
        r(this)
    }), !1 !== t.auto && setTimeout(function () {
        $("#" + n).detach()
    }, t.auto), e && e()
}, GY.GetUrlParms = function (o) {
    for (var e = new Object, t = o.split("&"), n = 0; n < t.length; n++) {
        var r = t[n].indexOf("=");
        if (-1 != r) {
            var a = t[n].substring(0, r), d = t[n].substring(r + 1).replace(new RegExp(/(%)/g), "%25");
            e[a] = unescape(d)
        }
    }
    return e
}, GY.UrlParamDel = function (o, e) {
    var t = "";
    if (-1 == o.indexOf("?")) return o;
    var n = "", r = "";
    if (-1 != (t = o.substr(o.indexOf("?") + 1)).indexOf("&")) {
        for (var a in n = t.split("&")) n[a].split("=")[0] != e && (r = r + n[a].split("=")[0] + "=" + n[a].split("=")[1] + "&");
        return o.substr(0, o.indexOf("?")) + "?" + r.substr(0, r.length - 1)
    }
    return (n = t.split("="))[0] == e ? o.substr(0, o.indexOf("?")) : o
}, GY.UrlUpdateParams = function (url, name, value) {
    var r = url;
    if (null != r && "undefined" != r && "" != r) {
        value = encodeURIComponent(value);
        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)"), tmp = name + "=" + value;
        r = null != url.match(reg) ? url.replace(eval(reg), tmp) : url.match("[?]") ? url + "&" + tmp : url + "?" + tmp
    }
    return r
}, function (d) {
    d.fn.extend({
        getUseCard: function (n) {
            n = d.extend({
                zhucehtml: "<div>1</div>",
                zhucehtml1: "<div>2</div>",
                zhucehtml2: "<div>3</div>",
                zhucehtml3: "<div>4</div>",
                zhucehtml4: "<div>5</div>",
                zhucehtml5: "<div>6</div>"
            }, n), d(this).find("a");

            function a(o, e) {
                var t = [];
                switch (t.push('<div class="tan dialog-wrap">'), t.push('<div class="close closece" style="background-color:#ffffff;"></div>'), o) {
                    case 1:
                        t.push(n.zhucehtml);
                        break;
                    case 2:
                        t.push(n.zhucehtml1);
                        break;
                    case 21:
                        t.push(n.zhucehtml2);
                        break;
                    case 3:
                        t.push(n.zhucehtml3);
                        break;
                    case 31:
                        t.push(n.zhucehtml4);
                        break;
                    case 5:
                        t.push(n.zhucehtml5);
                        break;
                    case 6:
                        t.push(n.zhucehtml6)
                }
                return t.push("</div>"), t.join("")
            }

            return this.each(function () {
                var o = d(this);
                d("a", o).click(function () {
                    var o = d(this).attr("dataid"), r = d(this).attr("databtn");
                    GY.iop({
                        url: GY.interface.drawCoupon.url,
                        data: {method: GY.interface.drawCoupon.method, issueId: o}
                    }).done(function (o) {
                        if (-3 == o.status) {
                            var e = encodeURIComponent(GY.host.main + "/usercenterLogin"),
                                t = encodeURIComponent(window.location.href),
                                n = GY.host.usercenterUrl + "/login?plat=" + GY.plat + "&returnUrl=" + e + "&retUrl=" + t;
                            window.location.href = n
                        }
                        0 == o.status && (0 == o.data.resultCode && (1 == r ? d(".body").append(a(2, o.rethost)) : 2 == r ? d(".body").append(a(21, o.rethost)) : 3 == r && d(".body").append(a(31, o.rethost))), 1 == o.data.resultCode && d(".body").append(a(3, o.rethost)), -3 == o.data.resultCode && d(".body").append(a(5, o.rethost)), 4 != o.data.resultCode && 5 != o.data.resultCode || d(".body").append(a(6, o.rethost)), d(document).on("click", ".close", function () {
                            d(".dialog-wrap").hide()
                        }))
                    })
                })
            })
        }
    })
}(jQuery), GY.getDataParams = function (o) {
    var e = GY.GetUrlParms(location.search.substring(1));
    if (void 0 !== e[o]) return e[o]
}, GY.replaceChart = function (o) {
    return o.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/\n/g, "<br/>").replace(/\//g, "&frasl;").replace(/\\/g, "&frasl;")
}, GY.toDecimal2 = function (o) {
    var e = parseFloat(o);
    if (isNaN(e)) return !1;
    var t = (e = Math.round(100 * o) / 100).toString(), n = t.indexOf(".");
    for (n < 0 && (n = t.length, t += "."); t.length <= n + 2;) t += "0";
    return t
}, GY.shopListLoad = function () {
    $("[data-closed]").click(function () {
        window.location.href = GY.host.main + "/shopCar"
    })
};


function tab() {
    var i = $(this).attr("tab-target"), t = $(this).attr("color");
    tabsArrow.animate({
        left: move + 200 * i,
        borderBottomColor: t
    }, 200), tabsContent.find("ul").eq(i).removeClass("hide").siblings("ul").addClass("hide")
}

function time() {
}

function getLimit() {
    var i = [];
    GY.iop({url: GY["interface"].getLimit.url, data: {method: "getLimit"}}).done(function (t) {
        function e(i) {
            for (var t = /\d+/g, e = new Array; null != (r = t.exec(i));) e.push(parseInt(r));
            var o = 0, a = 0;
            return 4 == e.length && (o += 24 * e[0] * 3600, a = 1), o += 3600 * e[a] + 60 * e[++a] + e[++a]
        }

        function o(i) {
            var t = i % 60;
            i = (i - t) / 60;
            var e = i % 60;
            i = (i - e) / 60;
            var o = i % 24, a = (i - o) / 24, s = [];
            return a > 0 && s.push('<span class="timedaye">' + a.toString() + "</span><span>天</span>"), s.push('<span class="timeday">' + o.toString().substr(-2) + "</span><span>时</span>"), s.push('<span class="timeh">' + e.toString().substr(-2) + "</span><span>分</span>"), s.push('<span class="times">' + t.toString().substr(-2) + "</span><span>秒</span>"), s.join(""), s
        }

        if (0 == t.status && "nodata" != t.data) {
            var a = t.data.presentTime, s = t.data.endTime, n = new Date(s.replace(new RegExp(/(-)/g), "/")),
                l = new Date(a.replace(new RegExp(/(-)/g), "/")), p = new Date(n.valueOf() + 864e5),
                c = new Date(l.valueOf() + 864e5), d = p.getTime() - c.getTime(),
                u = Math.floor(d / 1e3 / 60 / 60 / 24), h = Math.floor(d / 1e3 / 60 / 60 % 24),
                f = Math.floor(d / 1e3 / 60 % 60), g = Math.floor(d / 1e3 % 60);
            i.push('<div class="timelimit">'), i.push('<div class="timelimit_tit">'), i.push("<p>限时抢购</p>"), i.push('<div class="fl limittime"><div class="sysj fl">剩余时间：</div><div class="fl" id="timebox"></div></div>'), i.push('<div class="limitPage"><span class="limitpage_this">1</span>/<span class="limitpage_zong">3</span></div>'), i.push("</div>"), i.push('<div class="product">'), i.push('<ul class="goods-list">'), $.each(t.data.productList, function (t, e) {
                i.push("<li>"), i.push('<a href="' + GY.host.rethost + "/product/" + e.gcGoodId + "_" + e.type + '"  class="limitimg" target="_blank"><img src="' + GY.host.imgSourceSku + e.imgUrl + '@!m145"/></a>'), i.push('<a href="' + GY.host.rethost + "/product/" + e.gcGoodId + "_" + e.type + '" class="text-overflow" target="_blank">' + e.goodName + "</a>"), i.push("<p>"), i.push('<span class="opr"><em class="rmb">¥</em>' + e.salePirce.toFixed(2) + "</span>"), i.push('<span class="cpr"><em class="rmb">¥</em>' + e.referencePirce.toFixed(2) + "<i></i></span>"), i.push("</p>"), i.push("</li>")
            }), i.push("</ul>"), i.push("</div>"), i.push("</div>"), $("#special").before(i.join("")), $(".goods-list").owlCarousel({
                items: 6,
                singleItem: !1,
                slideSpeed: 400,
                paginationSpeed: 400,
                rewindSpeed: 400,
                autoPlay: !1,
                navigation: !0,
                pagination: !0,
                afterMove: function () {
                    $(".limitpage_this").text($(".index .timelimit .product .owl-pagination .active").prevAll().size() + 1)
                },
                navigationText: ["", ""]
            });
            var m = ($(".index .timelimit .product .owl-pagination .owl-page").length, $(".index .timelimit .product .owl-pagination .owl-page").size());
            $(".limitpage_zong").text(m), $(".limitpage_this").text(), $(".index .timelimit .product .owl-pagination .owl-page").size(), $("#timebox").text(u + "天" + h + "时" + f + "分" + g + "秒"), 1 == m && $(".limitPage").hide();
            var v = setInterval(function () {
                var i = $("#timebox"), t = i.text(), a = e(t) - 1;
                a >= 0 ? i.html(o(a)) : clearInterval(v)
            }, 1e3)
        }
    })
}

$(document).ready(function () {
    function i(i) {
        o = i, $("#lunbonum li").eq(i).addClass("lunboone").siblings().removeClass(), e.eq(i).siblings().stop().animate({opacity: 0}, 400).css({flter: "Alpha(Opacity=0)"}), e.eq(i).stop().animate({opacity: 1}, 400).css({flter: "Alpha(Opacity=100)"}), e.eq(i).css("z-index", "3").siblings().css("z-index", "1")
    }

    function t() {
        o++, o == $("#lunbonum li").length && (o = 0), i(o)
    }

    var e = ($("#lunbonum li"), $("#flipback .item")), o = ($("#flipback div img"), $(".flipcenter b"), 0),
        a = [];
    $.each(e, function (i, t) {
        a.push("<li></li>")
    }), $("#lunbonum").html(a.join("")), $("#lunbonum li:first").addClass("lunboone"), $("#flipback div:first").css("opacity", "1").siblings().css("z-index", "0"), $("#lunbonum li").each(function (t) {
        $(this).on("mouseover", function () {
            i(t)
        })
    });
    var s = setInterval(t, 4e3);
    $("#lunbonum li").hover(function () {
        clearInterval(s)
    }, function () {
        s = setInterval(t, 4e3)
    })
}), $(".switch_Promotion").click(function () {
    $(this).addClass("cur").siblings().removeClass("cur"), $(".tab_content > div").hide().eq($(".switch_Promotion").index(this)).show(), $(".notice").hasClass("cur") ? $(".switch_more").show() : $(".switch_more").hide()
}), $("[floorslider]").owlCarousel({
    navigation: !1,
    slideSpeed: 300,
    paginationSpeed: 400,
    rewindSpeed: 10,
    singleItem: !0,
    autoPlay: !0
}), $(".floorad").owlCarousel({
    navigation: !1,
    slideSpeed: 300,
    paginationSpeed: 400,
    rewindSpeed: 10,
    singleItem: !0,
    autoPlay: !0
}), $(".lb_gww").owlCarousel({
    navigation: !1,
    slideSpeed: 300,
    paginationSpeed: 400,
    rewindSpeed: 10,
    singleItem: !0,
    autoPlay: !0
}), $(".recommended-list").owlCarousel({
    items: 5,
    navigation: !1,
    slideSpeed: 300,
    paginationSpeed: 400,
    rewindSpeed: 10,
    singleItem: !1,
    autoPlay: !1,
    scrollPerPage: !0
});
var tabsArrow = $(".tab-line-arrow"), tabsContent = $(".product"), tabs = $("[tab-target]"), move = 93, arrycode = [];
tabs.on("mouseenter", tab), tabs.eq(0).trigger("mouseenter"), $(".cong_ul li").each(function () {
    var i = {}, t = $(this).attr("cong"), e = $(this).attr("tp");
    $(this).find(".price_opr"), $(this), $(this).find(".xjzt");
    i.goodCode = t, i.type = e, arrycode.push(i)
});
for (var tab_price = $(".cong_ul li .price_opr"), i = 0; i < tab_price.length; i++) $(".cong_ul li .price_opr:eq(" + i + ")").attr("tit", i);
var bc = JSON.stringify(arrycode), pricehtml = [];
GY.iop({url: GY["interface"].getPrice.url, data: {method: "getPriceList", params: bc}}).done(function (i) {
    $.each(i.data, function (i, t) {
        0 == t.isPromotion ? 1 == t.goodsTypeTarget ? $(".cong_ul .price_opr[tit=" + i + "]").text("价格待定") : $(".cong_ul .price_opr[tit=" + i + "]").html("<span>￥" + t.promotionPriceStr + '</span><span class="sellingPrice">￥' + t.sellingPriceStr + "</span>") : 1 == t.isPromotion && (1 == t.goodsTypeTarget ? $(".cong_ul .price_opr[tit=" + i + "]").text("价格待定") : $(".cong_ul .price_opr[tit=" + i + "]").text("￥" + t.sellingPriceStr))
    })
}), getLimit(), $.fn.floornav = function () {
    function i(i) {
        var t = [];
        GY.iopa({
            url: GY["interface"].leftStorey.url,
            data: {method: GY["interface"].leftStorey.method, id: 14}
        }).done(function (i) {
            t.push('<div class="rf_menu" id="skipfloor" style="display:none;">'), t.push('<div class="menu">'), t.push('<div class="floornav_top"><a data-slide="1" onClick="gotofloor(this);" href="javascript:void(0);">导航</a></div>'), t.push('<ul class="navigation">'), $.each(i.data, function (i, e) {
                t.push("<li data-floor=" + e.id + " floorid=" + (i + 1) + ">"), t.push('<a class="etitle1" href="#' + e.id + '">' + (i + 1) + "F</a>"), t.push('<a href="#' + e.id + '" class="etitle">' + e.anotherName + "</a>"), t.push("</li>")
            }), t.push("</ul>"), t.push('<div class="downbo"><a href="javascript:void(0);">回到顶部</a></div>'), t.push("</div></div>"), $("body").append(t.join(""))
        }), i(t)
    }

    i(function () {
        var i = "", t = $(".index").find(".floor");
        $(window).scroll(function (e) {
            var o = $(document).scrollTop(), a = $(".navigation li");
            $(window).scrollTop() > 100 ? $("#skipfloor").show() : $(window).scrollTop() < 100 && $("#skipfloor").hide();
            var o = $(this).scrollTop(), s = $(document).height(), n = $(this).height();
            300 > s - (o + n) && $("#skipfloor").hide(), t.each(function () {
                var t = $(this), e = t.offset().top;
                o > e - 450 && (i = t.attr("floor"))
            }), a.each(function (t, e) {
                i == $(this).attr("floorid") && $(this).addClass("floorclass").siblings().removeClass("floorclass")
            }), $(window).scrollTop() < $(".index .floor[fid=70]").offset().top - 50 ? $(".navigation li[floorid=1]").removeClass("floorclass") : $(window).scrollTop() > $(".index .floor[fid=70]").offset().top
        }), $(document).on("click", ".navigation li", function () {
            var i = $(this).attr("floorid"), t = $(".index .floor[floor=" + i + "]").offset().top - 50;
            $("html,body").animate({scrollTop: t}, 500)
        }), $(document).on("click", ".downbo", function () {
            $("body,html").animate({scrollTop: 0}, 500)
        })
    })
}, $.fn.getPriceList = function () {
    var i = [];
    $(".floor_jg").each(function () {
        var t = {}, e = $(this).attr("floor_jg"), o = ($(this).attr("isret"), $(this).attr("tpi"));
        $(this).find(".price_opr"), $(this).find(".xjzt"), $(this);
        t.goodCode = e, t.type = o, i.push(t)
    });
    for (var t = $(".floor_jg .price_opr"), e = 0; e < t.length; e++) $(".floor_jg .price_opr:eq(" + e + ")").attr("tit", e);
    var o = JSON.stringify(i);
    GY.iop({url: GY["interface"].getPrice.url, data: {method: "getPriceList", params: o}}).done(function (i) {
        $.each(i.data, function (i, t) {
            0 == t.isPromotion ? 1 == t.goodsTypeTarget ? $(".floor_jg .price_opr[tit=" + i + "]").text("价格待定") : $(".floor_jg .price_opr[tit=" + i + "]").html("<span>￥" + t.promotionPriceStr + '</span><span class="sellingPrice">￥' + t.sellingPriceStr + "</span>") : 1 == t.isPromotion && (1 == t.goodsTypeTarget ? $(".floor_jg .price_opr[tit=" + i + "]").text("价格待定") : $(".floor_jg .price_opr[tit=" + i + "]").text("￥" + t.sellingPriceStr))
        })
    })
}, $.fn.getPriceList(), $.fn.floornav(), $.fn.headerSet({
    isIndex: "1",
    hot: "1",
    search: "1",
    miniShop: "1",
    isAdbox: "1"
});