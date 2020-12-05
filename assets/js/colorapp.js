! function (r) {
    var t = {};

    function n(a) {
        if (t[a]) return t[a].exports;
        var o = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return r[a].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = r, n.c = t, n.d = function (r, t, a) {
        n.o(r, t) || Object.defineProperty(r, t, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }, n.r = function (r) {
        Object.defineProperty(r, "__esModule", {
            value: !0
        })
    }, n.n = function (r) {
        var t = r && r.__esModule ? function () {
            return r.default
        } : function () {
            return r
        };
        return n.d(t, "a", t), t
    }, n.o = function (r, t) {
        return Object.prototype.hasOwnProperty.call(r, t)
    }, n.p = "/", n(n.s = 1)
}([function (t, n, a) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var o = n.colorapp = new function () {
        this.currentColor = null, this.init = function () {
            var r = this,
                t = location.hash.substring(6) || !1;
            this.currentColor = t ? r.HEXtoRGB(t) : this.randomColor(), this.setColorFields(!1), this.setSiteColor(), $("#hex, #rgb, #hsl, #cmyk").on("focus", function () {
                $(this).on("keyup", n)
            }), $("#hex, #rgb, #hsl, #cmyk").on("blur", function () {
                $(this).off("keyup", n)
            }), $(".copy").on("click", function (t) {
                var n = $(t.target).siblings("input").attr("id");
                r.copyField(n)
            });
            var n = function () {
                o.changeColor(this)
            };
            setTimeout(function () {
                $("#random-tip .text").addClass("bounceInDown animated show")
            }, 3e3), $("#random-tip .text").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).removeClass("bounceInDown jello animated")
            }), $(document).on("keyup", function (t) {
                18 == t.keyCode && ($("#random-tip .text").addClass("jello animated"), r.currentColor = r.randomColor(), r.setColorFields(!1), r.setSiteColor(!0))
            }), window.addEventListener("hashchange", function () {
                var t = location.hash.substring(6);
                t && (r.currentColor = r.HEXtoRGB(t), r.setColorFields(!1), r.setSiteColor(!1))
            })
        }, this.setSiteColor = function (r) {
            r = r || !1;
            var t = this.currentColor,
                n = "#" + this.RGBtoHEX(t[0], t[1], t[2]);
            if (this.RGBlightness(t[0], t[1], t[2]) < 180) var a = this.blendColors(n, "#FFFFFF", .75);
            else a = this.blendColors(n, "#000000", .5);
            $("body").css("backgroundColor", "rgb(" + t + ")"), $(".color-field, body, a").css("color", a), $(".color-field").css("borderColor", a), $(".rw-monogram").css("fill", a), r && (location.hash = "/hex/" + String(n).replace(/[^0-9a-f]/gi, ""))
        }, this.changeColor = function (r) {
            var t = this,
                n = "",
                a = "",
                o = "",
                e = "";
            switch ($(r).attr("id")) {
                case "hex":
                    a = t.HEXtoRGB(r.value), n = "hex";
                    break;
                case "rgb":
                    var i = t.matchers().rgb.exec(r.value);
                    a = [i[1], i[2], i[3]], n = "rgb";
                    break;
                case "cmyk":
                    o = t.matchers().cmyk.exec(r.value), a = t.CMYKtoRGB(o[1], o[2], o[3], o[4]), n = "cmyk";
                    break;
                case "hsl":
                    e = t.matchers().hsl.exec(r.value), a = t.HSLtoRGB(e[1], e[2], e[3]), n = "hsl";
                    break;
                default:
                    a = !1, n = ""
            }
            0 != a && (t.currentColor = a, t.setColorFields(n), t.setSiteColor())
        }, this.setColorFields = function (r) {
            var t = this.currentColor;
            if ("hex" != (r = r || !1) && $("#hex").val("#" + this.RGBtoHEX(t[0], t[1], t[2])), "rgb" != r && $("#rgb").val("rgb(" + t.join(",") + ")"), "hsl" != r) {
                var n = this.RGBtoHSL(t[0], t[1], t[2]);
                $("#hsl").val("hsl(" + n[0] + "," + n[1] + "%," + n[2] + "%)")
            }
            "cmyk" != r && $("#cmyk").val("cmyk(" + this.RGBtoCMYK(t[0], t[1], t[2]) + ")")
        }, this.copyField = function (r) {
            var t = document.getElementById(r);
            t.select(), t.setSelectionRange(0, 99999), document.execCommand("copy"), t.blur()
        }, this.RGBtoHEX = function (r, t, n) {
            var a;
            return a = (r << 16 | t << 8 | n).toString(16).toUpperCase(), new Array(7 - a.length).join("0") + a
        }, this.HEXtoRGB = function (r) {
            return r = String(r).replace(/[^0-9a-f]/gi, ""), [(r = parseInt(r, 16)) >> 16, r >> 8 & 255, 255 & r]
        }, this.RGBtoBIN = function (r, t, n) {
            var a;
            return a = (r << 16 | t << 8 | n).toString(2), new Array(25 - a.length).join("0") + a
        }, this.BINtoRGB = function (r) {
            var t = parseInt(r, 2);
            return [t >> 16, t >> 8 & 255, 255 & t]
        }, this.RGBtoHSL = function (r, t, n) {
            var a, o, e, i, s, h;
            if (r /= 255, t /= 255, n /= 255, s = ((a = Math.max(r, t, n)) + (o = Math.min(r, t, n))) / 2, a == o) e = i = 0;
            else {
                switch (h = a - o, i = s > .5 ? h / (2 - a - o) : h / (a + o), a) {
                    case r:
                        e = (t - n) / h + (t < n ? 6 : 0);
                        break;
                    case t:
                        e = (n - r) / h + 2;
                        break;
                    case n:
                        e = (r - t) / h + 4
                }
                e /= 6
            }
            return [e = this.round(360 * e, 1), i = this.round(100 * i, 1), s = this.round(100 * s, 1)]
        }, this.HSLtoRGB = function (r, t, n) {
            var a, o, e, i, s, h;
            return r = Number(String(r).replace(/[^0-9\.]/gi, "")), t = Number(String(t).replace(/[^0-9\.]/gi, "")), n = Number(String(n).replace(/[^0-9\.]/gi, "")), isFinite(r) || (r = 0), isFinite(t) || (t = 0), isFinite(n) || (n = 0), (r /= 60) < 0 && (r = 6 - -r % 6), r %= 6, t = Math.max(0, Math.min(1, t / 100)), n = Math.max(0, Math.min(1, n / 100)), h = (s = (1 - Math.abs(2 * n - 1)) * t) * (1 - Math.abs(r % 2 - 1)), r < 1 ? (a = s, o = h, e = 0) : r < 2 ? (a = h, o = s, e = 0) : r < 3 ? (a = 0, o = s, e = h) : r < 4 ? (a = 0, o = h, e = s) : r < 5 ? (a = h, o = 0, e = s) : (a = s, o = 0, e = h), i = n - s / 2, [a = Math.round(255 * (a + i)), o = Math.round(255 * (o + i)), e = Math.round(255 * (e + i))]
        }, this.RGBtoHSV = function (r, t, n) {
            r /= 255, t /= 255, n /= 255;
            var a = Math.min(r, t, n),
                o = Math.max(r, t, n),
                e = o - a;
            if (v = o, 0 == e) h = 0, s = 0;
            else {
                s = e / o;
                var i = ((o - r) / 6 + e / 2) / e,
                    u = ((o - t) / 6 + e / 2) / e,
                    c = ((o - n) / 6 + e / 2) / e;
                r == o ? h = c - u : t == o ? h = 1 / 3 + i - c : n == o && (h = 2 / 3 + u - i), h < 0 && (h += 1), h > 1 && (h -= 1)
            }
            return h = Math.round(360 * h), s = Math.round(100 * s), v = Math.round(100 * v), [h, s, v]
        }, this.HSVtoRGB = function (t, n, a) {
            return t /= 360, a /= 100, 0 == (n /= 100) ? (r = 255 * a, g = 255 * a, b = 255 * a) : (var_h = 6 * t, var_i = Math.floor(var_h), var_1 = a * (1 - n), var_2 = a * (1 - n * (var_h - var_i)), var_3 = a * (1 - n * (1 - (var_h - var_i))), 0 == var_i ? (var_r = a, var_g = var_3, var_b = var_1) : 1 == var_i ? (var_r = var_2, var_g = a, var_b = var_1) : 2 == var_i ? (var_r = var_1, var_g = a, var_b = var_3) : 3 == var_i ? (var_r = var_1, var_g = var_2, var_b = a) : 4 == var_i ? (var_r = var_3, var_g = var_1, var_b = a) : (var_r = a, var_g = var_1, var_b = var_2), r = Math.round(255 * var_r), g = Math.round(255 * var_g), b = Math.round(255 * var_b)), [r, g, b]
        }, this.CMYKtoRGB = function (t, n, a, o) {
            return t /= 100, n /= 100, a /= 100, o /= 100, r = 1 - Math.min(1, t * (1 - o) + o), g = 1 - Math.min(1, n * (1 - o) + o), b = 1 - Math.min(1, a * (1 - o) + o), r = Math.round(255 * r), g = Math.round(255 * g), b = Math.round(255 * b), [r, g, b]
        }, this.RGBtoCMYK = function (r, t, n) {
            r /= 255, t /= 255, n /= 255;
            var a = Math.min(1 - r, 1 - t, 1 - n),
                o = (1 - r - a) / (1 - a),
                e = (1 - t - a) / (1 - a),
                i = (1 - n - a) / (1 - a);
            return [o = Math.round(100 * o), e = Math.round(100 * e), i = Math.round(100 * i), a = Math.round(100 * a)]
        }, this.blendColors = function (r, t, n) {
            var a = parseInt(r.slice(1), 16),
                o = parseInt(t.slice(1), 16),
                e = a >> 16,
                i = a >> 8 & 255,
                s = 255 & a,
                h = o >> 16,
                u = o >> 8 & 255,
                c = 255 & o;
            return "#" + (16777216 + 65536 * (Math.round((h - e) * n) + e) + 256 * (Math.round((u - i) * n) + i) + (Math.round((c - s) * n) + s)).toString(16).slice(1)
        }, this.RGBlightness = function (r, t, n) {
            return .2126 * r + .7152 * t + .0722 * n
        }, this.colorLuminance = function (r, t) {
            (r = String(r).replace(/[^0-9a-f]/gi, "")).length < 6 && (r = r[0] + r[0] + r[1] + r[1] + r[2] + r[2]), t = t || 0;
            var n, a, o = "#";
            for (a = 0; a < 3; a++) n = parseInt(r.substr(2 * a, 2), 16), Math.min(Math.max(0, n + n * t), 255) < -100 * t && (t *= -1), o += ("00" + (n = Math.round(Math.min(Math.max(0, n + n * t), 255)).toString(16))).substr(n.length);
            return o
        }, this.randomColor = function () {
            return [Math.round(255 * Math.random()), Math.round(255 * Math.random()), Math.round(255 * Math.random())]
        }, this.matchers = function () {
            var r = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",
                t = "[\\s|\\(]+(" + r + ")[,|\\s]+(" + r + ")[,|\\s]+(" + r + ")\\s*\\)?";
            return {
                CSS_UNIT: new RegExp(r),
                rgb: new RegExp("rgb" + t),
                hsl: new RegExp("hsl" + t),
                hsv: new RegExp("hsv" + t),
                cmyk: new RegExp("cmyk[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
                hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            }
        }, this.round = function (r, t) {
            return Number(Math.round(r + "e" + t) + "e-" + t)
        }
    };
    o.init()
}, function (r, t, n) {
    r.exports = n(0)
}]);
