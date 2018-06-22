window.App = function() {
    var A = function(a, b, c) {
        var d = function(a, b, c) {
            var d = new Date;
            b = escape(b);
            d.setDate(d.getDate() + c);
            b += null === c ? "" : "; expires\x3d" + d.toUTCString();
            document.cookie = a + "\x3d" + b
        };
        return {
            haveSupport: null,
            support: function() {
                if (null === this.haveSupport)
                    try {
                        a.setItem("test", 1),
                        this.haveSupport = 1 == a.getItem("test"),
                        a.removeItem("test")
                    } catch (e) {
                        this.haveSupport = !1
                    }
                return this.haveSupport
            },
            get: function(c) {
                if (this.support())
                    c = a.getItem(c);
                else
                    a: {
                        c = b + c;
                        var d, e, q, v = document.cookie.split(";");
                        for (d = 0; d < v.length; d++)
                            if (e = v[d].substr(0, v[d].indexOf("\x3d")),
                            q = v[d].substr(v[d].indexOf("\x3d") + 1),
                            e = e.replace(/^\s+|\s+$/g, ""),
                            e == c) {
                                c = unescape(q);
                                break a
                            }
                        c = void 0
                    }
                void 0 === c && (c = null);
                try {
                    return JSON.parse(c)
                } catch (N) {
                    return null
                }
            },
            set: function(e, f) {
                f = JSON.stringify(f);
                this.support() ? a.setItem(e, f) : d(b + e, f, c)
            },
            remove: function(c) {
                this.support() ? a.removeItem(c) : d(b + c, "", -1)
            }
        }
    }
      , J = function(a, b, c) {
        var d = new XMLHttpRequest;
        d.open("GET", a, !0);
        d.responseType = "arraybuffer";
        d.onload = function(a) {
            4 == d.readyState && (200 == d.status ? d.response && (a = new Uint8Array(d.response),
            b(a)) : c && c())
        }
        ;
        d.send(null)
    }
      , K = function(a, b) {
        try {
            return new ImageData(a,b)
        } catch (d) {
            var c = document.createElement("canvas");
            c.width = a;
            c.height = b;
            return c.getContext("2d").getImageData(0, 0, a, b)
        }
    }
      , u = function() {
        window.ga && window.ga.apply(this, arguments)
    }
      , r = navigator.userAgent
      , w = function() {
        var a = function(a, c, d, e) {
            var b = document.createElement("div");
            return c && (b.style.imageRendering = a + "crisp-edges",
            b.style.imageRendering === a + "crisp-edges") || d && (b.style.imageRendering = a + "pixelated",
            b.style.imageRendering === a + "pixelated") || e && (b.style.imageRendering = a + "optimize-contrast",
            b.style.imageRendering === a + "optimize-contrast") ? !0 : !1
        };
        return a("", !0, !0, !1) || a("-o-", !0, !1, !1) || a("-moz-", !0, !1, !1) || a("-webkit-", !0, !1, !0)
    }()
      , B = !1
      , x = r.match(/(iPod|iPhone|iPad)/i) && r.match(/AppleWebKit/i)
      , M = r.match(/safari/i) && !r.match(/chrome/i)
      , r = -1 < r.indexOf("Edge");
    x ? (x = parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || !1,
    w = !1,
    11 <= x && (B = !0)) : M && (w = !1,
    B = !0);
    r && (w = !1);
    var g = A(localStorage, "ls_", 99)
      , C = A(sessionStorage, "ss_", null)
      , m = function() {
        var a = {
            params: {},
            initialized: !1,
            _trigger: function(a, c, d) {
                $(window).trigger("pxls:queryUpdated", [a, c, d])
            },
            _update: function(b) {
                var c = window.location.hash.substring(1);
                0 < window.location.search.length && (c += "\x26" + window.location.search.substring(1));
                var d = {};
                c.split("\x26").forEach(function(a) {
                    a = a.split("\x3d");
                    var b = a.shift().toLowerCase();
                    b.length && (d[b] = a.shift())
                });
                for (var e = Object.keys(d), c = 0; c < e.length; c++) {
                    var f = e[c]
                      , F = d[f];
                    if (!0 === b) {
                        if (!a.params.hasOwnProperty(f) || a.params[f] !== d[f]) {
                            var q = a.params[f];
                            a.params[f] = null == d[f] ? null : d[f].toString();
                            a._trigger(f, q, F)
                        }
                    } else
                        a.params.hasOwnProperty(f) || (a.params[f] = d[f])
                }
                !0 === b && Object.keys(a.params).filter(function(a) {
                    return !e.includes(a)
                }).forEach(function(b) {
                    return a.remove(b)
                });
                window.location.search.substring(1) && (window.location = window.location.pathname + "#" + a.getStr())
            },
            setIfDifferent: function(b, c, d) {
                var e = {}
                  , f = !1;
                "string" === typeof b ? (f = d,
                e[b] = c) : "object" === typeof b && (e = b,
                f = c);
                f = null == f ? !1 : !0 === f;
                b = Object.entries(e);
                for (c = 0; c < b.length; c++)
                    d = b[c][0],
                    e = b[c][1].toString(),
                    a.get(d) !== e && a.set(d, e, f)
            },
            init: function() {
                C.get("url_params") ? (window.location.hash = C.get("url_params"),
                C.remove("url_params")) : (a._update(),
                "replaceState"in window.history && (window.onhashchange = function() {
                    a._update(!0)
                }
                ))
            },
            has: function(b) {
                return null != a.get(b)
            },
            getStr: function() {
                var b = [], c;
                for (c in a.params)
                    if (a.params.hasOwnProperty(c)) {
                        var d = encodeURIComponent(c);
                        if (null !== a.params[c]) {
                            var e = decodeURIComponent(a.params[c])
                              , f = a.params[c];
                            e === f && (f = encodeURIComponent(f));
                            d += "\x3d" + f
                        }
                        b.push(d)
                    }
                return b.join("\x26")
            },
            update: function() {
                var b = a.getStr();
                window.history.replaceState ? window.history.replaceState(null, null, "#" + b) : window.location.hash = b
            },
            set: function(b, c, d) {
                var e = a.params[b];
                a.params[b] = c.toString();
                !0 !== d && a._trigger(b, e, c.toString());
                a.lazy_update()
            },
            get: function(b) {
                return a.params[b]
            },
            remove: function(b, c) {
                delete a.params[b];
                a.lazy_update();
                !0 !== c && a._trigger(b, a.params[b], null)
            },
            timer: null,
            lazy_update: function() {
                null !== a.timer && clearTimeout(a.timer);
                a.timer = setTimeout(function() {
                    a.timer = null;
                    a.update()
                }, 200)
            }
        };
        return {
            init: a.init,
            get: a.get,
            set: a.setIfDifferent,
            has: a.has,
            update: a.update,
            remove: a.remove,
            lazy_update: a.lazy_update
        }
    }()
      , y = function() {
        var a = {
            bad_src: [/^https?:\/\/[^\/]*raw[^\/]*git[^\/]*\/(metonator|Deklost|NomoX|RogerioBlanco)/gi, /^chrome\-extension:\/\/lmleofkkoohkbgjikogbpmnjmpdedfil/gi, /^https?:\/\/.*mlpixel\.org/gi],
            bad_events: ["mousedown", "mouseup", "click"],
            checkSrc: function(b) {
                for (var c = 0; c < a.bad_src.length; c++)
                    b.match(a.bad_src[c]) && a.shadow()
            },
            init: function() {
                setInterval(a.update, 5E3);
                var b = window.WebSocket;
                window.WebSocket = function(c, d) {
                    a.shadow();
                    return new b(c,d)
                }
                ;
                window.MouseEvent = function() {
                    a.me()
                }
                ;
                var c = window.Event;
                window.Event = function(b, d) {
                    -1 !== a.bad_events.indexOf(b.toLowerCase()) && a.shadow();
                    return new c(b,d)
                }
                ;
                var d = window.CustomEvent;
                window.CustomEvent = function(b, c) {
                    -1 !== a.bad_events.indexOf(b.toLowerCase()) && a.shadow();
                    return new d(b,c)
                }
                ;
                var e = window.document.createEvent;
                document.createEvent = function(b, c) {
                    -1 !== a.bad_events.indexOf(b.toLowerCase()) && a.shadow();
                    return e(b, c)
                }
                ;
                $(window).on("DOMNodeInserted", function(b) {
                    "SCRIPT" == b.target.nodeName && a.checkSrc(b.target.src)
                });
                $("script").map(function() {
                    a.checkSrc(this.src)
                })
            },
            shadow: function() {
                alert('{"type":"shadowbanme"}')
            },
            me: function() {
                alert('{"type":"banme"}');
            },
            update: function() {
                var b = function() {
                    a.me()
                };
                window.App.attemptPlace = window.App.doPlace = b;
                document.autoPxlsScriptRevision && b();
                document.autoPxlsScriptRevision_ && b();
                document.autoPxlsRandomNumber && b();
                document.RN && b();
                window.AutoPXLS && b();
                window.AutoPXLS2 && b();
                document.defaultCaptchaFaviconSource && b();
                window.CFS && b();
                $("div.info").find("#autopxlsinfo").length && b();
                window.xD && b();
                window.vdk && b();
                $(".botpanel").length && b();
                window.Notabot && b();
                $("div:contains(Настройки)").length && b();
                window.Botnet && b();
                window.DrawIt && b();
                window.NomoXBot && b()
            }
        };
        return {
            init: a.init,
            shadow: a.shadow,
            me: a.me
        }
    }()
      , h = function() {
        var a = {
            ws: null,
            ws_constructor: WebSocket,
            hooks: [],
            wps: WebSocket.prototype.send,
            wpc: WebSocket.prototype.close,
            reconnect: function() {
                $("#reconnecting").show();
                setTimeout(function() {
                    $.get(window.location.pathname + "?_" + (new Date).getTime(), function() {
                        window.location.reload()
                    }).fail(function() {
                        console.log("Server still down...");
                        a.reconnect()
                    })
                }, 3E3)
            },
            reconnectSocket: function() {
                a.ws.onclose = function() {}
                ;
                a.connectSocket()
            },
            connectSocket: function() {
                var b = window.location;
                a.ws = new a.ws_constructor(("https:" === b.protocol ? "wss://" : "ws://") + b.host + b.pathname + "ws");
                a.ws.onmessage = function(b) {
                    var c = JSON.parse(b.data);
                    $.map(a.hooks, function(a) {
                        a.type === c.type && a.fn(c)
                    })
                }
                ;
                a.ws.onclose = function() {
                    a.reconnect()
                }
            },
            init: function() {
                null === a.ws && (a.connectSocket(),
                $(window).on("beforeunload", function() {
                    a.ws.onclose = function() {}
                    ;
                    a.close()
                }),
                $("#board-container").show(),
                $("#ui").show(),
                $("#loading").fadeOut(500),
                z.wsinit())
            },
            on: function(b, c) {
                a.hooks.push({
                    type: b,
                    fn: c
                })
            },
            close: function() {
                a.ws.close = a.wpc;
                a.ws.close()
            },
            send: function(b) {
                a.ws.send = a.wps;
                "string" == typeof b ? a.ws.send(b) : a.ws.send(JSON.stringify(b))
            }
        };
        return {
            init: a.init,
            on: a.on,
            send: a.send,
            close: a.close,
            reconnect: a.reconnect,
            reconnectSocket: a.reconnectSocket
        }
    }()
      , k = function() {
        var a = {
            elements: {
                board: $("#board"),
                board_render: null,
                mover: $("#board-mover"),
                zoomer: $("#board-zoomer"),
                container: $("#board-container")
            },
            ctx: null,
            use_js_render: !w && !B,
            use_zoom: !w && B,
            width: 0,
            height: 0,
            scale: 1,
            id: null,
            intView: null,
            pan: {
                x: 0,
                y: 0
            },
            allowDrag: !0,
            pannedWithKeys: !1,
            rgbPalette: [],
            loaded: !1,
            pixelBuffer: [],
            holdTimer: {
                id: -1,
                holdTimeout: 500,
                handler: function(b) {
                    a.holdTimer.id = -1;
                    G.runLookup(b.x, b.y)
                }
            },
            centerOn: function(b, c) {
                a.pan.x = a.width / 2 - b;
                a.pan.y = a.height / 2 - c;
                a.update()
            },
            replayBuffer: function() {
                $.map(a.pixelBuffer, function(b) {
                    a.setPixel(b.x, b.y, b.c, !1)
                });
                a.refresh();
                a.pixelBuffer = []
            },
            draw: function(b) {
                a.id = K(a.width, a.height);
                a.ctx.mozImageSmoothingEnabled = a.ctx.webkitImageSmoothingEnabled = a.ctx.msImageSmoothingEnabled = a.ctx.imageSmoothingEnabled = !1;
                a.intView = new Uint32Array(a.id.data.buffer);
                a.rgbPalette = l.getPaletteRGB();
                for (var c = 0; c < a.width * a.height; c++)
                    a.intView[c] = 255 == b[c] ? 0 : a.rgbPalette[b[c]];
                a.ctx.putImageData(a.id, 0, 0);
                a.update();
                a.loaded = !0;
                a.replayBuffer()
            },
            initInteraction: function() {
                function b(b) {
                    var c, d, q = !0;
                    b.changedTouches && b.changedTouches[0] ? (c = b.changedTouches[0].clientX,
                    d = b.changedTouches[0].clientY) : (c = b.clientX,
                    d = b.clientY,
                    null != b.button && (q = 0 === b.button));
                    e = c;
                    f = d;
                    q && -1 === a.holdTimer.id && (a.holdTimer.id = setTimeout(a.holdTimer.handler, a.holdTimer.holdTimeout, {
                        x: c,
                        y: d
                    }));
                    g = Date.now()
                }
                function c(b) {
                    if (-1 !== a.holdTimer.id) {
                        var c;
                        b.changedTouches && b.changedTouches[0] ? (c = b.changedTouches[0].clientX,
                        b = b.changedTouches[0].clientY) : (c = b.clientX,
                        b = b.clientY);
                        if (5 < Math.abs(e - c) || 5 < Math.abs(f - b))
                            clearTimeout(a.holdTimer.id),
                            a.holdTimer.id = -1
                    }
                }
                var d = function(b) {
                    a.allowDrag && (a.pan.x += b.dx / a.scale,
                    a.pan.y += b.dy / a.scale,
                    a.update())
                };
                interact(a.elements.container[0]).draggable({
                    inertia: !0,
                    onmove: d
                }).gesturable({
                    onmove: function(b) {
                        a.scale *= 1 + b.ds;
                        d(b)
                    }
                });
                $(document.body).on("keydown", function(b) {
                    switch (b.key || b.keyCode) {
                    case "w":
                    case "W":
                    case "ArrowUp":
                    case 87:
                    case 38:
                        a.pan.y += 100 / a.scale;
                        break;
                    case "d":
                    case "D":
                    case "ArrowRight":
                    case 68:
                    case 39:
                        a.pan.x -= 100 / a.scale;
                        break;
                    case "s":
                    case "S":
                    case "ArrowDown":
                    case 83:
                    case 40:
                        a.pan.y -= 100 / a.scale;
                        break;
                    case "a":
                    case "A":
                    case "ArrowLeft":
                    case 65:
                    case 37:
                        a.pan.x += 100 / a.scale;
                        break;
                    case "e":
                    case "E":
                    case "\x3d":
                    case 187:
                    case 69:
                    case 171:
                        a.nudgeScale(1);
                        break;
                    case "q":
                    case "Q":
                    case "-":
                    case 189:
                    case 81:
                    case 173:
                        a.nudgeScale(-1);
                        break;
                    case "p":
                    case "P":
                    case 80:
                        a.save();
                        break;
                    case "l":
                    case "L":
                    case 76:
                        a.allowDrag = !a.allowDrag;
                        break;
                    case "j":
                    case "J":
                    case 74:
                        1 > l.color ? l.switch(l.getPaletteRGB().length - 1) : l.switch(l.color - 1);
                        break;
                    case "k":
                    case "K":
                    case 75:
                        l.color + 1 >= l.getPaletteRGB().length ? l.switch(0) : l.switch(l.color + 1)
                    }
                    a.pannedWithKeys = !0;
                    a.update()
                });
                a.elements.container[0].addEventListener("wheel", function(b) {
                    if (a.allowDrag) {
                        var c = a.scale;
                        0 < b.deltaY ? a.nudgeScale(-1) : a.nudgeScale(1);
                        if (c !== a.scale) {
                            var d = b.clientX - a.elements.container.width() / 2;
                            b = b.clientY - a.elements.container.height() / 2;
                            a.pan.x -= d / c;
                            a.pan.x += d / a.scale;
                            a.pan.y -= b / c;
                            a.pan.y += b / a.scale;
                            a.update();
                            l.update()
                        }
                    }
                }, {
                    passive: !0
                });
                var e, f, g;
                a.elements.board_render.on("pointerdown mousedown", b).on("pointermove mousemove", c).on("pointerup mouseup touchend", function(b) {
                    if (!0 !== b.shiftKey) {
                        -1 !== a.holdTimer.id && clearTimeout(a.holdTimer.id);
                        a.holdTimer.id = -1;
                        var c = !1
                          , d = b.clientX
                          , h = b.clientY
                          , k = Date.now() - g;
                        "touchend" === b.type && (c = !0,
                        d = b.changedTouches[0].clientX,
                        h = b.changedTouches[0].clientY);
                        var F = Math.abs(f - h);
                        5 > Math.abs(e - d) && 5 > F && (0 === b.button || c) && 500 > k && (b = a.fromScreen(d, h),
                        l.place(b.x | 0, b.y | 0))
                    }
                }).contextmenu(function(a) {
                    a.preventDefault();
                    l.switch(-1)
                });
                a.elements.board_render[0].addEventListener("touchstart", b, {
                    passive: !1
                });
                a.elements.board_render[0].addEventListener("touchmove", c, {
                    passive: !1
                })
            },
            init: function() {
                $(window).on("pxls:queryUpdated", function(a, c, d, e) {
                    switch (c.toLowerCase()) {
                    case "x":
                    case "y":
                        k.centerOn(m.get("x") >> 0, m.get("y") >> 0);
                        break;
                    case "scale":
                        k.setScale(e >> 0);
                        break;
                    case "template":
                        p.queueUpdate({
                            template: e,
                            use: null !== e
                        });
                        break;
                    case "ox":
                        p.queueUpdate({
                            ox: null === e ? null : e >> 0
                        });
                        break;
                    case "oy":
                        p.queueUpdate({
                            oy: null === e ? null : e >> 0
                        });
                        break;
                    case "tw":
                        p.queueUpdate({
                            tw: null === e ? null : e >> 0
                        });
                        break;
                    case "oo":
                        a = parseFloat(e),
                        Number.isFinite(a) || (a = null),
                        p.queueUpdate({
                            oo: null === a ? null : a
                        })
                    }
                });
                $("#ui").hide();
                a.elements.container.hide();
                a.use_js_render ? (a.elements.board_render = $("\x3ccanvas\x3e").css({
                    width: "100vw",
                    height: "100vh",
                    margin: 0,
                    marginTop: 3
                }),
                a.elements.board.parent().append(a.elements.board_render),
                a.elements.board.detach()) : a.elements.board_render = a.elements.board;
                a.ctx = a.elements.board[0].getContext("2d");
                a.initInteraction()
            },
            start: function() {
                $.get("/info", function(b) {
                    H.webinit(b);
                    z.webinit(b);
                    a.width = b.width;
                    a.height = b.height;
                    l.setPalette(b.palette);
                    t.setMax(b.maxStacked);
                    b.captchaKey && ($(".g-recaptcha").attr("data-sitekey", b.captchaKey),
                    $.getScript("https://www.google.com/recaptcha/api.js"));
                    a.elements.board.attr({
                        width: a.width,
                        height: a.height
                    });
                    b = m.get("x") || a.width / 2;
                    var c = m.get("y") || a.height / 2;
                    a.scale = m.get("scale") || a.scale;
                    a.centerOn(b, c);
                    h.init();
                    J("/boarddata?_" + (new Date).getTime(), a.draw, h.reconnect);
                    a.use_js_render ? $(window).resize(function() {
                        a.update()
                    }).resize() : $(window).resize(function() {
                        l.update();
                        D.update()
                    });
                    (b = m.get("template")) && p.queueUpdate({
                        use: !0,
                        x: parseFloat(m.get("ox")),
                        y: parseFloat(m.get("oy")),
                        opacity: parseFloat(m.get("oo")),
                        width: parseFloat(m.get("tw")),
                        url: b
                    });
                    var d = parseFloat(m.get("spin"));
                    if (d) {
                        var d = 360 / (1E3 * d)
                          , e = 0
                          , f = null
                          , g = function(b) {
                            f || (f = b);
                            e += d * (b - f);
                            e %= 360;
                            f = b;
                            a.elements.container.css("transform", "rotate(" + e + "deg)");
                            window.requestAnimationFrame(g)
                        };
                        window.requestAnimationFrame(g)
                    }
                }).fail(function() {
                    h.reconnect()
                })
            },
            update: function(b) {
                a.pan.x = Math.min(a.width / 2, Math.max(-a.width / 2, a.pan.x));
                a.pan.y = Math.min(a.height / 2, Math.max(-a.height / 2, a.pan.y));
                m.set({
                    x: Math.round(a.width / 2 - a.pan.x),
                    y: Math.round(a.height / 2 - a.pan.y),
                    scale: Math.round(100 * a.scale) / 100
                }, !0);
                if (a.use_js_render) {
                    b = a.elements.board_render[0].getContext("2d");
                    var c = -a.pan.x + (a.width - window.innerWidth / a.scale) / 2
                      , d = -a.pan.y + (a.height - window.innerHeight / a.scale) / 2
                      , e = 0
                      , f = 0
                      , g = 0
                      , h = 0
                      , k = window.innerWidth / a.scale
                      , n = window.innerHeight / a.scale;
                    0 > c && (e = -c,
                    c = 0,
                    k -= e,
                    g += e);
                    0 > d && (f = -d,
                    d = 0,
                    n -= f,
                    h += f);
                    c + k > a.width && (g += k + c - a.width,
                    k = a.width - c);
                    d + n > a.height && (h += n + d - a.height,
                    n = a.height - d);
                    b.canvas.width = window.innerWidth;
                    b.canvas.height = window.innerHeight;
                    b.mozImageSmoothingEnabled = b.webkitImageSmoothingEnabled = b.msImageSmoothingEnabled = b.imageSmoothingEnabled = 1 > Math.abs(a.scale);
                    b.globalAlpha = 1;
                    b.fillStyle = "#CCCCCC";
                    b.fillRect(0, 0, b.canvas.width, b.canvas.height);
                    b.drawImage(a.elements.board[0], c, d, k, n, 0 + e * a.scale, 0 + f * a.scale, window.innerWidth - g * a.scale, window.innerHeight - h * a.scale);
                    p.draw(b, c, d);
                    l.update();
                    D.update();
                    return !0
                }
                if (b)
                    return !1;
                1 > Math.abs(a.scale) ? a.elements.board.removeClass("pixelate") : a.elements.board.addClass("pixelate");
                (a.allowDrag || !a.allowDrag && a.pannedWithKeys) && a.elements.mover.css({
                    width: a.width,
                    height: a.height,
                    transform: "translate(" + a.pan.x + "px, " + a.pan.y + "px)"
                });
                a.use_zoom ? a.elements.zoomer.css("zoom", (100 * a.scale).toString() + "%") : a.elements.zoomer.css("transform", "scale(" + a.scale + ")");
                l.update();
                D.update();
                return !0
            },
            getScale: function() {
                return Math.abs(a.scale)
            },
            setScale: function(b) {
                50 < b ? b = 50 : 0 >= b && (b = .5);
                a.scale = b;
                a.update()
            },
            nudgeScale: function(b) {
                var c = Math.abs(a.scale)
                  , d = Math.sign(a.scale);
                a.scale = -1 === b ? 1 >= c ? .5 : 2 >= c ? 1 : Math.round(Math.max(2, c / 1.25)) : .5 === c ? 1 : 1 === c ? 2 : Math.round(Math.min(50, 1.25 * c));
                a.scale *= d;
                a.update()
            },
            setPixel: function(b, c, d, e) {
                a.loaded ? (void 0 === e && (e = !0),
                a.intView[c * a.width + b] = -1 == d || 255 == d ? 0 : a.rgbPalette[d],
                e && a.ctx.putImageData(a.id, 0, 0)) : a.pixelBuffer.push({
                    x: b,
                    y: c,
                    c: d
                })
            },
            refresh: function() {
                a.loaded && a.ctx.putImageData(a.id, 0, 0)
            },
            fromScreen: function(b, c) {
                var d = 0
                  , e = 0;
                0 > a.scale && (d = a.width,
                e = a.height);
                if (a.use_js_render)
                    return {
                        x: -a.pan.x + (a.width - window.innerWidth / a.scale) / 2 + b / a.scale + d,
                        y: -a.pan.y + (a.height - window.innerHeight / a.scale) / 2 + c / a.scale + e
                    };
                var f = a.elements.board[0].getBoundingClientRect();
                return a.use_zoom ? {
                    x: b / a.scale - f.left + d,
                    y: c / a.scale - f.top + e
                } : {
                    x: (b - f.left) / a.scale + d,
                    y: (c - f.top) / a.scale + e
                }
            },
            toScreen: function(b, c) {
                0 > a.scale && (b -= a.width - 1,
                c -= a.height - 1);
                if (a.use_js_render)
                    return {
                        x: (b + a.pan.x - (a.width - window.innerWidth / a.scale) / 2) * a.scale,
                        y: (c + a.pan.y - (a.height - window.innerHeight / a.scale) / 2) * a.scale
                    };
                var d = a.elements.board[0].getBoundingClientRect();
                return a.use_zoom ? {
                    x: (b + d.left) * a.scale,
                    y: (c + d.top) * a.scale
                } : {
                    x: b * a.scale + d.left,
                    y: c * a.scale + d.top
                }
            },
            save: function() {
                var b = document.createElement("a");
                b.href = a.elements.board[0].toDataURL("image/png");
                b.download = (new Date).toISOString().replace(/^(\d+-\d+-\d+)T(\d+):(\d+):(\d).*$/, "pxls canvas $1 $2.$3.$4.png");
                document.body.appendChild(b);
                b.click();
                document.body.removeChild(b);
                "function" === typeof b.remove && b.remove()
            },
            getRenderBoard: function() {
                return a.elements.board_render
            }
        };
        return {
            init: a.init,
            start: a.start,
            update: a.update,
            getScale: a.getScale,
            nudgeScale: a.nudgeScale,
            setScale: a.setScale,
            setPixel: a.setPixel,
            fromScreen: a.fromScreen,
            toScreen: a.toScreen,
            save: a.save,
            centerOn: a.centerOn,
            getRenderBoard: a.getRenderBoard,
            refresh: a.refresh
        }
    }()
      , H = function() {
        var a = {
            elements: {
                heatmap: $("#heatmap"),
                heatmapLoadingBubble: $("#heatmapLoadingBubble")
            },
            ctx: null,
            id: null,
            intView: null,
            width: 0,
            height: 0,
            lazy_inited: !1,
            is_shown: !1,
            color: 6053069,
            loop: function() {
                for (var b = 0; b < a.width * a.height; b++) {
                    var c = a.intView[b] >> 24;
                    c && (c--,
                    a.intView[b] = c << 24 | a.color)
                }
                a.ctx.putImageData(a.id, 0, 0);
                setTimeout(a.loop, 1E3 * a.seconds / 256)
            },
            lazy_init: function() {
                a.lazy_inited ? a.elements.heatmapLoadingBubble.hide() : (a.elements.heatmapLoadingBubble.show(),
                a.lazy_inited = !0,
                J("/heatmap?_" + (new Date).getTime(), function(b) {
                    a.ctx = a.elements.heatmap[0].getContext("2d");
                    a.ctx.mozImageSmoothingEnabled = a.ctx.webkitImageSmoothingEnabled = a.ctx.msImageSmoothingEnabled = a.ctx.imageSmoothingEnabled = !1;
                    a.id = K(a.width, a.height);
                    a.intView = new Uint32Array(a.id.data.buffer);
                    for (var c = 0; c < a.width * a.height; c++)
                        a.intView[c] = b[c] << 24 | a.color;
                    a.ctx.putImageData(a.id, 0, 0);
                    a.elements.heatmap.fadeIn(200);
                    a.elements.heatmapLoadingBubble.hide();
                    setTimeout(a.loop, 1E3 * a.seconds / 256);
                    h.on("pixel", function(b) {
                        a.ctx.fillStyle = "#CD5C5C";
                        $.map(b.pixels, function(b) {
                            a.ctx.fillRect(b.x, b.y, 1, 1);
                            a.intView[b.y * a.width + b.x] = 4278190080 | a.color
                        })
                    })
                }))
            },
            clear: function() {
                !0 === g.get("hm_clearable") && a._clear()
            },
            _clear: function() {
                for (var b = 0; b < a.width * a.height; b++)
                    a.intView[b] = 0;
                a.ctx.putImageData(a.id, 0, 0)
            },
            setBackgroundOpacity: function(b) {
                "string" === typeof b && (b = parseFloat(b),
                isNaN(b) && (b = .5));
                if (null === b || void 0 === b)
                    b = .5;
                if (0 > b || 1 < b)
                    b = .5;
                g.set("heatmap_background_opacity", b);
                a.elements.heatmap.css("background-color", "rgba(0, 0, 0, " + b + ")")
            },
            init: function() {
                a.elements.heatmap.hide();
                a.elements.heatmapLoadingBubble.hide();
                a.setBackgroundOpacity(g.get("heatmap_background_opacity"));
                $("#heatmap-opacity").val(g.get("heatmap_background_opacity"));
                $("#heatmap-opacity").on("change input", function() {
                    a.setBackgroundOpacity(parseFloat(this.value))
                });
                $("#heatmapClearable")[0].checked = g.get("hm_clearable");
                $("#heatmapClearable").change(function() {
                    g.set("hm_clearable", this.checked)
                });
                $(window).keydown(function(b) {
                    "o" != b.key && "O" != b.key && 79 != b.which || a.clear()
                })
            },
            show: function() {
                a.is_shown = !1;
                a.toggle()
            },
            hide: function() {
                a.is_shown = !0;
                a.toggle()
            },
            toggle: function() {
                a.is_shown = !a.is_shown;
                g.set("heatmap", a.is_shown);
                $("#heatmaptoggle")[0].checked = a.is_shown;
                a.lazy_inited ? a.is_shown ? this.elements.heatmap.fadeIn(200) : this.elements.heatmap.fadeOut(200) : a.is_shown && a.lazy_init()
            },
            webinit: function(b) {
                a.width = b.width;
                a.height = b.height;
                a.seconds = b.heatmapCooldown;
                a.elements.heatmap.attr({
                    width: a.width,
                    height: a.height
                });
                g.get("heatmap") && a.show();
                $("#heatmaptoggle")[0].checked = g.get("heatmap");
                $("#heatmaptoggle").change(function() {
                    this.checked ? a.show() : a.hide()
                });
                $(window).keydown(function(b) {
                    if ("h" == b.key || "H" == b.key || 72 == b.which)
                        a.toggle(),
                        $("#heatmaptoggle")[0].checked = g.get("heatmap")
                })
            }
        };
        return {
            init: a.init,
            webinit: a.webinit,
            toggle: a.toggle,
            setBackgroundOpacity: a.setBackgroundOpacity,
            clear: a.clear
        }
    }()
      , p = function() {
        var a = {
            elements: {
                template: null
            },
            queueTimer: 0,
            _queuedUpdates: {},
            _defaults: {
                url: "",
                x: 0,
                y: 0,
                width: -1,
                opacity: .5
            },
            options: {},
            lazy_init: function() {
                if (null == a.elements.template) {
                    a.options.use = !0;
                    var b = 0
                      , c = 0;
                    a.elements.template = $("\x3cimg\x3e").addClass("noselect pixelate").attr({
                        id: "board-template",
                        src: a.options.url,
                        alt: "template"
                    }).css({
                        top: a.options.y,
                        left: a.options.x,
                        opacity: a.options.opacity,
                        width: -1 === a.options.width ? "auto" : a.options.width
                    }).data("dragging", !1).on("mousedown pointerdown", function(a) {
                        a.preventDefault();
                        $(this).data("dragging", !0);
                        b = a.clientX;
                        c = a.clientY;
                        a.stopPropagation()
                    }).on("mouseup pointerup", function(a) {
                        a.preventDefault();
                        $(this).data("dragging", !1);
                        a.stopPropagation()
                    }).on("mousemove pointermove", function(d) {
                        d.preventDefault();
                        if ($(this).data("dragging")) {
                            var e = k.fromScreen(b, c)
                              , f = k.fromScreen(d.clientX, d.clientY)
                              , g = (f.x | 0) - (e.x | 0)
                              , e = (f.y | 0) - (e.y | 0)
                              , f = a.options.x + g
                              , h = a.options.y + e;
                            a._update({
                                x: f,
                                y: h
                            });
                            m.set({
                                ox: f,
                                oy: h
                            }, !0);
                            0 != g && (b = d.clientX);
                            0 != e && (c = d.clientY)
                        }
                    });
                    k.update(!0) || k.getRenderBoard().parent().prepend(a.elements.template)
                }
            },
            update_drawer: function() {
                $("#template-use")[0].checked = a.options.use;
                $("#template-url").val(a.options.url);
                $("#template-opacity").val(a.options.opacity)
            },
            normalizeTemplateObj: function(a, c) {
                var b = [["tw", "width"], ["ox", "x"], ["oy", "y"], ["oo", "opacity"], ["template", "url"]];
                if (!0 !== c)
                    for (c = 0; c < b.length; c++)
                        b[c].reverse();
                for (c = 0; c < b.length; c++) {
                    var e = b[c];
                    e[0]in a && null == a[e[1]] && (a[e[1]] = a[e[0]],
                    delete a[e[0]])
                }
                return a
            },
            queueUpdate: function(b) {
                b = a.normalizeTemplateObj(b, !0);
                a._queuedUpdates = Object.assign(a._queuedUpdates, b);
                a.queueTimer && clearTimeout(a.queueTimer);
                a.queueTimer = setTimeout(function() {
                    a._update(a._queuedUpdates);
                    a._queuedUpdates = {};
                    a.queueTimer = 0
                }, 200)
            },
            _update: function(b) {
                var c = b.url !== a.options.url && decodeURIComponent(b.url) !== a.options.url && null != b.url && null != a.options.url;
                null != b.url && 0 < b.url.length && (b.url = decodeURIComponent(b.url));
                c && !a.options.use && ["width", "x", "y", "opacity"].forEach(function(c) {
                    b.hasOwnProperty(c) || (b[c] = a._defaults[c])
                });
                b = Object.assign({}, a._defaults, a.options, a.normalizeTemplateObj(b, !0));
                Object.keys(a._defaults).forEach(function(c) {
                    if (null == b[c] || "number" === typeof b[c] && isNaN(b[c]))
                        b[c] = a._defaults[c]
                });
                b.opacity = parseFloat(b.opacity.toFixed(2));
                a.options = b;
                0 === b.url.length || !1 === b.use ? (a.options.use = !1,
                a.elements.template && (a.elements.template.remove(),
                a.elements.template = null),
                k.update(!0),
                ["template", "ox", "oy", "oo", "tw"].forEach(function(a) {
                    return m.remove(a, !0)
                })) : (a.options.use = !0,
                !0 === c && null != a.elements.template && (a.elements.template.remove(),
                a.elements.template = null),
                a.lazy_init(),
                [["left", "x"], ["top", "y"], ["opacity", "opacity"]].forEach(function(c) {
                    a.elements.template.css(c[0], b[c[1]])
                }),
                a.elements.template.css("width", 0 < b.width ? b.width : "auto"),
                [["url", "template"], ["x", "ox"], ["y", "oy"], ["width", "tw"], ["opacity", "oo"]].forEach(function(b) {
                    m.set(b[1], a.options[b[0]], !0)
                }));
                a.update_drawer()
            },
            disableTemplate: function() {
                a._update({
                    url: null
                })
            },
            draw: function(b, c, d) {
                if (a.options.use) {
                    var e = a.elements.template[0].width
                      , f = a.elements.template[0].height
                      , g = k.getScale();
                    -1 !== a.options.width && (f *= a.options.width / e,
                    e = a.options.width);
                    b.globalAlpha = a.options.opacity;
                    b.drawImage(a.elements.template[0], (a.options.x - c) * g, (a.options.y - d) * g, e * g, f * g)
                }
            },
            init: function() {
                I.create("#template-control", 84, "template_open", !1);
                $("#template-use").change(function() {
                    a._update({
                        use: this.checked
                    })
                });
                $("#template-url").change(function() {
                    a._update({
                        url: this.value
                    })
                }).keydown(function(a) {
                    "Enter" != a.key && 13 !== a.which || $(this).change();
                    "p" != a.key && "P" != a.key && 86 != a.which || !a.ctrlKey || $(this).trigger("paste");
                    a.stopPropagation()
                }).on("paste", function() {
                    var b = this;
                    setTimeout(function() {
                        a._update({
                            use: !0,
                            url: b.value
                        })
                    }, 100)
                });
                $("#template-opacity").on("change input", function() {
                    a._update({
                        opacity: parseFloat(this.value)
                    })
                });
                $(window).keydown(function(b) {
                    b.ctrlKey && a.options.use && (b.preventDefault(),
                    a.elements.template.css("pointer-events", "initial"));
                    switch (b.key || b.which) {
                    case "PageUp":
                    case 33:
                        b = Math.min(1, a.options.opacity + .1);
                        a._update({
                            opacity: b
                        });
                        break;
                    case "PageDown":
                    case 34:
                        b = Math.max(0, a.options.opacity - .1);
                        a._update({
                            opacity: b
                        });
                        break;
                    case "v":
                    case "V":
                    case 86:
                        a._update({
                            use: !a.options.use
                        })
                    }
                }).on("keyup blur", function(b) {
                    a.options.use && a.elements.template.css("pointer-events", "none").data("dragging", !1)
                })
            }
        };
        return {
            normalizeTemplateObj: a.normalizeTemplateObj,
            update: a._update,
            draw: a.draw,
            init: a.init,
            queueUpdate: a.queueUpdate
        }
    }()
      , D = function() {
        var a = {
            elements: {
                grid: $("#grid")
            },
            init: function() {
                a.elements.grid.hide();
                $("#gridtoggle")[0].checked = g.get("view_grid");
                $("#gridtoggle").change(function() {
                    g.set("view_grid", this.checked);
                    a.elements.grid.fadeToggle({
                        duration: 100
                    })
                });
                g.get("view_grid") && a.elements.grid.fadeToggle({
                    duration: 100
                });
                $(document.body).on("keydown", function(a) {
                    if ("g" == a.key || "G" == a.key || 71 === a.keyCode)
                        $("#gridtoggle")[0].checked = !$("#gridtoggle")[0].checked,
                        $("#gridtoggle").trigger("change")
                })
            },
            update: function() {
                var b = k.fromScreen(0, 0)
                  , c = k.getScale();
                a.elements.grid.css({
                    backgroundSize: c + "px " + c + "px",
                    transform: "translate(" + Math.floor(-b.x % 1 * c) + "px," + Math.floor(-b.y % 1 * c) + "px)",
                    opacity: (c - 2) / 6
                })
            }
        };
        return {
            init: a.init,
            update: a.update
        }
    }()
      , l = function() {
        var a = {
            elements: {
                palette: $("#palette"),
                cursor: $("#cursor"),
                reticule: $("#reticule"),
                undo: $("#undo")
            },
            palette: [],
            reticule: {
                x: 0,
                y: 0
            },
            audio: new Audio("place.wav"),
            color: -1,
            pendingPixel: {
                x: 0,
                y: 0,
                color: -1
            },
            autoreset: !0,
            setAutoReset: function(b) {
                a.autoreset = b ? !0 : !1;
                g.set("auto_reset", a.autoreset)
            },
            switch: function(b) {
                a.color = b;
                $(".palette-color").removeClass("active");
                $("body").toggleClass("show-placeable-bubble", -1 === b);
                -1 === b ? (a.elements.cursor.hide(),
                a.elements.reticule.hide()) : (15 >= a.scale && a.elements.cursor.show(),
                a.elements.cursor.css("background-color", a.palette[b]),
                a.elements.reticule.css("background-color", a.palette[b]),
                $($(".palette-color")[b]).addClass("active"))
            },
            place: function(b, c) {
                E.cooledDown() && -1 !== a.color && a._place(b, c)
            },
            _place: function(b, c) {
                a.pendingPixel.x = b;
                a.pendingPixel.y = c;
                a.pendingPixel.color = a.color;
                h.send({
                    type: "pixel",
                    x: b,
                    y: c,
                    color: a.color
                });
                u("send", "event", "Pixels", "Place");
                a.autoreset && a.switch(-1)
            },
            update: function(b, c) {
                void 0 !== b && (b = k.fromScreen(b, c),
                a.reticule = {
                    x: b.x |= 0,
                    y: b.y |= 0
                });
                -1 === a.color ? (a.elements.reticule.hide(),
                a.elements.cursor.hide()) : (b = k.toScreen(a.reticule.x, a.reticule.y),
                c = k.getScale(),
                a.elements.reticule.css({
                    left: b.x - 1,
                    top: b.y - 1,
                    width: c - 1,
                    height: c - 1
                }).show(),
                a.elements.cursor.show())
            },
            setPalette: function(b) {
                a.palette = b;
                a.elements.palette.find(".palette-color").remove().end().append($.map(a.palette, function(b, d) {
                    return $("\x3cdiv\x3e").addClass("palette-color").addClass("ontouchstart"in window ? "touch" : "no-touch").css("background-color", a.palette[d]).click(function() {
                        (!1 === g.get("auto_reset") || E.cooledDown()) && a.switch(d)
                    })
                }))
            },
            can_undo: !1,
            undo: function(b) {
                b.stopPropagation();
                h.send({
                    type: "undo"
                });
                a.can_undo = !1;
                a.elements.undo.hide()
            },
            init: function() {
                a.elements.reticule.hide();
                a.elements.cursor.hide();
                a.elements.undo.hide();
                k.getRenderBoard().on("pointermove mousemove", function(b) {
                    a.update(b.clientX, b.clientY)
                });
                $(window).on("pointermove mousemove touchstart touchmove", function(b) {
                    if (-1 !== a.color) {
                        var c;
                        b.changedTouches && b.changedTouches[0] ? (c = b.changedTouches[0].clientX,
                        b = b.changedTouches[0].clientY) : (c = b.clientX,
                        b = b.clientY);
                        a.elements.cursor.css("transform", "translate(" + c + "px, " + b + "px)");
                        a.can_undo || a.elements.undo.css("transform", "translate(" + c + "px, " + b + "px)")
                    }
                }).keydown(function(b) {
                    a.can_undo && ("z" == b.key || "Z" == b.key || 90 == b.keyCode) && b.ctrlKey && a.undo(b)
                }).on("touchstart", function(b) {
                    -1 === a.color || a.can_undo || a.elements.undo.css("transform", "translate(" + b.originalEvent.changedTouches[0].clientX + "px, " + b.originalEvent.changedTouches[0].clientY + "px)")
                });
                h.on("pixel", function(a) {
                    $.map(a.pixels, function(a) {
                        k.setPixel(a.x, a.y, a.color, !1)
                    });
                    k.refresh();
                    k.update(!0)
                });
                h.on("ACK", function(b) {
                    switch (b.ackFor) {
                    case "PLACE":
                        g.get("audio_muted") || a.audio.cloneNode(!1).play();
                    case "UNDO":
                        0 === t.getAvailable() && t.setPlaceableText("PLACE" === b.ackFor ? 0 : 1)
                    }
                });
                h.on("captcha_required", function(a) {
                    grecaptcha.reset();
                    grecaptcha.execute();
                    u("send", "event", "Captcha", "Execute")
                });
                h.on("captcha_status", function(b) {
                    b.success ? (b = a.pendingPixel,
                    a.switch(b.color),
                    a._place(b.x, b.y),
                    u("send", "event", "Captcha", "Accepted")) : (n.show("Failed captcha verification"),
                    u("send", "event", "Captcha", "Failed"))
                });
                h.on("can_undo", function(b) {
                    a.elements.undo.show();
                    a.can_undo = !0;
                    setTimeout(function() {
                        a.elements.undo.hide();
                        a.can_undo = !1
                    }, 1E3 * b.time)
                });
                a.elements.undo.click(a.undo);
                window.recaptchaCallback = function(a) {
                    h.send({
                        type: "captcha",
                        token: a
                    });
                    u("send", "event", "Captcha", "Sent")
                }
            },
            hexToRgb: function(a) {
                return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? {
                    r: parseInt(a[1], 16),
                    g: parseInt(a[2], 16),
                    b: parseInt(a[3], 16)
                } : null
            },
            getPaletteRGB: function() {
                var b = new Uint32Array(a.palette.length);
                $.map(a.palette, function(c, d) {
                    c = a.hexToRgb(c);
                    b[d] = 4278190080 | c.b << 16 | c.g << 8 | c.r
                });
                return b
            }
        };
        return {
            init: a.init,
            update: a.update,
            place: a.place,
            switch: a.switch,
            setPalette: a.setPalette,
            getPaletteRGB: a.getPaletteRGB,
            setAutoReset: a.setAutoReset,
            get color() {
                return a.color
            }
        }
    }()
      , G = function() {
        var a = {
            elements: {
                lookup: $("#lookup"),
                prompt: $("#prompt")
            },
            handle: null,
            report: function(b, c, d) {
                a.elements.prompt.empty().append($("\x3cp\x3e").addClass("text").css({
                    fontWeight: 800,
                    marginTop: 0
                }).text("Report pixel to moderator"), $("\x3cp\x3e").addClass("text").text("message:"), $("\x3ctextarea\x3e").css({
                    width: "100%",
                    height: "5em"
                }).keydown(function(a) {
                    a.stopPropagation()
                }), $("\x3cdiv\x3e").addClass("button").text("Cancel").css({
                    position: "fixed",
                    bottom: 20,
                    left: 30,
                    width: 66
                }).click(function() {
                    a.elements.prompt.fadeOut(200)
                }), $("\x3cdiv\x3e").addClass("button").text("Report").css({
                    position: "fixed",
                    bottom: 20,
                    right: 30
                }).click(function() {
                    var e = a.elements.prompt.find("textarea").val().trim();
                    e ? $.post("/report", {
                        id: b,
                        x: c,
                        y: d,
                        message: e
                    }, function() {
                        n.show("Sent report!");
                        a.elements.prompt.hide();
                        a.elements.lookup.hide()
                    }).fail(function() {
                        n.show("Error sending report.")
                    }) : n.show("You must enter a message!")
                })).fadeIn(200)
            },
            create: function(b) {
                a._makeShell(b).find(".content").first().append(b ? $.map([["Coords", "coords"], ["Username", "username"], ["Time", "time_str"], ["Total Pixels", "pixel_count"], ["Alltime Pixels", "pixel_count_alltime"]], function(a) {
                    return $("\x3cdiv\x3e").append($("\x3cb\x3e").text(a[0] + ": "), $("\x3cspan\x3e").text(b[a[1]]))
                }) : $("\x3cp\x3e").text("This pixel is background (was not placed by a user)."));
                a.elements.lookup.fadeIn(200)
            },
            _makeShell: function(b) {
                return a.elements.lookup.empty().append($("\x3cdiv\x3e").addClass("content"), b && z.isLoggedIn() ? $("\x3cdiv\x3e").addClass("button").css("float", "left").addClass("report-button").text("Report").click(function() {
                    a.report(b.id, b.x, b.y)
                }) : "", $("\x3cdiv\x3e").addClass("button").css("float", "right").text("Close").click(function() {
                    a.elements.lookup.fadeOut(200)
                }))
            },
            runLookup: function(b, c) {
                b = k.fromScreen(b, c);
                $.get("/lookup", {
                    x: Math.floor(b.x),
                    y: Math.floor(b.y)
                }, function(b) {
                    if (b) {
                        b.coords = "(" + b.x + ", " + b.y + ")";
                        var c = ((new Date).getTime() - b.time) / 1E3;
                        if (86400 < c)
                            b.time_str = (new Date(b.time)).toLocaleString();
                        else if (5 > c)
                            b.time_str = "just now";
                        else {
                            var d = Math.floor(c % 60)
                              , g = Math.floor(c / 60) % 60
                              , c = Math.floor(c / 3600);
                            b.time_str = (10 > c ? "0" + c : c) + ":" + (10 > g ? "0" + g : g) + ":" + (10 > d ? "0" + d : d) + " ago"
                        }
                    }
                    b = b || !1;
                    a.handle ? a.handle(b) : a.create(b)
                }).fail(function() {
                    a._makeShell(!1).find(".content").first().append($("\x3cp\x3e").css("color", "#c00").text("An error occurred, you may be attempting to look up users too fast. Please try again in 60 seconds"));
                    a.elements.lookup.fadeIn(200)
                })
            },
            init: function() {
                a.elements.lookup.hide();
                a.elements.prompt.hide();
                k.getRenderBoard().on("click", function(b) {
                    b.shiftKey && (b.preventDefault(),
                    a.runLookup(b.clientX, b.clientY))
                })
            },
            registerHandle: function(b) {
                a.handle = b
            },
            clearHandle: function() {
                a.handle = null
            }
        };
        return {
            init: a.init,
            registerHandle: a.registerHandle,
            runLookup: a.runLookup,
            clearHandle: a.clearHandle
        }
    }()
      , I = function() {
        var a = {
            elements: {
                container: $("#drawers"),
                opener: $("#drawers-opener")
            },
            create: function(a, c, d, e) {
                var b = $(a);
                $(a + " \x3e .open").click(function() {
                    b.toggleClass("open");
                    g.set(d, b.hasClass("open") ^ e)
                });
                $(a + " .close").click(function() {
                    b.removeClass("open");
                    g.set(d, 0 ^ e)
                });
                g.get(d) ^ e && b.addClass("open");
                $(document.body).keydown(function(a) {
                    a.keyCode === c && (b.toggleClass("open"),
                    g.set(d, b.hasClass("open") ^ e))
                })
            },
            updateDropdown: function() {
                $("#drawers-opener-content").empty().append($("#drawers \x3e .drawer").map(function() {
                    var b = $(this);
                    return $("\x3cdiv\x3e").text(b.find(".open").text()).click(function(c) {
                        c.stopPropagation();
                        b.toggleClass("open");
                        a.elements.opener.removeClass("open")
                    })
                }).get())
            },
            init: function() {
                a.elements.opener.find(".open").click(function(b) {
                    a.elements.opener.toggleClass("open")
                });
                a.elements.container.on("DOMNodeInserted", function(b) {
                    $(b.target).hasClass("drawer") && a.updateDropdown()
                });
                a.updateDropdown()
            }
        };
        return {
            create: a.create,
            init: a.init
        }
    }()
      , A = function() {
        return {
            init: function() {
                I.create("#info", 73, "info_closed", !0);
                $("#audiotoggle")[0].checked = g.get("audio_muted");
                $("#audiotoggle").change(function() {
                    g.set("audio_muted", this.checked)
                });
                $("#rules-button").click(function(a) {
                    a.stopPropagation();
                    n.show($("#rules-content").html())
                });
                var a = g.get("auto_reset");
                null === a && (a = !0);
                l.setAutoReset(a);
                $("#stickyColorToggle")[0].checked = !a;
                $("#stickyColorToggle").change(function() {
                    l.setAutoReset(!this.checked)
                })
            }
        }
    }()
      , n = function() {
        var a = {
            elements: {
                alert: $("#alert")
            },
            show: function(b) {
                a.elements.alert.find(".text,.custWrapper").empty();
                a.elements.alert.find(".text").append(b);
                a.elements.alert.fadeIn(200)
            },
            showElem: function(b) {
                a.elements.alert.find(".text,.custWrapper").empty();
                a.elements.alert.find(".custWrapper").append(b);
                a.elements.alert.fadeIn(200)
            },
            init: function() {
                a.elements.alert.hide().find(".button").click(function() {
                    a.elements.alert.fadeOut(200)
                });
                h.on("alert", function(b) {
                    a.show(b.message)
                })
            }
        };
        return {
            init: a.init,
            show: a.show,
            showElem: a.showElem
        }
    }()
      , t = function() {
        var a = {
            _available: -1,
            maxStacked: -1,
            elements: {
                stackCount: $("#placeableCount-bubble, #placeableCount-cursor")
            },
            init: function() {
                h.on("pixels", function(b) {
                    a.updateAvailable(b.count, b.cause)
                })
            },
            updateAvailable: function(b, c) {
                0 < b && "stackGain" === c && E.playAudio();
                a.setPlaceableText(b)
            },
            setMax: function(b) {
                a.maxStacked = b + 1
            },
            setPlaceableText: function(b) {
                a.elements.stackCount.text(b + "/" + a.maxStacked)
            },
            getAvailable: function() {
                return a._available
            }
        };
        return {
            init: a.init,
            updateTimer: a.updateTimer,
            updateAvailable: a.updateAvailable,
            getAvailable: a.getAvailable,
            setPlaceableText: a.setPlaceableText,
            setMax: a.setMax
        }
    }()
      , E = function() {
        var a = {
            elements: {
                timer_bubble: $("#cd-timer-bubble"),
                timer_overlay: $("#cd-timer-overlay"),
                timer: null
            },
            hasFiredNotification: !0,
            cooldown: 0,
            runningTimer: !1,
            focus: !0,
            audio: new Audio("notify.wav"),
            title: "",
            cooledDown: function() {
                return a.cooldown < (new Date).getTime()
            },
            update: function(b) {
                var c = (a.cooldown - (new Date).getTime() - 1) / 1E3;
                !1 === a.runningTimer && (a.elements.timer = !1 === g.get("auto_reset") ? a.elements.timer_bubble : a.elements.timer_overlay,
                a.elements.timer_bubble.hide(),
                a.elements.timer_overlay.hide());
                a.status && a.elements.timer.text(a.status);
                if (0 < c) {
                    a.elements.timer.show();
                    c++;
                    var d = Math.floor(c % 60)
                      , d = 10 > d ? "0" + d : d
                      , c = Math.floor(c / 60)
                      , c = 10 > c ? "0" + c : c;
                    a.elements.timer.text(c + ":" + d);
                    document.title = "[" + c + ":" + d + "] " + a.title;
                    if (!a.runningTimer || b)
                        a.runningTimer = !0,
                        setTimeout(function() {
                            a.update(!0)
                        }, 1E3)
                } else
                    a.runningTimer = !1,
                    a.hasFiredNotification || (a.playAudio(),
                    a.focus || L.show("Your next pixel is available!"),
                    t.setPlaceableText(1),
                    a.hasFiredNotification = !0),
                    document.title = a.title,
                    a.elements.timer.hide()
            },
            init: function() {
                a.title = document.title;
                a.elements.timer_bubble.hide();
                a.elements.timer_overlay.hide();
                $(window).focus(function() {
                    a.focus = !0
                }).blur(function() {
                    a.focus = !1
                });
                setTimeout(function() {
                    a.cooledDown() && 0 === t.getAvailable() && t.setPlaceableText(1)
                }, 250);
                h.on("cooldown", function(b) {
                    a.cooldown = (new Date).getTime() + 1E3 * b.wait;
                    a.hasFiredNotification = 0 === b.wait;
                    a.update()
                })
            },
            playAudio: function() {
                g.get("audio_muted") || a.audio.play()
            }
        };
        return {
            init: a.init,
            cooledDown: a.cooledDown,
            playAudio: a.playAudio
        }
    }()
      , x = function() {
        var a = {
            elements: {
                coords: $("#coords")
            },
            init: function() {
                function b(b) {
                    b = k.fromScreen(b.clientX, b.clientY);
                    a.elements.coords.text("(" + (b.x | 0) + ", " + (b.y | 0) + ")").fadeIn(200)
                }
                function c(b) {
                    b = k.fromScreen(b.changedTouches[0].clientX, b.changedTouches[0].clientY);
                    a.elements.coords.text("(" + (b.x | 0) + ", " + (b.y | 0) + ")").fadeIn(200)
                }
                a.elements.coords.hide();
                var d = k.getRenderBoard()[0];
                d.addEventListener("pointermove", b, {
                    passive: !1
                });
                d.addEventListener("mousemove", b, {
                    passive: !1
                });
                d.addEventListener("touchstart", c, {
                    passive: !1
                });
                d.addEventListener("touchmove", c, {
                    passive: !1
                })
            }
        };
        return {
            init: a.init
        }
    }()
      , z = function() {
        var a = {
            elements: {
                users: $("#online"),
                userInfo: $("#userinfo"),
                loginOverlay: $("#login-overlay"),
                userMessage: $("#user-message"),
                prompt: $("#prompt"),
                signup: $("#signup")
            },
            role: "USER",
            pendingSignupToken: null,
            loggedIn: !1,
            getRole: function() {
                return a.role
            },
            signin: function() {
                var b = g.get("auth_respond");
                b && (g.remove("auth_respond"),
                b.signup ? (a.pendingSignupToken = b.token,
                a.elements.signup.fadeIn(200)) : h.reconnectSocket(),
                a.elements.prompt.fadeOut(200))
            },
            isLoggedIn: function() {
                return a.loggedIn
            },
            webinit: function(b) {
                a.elements.loginOverlay.find("a").click(function(c) {
                    c.preventDefault();
                    a.elements.prompt.empty().append($("\x3ch1\x3e").html("Sign\x26nbsp;in\x26nbsp;with..."), $("\x3cul\x3e").append($.map(b.authServices, function(a) {
                        return $("\x3cli\x3e").append($("\x3ca\x3e").attr("href", "/signin/" + a.id + "?redirect\x3d1").text(a.name).click(function(a) {
                            window.open(this.href, "_blank") ? a.preventDefault() : g.set("auth_same_window", !0)
                        }))
                    })), $("\x3cdiv\x3e").addClass("button").text("Close").css({
                        position: "fixed",
                        bottom: 20,
                        right: 30,
                        width: 55
                    }).click(function() {
                        a.elements.prompt.fadeOut(200)
                    })).fadeIn(200)
                })
            },
            wsinit: function() {
                g.get("auth_proceed") && (g.remove("auth_proceed"),
                a.signin())
            },
            doSignup: function() {
                a.pendingSignupToken && $.post({
                    type: "POST",
                    url: "/signup",
                    data: {
                        token: a.pendingSignupToken,
                        username: a.elements.signup.find("input").val()
                    },
                    success: function() {
                        a.elements.signup.find("#error").text("");
                        a.elements.signup.find("input").val("");
                        a.elements.signup.fadeOut(200);
                        h.reconnectSocket();
                        a.pendingSignupToken = null
                    },
                    error: function(b) {
                        a.elements.signup.find("#error").text(b.responseJSON.message)
                    }
                })
            },
            init: function() {
                a.elements.userMessage.hide();
                a.elements.signup.hide();
                a.elements.signup.find("input").keydown(function(b) {
                    b.stopPropagation();
                    "Enter" != b.key && 13 !== b.which || a.doSignup()
                });
                a.elements.signup.find("#signup-button").click(a.doSignup);
                a.elements.users.hide();
                a.elements.userInfo.hide();
                a.elements.userInfo.find(".logout").click(function(b) {
                    b.preventDefault();
                    $.get("/logout", function() {
                        a.elements.userInfo.fadeOut(200);
                        a.elements.userMessage.fadeOut(200);
                        a.elements.loginOverlay.fadeIn(200);
                        window.deInitAdmin && window.deInitAdmin();
                        a.loggedIn = !1;
                        h.reconnectSocket()
                    })
                });
                $(window).bind("storage", function(b) {
                    "auth" == b.originalEvent.key && (g.remove("auth"),
                    a.signin())
                });
                h.on("users", function(b) {
                    a.elements.users.text(b.count + " online").fadeIn(200)
                });
                h.on("session_limit", function(a) {
                    h.close();
                    n.show("Too many sessions open, try closing some tabs.")
                });
                h.on("userinfo", function(b) {
                    var c = !1
                      , d = $("\x3cdiv\x3e").addClass("ban-alert-content");
                    a.loggedIn = !0;
                    a.elements.loginOverlay.fadeOut(200);
                    a.elements.userInfo.find("span.name").text(b.username);
                    a.elements.userInfo.fadeIn(200);
                    a.role = b.role;
                    "BANNED" == a.role ? (c = !0,
                    d.append($("\x3cp\x3e").text("You are permanently banned."))) : !0 === b.banned ? (c = !0,
                    d.append($("\x3cp\x3e").text("You are temporarily banned and will not be allowed to place until " + (new Date(b.banExpiry)).toLocaleString()))) : -1 != ["MODERATOR", "ADMIN"].indexOf(a.role) ? (window.deInitAdmin && window.deInitAdmin(),
                    $.getScript("admin/admin.js").done(function() {
                        window.initAdmin({
                            socket: h,
                            user: z,
                            place: l,
                            alert: n,
                            lookup: G
                        })
                    })) : window.deInitAdmin && window.deInitAdmin();
                    c ? (a.elements.userMessage.show().text("You can contact us using one of the links in the info menu.").fadeIn(200),
                    d.append($("\x3cp\x3e").text("If you think this was an error, please contact us using one of the links in the info tab.")).append($("\x3cp\x3e").append("Ban reason:")).append($("\x3cp\x3e").append(b.ban_reason)),
                    n.showElem(d),
                    window.deInitAdmin && window.deInitAdmin()) : a.elements.userMessage.hide();
                    u("send", "event", "Auth", "Login", b.method)
                })
            }
        };
        return {
            init: a.init,
            getRole: a.getRole,
            webinit: a.webinit,
            wsinit: a.wsinit,
            isLoggedIn: a.isLoggedIn
        }
    }()
      , L = function() {
        return {
            init: function() {
                try {
                    Notification.requestPermission()
                } catch (a) {
                    console.log("Notifications not available")
                }
            },
            show: function(a) {
                try {
                    (new Notification("pxls.space",{
                        body: a,
                        icon: "favicon.ico"
                    })).onclick = function() {
                        parent.focus();
                        window.focus();
                        this.close()
                    }
                } catch (b) {
                    console.log("No notifications available!")
                }
            }
        }
    }();
    m.init();
    k.init();
    H.init();
    I.init();
    G.init();
    p.init();
    y.init();
    D.init();
    l.init();
    A.init();
    n.init();
    E.init();
    t.init();
    x.init();
    z.init();
    L.init();
    k.start();
    return {
        ls: g,
        ss: C,
        query: m,
        heatmap: {
            clear: H.clear
        },
        template: {
            update: function(a) {
                p.queueUpdate(a)
            },
            normalize: function(a, b) {
                return p.normalizeTemplateObj(a, void 0 === b ? !0 : b)
            }
        },
        centerBoardOn: function(a, b) {
            k.centerOn(a, b)
        },
        updateTemplate: function(a) {
            p.queueUpdate(a)
        },
        alert: function(a) {
            n.show($("\x3cspan\x3e").text(a).html())
        },
        doPlace: function() {
            y.me()
        },
        attemptPlace: function() {
            y.me()
        },
        banme: function() {
            y.me()
        }
    }
}();
