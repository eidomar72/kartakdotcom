! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.js = e()
}(this, function() {
    "use strict";

    function t(t, e, n, r, o) {
        return r + (t - e) / (n - e) * (o - r)
    }

    function e(t, e, n) {
        this.x = t, this.y = e, this.z = n
    }

    function n(t) {
        t > 0 && t < 1 && (t *= 65536), (t = Math.floor(t)) < 256 && (t |= t << 8);
        for (var e = 0; e < 256; e++) {
            var n;
            n = 1 & e ? p[e] ^ 255 & t : p[e] ^ t >> 8 & 255, m[e] = m[e + 256] = n, g[e] = g[e + 256] = v[n % 12]
        }
    }

    function r(t, e) {
        var n, r, o, i, a, h = (t + e) * M,
            l = Math.floor(t + h),
            c = Math.floor(e + h),
            u = (l + c) * y,
            s = t - l + u,
            f = e - c + u;
        s > f ? (i = 1, a = 0) : (i = 0, a = 1);
        var d = s - i + y,
            v = f - a + y,
            p = s - 1 + 2 * y,
            w = f - 1 + 2 * y,
            x = g[(l &= 255) + m[c &= 255]],
            b = g[l + i + m[c + a]],
            E = g[l + 1 + m[c + 1]],
            C = .5 - s * s - f * f;
        n = C < 0 ? 0 : (C *= C) * C * x.dot2(s, f);
        var L = .5 - d * d - v * v;
        r = L < 0 ? 0 : (L *= L) * L * b.dot2(d, v);
        var H = .5 - p * p - w * w;
        return o = H < 0 ? 0 : (H *= H) * H * E.dot2(p, w), 70 * (n + r + o)
    }

    function o(t) {
        return t * t * t * (t * (6 * t - 15) + 10)
    }

    function i(t, e, n) {
        return (1 - n) * t + n * e
    }

    function a(t, e) {
        var n = Math.floor(t),
            r = Math.floor(e);
        t -= n, e -= r;
        var a = g[(n &= 255) + m[r &= 255]].dot2(t, e),
            h = g[n + m[r + 1]].dot2(t, e - 1),
            l = g[n + 1 + m[r]].dot2(t - 1, e),
            c = g[n + 1 + m[r + 1]].dot2(t - 1, e - 1),
            u = o(t);
        return i(i(a, l, u), i(h, c, u), o(e))
    }

    function h(t) {
        function e() {
            n.offsetWidth != r.offsetWidth && 0 != n.offsetWidth ? requestAnimationFrame(e) : (document.body.removeChild(n), document.body.removeChild(r), f.hasTouch && E.classList.add("disable-touch-select"), function(t) {
                var e = document.createElement("div");
                e.style.cssText = "display:block;white-space:pre;position:absolute;", e.innerHTML = "X".repeat(100) + "\n", e.innerHTML += "X\n".repeat(99), document.body.appendChild(e);
                var n = e.offsetWidth / 100,
                    r = e.offsetHeight / 100;
                document.body.removeChild(e), t.charWidth = n, t.lineHeight = r, t.aspect = n / r
            }(X), document.addEventListener("mousemove", function(t) {
                T.firstMove || (T.px = t.clientX, T.py = t.clientY, T.firstMove = !0), T.x = t.clientX, T.y = t.clientY
            }), document.addEventListener("click", function(t) {
                s.fill(k, ~~(Math.random() * L.length)), c(q, D, O)
            }), document.addEventListener("touchstart", function(t) {
                T.x = t.touches[0].clientX, T.y = t.touches[0].clientY, T.px = T.x, T.py = T.y
            }), document.addEventListener("touchmove", function(t) {
                T.x = t.touches[0].clientX, T.y = t.touches[0].clientY
            }), document.addEventListener("touchend", function(t) {}), requestAnimationFrame(l), "function" == typeof t && t())
        }
        var n = document.createElement("span"),
            r = document.createElement("span");
        n.style.visibility = "hidden", r.style.visibility = "hidden", n.innerHTML = "X<br>", r.innerHTML = "i<br>", document.body.appendChild(n), document.body.appendChild(r), requestAnimationFrame(e)
    }

    function l(e) {
        var n = Math.ceil(window.innerWidth / X.charWidth),
            r = Math.ceil(window.innerHeight / X.lineHeight);
        for (n == O && r == D || (O = n, D = r, s.resize2d(k, D, O, H), s.resize2d(W, D, O, H), s.resize2d(q, D, O, 0), c(q, D, O, 4), F.canvas.width = O, F.canvas.height = Math.ceil(D / X.aspect)); E.childNodes.length > D;) E.removeChild(E.lastChild);
        for (; E.childNodes.length < D;) E.appendChild(document.createElement("span"));
        var o = {
            metrics: X,
            chars: L
        };
        s.fill(W, H);
        var i = Math.floor(T.x / X.charWidth),
            a = Math.floor(T.y / X.lineHeight),
            h = Math.sqrt(Math.pow(T.px - T.x, 2) + Math.pow(T.py - T.y, 2));
        (B += .05 * (h - B)) > 0 && d.circle(k, o, i, a, Math.floor(B), L.map.get("0")), A.length = 0;
        var f = !0,
            v = !1,
            p = void 0;
        try {
            for (var m, g = z[Symbol.iterator](); !(f = (m = g.next()).done); f = !0) {
                var M = m.value;
                d.textBox(W, o, M.tokens, M.x(X), M.y(X), M.cols(X), A)
            }
        } catch (t) {
            v = !0, p = t
        } finally {
            try {
                !f && g.return && g.return()
            } finally {
                if (v) throw p
            }
        }
        var y = 2 * Math.PI,
            w = F.canvas.width,
            x = F.canvas.height;
        F.save(), F.fillStyle = "white", F.fillRect(0, 0, w, x), F.scale(1, X.aspect), F.fillStyle = "black";
        var b = Math.max(w, x),
            C = t(Math.cos(.0011 * e), -1, 1, .085 * b, .85 * b),
            P = Math.cos(265e-6 * e) * w,
            S = Math.cos(271e-6 * e) * x,
            Y = Math.cos(173e-6 * e) * y;
        F.translate(w / 2 + P, x / 2 + S), F.rotate(Y);
        var j = Math.cos(y / 3) * C,
            N = Math.sin(y / 3) * C;
        F.beginPath(), F.moveTo(C, 0), F.lineTo(j, -N), F.lineTo(j, N), F.closePath(), F.fill(), F.restore(), d.image(W, o, F);
        for (var R = 0; R < D; R++) {
            var I = E.childNodes[R],
                G = function(t, e) {
                    var n = t.length;
                    for (; t[n] == H && n > 0;) n--;
                    for (var r = "", o = 0; o < n; o++) {
                        var i = t[o];
                        r += e.list[i] || " "
                    }
                    return r
                }(k[R], L);
            G = function(t, e) {
                if (!e) return t;
                for (var n = e.length - 1; n >= 0; n--) {
                    var r = e[n].tag,
                        o = e[n].offsX;
                    t = u(r.close, t, o + r.length), t = u(r.open, t, o)
                }
                return t
            }(G, A[R]), I.innerHTML != G && (I.innerHTML = G)
        }
        for (var J = 0; J < D; J++)
            for (var K = 0; K < O; K++) q[J][K] > 0 ? q[J][K]-- : k[J][K] != W[J][K] && 0 == q[J][K] && (k[J][K] = ++k[J][K] % L.length);
        T.px = T.x, T.py = T.y, requestAnimationFrame(l)
    }

    function c(t, e, n) {
        function r(t, e) {
            for (var n = 0; n < t.length; n++)
                for (var r = 0; r < t[n].length; r++) t[n][r] = e(r, n, t[n][r])
        }
        var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ~~(5 * Math.random());
        e = e || t.length, n = n || t[0].length, s.resize2d(t, e, n, 0);
        var i = Math.floor(T.x / X.charWidth),
            a = Math.floor(T.y / X.lineHeight);
        if (0 == o) {
            var h = 5 + ~~(10 * Math.random());
            r(t, function(t, e) {
                return t % h + 2 * e
            })
        } else 1 == o ? r(t, function(t, n) {
            return t % 2 == 0 ? 2 * n : 2 * (e - n)
        }) : 2 == o ? r(t, function(t, e) {
            return e % 2 == 0 ? ~~((t + e) / 3) : ~~((n - t + e) / 3)
        }) : 3 == o ? r(t, function(t, e) {
            return ~~(Math.sqrt(Math.pow(i - t, 2) + Math.pow((a - e) / X.aspect, 2)) / 2)
        }) : 4 == o && (w.seed(Math.random()), r(t, function(t, e) {
            return ~~(120 * w.perlin2(.03 * t, .03 * e / X.aspect))
        }))
    }

    function u(t, e, n) {
        return n > 0 ? e.substring(0, n) + t + e.substring(n, e.length) : t + e
    }
    var s = {
            resize2d: function(t, e, n, r) {
                t.length = Math.min(e, t.length);
                for (var o = 0; o < t.length; o++)
                    if (t[o].length > n) t[o].length = n;
                    else
                        for (var i = t[o].length; i < n; i++) t[o][i] = r;
                for (; t.length < e;) t.push(new Array(n).fill(r))
            },
            fill: function(t, e) {
                for (var n = 0; n < t.length; n++)
                    for (var r = 0; r < t[n].length; r++) t[n][r] = e
            },
            set: function(t, e, n, r) {
                e < 0 || e >= t.length || n < 0 || n >= t[e].length || (t[e][n] = r)
            }
        },
        f = {
            hasTouch: "ontouchstart" in document.documentElement
        },
        d = {
            image: function(e, n, r) {
                for (var o = r.canvas, i = r.getImageData(0, 0, o.width, o.height).data, a = Math.min(o.width, e[0].length), h = Math.min(o.height, e.length), l = n.chars.length, c = n.chars.map.get("1"), u = 0; u < h; u++)
                    for (var s = u * o.width, f = 0; f < a; f++) {
                        var d = 4 * (f + s),
                            v = i[d++];
                        i[d++], i[d], v < 255 && (f + u % 2) % 2 == 1 && (e[u][f] = Math.round(t(v, 0, 255, c, l - 1)))
                    }
            },
            circle: function(t, e, n, r, o, i) {
                for (var a = e.metrics.aspect, h = o, l = Math.floor(o * a) + 1, c = h * h, u = Math.max(n - h, 0), s = Math.max(r - l, 0), f = Math.min(n + h + 1, t[0].length), d = Math.min(r + l + 1, t.length), v = s; v < d; v++)
                    for (var p = u; p < f; p++) Math.pow(p - n, 2) + Math.pow((v - r) / a, 2) < c && (p + v % 2) % 2 == 0 && (t[v][p] = i)
            },
            textBox: function(t, e, n, r, o, i, a) {
                for (var h = r, l = o, c = (t.length, t[0].length), u = Math.min(c - 1, r + i), f = e.chars.map.get("—"), d = 0; d < n.length; d++) {
                    var v = n[d],
                        p = n[d + 1];
                    if ("br" == v.tag) l += 1, h = r;
                    else if ("p" == v.tag) h != r && (h = r, l += 1);
                    else if ("hr" == v.tag)
                        for (h != r && (h = r, l += 1); h < u;) s.set(t, l, h++, f);
                    else {
                        v.punctuation || h == r || (h += 1);
                        var m = v.length;
                        p && p.punctuation && (m += p.length), h + m > u && (h = r, l += 1);
                        for (var g = 0; g < v.length; g++) s.set(t, l, h + g, e.chars.map.get(v.text[g]));
                        "a" == v.tag && l >= 0 && l < c && (a[l] = a[l] || [], a[l].push({
                            tag: v,
                            offsX: h
                        })), h += v.length
                    }
                }
            }
        };
    e.prototype.dot2 = function(t, e) {
        return this.x * t + this.y * e
    }, e.prototype.dot3 = function(t, e, n) {
        return this.x * t + this.y * e + this.z * n
    };
    var v = [new e(1, 1, 0), new e(-1, 1, 0), new e(1, -1, 0), new e(-1, -1, 0), new e(1, 0, 1), new e(-1, 0, 1), new e(1, 0, -1), new e(-1, 0, -1), new e(0, 1, 1), new e(0, -1, 1), new e(0, 1, -1), new e(0, -1, -1)],
        p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180],
        m = new Array(512),
        g = new Array(512);
    n(0);
    var M = .5 * (Math.sqrt(3) - 1),
        y = (3 - Math.sqrt(3)) / 6,
        w = {
            seed: n,
            simplex2: function(t, e) {
                return (r(t, e) + 1) / 2
            },
            simplex3: function(t, e, n) {
                return (r(t, e) + 1) / 2
            },
            perlin2: function(t, e) {
                return (a(t, e) + 1) / 2
            },
            perlin3: function(t, e, n) {
                return (a(t, e) + 1) / 2
            }
        },
        x = function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        b = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e
            }
        }(),
        E = document.querySelector("output") || document.body.appendChild(document.createElement("output"));
    E.classList.add("disable-scroll");
    var C = "aàbcdeèéfghiìjklmnoòpqrstuùüvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%/|\\()#?!\"'“”‘’;:π*+•—-_,. ",
        L = {
            list: Array.from(C),
            map: new Map(Array.from(C).map(function(t, e) {
                return [t, e]
            })),
            length: C.length
        },
        H = L.map.get(" "),
        T = {
            x: -100,
            y: -100,
            px: -100,
            py: -100,
            pressed: !1,
            firstMove: !1
        },
        k = [],
        W = [],
        q = [],
        A = [],
        X = {},
        z = [],
        O = 0,
        D = 0,
        B = 0,
        F = document.createElement("canvas").getContext("2d"),
        P = function() {
            function t(e) {
                x(this, t), this.DOMElement = e, this.tokens = [], this.refresh()
            }
            return b(t, [{
                key: "refresh",
                value: function() {
                    this.tokens = function(t) {
                        var e = [],
                            n = null,
                            r = null;
                        return t.replace(/<([^\s>]*)[^>]*>|[^\s<]*/g, function(t, o, i) {
                            o ? ("/" == o[0] ? (n = null, r = null) : (n = o.toLowerCase(), r = t), "p" != n && "br" != n && "hr" != n || (e.push({
                                tag: n
                            }), n = null, r = null)) : "" != t && e.push({
                                text: t,
                                tag: n,
                                open: r,
                                close: n ? "</" + n + ">" : null,
                                length: t.length,
                                punctuation: ",;.:".indexOf(t) >= 0
                            })
                        }), e
                    }(this.DOMElement.innerHTML)
                }
            }, {
                key: "cols",
                value: function(t) {
                    return Math.round(this.DOMElement.offsetWidth / t.charWidth)
                }
            }, {
                key: "x",
                value: function(t) {
                    var e = this.DOMElement.getBoundingClientRect();
                    return Math.round(e.left / t.charWidth)
                }
            }, {
                key: "y",
                value: function(t) {
                    var e = this.DOMElement.getBoundingClientRect();
                    return Math.round(e.top / t.lineHeight)
                }
            }]), t
        }();
    return {
        ert: {
            refresh: function() {
                z.forEach(function(t) {
                    t.refresh()
                })
            },
            track: function(t) {
                var e = new P(t);
                z.push(e)
            },
            setup: h
        }
    }
});
