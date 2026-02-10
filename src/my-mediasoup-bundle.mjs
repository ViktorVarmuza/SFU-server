function Vt(f, y) {
  for (var w = 0; w < y.length; w++) {
    const n = y[w];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const T in n)
        if (T !== "default" && !(T in f)) {
          const C = Object.getOwnPropertyDescriptor(n, T);
          C && Object.defineProperty(f, T, C.get ? C : {
            enumerable: !0,
            get: () => n[T]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(f, Symbol.toStringTag, { value: "Module" }));
}
function Qt(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var ze = {}, ke = { exports: {} }, $e, Je;
function Gt() {
  if (Je) return $e;
  Je = 1;
  var f = 1e3, y = f * 60, w = y * 60, n = w * 24, T = n * 7, C = n * 365.25;
  $e = function(r, u) {
    u = u || {};
    var l = typeof r;
    if (l === "string" && r.length > 0)
      return _(r);
    if (l === "number" && isFinite(r))
      return u.long ? g(r) : m(r);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(r)
    );
  };
  function _(r) {
    if (r = String(r), !(r.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        r
      );
      if (u) {
        var l = parseFloat(u[1]), E = (u[2] || "ms").toLowerCase();
        switch (E) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return l * C;
          case "weeks":
          case "week":
          case "w":
            return l * T;
          case "days":
          case "day":
          case "d":
            return l * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return l * w;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return l * y;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return l * f;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return l;
          default:
            return;
        }
      }
    }
  }
  function m(r) {
    var u = Math.abs(r);
    return u >= n ? Math.round(r / n) + "d" : u >= w ? Math.round(r / w) + "h" : u >= y ? Math.round(r / y) + "m" : u >= f ? Math.round(r / f) + "s" : r + "ms";
  }
  function g(r) {
    var u = Math.abs(r);
    return u >= n ? x(r, u, n, "day") : u >= w ? x(r, u, w, "hour") : u >= y ? x(r, u, y, "minute") : u >= f ? x(r, u, f, "second") : r + " ms";
  }
  function x(r, u, l, E) {
    var S = u >= l * 1.5;
    return Math.round(r / l) + " " + E + (S ? "s" : "");
  }
  return $e;
}
var qe, Ye;
function Kt() {
  if (Ye) return qe;
  Ye = 1;
  function f(y) {
    n.debug = n, n.default = n, n.coerce = x, n.disable = m, n.enable = C, n.enabled = g, n.humanize = Gt(), n.destroy = r, Object.keys(y).forEach((u) => {
      n[u] = y[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function w(u) {
      let l = 0;
      for (let E = 0; E < u.length; E++)
        l = (l << 5) - l + u.charCodeAt(E), l |= 0;
      return n.colors[Math.abs(l) % n.colors.length];
    }
    n.selectColor = w;
    function n(u) {
      let l, E = null, S, e;
      function t(...s) {
        if (!t.enabled)
          return;
        const o = t, v = Number(/* @__PURE__ */ new Date()), p = v - (l || v);
        o.diff = p, o.prev = l, o.curr = v, l = v, s[0] = n.coerce(s[0]), typeof s[0] != "string" && s.unshift("%O");
        let h = 0;
        s[0] = s[0].replace(/%([a-zA-Z%])/g, (i, c) => {
          if (i === "%%")
            return "%";
          h++;
          const b = n.formatters[c];
          if (typeof b == "function") {
            const R = s[h];
            i = b.call(o, R), s.splice(h, 1), h--;
          }
          return i;
        }), n.formatArgs.call(o, s), (o.log || n.log).apply(o, s);
      }
      return t.namespace = u, t.useColors = n.useColors(), t.color = n.selectColor(u), t.extend = T, t.destroy = n.destroy, Object.defineProperty(t, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => E !== null ? E : (S !== n.namespaces && (S = n.namespaces, e = n.enabled(u)), e),
        set: (s) => {
          E = s;
        }
      }), typeof n.init == "function" && n.init(t), t;
    }
    function T(u, l) {
      const E = n(this.namespace + (typeof l > "u" ? ":" : l) + u);
      return E.log = this.log, E;
    }
    function C(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const l = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const E of l)
        E[0] === "-" ? n.skips.push(E.slice(1)) : n.names.push(E);
    }
    function _(u, l) {
      let E = 0, S = 0, e = -1, t = 0;
      for (; E < u.length; )
        if (S < l.length && (l[S] === u[E] || l[S] === "*"))
          l[S] === "*" ? (e = S, t = E, S++) : (E++, S++);
        else if (e !== -1)
          S = e + 1, t++, E = t;
        else
          return !1;
      for (; S < l.length && l[S] === "*"; )
        S++;
      return S === l.length;
    }
    function m() {
      const u = [
        ...n.names,
        ...n.skips.map((l) => "-" + l)
      ].join(",");
      return n.enable(""), u;
    }
    function g(u) {
      for (const l of n.skips)
        if (_(u, l))
          return !1;
      for (const l of n.names)
        if (_(u, l))
          return !0;
      return !1;
    }
    function x(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function r() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return qe = f, qe;
}
var Ze;
function Ae() {
  return Ze || (Ze = 1, (function(f, y) {
    y.formatArgs = n, y.save = T, y.load = C, y.useColors = w, y.storage = _(), y.destroy = /* @__PURE__ */ (() => {
      let g = !1;
      return () => {
        g || (g = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), y.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function w() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let g;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (g = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(g[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(g) {
      if (g[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + g[0] + (this.useColors ? "%c " : " ") + "+" + f.exports.humanize(this.diff), !this.useColors)
        return;
      const x = "color: " + this.color;
      g.splice(1, 0, x, "color: inherit");
      let r = 0, u = 0;
      g[0].replace(/%[a-zA-Z%]/g, (l) => {
        l !== "%%" && (r++, l === "%c" && (u = r));
      }), g.splice(u, 0, x);
    }
    y.log = console.debug || console.log || (() => {
    });
    function T(g) {
      try {
        g ? y.storage.setItem("debug", g) : y.storage.removeItem("debug");
      } catch {
      }
    }
    function C() {
      let g;
      try {
        g = y.storage.getItem("debug") || y.storage.getItem("DEBUG");
      } catch {
      }
      return !g && typeof process < "u" && "env" in process && (g = process.env.DEBUG), g;
    }
    function _() {
      try {
        return localStorage;
      } catch {
      }
    }
    f.exports = Kt()(y);
    const { formatters: m } = f.exports;
    m.j = function(g) {
      try {
        return JSON.stringify(g);
      } catch (x) {
        return "[UnexpectedJSONParseError]: " + x.message;
      }
    };
  })(ke, ke.exports)), ke.exports;
}
var Be = {}, Xe;
function Wt() {
  return Xe || (Xe = 1, Object.defineProperty(Be, "__esModule", { value: !0 })), Be;
}
var K = {}, re = {}, et;
function z() {
  if (et) return re;
  et = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.Logger = void 0;
  const f = Ae(), y = "mediasoup-client";
  class w {
    _debug;
    _warn;
    _error;
    constructor(T) {
      T ? (this._debug = (0, f.default)(`${y}:${T}`), this._warn = (0, f.default)(`${y}:WARN:${T}`), this._error = (0, f.default)(`${y}:ERROR:${T}`)) : (this._debug = (0, f.default)(y), this._warn = (0, f.default)(`${y}:WARN`), this._error = (0, f.default)(`${y}:ERROR`)), this._debug.log = console.info.bind(console), this._warn.log = console.warn.bind(console), this._error.log = console.error.bind(console);
    }
    get debug() {
      return this._debug;
    }
    get warn() {
      return this._warn;
    }
    get error() {
      return this._error;
    }
  }
  return re.Logger = w, re;
}
var se = {}, De = { exports: {} }, tt;
function Jt() {
  if (tt) return De.exports;
  tt = 1;
  var f = typeof Reflect == "object" ? Reflect : null, y = f && typeof f.apply == "function" ? f.apply : function(h, d, i) {
    return Function.prototype.apply.call(h, d, i);
  }, w;
  f && typeof f.ownKeys == "function" ? w = f.ownKeys : Object.getOwnPropertySymbols ? w = function(h) {
    return Object.getOwnPropertyNames(h).concat(Object.getOwnPropertySymbols(h));
  } : w = function(h) {
    return Object.getOwnPropertyNames(h);
  };
  function n(p) {
    console && console.warn && console.warn(p);
  }
  var T = Number.isNaN || function(h) {
    return h !== h;
  };
  function C() {
    C.init.call(this);
  }
  De.exports = C, De.exports.once = s, C.EventEmitter = C, C.prototype._events = void 0, C.prototype._eventsCount = 0, C.prototype._maxListeners = void 0;
  var _ = 10;
  function m(p) {
    if (typeof p != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof p);
  }
  Object.defineProperty(C, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return _;
    },
    set: function(p) {
      if (typeof p != "number" || p < 0 || T(p))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + p + ".");
      _ = p;
    }
  }), C.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, C.prototype.setMaxListeners = function(h) {
    if (typeof h != "number" || h < 0 || T(h))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + h + ".");
    return this._maxListeners = h, this;
  };
  function g(p) {
    return p._maxListeners === void 0 ? C.defaultMaxListeners : p._maxListeners;
  }
  C.prototype.getMaxListeners = function() {
    return g(this);
  }, C.prototype.emit = function(h) {
    for (var d = [], i = 1; i < arguments.length; i++) d.push(arguments[i]);
    var c = h === "error", b = this._events;
    if (b !== void 0)
      c = c && b.error === void 0;
    else if (!c)
      return !1;
    if (c) {
      var R;
      if (d.length > 0 && (R = d[0]), R instanceof Error)
        throw R;
      var I = new Error("Unhandled error." + (R ? " (" + R.message + ")" : ""));
      throw I.context = R, I;
    }
    var M = b[h];
    if (M === void 0)
      return !1;
    if (typeof M == "function")
      y(M, this, d);
    else
      for (var a = M.length, D = S(M, a), i = 0; i < a; ++i)
        y(D[i], this, d);
    return !0;
  };
  function x(p, h, d, i) {
    var c, b, R;
    if (m(d), b = p._events, b === void 0 ? (b = p._events = /* @__PURE__ */ Object.create(null), p._eventsCount = 0) : (b.newListener !== void 0 && (p.emit(
      "newListener",
      h,
      d.listener ? d.listener : d
    ), b = p._events), R = b[h]), R === void 0)
      R = b[h] = d, ++p._eventsCount;
    else if (typeof R == "function" ? R = b[h] = i ? [d, R] : [R, d] : i ? R.unshift(d) : R.push(d), c = g(p), c > 0 && R.length > c && !R.warned) {
      R.warned = !0;
      var I = new Error("Possible EventEmitter memory leak detected. " + R.length + " " + String(h) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      I.name = "MaxListenersExceededWarning", I.emitter = p, I.type = h, I.count = R.length, n(I);
    }
    return p;
  }
  C.prototype.addListener = function(h, d) {
    return x(this, h, d, !1);
  }, C.prototype.on = C.prototype.addListener, C.prototype.prependListener = function(h, d) {
    return x(this, h, d, !0);
  };
  function r() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function u(p, h, d) {
    var i = { fired: !1, wrapFn: void 0, target: p, type: h, listener: d }, c = r.bind(i);
    return c.listener = d, i.wrapFn = c, c;
  }
  C.prototype.once = function(h, d) {
    return m(d), this.on(h, u(this, h, d)), this;
  }, C.prototype.prependOnceListener = function(h, d) {
    return m(d), this.prependListener(h, u(this, h, d)), this;
  }, C.prototype.removeListener = function(h, d) {
    var i, c, b, R, I;
    if (m(d), c = this._events, c === void 0)
      return this;
    if (i = c[h], i === void 0)
      return this;
    if (i === d || i.listener === d)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete c[h], c.removeListener && this.emit("removeListener", h, i.listener || d));
    else if (typeof i != "function") {
      for (b = -1, R = i.length - 1; R >= 0; R--)
        if (i[R] === d || i[R].listener === d) {
          I = i[R].listener, b = R;
          break;
        }
      if (b < 0)
        return this;
      b === 0 ? i.shift() : e(i, b), i.length === 1 && (c[h] = i[0]), c.removeListener !== void 0 && this.emit("removeListener", h, I || d);
    }
    return this;
  }, C.prototype.off = C.prototype.removeListener, C.prototype.removeAllListeners = function(h) {
    var d, i, c;
    if (i = this._events, i === void 0)
      return this;
    if (i.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : i[h] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete i[h]), this;
    if (arguments.length === 0) {
      var b = Object.keys(i), R;
      for (c = 0; c < b.length; ++c)
        R = b[c], R !== "removeListener" && this.removeAllListeners(R);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (d = i[h], typeof d == "function")
      this.removeListener(h, d);
    else if (d !== void 0)
      for (c = d.length - 1; c >= 0; c--)
        this.removeListener(h, d[c]);
    return this;
  };
  function l(p, h, d) {
    var i = p._events;
    if (i === void 0)
      return [];
    var c = i[h];
    return c === void 0 ? [] : typeof c == "function" ? d ? [c.listener || c] : [c] : d ? t(c) : S(c, c.length);
  }
  C.prototype.listeners = function(h) {
    return l(this, h, !0);
  }, C.prototype.rawListeners = function(h) {
    return l(this, h, !1);
  }, C.listenerCount = function(p, h) {
    return typeof p.listenerCount == "function" ? p.listenerCount(h) : E.call(p, h);
  }, C.prototype.listenerCount = E;
  function E(p) {
    var h = this._events;
    if (h !== void 0) {
      var d = h[p];
      if (typeof d == "function")
        return 1;
      if (d !== void 0)
        return d.length;
    }
    return 0;
  }
  C.prototype.eventNames = function() {
    return this._eventsCount > 0 ? w(this._events) : [];
  };
  function S(p, h) {
    for (var d = new Array(h), i = 0; i < h; ++i)
      d[i] = p[i];
    return d;
  }
  function e(p, h) {
    for (; h + 1 < p.length; h++)
      p[h] = p[h + 1];
    p.pop();
  }
  function t(p) {
    for (var h = new Array(p.length), d = 0; d < h.length; ++d)
      h[d] = p[d].listener || p[d];
    return h;
  }
  function s(p, h) {
    return new Promise(function(d, i) {
      function c(R) {
        p.removeListener(h, b), i(R);
      }
      function b() {
        typeof p.removeListener == "function" && p.removeListener("error", c), d([].slice.call(arguments));
      }
      v(p, h, b, { once: !0 }), h !== "error" && o(p, c, { once: !0 });
    });
  }
  function o(p, h, d) {
    typeof p.on == "function" && v(p, "error", h, d);
  }
  function v(p, h, d, i) {
    if (typeof p.on == "function")
      i.once ? p.once(h, d) : p.on(h, d);
    else if (typeof p.addEventListener == "function")
      p.addEventListener(h, function c(b) {
        i.once && p.removeEventListener(h, c), d(b);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof p);
  }
  return De.exports;
}
var rt;
function $() {
  if (rt) return se;
  rt = 1, Object.defineProperty(se, "__esModule", { value: !0 }), se.EnhancedEventEmitter = void 0;
  const f = Jt(), y = z(), w = new y.Logger("EnhancedEventEmitter");
  class n extends f.EventEmitter {
    constructor() {
      super(), this.setMaxListeners(1 / 0);
    }
    /**
     * Empties all stored event listeners.
     */
    close() {
      super.removeAllListeners();
    }
    emit(C, ..._) {
      return super.emit(C, ..._);
    }
    /**
     * Special addition to the EventEmitter API.
     */
    safeEmit(C, ..._) {
      try {
        return super.emit(C, ..._);
      } catch (m) {
        w.error("safeEmit() | event listener threw an error [eventName:%s]:%o", C, m);
        try {
          super.emit("listenererror", C, m);
        } catch {
        }
        return !!super.listenerCount(C);
      }
    }
    on(C, _) {
      return super.on(C, _), this;
    }
    off(C, _) {
      return super.off(C, _), this;
    }
    addListener(C, _) {
      return super.on(C, _), this;
    }
    prependListener(C, _) {
      return super.prependListener(C, _), this;
    }
    once(C, _) {
      return super.once(C, _), this;
    }
    prependOnceListener(C, _) {
      return super.prependOnceListener(C, _), this;
    }
    removeListener(C, _) {
      return super.off(C, _), this;
    }
    removeAllListeners(C) {
      return super.removeAllListeners(C), this;
    }
    listenerCount(C) {
      return super.listenerCount(C);
    }
    listeners(C) {
      return super.listeners(C);
    }
    rawListeners(C) {
      return super.rawListeners(C);
    }
  }
  return se.EnhancedEventEmitter = n, se;
}
var W = {}, st;
function U() {
  if (st) return W;
  st = 1, Object.defineProperty(W, "__esModule", { value: !0 }), W.InvalidStateError = W.UnsupportedError = void 0;
  class f extends Error {
    constructor(n) {
      super(n), this.name = "UnsupportedError", Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, f) : this.stack = new Error(n).stack;
    }
  }
  W.UnsupportedError = f;
  class y extends Error {
    constructor(n) {
      super(n), this.name = "InvalidStateError", Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, y) : this.stack = new Error(n).stack;
    }
  }
  return W.InvalidStateError = y, W;
}
var Z = {}, it;
function ee() {
  if (it) return Z;
  it = 1, Object.defineProperty(Z, "__esModule", { value: !0 }), Z.clone = f, Z.generateRandomNumber = y, Z.deepFreeze = w;
  function f(n) {
    if (n !== void 0)
      return Number.isNaN(n) ? NaN : typeof structuredClone == "function" ? structuredClone(n) : JSON.parse(JSON.stringify(n));
  }
  function y() {
    return Math.round(Math.random() * 1e7);
  }
  function w(n) {
    const T = Reflect.ownKeys(n);
    for (const C of T) {
      const _ = n[C];
      (_ && typeof _ == "object" || typeof _ == "function") && w(_);
    }
    return Object.freeze(n);
  }
  return Z;
}
var A = {}, j = {}, ie = {}, nt;
function Yt() {
  if (nt) return ie;
  nt = 1, Object.defineProperty(ie, "__esModule", { value: !0 }), ie.Logger = void 0;
  const f = Ae(), y = "h264-profile-level-id";
  class w {
    _debug;
    _warn;
    _error;
    constructor(T) {
      T ? (this._debug = (0, f.default)(`${y}:${T}`), this._warn = (0, f.default)(`${y}:WARN:${T}`), this._error = (0, f.default)(`${y}:ERROR:${T}`)) : (this._debug = (0, f.default)(y), this._warn = (0, f.default)(`${y}:WARN`), this._error = (0, f.default)(`${y}:ERROR`)), this._debug.log = console.info.bind(console), this._warn.log = console.warn.bind(console), this._error.log = console.error.bind(console);
    }
    get debug() {
      return this._debug;
    }
    get warn() {
      return this._warn;
    }
    get error() {
      return this._error;
    }
  }
  return ie.Logger = w, ie;
}
var at;
function Zt() {
  if (at) return j;
  at = 1, Object.defineProperty(j, "__esModule", { value: !0 }), j.ProfileLevelId = j.Level = j.Profile = void 0, j.parseProfileLevelId = r, j.profileLevelIdToString = u, j.profileToString = l, j.levelToString = E, j.parseSdpProfileLevelId = S, j.isSameProfile = e, j.isSameProfileAndLevel = t, j.generateProfileLevelIdStringForAnswer = s, j.supportedLevel = o;
  const f = Yt(), y = new f.Logger();
  var w;
  (function(i) {
    i[i.ConstrainedBaseline = 1] = "ConstrainedBaseline", i[i.Baseline = 2] = "Baseline", i[i.Main = 3] = "Main", i[i.ConstrainedHigh = 4] = "ConstrainedHigh", i[i.High = 5] = "High", i[i.PredictiveHigh444 = 6] = "PredictiveHigh444";
  })(w || (j.Profile = w = {}));
  var n;
  (function(i) {
    i[i.L1_b = 0] = "L1_b", i[i.L1 = 10] = "L1", i[i.L1_1 = 11] = "L1_1", i[i.L1_2 = 12] = "L1_2", i[i.L1_3 = 13] = "L1_3", i[i.L2 = 20] = "L2", i[i.L2_1 = 21] = "L2_1", i[i.L2_2 = 22] = "L2_2", i[i.L3 = 30] = "L3", i[i.L3_1 = 31] = "L3_1", i[i.L3_2 = 32] = "L3_2", i[i.L4 = 40] = "L4", i[i.L4_1 = 41] = "L4_1", i[i.L4_2 = 42] = "L4_2", i[i.L5 = 50] = "L5", i[i.L5_1 = 51] = "L5_1", i[i.L5_2 = 52] = "L5_2";
  })(n || (j.Level = n = {}));
  class T {
    profile;
    level;
    constructor(c, b) {
      this.profile = c, this.level = b;
    }
  }
  j.ProfileLevelId = T;
  const C = new T(w.ConstrainedBaseline, n.L3_1);
  class _ {
    mask;
    masked_value;
    constructor(c) {
      this.mask = ~v("x", c), this.masked_value = v("1", c);
    }
    isMatch(c) {
      return this.masked_value === (c & this.mask);
    }
  }
  class m {
    profile_idc;
    profile_iop;
    profile;
    constructor(c, b, R) {
      this.profile_idc = c, this.profile_iop = b, this.profile = R;
    }
  }
  const g = [
    new m(66, new _("x1xx0000"), w.ConstrainedBaseline),
    new m(77, new _("1xxx0000"), w.ConstrainedBaseline),
    new m(88, new _("11xx0000"), w.ConstrainedBaseline),
    new m(66, new _("x0xx0000"), w.Baseline),
    new m(88, new _("10xx0000"), w.Baseline),
    new m(77, new _("0x0x0000"), w.Main),
    new m(100, new _("00000000"), w.High),
    new m(100, new _("00001100"), w.ConstrainedHigh),
    new m(244, new _("00000000"), w.PredictiveHigh444)
  ], x = [
    {
      max_macroblocks_per_second: 1485,
      max_macroblock_frame_size: 99,
      level: n.L1
    },
    {
      max_macroblocks_per_second: 1485,
      max_macroblock_frame_size: 99,
      level: n.L1_b
    },
    {
      max_macroblocks_per_second: 3e3,
      max_macroblock_frame_size: 396,
      level: n.L1_1
    },
    {
      max_macroblocks_per_second: 6e3,
      max_macroblock_frame_size: 396,
      level: n.L1_2
    },
    {
      max_macroblocks_per_second: 11880,
      max_macroblock_frame_size: 396,
      level: n.L1_3
    },
    {
      max_macroblocks_per_second: 11880,
      max_macroblock_frame_size: 396,
      level: n.L2
    },
    {
      max_macroblocks_per_second: 19800,
      max_macroblock_frame_size: 792,
      level: n.L2_1
    },
    {
      max_macroblocks_per_second: 20250,
      max_macroblock_frame_size: 1620,
      level: n.L2_2
    },
    {
      max_macroblocks_per_second: 40500,
      max_macroblock_frame_size: 1620,
      level: n.L3
    },
    {
      max_macroblocks_per_second: 108e3,
      max_macroblock_frame_size: 3600,
      level: n.L3_1
    },
    {
      max_macroblocks_per_second: 216e3,
      max_macroblock_frame_size: 5120,
      level: n.L3_2
    },
    {
      max_macroblocks_per_second: 245760,
      max_macroblock_frame_size: 8192,
      level: n.L4
    },
    {
      max_macroblocks_per_second: 245760,
      max_macroblock_frame_size: 8192,
      level: n.L4_1
    },
    {
      max_macroblocks_per_second: 522240,
      max_macroblock_frame_size: 8704,
      level: n.L4_2
    },
    {
      max_macroblocks_per_second: 589824,
      max_macroblock_frame_size: 22080,
      level: n.L5
    },
    {
      max_macroblocks_per_second: 983040,
      max_macroblock_frame_size: 36864,
      level: n.L5_1
    },
    {
      max_macroblocks_per_second: 2073600,
      max_macroblock_frame_size: 36864,
      level: n.L5_2
    }
  ];
  function r(i) {
    if (typeof i != "string" || i.length !== 6)
      return;
    const b = parseInt(i, 16);
    if (b === 0)
      return;
    const R = b & 255, I = b >> 8 & 255, M = b >> 16 & 255;
    let a;
    switch (R) {
      case n.L1_1: {
        a = (I & 16) !== 0 ? n.L1_b : n.L1_1;
        break;
      }
      case n.L1:
      case n.L1_2:
      case n.L1_3:
      case n.L2:
      case n.L2_1:
      case n.L2_2:
      case n.L3:
      case n.L3_1:
      case n.L3_2:
      case n.L4:
      case n.L4_1:
      case n.L4_2:
      case n.L5:
      case n.L5_1:
      case n.L5_2: {
        a = R;
        break;
      }
      // Unrecognized level_idc.
      default: {
        y.warn(`parseProfileLevelId() | unrecognized level_idc [str:${i}, level_idc:${R}]`);
        return;
      }
    }
    for (const D of g)
      if (M === D.profile_idc && D.profile_iop.isMatch(I))
        return y.debug(`parseProfileLevelId() | result [str:${i}, profile:${D.profile}, level:${a}]`), new T(D.profile, a);
    y.warn(`parseProfileLevelId() | unrecognized profile_idc/profile_iop combination [str:${i}, profile_idc:${M}, profile_iop:${I}]`);
  }
  function u(i) {
    if (i.level == n.L1_b)
      switch (i.profile) {
        case w.ConstrainedBaseline:
          return "42f00b";
        case w.Baseline:
          return "42100b";
        case w.Main:
          return "4d100b";
        // Level 1_b is not allowed for other profiles.
        default: {
          y.warn(`profileLevelIdToString() | Level 1_b not is allowed for profile ${i.profile}`);
          return;
        }
      }
    let c;
    switch (i.profile) {
      case w.ConstrainedBaseline: {
        c = "42e0";
        break;
      }
      case w.Baseline: {
        c = "4200";
        break;
      }
      case w.Main: {
        c = "4d00";
        break;
      }
      case w.ConstrainedHigh: {
        c = "640c";
        break;
      }
      case w.High: {
        c = "6400";
        break;
      }
      case w.PredictiveHigh444: {
        c = "f400";
        break;
      }
      default: {
        y.warn(`profileLevelIdToString() | unrecognized profile ${i.profile}`);
        return;
      }
    }
    let b = i.level.toString(16);
    return b.length === 1 && (b = `0${b}`), `${c}${b}`;
  }
  function l(i) {
    switch (i) {
      case w.ConstrainedBaseline:
        return "ConstrainedBaseline";
      case w.Baseline:
        return "Baseline";
      case w.Main:
        return "Main";
      case w.ConstrainedHigh:
        return "ConstrainedHigh";
      case w.High:
        return "High";
      case w.PredictiveHigh444:
        return "PredictiveHigh444";
      default: {
        y.warn(`profileToString() | unrecognized profile ${i}`);
        return;
      }
    }
  }
  function E(i) {
    switch (i) {
      case n.L1_b:
        return "1b";
      case n.L1:
        return "1";
      case n.L1_1:
        return "1.1";
      case n.L1_2:
        return "1.2";
      case n.L1_3:
        return "1.3";
      case n.L2:
        return "2";
      case n.L2_1:
        return "2.1";
      case n.L2_2:
        return "2.2";
      case n.L3:
        return "3";
      case n.L3_1:
        return "3.1";
      case n.L3_2:
        return "3.2";
      case n.L4:
        return "4";
      case n.L4_1:
        return "4.1";
      case n.L4_2:
        return "4.2";
      case n.L5:
        return "5";
      case n.L5_1:
        return "5.1";
      case n.L5_2:
        return "5.2";
      default: {
        y.warn(`levelToString() | unrecognized level ${i}`);
        return;
      }
    }
  }
  function S(i = {}) {
    const c = i["profile-level-id"];
    return c ? r(c) : C;
  }
  function e(i = {}, c = {}) {
    const b = S(i), R = S(c);
    return !!(b && R && b.profile === R.profile);
  }
  function t(i = {}, c = {}) {
    const b = S(i), R = S(c);
    return !!(b && R && b.profile === R.profile && b.level == R.level);
  }
  function s(i = {}, c = {}) {
    if (!i["profile-level-id"] && !c["profile-level-id"]) {
      y.warn("generateProfileLevelIdStringForAnswer() | profile-level-id missing in local and remote params");
      return;
    }
    const b = S(i), R = S(c);
    if (!b)
      throw new TypeError("invalid local_profile_level_id");
    if (!R)
      throw new TypeError("invalid remote_profile_level_id");
    if (b.profile !== R.profile)
      throw new TypeError("H264 Profile mismatch");
    const I = d(i) && d(c), M = b.level, a = R.level, D = h(M, a), P = I ? M : D;
    return y.debug(`generateProfileLevelIdStringForAnswer() | result [profile:${b.profile}, level:${P}]`), u(new T(b.profile, P));
  }
  function o(i, c) {
    for (let R = x.length - 1; R >= 0; --R) {
      const I = x[R];
      if (I.max_macroblock_frame_size * 256 <= i && I.max_macroblocks_per_second <= c * I.max_macroblock_frame_size)
        return y.debug(`supportedLevel() | result [max_frame_pixel_count:${i}, max_fps:${c}, level:${I.level}]`), I.level;
    }
    y.warn(`supportedLevel() | no level supported [max_frame_pixel_count:${i}, max_fps:${c}]`);
  }
  function v(i, c) {
    return +(c[0] === i) << 7 | +(c[1] === i) << 6 | +(c[2] === i) << 5 | +(c[3] === i) << 4 | +(c[4] === i) << 3 | +(c[5] === i) << 2 | +(c[6] === i) << 1 | +(c[7] === i) << 0;
  }
  function p(i, c) {
    return i === n.L1_b ? c !== n.L1 && c !== n.L1_b : c === n.L1_b ? i !== n.L1 : i < c;
  }
  function h(i, c) {
    return p(i, c) ? i : c;
  }
  function d(i = {}) {
    const c = i["level-asymmetry-allowed"];
    return c === !0 || c === 1 || c === "1";
  }
  return j;
}
var ot;
function V() {
  if (ot) return A;
  ot = 1, Object.defineProperty(A, "__esModule", { value: !0 }), A.validateAndNormalizeRtpCapabilities = C, A.validateAndNormalizeRtpParameters = _, A.validateAndNormalizeSctpStreamParameters = m, A.validateSctpCapabilities = g, A.getExtendedRtpCapabilities = x, A.getRecvRtpCapabilities = r, A.getSendingRtpParameters = u, A.getSendingRemoteRtpParameters = l, A.reduceCodecs = E, A.generateProbatorRtpParameters = S, A.canSend = e, A.canReceive = t;
  const f = Zt(), y = ee(), w = "probator", n = 1234, T = 127;
  function C(a) {
    if (typeof a != "object")
      throw new TypeError("caps is not an object");
    if (a.codecs && !Array.isArray(a.codecs))
      throw new TypeError("caps.codecs is not an array");
    a.codecs || (a.codecs = []);
    for (const D of a.codecs)
      s(D);
    if (a.headerExtensions && !Array.isArray(a.headerExtensions))
      throw new TypeError("caps.headerExtensions is not an array");
    a.headerExtensions || (a.headerExtensions = []);
    for (const D of a.headerExtensions)
      v(D);
  }
  function _(a) {
    if (typeof a != "object")
      throw new TypeError("params is not an object");
    if (a.mid && typeof a.mid != "string")
      throw new TypeError("params.mid is not a string");
    if (!Array.isArray(a.codecs))
      throw new TypeError("missing params.codecs");
    for (const D of a.codecs)
      p(D);
    if (a.headerExtensions && !Array.isArray(a.headerExtensions))
      throw new TypeError("params.headerExtensions is not an array");
    a.headerExtensions || (a.headerExtensions = []);
    for (const D of a.headerExtensions)
      h(D);
    if (a.encodings && !Array.isArray(a.encodings))
      throw new TypeError("params.encodings is not an array");
    a.encodings || (a.encodings = []);
    for (const D of a.encodings)
      d(D);
    if (a.rtcp && typeof a.rtcp != "object")
      throw new TypeError("params.rtcp is not an object");
    a.rtcp || (a.rtcp = {}), i(a.rtcp);
  }
  function m(a) {
    if (typeof a != "object")
      throw new TypeError("params is not an object");
    if (typeof a.streamId != "number")
      throw new TypeError("missing params.streamId");
    let D = !1;
    if (typeof a.ordered == "boolean" ? D = !0 : a.ordered = !0, a.maxPacketLifeTime && typeof a.maxPacketLifeTime != "number")
      throw new TypeError("invalid params.maxPacketLifeTime");
    if (a.maxRetransmits && typeof a.maxRetransmits != "number")
      throw new TypeError("invalid params.maxRetransmits");
    if (a.maxPacketLifeTime && a.maxRetransmits)
      throw new TypeError("cannot provide both maxPacketLifeTime and maxRetransmits");
    if (D && a.ordered && (a.maxPacketLifeTime || a.maxRetransmits))
      throw new TypeError("cannot be ordered with maxPacketLifeTime or maxRetransmits");
    if (!D && (a.maxPacketLifeTime || a.maxRetransmits) && (a.ordered = !1), a.label && typeof a.label != "string")
      throw new TypeError("invalid params.label");
    if (a.protocol && typeof a.protocol != "string")
      throw new TypeError("invalid params.protocol");
  }
  function g(a) {
    if (typeof a != "object")
      throw new TypeError("caps is not an object");
    if (!a.numStreams || typeof a.numStreams != "object")
      throw new TypeError("missing caps.numStreams");
    c(a.numStreams);
  }
  function x(a, D, P) {
    const k = {
      codecs: [],
      headerExtensions: []
    };
    if (P)
      for (const L of a.codecs ?? []) {
        if (b(L))
          continue;
        const O = (D.codecs ?? []).find((N) => R(N, L, { strict: !0, modify: !0 }));
        if (!O)
          continue;
        const F = {
          kind: L.kind,
          mimeType: L.mimeType,
          clockRate: L.clockRate,
          channels: L.channels,
          localPayloadType: L.preferredPayloadType,
          localRtxPayloadType: void 0,
          remotePayloadType: O.preferredPayloadType,
          remoteRtxPayloadType: void 0,
          localParameters: L.parameters ?? {},
          remoteParameters: O.parameters ?? {},
          rtcpFeedback: M(L, O)
        };
        k.codecs.push(F);
      }
    else
      for (const L of D.codecs ?? []) {
        if (b(L))
          continue;
        const O = (a.codecs ?? []).find((N) => R(N, L, { strict: !0, modify: !0 }));
        if (!O)
          continue;
        const F = {
          kind: O.kind,
          mimeType: O.mimeType,
          clockRate: O.clockRate,
          channels: O.channels,
          localPayloadType: O.preferredPayloadType,
          localRtxPayloadType: void 0,
          remotePayloadType: L.preferredPayloadType,
          remoteRtxPayloadType: void 0,
          localParameters: O.parameters ?? {},
          remoteParameters: L.parameters ?? {},
          rtcpFeedback: M(O, L)
        };
        k.codecs.push(F);
      }
    for (const L of k.codecs) {
      const O = a.codecs.find((N) => b(N) && N.parameters?.apt === L.localPayloadType), F = D.codecs.find((N) => b(N) && N.parameters?.apt === L.remotePayloadType);
      O && F && (L.localRtxPayloadType = O.preferredPayloadType, L.remoteRtxPayloadType = F.preferredPayloadType);
    }
    for (const L of D.headerExtensions) {
      const O = a.headerExtensions.find((N) => I(N, L));
      if (!O)
        continue;
      const F = {
        kind: L.kind,
        uri: L.uri,
        sendId: O.preferredId,
        recvId: L.preferredId,
        encrypt: O.preferredEncrypt ?? !1,
        direction: "sendrecv"
      };
      switch (L.direction) {
        case "sendrecv": {
          F.direction = "sendrecv";
          break;
        }
        case "recvonly": {
          F.direction = "sendonly";
          break;
        }
        case "sendonly": {
          F.direction = "recvonly";
          break;
        }
        case "inactive": {
          F.direction = "inactive";
          break;
        }
      }
      k.headerExtensions.push(F);
    }
    return k;
  }
  function r(a) {
    const D = {
      codecs: [],
      headerExtensions: []
    };
    for (const P of a.codecs) {
      const k = {
        kind: P.kind,
        mimeType: P.mimeType,
        preferredPayloadType: P.remotePayloadType,
        clockRate: P.clockRate,
        channels: P.channels,
        parameters: P.localParameters,
        rtcpFeedback: P.rtcpFeedback
      };
      if (D.codecs.push(k), !P.remoteRtxPayloadType)
        continue;
      const L = {
        kind: P.kind,
        mimeType: `${P.kind}/rtx`,
        preferredPayloadType: P.remoteRtxPayloadType,
        clockRate: P.clockRate,
        parameters: {
          apt: P.remotePayloadType
        },
        rtcpFeedback: []
      };
      D.codecs.push(L);
    }
    for (const P of a.headerExtensions) {
      if (P.direction !== "sendrecv" && P.direction !== "recvonly")
        continue;
      const k = {
        kind: P.kind,
        uri: P.uri,
        preferredId: P.recvId,
        preferredEncrypt: P.encrypt ?? !1,
        direction: P.direction
      };
      D.headerExtensions.push(k);
    }
    return D;
  }
  function u(a, D) {
    const P = {
      mid: void 0,
      codecs: [],
      headerExtensions: [],
      encodings: [],
      rtcp: {}
    };
    for (const k of D.codecs) {
      if (k.kind !== a)
        continue;
      const L = {
        mimeType: k.mimeType,
        payloadType: k.localPayloadType,
        clockRate: k.clockRate,
        channels: k.channels,
        parameters: k.localParameters,
        rtcpFeedback: k.rtcpFeedback
      };
      if (P.codecs.push(L), k.localRtxPayloadType) {
        const O = {
          mimeType: `${k.kind}/rtx`,
          payloadType: k.localRtxPayloadType,
          clockRate: k.clockRate,
          parameters: {
            apt: k.localPayloadType
          },
          rtcpFeedback: []
        };
        P.codecs.push(O);
      }
    }
    for (const k of D.headerExtensions) {
      if (k.kind && k.kind !== a || k.direction !== "sendrecv" && k.direction !== "sendonly")
        continue;
      const L = {
        uri: k.uri,
        id: k.sendId,
        encrypt: k.encrypt,
        parameters: {}
      };
      P.headerExtensions.push(L);
    }
    return P;
  }
  function l(a, D) {
    const P = {
      mid: void 0,
      codecs: [],
      headerExtensions: [],
      encodings: [],
      rtcp: {}
    };
    for (const k of D.codecs) {
      if (k.kind !== a)
        continue;
      const L = {
        mimeType: k.mimeType,
        payloadType: k.localPayloadType,
        clockRate: k.clockRate,
        channels: k.channels,
        parameters: k.remoteParameters,
        rtcpFeedback: k.rtcpFeedback
      };
      if (P.codecs.push(L), k.localRtxPayloadType) {
        const O = {
          mimeType: `${k.kind}/rtx`,
          payloadType: k.localRtxPayloadType,
          clockRate: k.clockRate,
          parameters: {
            apt: k.localPayloadType
          },
          rtcpFeedback: []
        };
        P.codecs.push(O);
      }
    }
    for (const k of D.headerExtensions) {
      if (k.kind && k.kind !== a || k.direction !== "sendrecv" && k.direction !== "sendonly")
        continue;
      const L = {
        uri: k.uri,
        id: k.sendId,
        encrypt: k.encrypt,
        parameters: {}
      };
      P.headerExtensions.push(L);
    }
    if (P.headerExtensions.some((k) => k.uri === "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"))
      for (const k of P.codecs)
        k.rtcpFeedback = (k.rtcpFeedback ?? []).filter((L) => L.type !== "goog-remb");
    else if (P.headerExtensions.some((k) => k.uri === "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time"))
      for (const k of P.codecs)
        k.rtcpFeedback = (k.rtcpFeedback ?? []).filter((L) => L.type !== "transport-cc");
    else
      for (const k of P.codecs)
        k.rtcpFeedback = (k.rtcpFeedback ?? []).filter((L) => L.type !== "transport-cc" && L.type !== "goog-remb");
    return P;
  }
  function E(a, D) {
    const P = [];
    if (!D)
      P.push(a[0]), b(a[1]) && P.push(a[1]);
    else {
      for (let k = 0; k < a.length; ++k)
        if (R(a[k], D, { strict: !0 })) {
          P.push(a[k]), b(a[k + 1]) && P.push(a[k + 1]);
          break;
        }
      if (P.length === 0)
        throw new TypeError("no matching codec found");
    }
    return P;
  }
  function S(a) {
    a = y.clone(a), _(a);
    const D = {
      mid: w,
      codecs: [],
      headerExtensions: [],
      encodings: [{ ssrc: n }],
      rtcp: { cname: "probator" }
    };
    return D.codecs.push(a.codecs[0]), D.codecs[0].payloadType = T, D.headerExtensions = a.headerExtensions, D;
  }
  function e(a, D) {
    return (D.codecs ?? []).some((P) => P.kind === a);
  }
  function t(a, D) {
    if (_(a), a.codecs.length === 0)
      return !1;
    const P = a.codecs[0];
    return (D.codecs ?? []).some((k) => k.preferredPayloadType === P.payloadType);
  }
  function s(a) {
    const D = new RegExp("^(audio|video)/(.+)", "i");
    if (typeof a != "object")
      throw new TypeError("codec is not an object");
    if (!a.mimeType || typeof a.mimeType != "string")
      throw new TypeError("missing codec.mimeType");
    const P = D.exec(a.mimeType);
    if (!P)
      throw new TypeError("invalid codec.mimeType");
    if (a.kind = P[1].toLowerCase(), typeof a.preferredPayloadType != "number")
      throw new TypeError("missing codec.preferredPayloadType");
    if (typeof a.clockRate != "number")
      throw new TypeError("missing codec.clockRate");
    a.kind === "audio" ? typeof a.channels != "number" && (a.channels = 1) : delete a.channels, (!a.parameters || typeof a.parameters != "object") && (a.parameters = {});
    for (const k of Object.keys(a.parameters)) {
      let L = a.parameters[k];
      if (L === void 0 && (a.parameters[k] = "", L = ""), typeof L != "string" && typeof L != "number")
        throw new TypeError(`invalid codec parameter [key:${k}s, value:${L}]`);
      if (k === "apt" && typeof L != "number")
        throw new TypeError("invalid codec apt parameter");
    }
    (!a.rtcpFeedback || !Array.isArray(a.rtcpFeedback)) && (a.rtcpFeedback = []);
    for (const k of a.rtcpFeedback)
      o(k);
  }
  function o(a) {
    if (typeof a != "object")
      throw new TypeError("fb is not an object");
    if (!a.type || typeof a.type != "string")
      throw new TypeError("missing fb.type");
    (!a.parameter || typeof a.parameter != "string") && (a.parameter = "");
  }
  function v(a) {
    if (typeof a != "object")
      throw new TypeError("ext is not an object");
    if (a.kind !== "audio" && a.kind !== "video")
      throw new TypeError("invalid ext.kind");
    if (!a.uri || typeof a.uri != "string")
      throw new TypeError("missing ext.uri");
    if (typeof a.preferredId != "number")
      throw new TypeError("missing ext.preferredId");
    if (a.preferredEncrypt && typeof a.preferredEncrypt != "boolean")
      throw new TypeError("invalid ext.preferredEncrypt");
    if (a.preferredEncrypt || (a.preferredEncrypt = !1), a.direction && typeof a.direction != "string")
      throw new TypeError("invalid ext.direction");
    a.direction || (a.direction = "sendrecv");
  }
  function p(a) {
    const D = new RegExp("^(audio|video)/(.+)", "i");
    if (typeof a != "object")
      throw new TypeError("codec is not an object");
    if (!a.mimeType || typeof a.mimeType != "string")
      throw new TypeError("missing codec.mimeType");
    const P = D.exec(a.mimeType);
    if (!P)
      throw new TypeError("invalid codec.mimeType");
    if (typeof a.payloadType != "number")
      throw new TypeError("missing codec.payloadType");
    if (typeof a.clockRate != "number")
      throw new TypeError("missing codec.clockRate");
    P[1].toLowerCase() === "audio" ? typeof a.channels != "number" && (a.channels = 1) : delete a.channels, (!a.parameters || typeof a.parameters != "object") && (a.parameters = {});
    for (const L of Object.keys(a.parameters)) {
      let O = a.parameters[L];
      if (O === void 0 && (a.parameters[L] = "", O = ""), typeof O != "string" && typeof O != "number")
        throw new TypeError(`invalid codec parameter [key:${L}s, value:${O}]`);
      if (L === "apt" && typeof O != "number")
        throw new TypeError("invalid codec apt parameter");
    }
    (!a.rtcpFeedback || !Array.isArray(a.rtcpFeedback)) && (a.rtcpFeedback = []);
    for (const L of a.rtcpFeedback)
      o(L);
  }
  function h(a) {
    if (typeof a != "object")
      throw new TypeError("ext is not an object");
    if (!a.uri || typeof a.uri != "string")
      throw new TypeError("missing ext.uri");
    if (typeof a.id != "number")
      throw new TypeError("missing ext.id");
    if (a.encrypt && typeof a.encrypt != "boolean")
      throw new TypeError("invalid ext.encrypt");
    a.encrypt || (a.encrypt = !1), (!a.parameters || typeof a.parameters != "object") && (a.parameters = {});
    for (const D of Object.keys(a.parameters)) {
      let P = a.parameters[D];
      if (P === void 0 && (a.parameters[D] = "", P = ""), typeof P != "string" && typeof P != "number")
        throw new TypeError("invalid header extension parameter");
    }
  }
  function d(a) {
    if (typeof a != "object")
      throw new TypeError("encoding is not an object");
    if (a.ssrc && typeof a.ssrc != "number")
      throw new TypeError("invalid encoding.ssrc");
    if (a.rid && typeof a.rid != "string")
      throw new TypeError("invalid encoding.rid");
    if (a.rtx && typeof a.rtx != "object")
      throw new TypeError("invalid encoding.rtx");
    if (a.rtx && typeof a.rtx.ssrc != "number")
      throw new TypeError("missing encoding.rtx.ssrc");
    if ((!a.dtx || typeof a.dtx != "boolean") && (a.dtx = !1), a.scalabilityMode && typeof a.scalabilityMode != "string")
      throw new TypeError("invalid encoding.scalabilityMode");
  }
  function i(a) {
    if (typeof a != "object")
      throw new TypeError("rtcp is not an object");
    if (a.cname && typeof a.cname != "string")
      throw new TypeError("invalid rtcp.cname");
    (!a.reducedSize || typeof a.reducedSize != "boolean") && (a.reducedSize = !0);
  }
  function c(a) {
    if (typeof a != "object")
      throw new TypeError("numStreams is not an object");
    if (typeof a.OS != "number")
      throw new TypeError("missing numStreams.OS");
    if (typeof a.MIS != "number")
      throw new TypeError("missing numStreams.MIS");
  }
  function b(a) {
    return a ? /.+\/rtx$/i.test(a.mimeType) : !1;
  }
  function R(a, D, { strict: P = !1, modify: k = !1 } = {}) {
    const L = a.mimeType.toLowerCase(), O = D.mimeType.toLowerCase();
    if (L !== O || a.clockRate !== D.clockRate || a.channels !== D.channels)
      return !1;
    switch (L) {
      case "video/h264": {
        if (P) {
          const F = a.parameters["packetization-mode"] ?? 0, N = D.parameters["packetization-mode"] ?? 0;
          if (F !== N || !f.isSameProfile(a.parameters, D.parameters))
            return !1;
          let Y;
          try {
            Y = f.generateProfileLevelIdStringForAnswer(a.parameters, D.parameters);
          } catch {
            return !1;
          }
          k && (Y ? (a.parameters["profile-level-id"] = Y, D.parameters["profile-level-id"] = Y) : (delete a.parameters["profile-level-id"], delete D.parameters["profile-level-id"]));
        }
        break;
      }
      case "video/vp9": {
        if (P) {
          const F = a.parameters["profile-id"] ?? 0, N = D.parameters["profile-id"] ?? 0;
          if (F !== N)
            return !1;
        }
        break;
      }
    }
    return !0;
  }
  function I(a, D) {
    return !(a.kind && D.kind && a.kind !== D.kind || a.uri !== D.uri);
  }
  function M(a, D) {
    const P = [];
    for (const k of a.rtcpFeedback ?? []) {
      const L = (D.rtcpFeedback ?? []).find((O) => O.type === k.type && (O.parameter === k.parameter || !O.parameter && !k.parameter));
      L && P.push(L);
    }
    return P;
  }
  return A;
}
var ne = {}, Ue = {}, ae = {}, oe = {}, ct;
function Xt() {
  if (ct) return oe;
  ct = 1, Object.defineProperty(oe, "__esModule", { value: !0 }), oe.Logger = void 0;
  const f = Ae(), y = "awaitqueue";
  let w = class {
    _debug;
    _warn;
    _error;
    constructor(T) {
      T ? (this._debug = f(`${y}:${T}`), this._warn = f(`${y}:WARN:${T}`), this._error = f(`${y}:ERROR:${T}`)) : (this._debug = f(y), this._warn = f(`${y}:WARN`), this._error = f(`${y}:ERROR`)), this._debug.log = console.info.bind(console), this._warn.log = console.warn.bind(console), this._error.log = console.error.bind(console);
    }
    get debug() {
      return this._debug;
    }
    get warn() {
      return this._warn;
    }
    get error() {
      return this._error;
    }
  };
  return oe.Logger = w, oe;
}
var J = {}, dt;
function Bt() {
  if (dt) return J;
  dt = 1, Object.defineProperty(J, "__esModule", { value: !0 }), J.AwaitQueueRemovedTaskError = J.AwaitQueueStoppedError = void 0;
  class f extends Error {
    constructor(n) {
      super(n ?? "queue stopped"), this.name = "AwaitQueueStoppedError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, f);
    }
  }
  J.AwaitQueueStoppedError = f;
  class y extends Error {
    constructor(n) {
      super(n ?? "queue task removed"), this.name = "AwaitQueueRemovedTaskError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, y);
    }
  }
  return J.AwaitQueueRemovedTaskError = y, J;
}
var pt;
function er() {
  if (pt) return ae;
  pt = 1, Object.defineProperty(ae, "__esModule", { value: !0 }), ae.AwaitQueue = void 0;
  const f = Xt(), y = Bt(), w = new f.Logger("AwaitQueue");
  let n = class {
    // Queue of pending tasks (map of PendingTasks indexed by id).
    pendingTasks = /* @__PURE__ */ new Map();
    // Incrementing PendingTask id.
    nextTaskId = 0;
    constructor() {
      w.debug("constructor()");
    }
    get size() {
      return this.pendingTasks.size;
    }
    async push(C, _, m) {
      if (_ = _ ?? C.name, w.debug(`push() [name:${_}, options:%o]`, m), typeof C != "function")
        throw new TypeError("given task is not a function");
      if (_)
        try {
          Object.defineProperty(C, "name", { value: _ });
        } catch {
        }
      return new Promise((g, x) => {
        if (_ && m?.removeOngoingTasksWithSameName)
          for (const u of this.pendingTasks.values())
            u.name === _ && u.reject(new y.AwaitQueueRemovedTaskError(), {
              canExecuteNextTask: !1
            });
        const r = {
          id: this.nextTaskId++,
          task: C,
          name: _,
          enqueuedAt: Date.now(),
          executedAt: void 0,
          completed: !1,
          resolve: (u) => {
            if (r.completed)
              return;
            r.completed = !0, this.pendingTasks.delete(r.id), w.debug(`resolving task [name:${r.name}]`), g(u);
            const [l] = this.pendingTasks.values();
            l && !l.executedAt && this.execute(l);
          },
          reject: (u, { canExecuteNextTask: l }) => {
            if (!r.completed && (r.completed = !0, this.pendingTasks.delete(r.id), w.debug(`rejecting task [name:${r.name}]: %s`, String(u)), x(u), l)) {
              const [E] = this.pendingTasks.values();
              E && !E.executedAt && this.execute(E);
            }
          }
        };
        this.pendingTasks.set(r.id, r), this.pendingTasks.size === 1 && this.execute(r);
      });
    }
    stop() {
      w.debug("stop()");
      for (const C of this.pendingTasks.values())
        w.debug(`stop() | stopping task [name:${C.name}]`), C.reject(new y.AwaitQueueStoppedError(), {
          canExecuteNextTask: !1
        });
    }
    remove(C) {
      w.debug(`remove() [taskIdx:${C}]`);
      const _ = Array.from(this.pendingTasks.values())[C];
      if (!_) {
        w.debug(`stop() | no task with given idx [taskIdx:${C}]`);
        return;
      }
      _.reject(new y.AwaitQueueRemovedTaskError(), {
        canExecuteNextTask: !0
      });
    }
    dump() {
      const C = Date.now();
      let _ = 0;
      return Array.from(this.pendingTasks.values()).map((m) => ({
        idx: _++,
        task: m.task,
        name: m.name,
        enqueuedTime: m.executedAt ? m.executedAt - m.enqueuedAt : C - m.enqueuedAt,
        executionTime: m.executedAt ? C - m.executedAt : 0
      }));
    }
    async execute(C) {
      if (w.debug(`execute() [name:${C.name}]`), C.executedAt)
        throw new Error("task already being executed");
      C.executedAt = Date.now();
      try {
        const _ = await C.task();
        C.resolve(_);
      } catch (_) {
        C.reject(_, { canExecuteNextTask: !0 });
      }
    }
  };
  return ae.AwaitQueue = n, ae;
}
var lt;
function tr() {
  return lt || (lt = 1, (function(f) {
    Object.defineProperty(f, "__esModule", { value: !0 }), f.AwaitQueueRemovedTaskError = f.AwaitQueueStoppedError = f.AwaitQueue = void 0;
    var y = er();
    Object.defineProperty(f, "AwaitQueue", { enumerable: !0, get: function() {
      return y.AwaitQueue;
    } });
    var w = Bt();
    Object.defineProperty(f, "AwaitQueueStoppedError", { enumerable: !0, get: function() {
      return w.AwaitQueueStoppedError;
    } }), Object.defineProperty(f, "AwaitQueueRemovedTaskError", { enumerable: !0, get: function() {
      return w.AwaitQueueRemovedTaskError;
    } });
  })(Ue)), Ue;
}
var ce = {}, ut;
function rr() {
  if (ut) return ce;
  ut = 1, Object.defineProperty(ce, "__esModule", { value: !0 }), ce.Producer = void 0;
  const f = z(), y = $(), w = U(), n = new f.Logger("Producer");
  let T = class extends y.EnhancedEventEmitter {
    // Id.
    _id;
    // Local id.
    _localId;
    // Closed flag.
    _closed = !1;
    // Associated RTCRtpSender.
    _rtpSender;
    // Local track.
    _track;
    // Producer kind.
    _kind;
    // RTP parameters.
    _rtpParameters;
    // Paused flag.
    _paused;
    // Video max spatial layer.
    _maxSpatialLayer;
    // Whether the Producer should call stop() in given tracks.
    _stopTracks;
    // Whether the Producer should set track.enabled = false when paused.
    _disableTrackOnPause;
    // Whether we should mark the transceiver as inactive when paused.
    _zeroRtpOnPause;
    // App custom data.
    _appData;
    // Observer instance.
    _observer = new y.EnhancedEventEmitter();
    constructor({ id: _, localId: m, rtpSender: g, track: x, rtpParameters: r, stopTracks: u, disableTrackOnPause: l, zeroRtpOnPause: E, appData: S }) {
      super(), n.debug("constructor()"), this._id = _, this._localId = m, this._rtpSender = g, this._track = x, this._kind = x.kind, this._rtpParameters = r, this._paused = l ? !x.enabled : !1, this._maxSpatialLayer = void 0, this._stopTracks = u, this._disableTrackOnPause = l, this._zeroRtpOnPause = E, this._appData = S ?? {}, this.onTrackEnded = this.onTrackEnded.bind(this), this.handleTrack();
    }
    /**
     * Producer id.
     */
    get id() {
      return this._id;
    }
    /**
     * Local id.
     */
    get localId() {
      return this._localId;
    }
    /**
     * Whether the Producer is closed.
     */
    get closed() {
      return this._closed;
    }
    /**
     * Media kind.
     */
    get kind() {
      return this._kind;
    }
    /**
     * Associated RTCRtpSender.
     */
    get rtpSender() {
      return this._rtpSender;
    }
    /**
     * The associated track.
     */
    get track() {
      return this._track;
    }
    /**
     * RTP parameters.
     */
    get rtpParameters() {
      return this._rtpParameters;
    }
    /**
     * Whether the Producer is paused.
     */
    get paused() {
      return this._paused;
    }
    /**
     * Max spatial layer.
     *
     * @type {Number | undefined}
     */
    get maxSpatialLayer() {
      return this._maxSpatialLayer;
    }
    /**
     * App custom data.
     */
    get appData() {
      return this._appData;
    }
    /**
     * App custom data setter.
     */
    set appData(_) {
      this._appData = _;
    }
    get observer() {
      return this._observer;
    }
    /**
     * Closes the Producer.
     */
    close() {
      this._closed || (n.debug("close()"), this._closed = !0, this.destroyTrack(), this.emit("@close"), this._observer.safeEmit("close"), super.close(), this._observer.close());
    }
    /**
     * Transport was closed.
     */
    transportClosed() {
      this._closed || (n.debug("transportClosed()"), this._closed = !0, this.destroyTrack(), this.safeEmit("transportclose"), this._observer.safeEmit("close"));
    }
    /**
     * Get associated RTCRtpSender stats.
     */
    async getStats() {
      if (this._closed)
        throw new w.InvalidStateError("closed");
      return new Promise((_, m) => {
        this.safeEmit("@getstats", _, m);
      });
    }
    /**
     * Pauses sending media.
     */
    pause() {
      if (n.debug("pause()"), this._closed) {
        n.error("pause() | Producer closed");
        return;
      }
      this._paused = !0, this._track && this._disableTrackOnPause && (this._track.enabled = !1), this._zeroRtpOnPause && new Promise((_, m) => {
        this.safeEmit("@pause", _, m);
      }).catch(() => {
      }), this._observer.safeEmit("pause");
    }
    /**
     * Resumes sending media.
     */
    resume() {
      if (n.debug("resume()"), this._closed) {
        n.error("resume() | Producer closed");
        return;
      }
      this._paused = !1, this._track && this._disableTrackOnPause && (this._track.enabled = !0), this._zeroRtpOnPause && new Promise((_, m) => {
        this.safeEmit("@resume", _, m);
      }).catch(() => {
      }), this._observer.safeEmit("resume");
    }
    /**
     * Replaces the current track with a new one or null.
     */
    async replaceTrack({ track: _ }) {
      if (n.debug("replaceTrack() [track:%o]", _), this._closed) {
        if (_ && this._stopTracks)
          try {
            _.stop();
          } catch {
          }
        throw new w.InvalidStateError("closed");
      } else if (_?.readyState === "ended")
        throw new w.InvalidStateError("track ended");
      if (_ === this._track) {
        n.debug("replaceTrack() | same track, ignored");
        return;
      }
      await new Promise((m, g) => {
        this.safeEmit("@replacetrack", _, m, g);
      }), this.destroyTrack(), this._track = _, this._track && this._disableTrackOnPause && (this._paused ? this._paused && (this._track.enabled = !1) : this._track.enabled = !0), this.handleTrack();
    }
    /**
     * Sets the video max spatial layer to be sent.
     */
    async setMaxSpatialLayer(_) {
      if (this._closed)
        throw new w.InvalidStateError("closed");
      if (this._kind !== "video")
        throw new w.UnsupportedError("not a video Producer");
      if (typeof _ != "number")
        throw new TypeError("invalid spatialLayer");
      _ !== this._maxSpatialLayer && (await new Promise((m, g) => {
        this.safeEmit("@setmaxspatiallayer", _, m, g);
      }).catch(() => {
      }), this._maxSpatialLayer = _);
    }
    async setRtpEncodingParameters(_) {
      if (this._closed)
        throw new w.InvalidStateError("closed");
      if (typeof _ != "object")
        throw new TypeError("invalid params");
      await new Promise((m, g) => {
        this.safeEmit("@setrtpencodingparameters", _, m, g);
      });
    }
    onTrackEnded() {
      n.debug('track "ended" event'), this.safeEmit("trackended"), this._observer.safeEmit("trackended");
    }
    handleTrack() {
      this._track && this._track.addEventListener("ended", this.onTrackEnded);
    }
    destroyTrack() {
      if (this._track)
        try {
          this._track.removeEventListener("ended", this.onTrackEnded), this._stopTracks && this._track.stop();
        } catch {
        }
    }
  };
  return ce.Producer = T, ce;
}
var de = {}, ht;
function sr() {
  if (ht) return de;
  ht = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.Consumer = void 0;
  const f = z(), y = $(), w = U(), n = new f.Logger("Consumer");
  let T = class extends y.EnhancedEventEmitter {
    // Id.
    _id;
    // Local id.
    _localId;
    // Associated Producer id.
    _producerId;
    // Closed flag.
    _closed = !1;
    // Associated RTCRtpReceiver.
    _rtpReceiver;
    // Remote track.
    _track;
    // RTP parameters.
    _rtpParameters;
    // Paused flag.
    _paused;
    // App custom data.
    _appData;
    // Observer instance.
    _observer = new y.EnhancedEventEmitter();
    constructor({ id: _, localId: m, producerId: g, rtpReceiver: x, track: r, rtpParameters: u, appData: l }) {
      super(), n.debug("constructor()"), this._id = _, this._localId = m, this._producerId = g, this._rtpReceiver = x, this._track = r, this._rtpParameters = u, this._paused = !r.enabled, this._appData = l ?? {}, this.onTrackEnded = this.onTrackEnded.bind(this), this.handleTrack();
    }
    /**
     * Consumer id.
     */
    get id() {
      return this._id;
    }
    /**
     * Local id.
     */
    get localId() {
      return this._localId;
    }
    /**
     * Associated Producer id.
     */
    get producerId() {
      return this._producerId;
    }
    /**
     * Whether the Consumer is closed.
     */
    get closed() {
      return this._closed;
    }
    /**
     * Media kind.
     */
    get kind() {
      return this._track.kind;
    }
    /**
     * Associated RTCRtpReceiver.
     */
    get rtpReceiver() {
      return this._rtpReceiver;
    }
    /**
     * The associated track.
     */
    get track() {
      return this._track;
    }
    /**
     * RTP parameters.
     */
    get rtpParameters() {
      return this._rtpParameters;
    }
    /**
     * Whether the Consumer is paused.
     */
    get paused() {
      return this._paused;
    }
    /**
     * App custom data.
     */
    get appData() {
      return this._appData;
    }
    /**
     * App custom data setter.
     */
    set appData(_) {
      this._appData = _;
    }
    get observer() {
      return this._observer;
    }
    /**
     * Closes the Consumer.
     */
    close() {
      this._closed || (n.debug("close()"), this._closed = !0, this.destroyTrack(), this.emit("@close"), this._observer.safeEmit("close"), super.close(), this._observer.close());
    }
    /**
     * Transport was closed.
     */
    transportClosed() {
      this._closed || (n.debug("transportClosed()"), this._closed = !0, this.destroyTrack(), this.safeEmit("transportclose"), this._observer.safeEmit("close"));
    }
    /**
     * Get associated RTCRtpReceiver stats.
     */
    async getStats() {
      if (this._closed)
        throw new w.InvalidStateError("closed");
      return new Promise((_, m) => {
        this.safeEmit("@getstats", _, m);
      });
    }
    /**
     * Pauses receiving media.
     */
    pause() {
      if (n.debug("pause()"), this._closed) {
        n.error("pause() | Consumer closed");
        return;
      }
      if (this._paused) {
        n.debug("pause() | Consumer is already paused");
        return;
      }
      this._paused = !0, this._track.enabled = !1, this.emit("@pause"), this._observer.safeEmit("pause");
    }
    /**
     * Resumes receiving media.
     */
    resume() {
      if (n.debug("resume()"), this._closed) {
        n.error("resume() | Consumer closed");
        return;
      }
      if (!this._paused) {
        n.debug("resume() | Consumer is already resumed");
        return;
      }
      this._paused = !1, this._track.enabled = !0, this.emit("@resume"), this._observer.safeEmit("resume");
    }
    onTrackEnded() {
      n.debug('track "ended" event'), this.safeEmit("trackended"), this._observer.safeEmit("trackended");
    }
    handleTrack() {
      this._track.addEventListener("ended", this.onTrackEnded);
    }
    destroyTrack() {
      try {
        this._track.removeEventListener("ended", this.onTrackEnded), this._track.stop();
      } catch {
      }
    }
  };
  return de.Consumer = T, de;
}
var pe = {}, ft;
function ir() {
  if (ft) return pe;
  ft = 1, Object.defineProperty(pe, "__esModule", { value: !0 }), pe.DataProducer = void 0;
  const f = z(), y = $(), w = U(), n = new f.Logger("DataProducer");
  let T = class extends y.EnhancedEventEmitter {
    // Id.
    _id;
    // The underlying RTCDataChannel instance.
    _dataChannel;
    // Closed flag.
    _closed = !1;
    // SCTP stream parameters.
    _sctpStreamParameters;
    // App custom data.
    _appData;
    // Observer instance.
    _observer = new y.EnhancedEventEmitter();
    constructor({ id: _, dataChannel: m, sctpStreamParameters: g, appData: x }) {
      super(), n.debug("constructor()"), this._id = _, this._dataChannel = m, this._sctpStreamParameters = g, this._appData = x ?? {}, this.handleDataChannel();
    }
    /**
     * DataProducer id.
     */
    get id() {
      return this._id;
    }
    /**
     * Whether the DataProducer is closed.
     */
    get closed() {
      return this._closed;
    }
    /**
     * SCTP stream parameters.
     */
    get sctpStreamParameters() {
      return this._sctpStreamParameters;
    }
    /**
     * DataChannel readyState.
     */
    get readyState() {
      return this._dataChannel.readyState;
    }
    /**
     * DataChannel label.
     */
    get label() {
      return this._dataChannel.label;
    }
    /**
     * DataChannel protocol.
     */
    get protocol() {
      return this._dataChannel.protocol;
    }
    /**
     * DataChannel bufferedAmount.
     */
    get bufferedAmount() {
      return this._dataChannel.bufferedAmount;
    }
    /**
     * DataChannel bufferedAmountLowThreshold.
     */
    get bufferedAmountLowThreshold() {
      return this._dataChannel.bufferedAmountLowThreshold;
    }
    /**
     * Set DataChannel bufferedAmountLowThreshold.
     */
    set bufferedAmountLowThreshold(_) {
      this._dataChannel.bufferedAmountLowThreshold = _;
    }
    /**
     * App custom data.
     */
    get appData() {
      return this._appData;
    }
    /**
     * App custom data setter.
     */
    set appData(_) {
      this._appData = _;
    }
    get observer() {
      return this._observer;
    }
    /**
     * Closes the DataProducer.
     */
    close() {
      this._closed || (n.debug("close()"), this._closed = !0, this._dataChannel.close(), this.emit("@close"), this._observer.safeEmit("close"), super.close(), this._observer.close());
    }
    /**
     * Transport was closed.
     */
    transportClosed() {
      this._closed || (n.debug("transportClosed()"), this._closed = !0, this._dataChannel.close(), this.safeEmit("transportclose"), this._observer.safeEmit("close"));
    }
    /**
     * Send a message.
     *
     * @param {String|Blob|ArrayBuffer|ArrayBufferView} data.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send(_) {
      if (n.debug("send()"), this._closed)
        throw new w.InvalidStateError("closed");
      this._dataChannel.send(_);
    }
    handleDataChannel() {
      this._dataChannel.addEventListener("open", () => {
        this._closed || (n.debug('DataChannel "open" event'), this.safeEmit("open"));
      }), this._dataChannel.addEventListener("error", (_) => {
        if (this._closed)
          return;
        const m = _.error ?? new Error("unknown DataChannel error");
        _.error?.errorDetail === "sctp-failure" ? n.error("DataChannel SCTP error [sctpCauseCode:%s]: %s", _.error?.sctpCauseCode, _.error.message) : n.error('DataChannel "error" event: %o', m), this.safeEmit("error", m);
      }), this._dataChannel.addEventListener("close", () => {
        this._closed || (n.warn('DataChannel "close" event'), this._closed = !0, this.emit("@close"), this.safeEmit("close"), this._observer.safeEmit("close"));
      }), this._dataChannel.addEventListener("message", () => {
        this._closed || n.warn('DataChannel "message" event in a DataProducer, message discarded');
      }), this._dataChannel.addEventListener("bufferedamountlow", () => {
        this._closed || this.safeEmit("bufferedamountlow");
      });
    }
  };
  return pe.DataProducer = T, pe;
}
var le = {}, mt;
function nr() {
  if (mt) return le;
  mt = 1, Object.defineProperty(le, "__esModule", { value: !0 }), le.DataConsumer = void 0;
  const f = z(), y = $(), w = new f.Logger("DataConsumer");
  let n = class extends y.EnhancedEventEmitter {
    // Id.
    _id;
    // Associated DataProducer Id.
    _dataProducerId;
    // The underlying RTCDataChannel instance.
    _dataChannel;
    // Closed flag.
    _closed = !1;
    // SCTP stream parameters.
    _sctpStreamParameters;
    // App custom data.
    _appData;
    // Observer instance.
    _observer = new y.EnhancedEventEmitter();
    constructor({ id: C, dataProducerId: _, dataChannel: m, sctpStreamParameters: g, appData: x }) {
      super(), w.debug("constructor()"), this._id = C, this._dataProducerId = _, this._dataChannel = m, this._sctpStreamParameters = g, this._appData = x ?? {}, this.handleDataChannel();
    }
    /**
     * DataConsumer id.
     */
    get id() {
      return this._id;
    }
    /**
     * Associated DataProducer id.
     */
    get dataProducerId() {
      return this._dataProducerId;
    }
    /**
     * Whether the DataConsumer is closed.
     */
    get closed() {
      return this._closed;
    }
    /**
     * SCTP stream parameters.
     */
    get sctpStreamParameters() {
      return this._sctpStreamParameters;
    }
    /**
     * DataChannel readyState.
     */
    get readyState() {
      return this._dataChannel.readyState;
    }
    /**
     * DataChannel label.
     */
    get label() {
      return this._dataChannel.label;
    }
    /**
     * DataChannel protocol.
     */
    get protocol() {
      return this._dataChannel.protocol;
    }
    /**
     * DataChannel binaryType.
     */
    get binaryType() {
      return this._dataChannel.binaryType;
    }
    /**
     * Set DataChannel binaryType.
     */
    set binaryType(C) {
      this._dataChannel.binaryType = C;
    }
    /**
     * App custom data.
     */
    get appData() {
      return this._appData;
    }
    /**
     * App custom data setter.
     */
    set appData(C) {
      this._appData = C;
    }
    get observer() {
      return this._observer;
    }
    /**
     * Closes the DataConsumer.
     */
    close() {
      this._closed || (w.debug("close()"), this._closed = !0, this._dataChannel.close(), this.emit("@close"), this._observer.safeEmit("close"), super.close(), this._observer.close());
    }
    /**
     * Transport was closed.
     */
    transportClosed() {
      this._closed || (w.debug("transportClosed()"), this._closed = !0, this._dataChannel.close(), this.safeEmit("transportclose"), this._observer.safeEmit("close"));
    }
    handleDataChannel() {
      this._dataChannel.addEventListener("open", () => {
        this._closed || (w.debug('DataChannel "open" event'), this.safeEmit("open"));
      }), this._dataChannel.addEventListener("error", (C) => {
        if (this._closed)
          return;
        const _ = C.error ?? new Error("unknown DataChannel error");
        C.error?.errorDetail === "sctp-failure" ? w.error("DataChannel SCTP error [sctpCauseCode:%s]: %s", C.error?.sctpCauseCode, C.error.message) : w.error('DataChannel "error" event: %o', _), this.safeEmit("error", _);
      }), this._dataChannel.addEventListener("close", () => {
        this._closed || (w.warn('DataChannel "close" event'), this._closed = !0, this.emit("@close"), this.safeEmit("close"), this._observer.safeEmit("close"));
      }), this._dataChannel.addEventListener("message", (C) => {
        this._closed || this.safeEmit("message", C.data);
      });
    }
  };
  return le.DataConsumer = n, le;
}
var gt;
function ar() {
  if (gt) return ne;
  gt = 1, Object.defineProperty(ne, "__esModule", { value: !0 }), ne.Transport = void 0;
  const f = tr(), y = z(), w = $(), n = U(), T = ee(), C = V(), _ = rr(), m = sr(), g = ir(), x = nr(), r = new y.Logger("Transport");
  class u {
    consumerOptions;
    promise;
    resolve;
    reject;
    constructor(S) {
      this.consumerOptions = S, this.promise = new Promise((e, t) => {
        this.resolve = e, this.reject = t;
      });
    }
  }
  let l = class extends w.EnhancedEventEmitter {
    // Id.
    _id;
    // Closed flag.
    _closed = !1;
    // Direction.
    _direction;
    // Callback for sending Transports to request sending extended RTP capabilities
    // on demand.
    _getSendExtendedRtpCapabilities;
    // Recv RTP capabilities.
    _recvRtpCapabilities;
    // Whether we can produce audio/video based on computed extended RTP
    // capabilities.
    _canProduceByKind;
    // SCTP max message size if enabled, null otherwise.
    _maxSctpMessageSize;
    // RTC handler isntance.
    _handler;
    // Transport ICE gathering state.
    _iceGatheringState = "new";
    // Transport connection state.
    _connectionState = "new";
    // App custom data.
    _appData;
    // Map of Producers indexed by id.
    _producers = /* @__PURE__ */ new Map();
    // Map of Consumers indexed by id.
    _consumers = /* @__PURE__ */ new Map();
    // Map of DataProducers indexed by id.
    _dataProducers = /* @__PURE__ */ new Map();
    // Map of DataConsumers indexed by id.
    _dataConsumers = /* @__PURE__ */ new Map();
    // Whether the Consumer for RTP probation has been created.
    _probatorConsumerCreated = !1;
    // AwaitQueue instance to make async tasks happen sequentially.
    _awaitQueue = new f.AwaitQueue();
    // Consumer creation tasks awaiting to be processed.
    _pendingConsumerTasks = [];
    // Consumer creation in progress flag.
    _consumerCreationInProgress = !1;
    // Consumers pending to be paused.
    _pendingPauseConsumers = /* @__PURE__ */ new Map();
    // Consumer pause in progress flag.
    _consumerPauseInProgress = !1;
    // Consumers pending to be resumed.
    _pendingResumeConsumers = /* @__PURE__ */ new Map();
    // Consumer resume in progress flag.
    _consumerResumeInProgress = !1;
    // Consumers pending to be closed.
    _pendingCloseConsumers = /* @__PURE__ */ new Map();
    // Consumer close in progress flag.
    _consumerCloseInProgress = !1;
    // Observer instance.
    _observer = new w.EnhancedEventEmitter();
    constructor({ direction: S, id: e, iceParameters: t, iceCandidates: s, dtlsParameters: o, sctpParameters: v, iceServers: p, iceTransportPolicy: h, additionalSettings: d, appData: i, handlerFactory: c, getSendExtendedRtpCapabilities: b, recvRtpCapabilities: R, canProduceByKind: I }) {
      super(), r.debug("constructor() [id:%s, direction:%s]", e, S), this._id = e, this._direction = S, this._getSendExtendedRtpCapabilities = b, this._recvRtpCapabilities = R, this._canProduceByKind = I, this._maxSctpMessageSize = v ? v.maxMessageSize : null;
      const M = T.clone(d) ?? {};
      delete M.iceServers, delete M.iceTransportPolicy, delete M.bundlePolicy, delete M.rtcpMuxPolicy, this._handler = c.factory({
        direction: S,
        iceParameters: t,
        iceCandidates: s,
        dtlsParameters: o,
        sctpParameters: v,
        iceServers: p,
        iceTransportPolicy: h,
        additionalSettings: M,
        getSendExtendedRtpCapabilities: this._getSendExtendedRtpCapabilities
      }), this._appData = i ?? {}, this.handleHandler();
    }
    /**
     * Transport id.
     */
    get id() {
      return this._id;
    }
    /**
     * Whether the Transport is closed.
     */
    get closed() {
      return this._closed;
    }
    /**
     * Transport direction.
     */
    get direction() {
      return this._direction;
    }
    /**
     * RTC handler instance.
     */
    get handler() {
      return this._handler;
    }
    /**
     * ICE gathering state.
     */
    get iceGatheringState() {
      return this._iceGatheringState;
    }
    /**
     * Connection state.
     */
    get connectionState() {
      return this._connectionState;
    }
    /**
     * App custom data.
     */
    get appData() {
      return this._appData;
    }
    /**
     * App custom data setter.
     */
    set appData(S) {
      this._appData = S;
    }
    get observer() {
      return this._observer;
    }
    /**
     * Close the Transport.
     */
    close() {
      if (!this._closed) {
        r.debug("close()"), this._closed = !0, this._awaitQueue.stop(), this._handler.close(), this._connectionState = "closed";
        for (const S of this._producers.values())
          S.transportClosed();
        this._producers.clear();
        for (const S of this._consumers.values())
          S.transportClosed();
        this._consumers.clear();
        for (const S of this._dataProducers.values())
          S.transportClosed();
        this._dataProducers.clear();
        for (const S of this._dataConsumers.values())
          S.transportClosed();
        this._dataConsumers.clear(), this._observer.safeEmit("close"), super.close(), this._observer.close();
      }
    }
    /**
     * Get associated Transport (RTCPeerConnection) stats.
     *
     * @returns {RTCStatsReport}
     */
    async getStats() {
      if (this._closed)
        throw new n.InvalidStateError("closed");
      return this._handler.getTransportStats();
    }
    /**
     * Restart ICE connection.
     */
    async restartIce({ iceParameters: S }) {
      if (r.debug("restartIce()"), this._closed)
        throw new n.InvalidStateError("closed");
      if (!S)
        throw new TypeError("missing iceParameters");
      return this._awaitQueue.push(async () => await this._handler.restartIce(S), "transport.restartIce()");
    }
    /**
     * Update ICE servers.
     */
    async updateIceServers({ iceServers: S } = {}) {
      if (r.debug("updateIceServers()"), this._closed)
        throw new n.InvalidStateError("closed");
      if (!Array.isArray(S))
        throw new TypeError("missing iceServers");
      return this._awaitQueue.push(async () => this._handler.updateIceServers(S), "transport.updateIceServers()");
    }
    /**
     * Create a Producer.
     */
    async produce({ track: S, streamId: e, encodings: t, codecOptions: s, headerExtensionOptions: o, codec: v, stopTracks: p = !0, disableTrackOnPause: h = !0, zeroRtpOnPause: d = !1, onRtpSender: i, appData: c = {} } = {}) {
      if (r.debug("produce() [track:%o]", S), this._closed)
        throw new n.InvalidStateError("closed");
      if (S) {
        if (this._direction !== "send")
          throw new n.UnsupportedError("not a sending Transport");
        if (this._canProduceByKind[S.kind]) {
          if (S.readyState === "ended")
            throw new n.InvalidStateError("track ended");
          if (this.listenerCount("connect") === 0 && this._connectionState === "new")
            throw new TypeError('no "connect" listener set into this transport');
          if (this.listenerCount("produce") === 0)
            throw new TypeError('no "produce" listener set into this transport');
          if (c && typeof c != "object")
            throw new TypeError("if given, appData must be an object");
        } else throw new n.UnsupportedError(`cannot produce ${S.kind}`);
      } else throw new TypeError("missing track");
      return this._awaitQueue.push(async () => {
        let b;
        if (t && !Array.isArray(t))
          throw TypeError("encodings must be an array");
        t?.length === 0 ? b = void 0 : t && (b = t.map((a) => {
          const D = {
            active: !0
          };
          return a.active === !1 && (D.active = !1), typeof a.dtx == "boolean" && (D.dtx = a.dtx), typeof a.scalabilityMode == "string" && (D.scalabilityMode = a.scalabilityMode), typeof a.scaleResolutionDownBy == "number" && (D.scaleResolutionDownBy = a.scaleResolutionDownBy), typeof a.maxBitrate == "number" && (D.maxBitrate = a.maxBitrate), typeof a.maxFramerate == "number" && (D.maxFramerate = a.maxFramerate), typeof a.adaptivePtime == "boolean" && (D.adaptivePtime = a.adaptivePtime), typeof a.priority == "string" && (D.priority = a.priority), typeof a.networkPriority == "string" && (D.networkPriority = a.networkPriority), D;
        }));
        const { localId: R, rtpParameters: I, rtpSender: M } = await this._handler.send({
          track: S,
          streamId: e,
          encodings: b,
          codecOptions: s,
          headerExtensionOptions: o,
          codec: v,
          onRtpSender: i
        });
        try {
          C.validateAndNormalizeRtpParameters(I);
          const { id: a } = await new Promise((P, k) => {
            this.safeEmit("produce", {
              kind: S.kind,
              rtpParameters: I,
              appData: c
            }, P, k);
          }), D = new _.Producer({
            id: a,
            localId: R,
            rtpSender: M,
            track: S,
            rtpParameters: I,
            stopTracks: p,
            disableTrackOnPause: h,
            zeroRtpOnPause: d,
            appData: c
          });
          return this._producers.set(D.id, D), this.handleProducer(D), this._observer.safeEmit("newproducer", D), D;
        } catch (a) {
          throw this._handler.stopSending(R).catch(() => {
          }), a;
        }
      }, "transport.produce()").catch((b) => {
        if (p)
          try {
            S.stop();
          } catch {
          }
        throw b;
      });
    }
    /**
     * Create a Consumer to consume a remote Producer.
     */
    async consume({ id: S, producerId: e, kind: t, rtpParameters: s, streamId: o, onRtpReceiver: v, appData: p = {} }) {
      if (r.debug("consume()"), this._closed)
        throw new n.InvalidStateError("closed");
      if (this._direction !== "recv")
        throw new n.UnsupportedError("not a receiving Transport");
      if (typeof S != "string")
        throw new TypeError("missing id");
      if (typeof e != "string")
        throw new TypeError("missing producerId");
      if (t !== "audio" && t !== "video")
        throw new TypeError(`invalid kind '${t}'`);
      if (this.listenerCount("connect") === 0 && this._connectionState === "new")
        throw new TypeError('no "connect" listener set into this transport');
      if (p && typeof p != "object")
        throw new TypeError("if given, appData must be an object");
      const h = T.clone(s);
      if (!C.canReceive(h, this._recvRtpCapabilities))
        throw new n.UnsupportedError("cannot consume this Producer");
      const i = new u({
        id: S,
        producerId: e,
        kind: t,
        rtpParameters: h,
        streamId: o,
        onRtpReceiver: v,
        appData: p
      });
      return this._pendingConsumerTasks.push(i), queueMicrotask(() => {
        this._closed || this._consumerCreationInProgress === !1 && this.createPendingConsumers();
      }), i.promise;
    }
    /**
     * Create a DataProducer
     */
    async produceData({ ordered: S = !0, maxPacketLifeTime: e, maxRetransmits: t, label: s = "", protocol: o = "", appData: v = {} } = {}) {
      if (r.debug("produceData()"), this._closed)
        throw new n.InvalidStateError("closed");
      if (this._direction !== "send")
        throw new n.UnsupportedError("not a sending Transport");
      if (this._maxSctpMessageSize) {
        if (this.listenerCount("connect") === 0 && this._connectionState === "new")
          throw new TypeError('no "connect" listener set into this transport');
        if (this.listenerCount("producedata") === 0)
          throw new TypeError('no "producedata" listener set into this transport');
        if (v && typeof v != "object")
          throw new TypeError("if given, appData must be an object");
      } else throw new n.UnsupportedError("SCTP not enabled by remote Transport");
      return (e || t) && (S = !1), this._awaitQueue.push(async () => {
        const { dataChannel: p, sctpStreamParameters: h } = await this._handler.sendDataChannel({
          ordered: S,
          maxPacketLifeTime: e,
          maxRetransmits: t,
          label: s,
          protocol: o
        });
        C.validateAndNormalizeSctpStreamParameters(h);
        const { id: d } = await new Promise((c, b) => {
          this.safeEmit("producedata", {
            sctpStreamParameters: h,
            label: s,
            protocol: o,
            appData: v
          }, c, b);
        }), i = new g.DataProducer({
          id: d,
          dataChannel: p,
          sctpStreamParameters: h,
          appData: v
        });
        return this._dataProducers.set(i.id, i), this.handleDataProducer(i), this._observer.safeEmit("newdataproducer", i), i;
      }, "transport.produceData()");
    }
    /**
     * Create a DataConsumer
     */
    async consumeData({ id: S, dataProducerId: e, sctpStreamParameters: t, label: s = "", protocol: o = "", appData: v = {} }) {
      if (r.debug("consumeData()"), this._closed)
        throw new n.InvalidStateError("closed");
      if (this._direction !== "recv")
        throw new n.UnsupportedError("not a receiving Transport");
      if (this._maxSctpMessageSize) {
        if (typeof S != "string")
          throw new TypeError("missing id");
        if (typeof e != "string")
          throw new TypeError("missing dataProducerId");
        if (this.listenerCount("connect") === 0 && this._connectionState === "new")
          throw new TypeError('no "connect" listener set into this transport');
        if (v && typeof v != "object")
          throw new TypeError("if given, appData must be an object");
      } else throw new n.UnsupportedError("SCTP not enabled by remote Transport");
      const p = T.clone(t);
      return C.validateAndNormalizeSctpStreamParameters(p), this._awaitQueue.push(async () => {
        const { dataChannel: h } = await this._handler.receiveDataChannel({
          sctpStreamParameters: p,
          label: s,
          protocol: o
        }), d = new x.DataConsumer({
          id: S,
          dataProducerId: e,
          dataChannel: h,
          sctpStreamParameters: p,
          appData: v
        });
        return this._dataConsumers.set(d.id, d), this.handleDataConsumer(d), this._observer.safeEmit("newdataconsumer", d), d;
      }, "transport.consumeData()");
    }
    // This method is guaranteed to never throw.
    createPendingConsumers() {
      this._consumerCreationInProgress = !0, this._awaitQueue.push(async () => {
        if (this._pendingConsumerTasks.length === 0) {
          r.debug("createPendingConsumers() | there is no Consumer to be created");
          return;
        }
        const S = [...this._pendingConsumerTasks];
        this._pendingConsumerTasks = [];
        let e;
        const t = [];
        for (const s of S) {
          const { id: o, kind: v, rtpParameters: p, streamId: h, onRtpReceiver: d } = s.consumerOptions;
          t.push({
            trackId: o,
            kind: v,
            rtpParameters: p,
            streamId: h,
            onRtpReceiver: d
          });
        }
        try {
          const s = await this._handler.receive(t);
          for (let o = 0; o < s.length; ++o) {
            const v = S[o], p = s[o], { id: h, producerId: d, kind: i, rtpParameters: c, appData: b } = v.consumerOptions, { localId: R, rtpReceiver: I, track: M } = p, a = new m.Consumer({
              id: h,
              localId: R,
              producerId: d,
              rtpReceiver: I,
              track: M,
              rtpParameters: c,
              appData: b
            });
            this._consumers.set(a.id, a), this.handleConsumer(a), !this._probatorConsumerCreated && !e && i === "video" && (e = a), this._observer.safeEmit("newconsumer", a), v.resolve(a);
          }
        } catch (s) {
          for (const o of S)
            o.reject(s);
        }
        if (e)
          try {
            const s = C.generateProbatorRtpParameters(e.rtpParameters);
            await this._handler.receive([
              {
                trackId: "probator",
                kind: "video",
                rtpParameters: s
              }
            ]), r.debug("createPendingConsumers() | Consumer for RTP probation created"), this._probatorConsumerCreated = !0;
          } catch (s) {
            r.error("createPendingConsumers() | failed to create Consumer for RTP probation:%o", s);
          }
      }, "transport.createPendingConsumers()").then(() => {
        this._consumerCreationInProgress = !1, this._pendingConsumerTasks.length > 0 && this.createPendingConsumers();
      }).catch(() => {
      });
    }
    pausePendingConsumers() {
      this._consumerPauseInProgress = !0, this._awaitQueue.push(async () => {
        if (this._pendingPauseConsumers.size === 0) {
          r.debug("pausePendingConsumers() | there is no Consumer to be paused");
          return;
        }
        const S = Array.from(this._pendingPauseConsumers.values());
        this._pendingPauseConsumers.clear();
        try {
          const e = S.map((t) => t.localId);
          await this._handler.pauseReceiving(e);
        } catch (e) {
          r.error("pausePendingConsumers() | failed to pause Consumers:", e);
        }
      }, "transport.pausePendingConsumers()").then(() => {
        this._consumerPauseInProgress = !1, this._pendingPauseConsumers.size > 0 && this.pausePendingConsumers();
      }).catch(() => {
      });
    }
    resumePendingConsumers() {
      this._consumerResumeInProgress = !0, this._awaitQueue.push(async () => {
        if (this._pendingResumeConsumers.size === 0) {
          r.debug("resumePendingConsumers() | there is no Consumer to be resumed");
          return;
        }
        const S = Array.from(this._pendingResumeConsumers.values());
        this._pendingResumeConsumers.clear();
        try {
          const e = S.map((t) => t.localId);
          await this._handler.resumeReceiving(e);
        } catch (e) {
          r.error("resumePendingConsumers() | failed to resume Consumers:", e);
        }
      }, "transport.resumePendingConsumers()").then(() => {
        this._consumerResumeInProgress = !1, this._pendingResumeConsumers.size > 0 && this.resumePendingConsumers();
      }).catch(() => {
      });
    }
    closePendingConsumers() {
      this._consumerCloseInProgress = !0, this._awaitQueue.push(async () => {
        if (this._pendingCloseConsumers.size === 0) {
          r.debug("closePendingConsumers() | there is no Consumer to be closed");
          return;
        }
        const S = Array.from(this._pendingCloseConsumers.values());
        this._pendingCloseConsumers.clear();
        try {
          await this._handler.stopReceiving(S.map((e) => e.localId));
        } catch (e) {
          r.error("closePendingConsumers() | failed to close Consumers:", e);
        }
      }, "transport.closePendingConsumers()").then(() => {
        this._consumerCloseInProgress = !1, this._pendingCloseConsumers.size > 0 && this.closePendingConsumers();
      }).catch(() => {
      });
    }
    handleHandler() {
      const S = this._handler;
      S.on("@connect", ({ dtlsParameters: e }, t, s) => {
        if (this._closed) {
          s(new n.InvalidStateError("closed"));
          return;
        }
        this.safeEmit("connect", { dtlsParameters: e }, t, s);
      }), S.on("@icegatheringstatechange", (e) => {
        e !== this._iceGatheringState && (r.debug("ICE gathering state changed to %s", e), this._iceGatheringState = e, this._closed || this.safeEmit("icegatheringstatechange", e));
      }), S.on("@icecandidateerror", (e) => {
        r.warn(`ICE candidate error [url:${e.url}, localAddress:${e.address}, localPort:${e.port}]: ${e.errorCode} "${e.errorText}"`), this.safeEmit("icecandidateerror", e);
      }), S.on("@connectionstatechange", (e) => {
        e !== this._connectionState && (r.debug("connection state changed to %s", e), this._connectionState = e, this._closed || this.safeEmit("connectionstatechange", e));
      });
    }
    handleProducer(S) {
      S.on("@close", () => {
        this._producers.delete(S.id), !this._closed && this._awaitQueue.push(async () => await this._handler.stopSending(S.localId), "producer @close event").catch((e) => r.warn("producer.close() failed:%o", e));
      }), S.on("@pause", (e, t) => {
        this._awaitQueue.push(async () => await this._handler.pauseSending(S.localId), "producer @pause event").then(e).catch(t);
      }), S.on("@resume", (e, t) => {
        this._awaitQueue.push(async () => await this._handler.resumeSending(S.localId), "producer @resume event").then(e).catch(t);
      }), S.on("@replacetrack", (e, t, s) => {
        this._awaitQueue.push(async () => await this._handler.replaceTrack(S.localId, e), "producer @replacetrack event").then(t).catch(s);
      }), S.on("@setmaxspatiallayer", (e, t, s) => {
        this._awaitQueue.push(async () => await this._handler.setMaxSpatialLayer(S.localId, e), "producer @setmaxspatiallayer event").then(t).catch(s);
      }), S.on("@setrtpencodingparameters", (e, t, s) => {
        this._awaitQueue.push(async () => await this._handler.setRtpEncodingParameters(S.localId, e), "producer @setrtpencodingparameters event").then(t).catch(s);
      }), S.on("@getstats", (e, t) => {
        if (this._closed)
          return t(new n.InvalidStateError("closed"));
        this._handler.getSenderStats(S.localId).then(e).catch(t);
      });
    }
    handleConsumer(S) {
      S.on("@close", () => {
        this._consumers.delete(S.id), this._pendingPauseConsumers.delete(S.id), this._pendingResumeConsumers.delete(S.id), !this._closed && (this._pendingCloseConsumers.set(S.id, S), this._consumerCloseInProgress === !1 && this.closePendingConsumers());
      }), S.on("@pause", () => {
        this._pendingResumeConsumers.has(S.id) && this._pendingResumeConsumers.delete(S.id), this._pendingPauseConsumers.set(S.id, S), queueMicrotask(() => {
          this._closed || this._consumerPauseInProgress === !1 && this.pausePendingConsumers();
        });
      }), S.on("@resume", () => {
        this._pendingPauseConsumers.has(S.id) && this._pendingPauseConsumers.delete(S.id), this._pendingResumeConsumers.set(S.id, S), queueMicrotask(() => {
          this._closed || this._consumerResumeInProgress === !1 && this.resumePendingConsumers();
        });
      }), S.on("@getstats", (e, t) => {
        if (this._closed)
          return t(new n.InvalidStateError("closed"));
        this._handler.getReceiverStats(S.localId).then(e).catch(t);
      });
    }
    handleDataProducer(S) {
      S.on("@close", () => {
        this._dataProducers.delete(S.id);
      });
    }
    handleDataConsumer(S) {
      S.on("@close", () => {
        this._dataConsumers.delete(S.id);
      });
    }
  };
  return ne.Transport = l, ne;
}
var ue = {}, B = {}, He = {}, Ve = { exports: {} }, _t;
function Ke() {
  if (_t) return Ve.exports;
  _t = 1;
  var f = Ve.exports = {
    v: [{
      name: "version",
      reg: /^(\d*)$/
    }],
    o: [{
      // o=- 20518 0 IN IP4 203.0.113.1
      // NB: sessionId will be a String in most cases because it is huge
      name: "origin",
      reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
      names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
      format: "%s %s %d %s IP%d %s"
    }],
    // default parsing of these only (though some of these feel outdated)
    s: [{ name: "name" }],
    i: [{ name: "description" }],
    u: [{ name: "uri" }],
    e: [{ name: "email" }],
    p: [{ name: "phone" }],
    z: [{ name: "timezones" }],
    // TODO: this one can actually be parsed properly...
    r: [{ name: "repeats" }],
    // TODO: this one can also be parsed properly
    // k: [{}], // outdated thing ignored
    t: [{
      // t=0 0
      name: "timing",
      reg: /^(\d*) (\d*)/,
      names: ["start", "stop"],
      format: "%d %d"
    }],
    c: [{
      // c=IN IP4 10.47.197.26
      name: "connection",
      reg: /^IN IP(\d) (\S*)/,
      names: ["version", "ip"],
      format: "IN IP%d %s"
    }],
    b: [{
      // b=AS:4000
      push: "bandwidth",
      reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
      names: ["type", "limit"],
      format: "%s:%s"
    }],
    m: [{
      // m=video 51744 RTP/AVP 126 97 98 34 31
      // NB: special - pushes to session
      // TODO: rtp/fmtp should be filtered by the payloads found here?
      reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
      names: ["type", "port", "protocol", "payloads"],
      format: "%s %d %s %s"
    }],
    a: [
      {
        // a=rtpmap:110 opus/48000/2
        push: "rtp",
        reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
        names: ["payload", "codec", "rate", "encoding"],
        format: function(y) {
          return y.encoding ? "rtpmap:%d %s/%s/%s" : y.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
        }
      },
      {
        // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
        // a=fmtp:111 minptime=10; useinbandfec=1
        push: "fmtp",
        reg: /^fmtp:(\d*) ([\S| ]*)/,
        names: ["payload", "config"],
        format: "fmtp:%d %s"
      },
      {
        // a=control:streamid=0
        name: "control",
        reg: /^control:(.*)/,
        format: "control:%s"
      },
      {
        // a=rtcp:65179 IN IP4 193.84.77.194
        name: "rtcp",
        reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
        names: ["port", "netType", "ipVer", "address"],
        format: function(y) {
          return y.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
        }
      },
      {
        // a=rtcp-fb:98 trr-int 100
        push: "rtcpFbTrrInt",
        reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
        names: ["payload", "value"],
        format: "rtcp-fb:%s trr-int %d"
      },
      {
        // a=rtcp-fb:98 nack rpsi
        push: "rtcpFb",
        reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
        names: ["payload", "type", "subtype"],
        format: function(y) {
          return y.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
        }
      },
      {
        // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
        // a=extmap:1/recvonly URI-gps-string
        // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
        push: "ext",
        reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
        names: ["value", "direction", "encrypt-uri", "uri", "config"],
        format: function(y) {
          return "extmap:%d" + (y.direction ? "/%s" : "%v") + (y["encrypt-uri"] ? " %s" : "%v") + " %s" + (y.config ? " %s" : "");
        }
      },
      {
        // a=extmap-allow-mixed
        name: "extmapAllowMixed",
        reg: /^(extmap-allow-mixed)/
      },
      {
        // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
        push: "crypto",
        reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
        names: ["id", "suite", "config", "sessionConfig"],
        format: function(y) {
          return y.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
        }
      },
      {
        // a=setup:actpass
        name: "setup",
        reg: /^setup:(\w*)/,
        format: "setup:%s"
      },
      {
        // a=connection:new
        name: "connectionType",
        reg: /^connection:(new|existing)/,
        format: "connection:%s"
      },
      {
        // a=mid:1
        name: "mid",
        reg: /^mid:([^\s]*)/,
        format: "mid:%s"
      },
      {
        // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
        push: "msid",
        reg: /^msid:([\w-]+)(?: ([\w-]+))?/,
        names: ["id", "appdata"],
        format: "msid:%s %s"
      },
      {
        // a=ptime:20
        name: "ptime",
        reg: /^ptime:(\d*(?:\.\d*)*)/,
        format: "ptime:%d"
      },
      {
        // a=maxptime:60
        name: "maxptime",
        reg: /^maxptime:(\d*(?:\.\d*)*)/,
        format: "maxptime:%d"
      },
      {
        // a=sendrecv
        name: "direction",
        reg: /^(sendrecv|recvonly|sendonly|inactive)/
      },
      {
        // a=ice-lite
        name: "icelite",
        reg: /^(ice-lite)/
      },
      {
        // a=ice-ufrag:F7gI
        name: "iceUfrag",
        reg: /^ice-ufrag:(\S*)/,
        format: "ice-ufrag:%s"
      },
      {
        // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
        name: "icePwd",
        reg: /^ice-pwd:(\S*)/,
        format: "ice-pwd:%s"
      },
      {
        // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
        name: "fingerprint",
        reg: /^fingerprint:(\S*) (\S*)/,
        names: ["type", "hash"],
        format: "fingerprint:%s %s"
      },
      {
        // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
        // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
        // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
        // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
        // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
        push: "candidates",
        reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
        names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
        format: function(y) {
          var w = "candidate:%s %d %s %d %s %d typ %s";
          return w += y.raddr != null ? " raddr %s rport %d" : "%v%v", w += y.tcptype != null ? " tcptype %s" : "%v", y.generation != null && (w += " generation %d"), w += y["network-id"] != null ? " network-id %d" : "%v", w += y["network-cost"] != null ? " network-cost %d" : "%v", w;
        }
      },
      {
        // a=end-of-candidates (keep after the candidates line for readability)
        name: "endOfCandidates",
        reg: /^(end-of-candidates)/
      },
      {
        // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
        name: "remoteCandidates",
        reg: /^remote-candidates:(.*)/,
        format: "remote-candidates:%s"
      },
      {
        // a=ice-options:google-ice
        name: "iceOptions",
        reg: /^ice-options:(\S*)/,
        format: "ice-options:%s"
      },
      {
        // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
        push: "ssrcs",
        reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
        names: ["id", "attribute", "value"],
        format: function(y) {
          var w = "ssrc:%d";
          return y.attribute != null && (w += " %s", y.value != null && (w += ":%s")), w;
        }
      },
      {
        // a=ssrc-group:FEC 1 2
        // a=ssrc-group:FEC-FR 3004364195 1080772241
        push: "ssrcGroups",
        // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
        reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
        names: ["semantics", "ssrcs"],
        format: "ssrc-group:%s %s"
      },
      {
        // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
        name: "msidSemantic",
        reg: /^msid-semantic:\s?(\w*) (\S*)/,
        names: ["semantic", "token"],
        format: "msid-semantic: %s %s"
        // space after ':' is not accidental
      },
      {
        // a=group:BUNDLE audio video
        push: "groups",
        reg: /^group:(\w*) (.*)/,
        names: ["type", "mids"],
        format: "group:%s %s"
      },
      {
        // a=rtcp-mux
        name: "rtcpMux",
        reg: /^(rtcp-mux)/
      },
      {
        // a=rtcp-rsize
        name: "rtcpRsize",
        reg: /^(rtcp-rsize)/
      },
      {
        // a=sctpmap:5000 webrtc-datachannel 1024
        name: "sctpmap",
        reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
        names: ["sctpmapNumber", "app", "maxMessageSize"],
        format: function(y) {
          return y.maxMessageSize != null ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
        }
      },
      {
        // a=x-google-flag:conference
        name: "xGoogleFlag",
        reg: /^x-google-flag:([^\s]*)/,
        format: "x-google-flag:%s"
      },
      {
        // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
        push: "rids",
        reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
        names: ["id", "direction", "params"],
        format: function(y) {
          return y.params ? "rid:%s %s %s" : "rid:%s %s";
        }
      },
      {
        // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
        // a=imageattr:* send [x=800,y=640] recv *
        // a=imageattr:100 recv [x=320,y=240]
        push: "imageattrs",
        reg: new RegExp(
          // a=imageattr:97
          "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
        ),
        names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
        format: function(y) {
          return "imageattr:%s %s %s" + (y.dir2 ? " %s %s" : "");
        }
      },
      {
        // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
        // a=simulcast:recv 1;4,5 send 6;7
        name: "simulcast",
        reg: new RegExp(
          // a=simulcast:
          "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"
        ),
        names: ["dir1", "list1", "dir2", "list2"],
        format: function(y) {
          return "simulcast:%s %s" + (y.dir2 ? " %s %s" : "");
        }
      },
      {
        // old simulcast draft 03 (implemented by Firefox)
        //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
        // a=simulcast: recv pt=97;98 send pt=97
        // a=simulcast: send rid=5;6;7 paused=6,7
        name: "simulcast_03",
        reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
        names: ["value"],
        format: "simulcast: %s"
      },
      {
        // a=framerate:25
        // a=framerate:29.97
        name: "framerate",
        reg: /^framerate:(\d+(?:$|\.\d+))/,
        format: "framerate:%s"
      },
      {
        // RFC4570
        // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
        name: "sourceFilter",
        reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
        names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
        format: "source-filter: %s %s %s %s %s"
      },
      {
        // a=bundle-only
        name: "bundleOnly",
        reg: /^(bundle-only)/
      },
      {
        // a=label:1
        name: "label",
        reg: /^label:(.+)/,
        format: "label:%s"
      },
      {
        // RFC version 26 for SCTP over DTLS
        // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
        name: "sctpPort",
        reg: /^sctp-port:(\d+)$/,
        format: "sctp-port:%s"
      },
      {
        // RFC version 26 for SCTP over DTLS
        // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
        name: "maxMessageSize",
        reg: /^max-message-size:(\d+)$/,
        format: "max-message-size:%s"
      },
      {
        // RFC7273
        // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
        push: "tsRefClocks",
        reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
        names: ["clksrc", "clksrcExt"],
        format: function(y) {
          return "ts-refclk:%s" + (y.clksrcExt != null ? "=%s" : "");
        }
      },
      {
        // RFC7273
        // a=mediaclk:direct=963214424
        name: "mediaClk",
        reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
        names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"],
        format: function(y) {
          var w = "mediaclk:";
          return w += y.id != null ? "id=%s %s" : "%v%s", w += y.mediaClockValue != null ? "=%s" : "", w += y.rateNumerator != null ? " rate=%s" : "", w += y.rateDenominator != null ? "/%s" : "", w;
        }
      },
      {
        // a=keywds:keywords
        name: "keywords",
        reg: /^keywds:(.+)$/,
        format: "keywds:%s"
      },
      {
        // a=content:main
        name: "content",
        reg: /^content:(.+)/,
        format: "content:%s"
      },
      // BFCP https://tools.ietf.org/html/rfc4583
      {
        // a=floorctrl:c-s
        name: "bfcpFloorCtrl",
        reg: /^floorctrl:(c-only|s-only|c-s)/,
        format: "floorctrl:%s"
      },
      {
        // a=confid:1
        name: "bfcpConfId",
        reg: /^confid:(\d+)/,
        format: "confid:%s"
      },
      {
        // a=userid:1
        name: "bfcpUserId",
        reg: /^userid:(\d+)/,
        format: "userid:%s"
      },
      {
        // a=floorid:1
        name: "bfcpFloorId",
        reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
        names: ["id", "mStream"],
        format: "floorid:%s mstrm:%s"
      },
      {
        // any a= that we don't understand is kept verbatim on media.invalid
        push: "invalid",
        names: ["value"]
      }
    ]
  };
  return Object.keys(f).forEach(function(y) {
    var w = f[y];
    w.forEach(function(n) {
      n.reg || (n.reg = /(.*)/), n.format || (n.format = "%s");
    });
  }), Ve.exports;
}
var vt;
function or() {
  return vt || (vt = 1, (function(f) {
    var y = function(m) {
      return String(Number(m)) === m ? Number(m) : m;
    }, w = function(m, g, x, r) {
      if (r && !x)
        g[r] = y(m[1]);
      else
        for (var u = 0; u < x.length; u += 1)
          m[u + 1] != null && (g[x[u]] = y(m[u + 1]));
    }, n = function(m, g, x) {
      var r = m.name && m.names;
      m.push && !g[m.push] ? g[m.push] = [] : r && !g[m.name] && (g[m.name] = {});
      var u = m.push ? {} : (
        // blank object that will be pushed
        r ? g[m.name] : g
      );
      w(x.match(m.reg), u, m.names, m.name), m.push && g[m.push].push(u);
    }, T = Ke(), C = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
    f.parse = function(m) {
      var g = {}, x = [], r = g;
      return m.split(/(\r\n|\r|\n)/).filter(C).forEach(function(u) {
        var l = u[0], E = u.slice(2);
        l === "m" && (x.push({ rtp: [], fmtp: [] }), r = x[x.length - 1]);
        for (var S = 0; S < (T[l] || []).length; S += 1) {
          var e = T[l][S];
          if (e.reg.test(E))
            return n(e, r, E);
        }
      }), g.media = x, g;
    };
    var _ = function(m, g) {
      var x = g.split(/=(.+)/, 2);
      return x.length === 2 ? m[x[0]] = y(x[1]) : x.length === 1 && g.length > 1 && (m[x[0]] = void 0), m;
    };
    f.parseParams = function(m) {
      return m.split(/;\s?/).reduce(_, {});
    }, f.parseFmtpConfig = f.parseParams, f.parsePayloads = function(m) {
      return m.toString().split(" ").map(Number);
    }, f.parseRemoteCandidates = function(m) {
      for (var g = [], x = m.split(" ").map(y), r = 0; r < x.length; r += 3)
        g.push({
          component: x[r],
          ip: x[r + 1],
          port: x[r + 2]
        });
      return g;
    }, f.parseImageAttributes = function(m) {
      return m.split(" ").map(function(g) {
        return g.substring(1, g.length - 1).split(",").reduce(_, {});
      });
    }, f.parseSimulcastStreamList = function(m) {
      return m.split(";").map(function(g) {
        return g.split(",").map(function(x) {
          var r, u = !1;
          return x[0] !== "~" ? r = y(x) : (r = y(x.substring(1, x.length)), u = !0), {
            scid: r,
            paused: u
          };
        });
      });
    };
  })(He)), He;
}
var Qe, wt;
function cr() {
  if (wt) return Qe;
  wt = 1;
  var f = Ke(), y = /%[sdv%]/g, w = function(_) {
    var m = 1, g = arguments, x = g.length;
    return _.replace(y, function(r) {
      if (m >= x)
        return r;
      var u = g[m];
      switch (m += 1, r) {
        case "%%":
          return "%";
        case "%s":
          return String(u);
        case "%d":
          return Number(u);
        case "%v":
          return "";
      }
    });
  }, n = function(_, m, g) {
    var x = m.format instanceof Function ? m.format(m.push ? g : g[m.name]) : m.format, r = [_ + "=" + x];
    if (m.names)
      for (var u = 0; u < m.names.length; u += 1) {
        var l = m.names[u];
        m.name ? r.push(g[m.name][l]) : r.push(g[m.names[u]]);
      }
    else
      r.push(g[m.name]);
    return w.apply(null, r);
  }, T = [
    "v",
    "o",
    "s",
    "i",
    "u",
    "e",
    "p",
    "c",
    "b",
    "t",
    "r",
    "z",
    "a"
  ], C = ["i", "c", "b", "a"];
  return Qe = function(_, m) {
    m = m || {}, _.version == null && (_.version = 0), _.name == null && (_.name = " "), _.media.forEach(function(u) {
      u.payloads == null && (u.payloads = "");
    });
    var g = m.outerOrder || T, x = m.innerOrder || C, r = [];
    return g.forEach(function(u) {
      f[u].forEach(function(l) {
        l.name in _ && _[l.name] != null ? r.push(n(u, l, _)) : l.push in _ && _[l.push] != null && _[l.push].forEach(function(E) {
          r.push(n(u, l, E));
        });
      });
    }), _.media.forEach(function(u) {
      r.push(n("m", f.m[0], u)), x.forEach(function(l) {
        f[l].forEach(function(E) {
          E.name in u && u[E.name] != null ? r.push(n(l, E, u)) : E.push in u && u[E.push] != null && u[E.push].forEach(function(S) {
            r.push(n(l, E, S));
          });
        });
      });
    }), r.join(`\r
`) + `\r
`;
  }, Qe;
}
var bt;
function G() {
  if (bt) return B;
  bt = 1;
  var f = or(), y = cr(), w = Ke();
  return B.grammar = w, B.write = y, B.parse = f.parse, B.parseParams = f.parseParams, B.parseFmtpConfig = f.parseFmtpConfig, B.parsePayloads = f.parsePayloads, B.parseRemoteCandidates = f.parseRemoteCandidates, B.parseImageAttributes = f.parseImageAttributes, B.parseSimulcastStreamList = f.parseSimulcastStreamList, B;
}
var Pe = {}, yt;
function te() {
  if (yt) return Pe;
  yt = 1, Object.defineProperty(Pe, "__esModule", { value: !0 }), Pe.parse = y;
  const f = new RegExp("^[LS]([1-9]\\d{0,1})T([1-9]\\d{0,1})");
  function y(w) {
    const n = f.exec(w ?? "");
    return n ? {
      spatialLayers: Number(n[1]),
      temporalLayers: Number(n[2])
    } : {
      spatialLayers: 1,
      temporalLayers: 1
    };
  }
  return Pe;
}
var he = {}, H = {}, St;
function dr() {
  if (St) return H;
  St = 1, Object.defineProperty(H, "__esModule", { value: !0 }), H.OfferMediaSection = H.AnswerMediaSection = H.MediaSection = void 0;
  const f = G(), y = ee();
  let w = class {
    // SDP media object.
    _mediaObject;
    constructor({ iceParameters: m, iceCandidates: g, dtlsParameters: x }) {
      if (this._mediaObject = {
        type: "",
        port: 0,
        protocol: "",
        payloads: "",
        rtp: [],
        fmtp: []
      }, m && this.setIceParameters(m), g) {
        this._mediaObject.candidates = [];
        for (const r of g) {
          const u = {
            foundation: r.foundation,
            // mediasoup does mandates rtcp-mux so candidates component is always
            // RTP (1).
            component: 1,
            // Be ready for new candidate.address field in mediasoup server side
            // field and keep backward compatibility with deprecated candidate.ip.
            ip: r.address ?? r.ip,
            port: r.port,
            priority: r.priority,
            transport: r.protocol,
            type: r.type
          };
          r.tcpType && (u.tcptype = r.tcpType), this._mediaObject.candidates.push(u);
        }
        this._mediaObject.endOfCandidates = "end-of-candidates", this._mediaObject.iceOptions = "renomination";
      }
      x && this.setDtlsRole(x.role);
    }
    get mid() {
      return String(this._mediaObject.mid);
    }
    get closed() {
      return this._mediaObject.port === 0;
    }
    getObject() {
      return this._mediaObject;
    }
    setIceParameters(m) {
      this._mediaObject.iceUfrag = m.usernameFragment, this._mediaObject.icePwd = m.password;
    }
    pause() {
      this._mediaObject.direction = "inactive";
    }
    disable() {
      this.pause();
    }
    close() {
      this.disable(), this._mediaObject.port = 0, delete this._mediaObject.candidates, delete this._mediaObject.endOfCandidates, delete this._mediaObject.iceUfrag, delete this._mediaObject.icePwd, delete this._mediaObject.iceOptions, this._mediaObject.rtp = [], this._mediaObject.fmtp = [], delete this._mediaObject.rtcp, delete this._mediaObject.rtcpFb, delete this._mediaObject.ssrcs, delete this._mediaObject.ssrcGroups, delete this._mediaObject.simulcast, delete this._mediaObject.simulcast_03, delete this._mediaObject.rids, delete this._mediaObject.extmapAllowMixed;
    }
  };
  H.MediaSection = w;
  class n extends w {
    constructor({ iceParameters: m, iceCandidates: g, dtlsParameters: x, sctpParameters: r, plainRtpParameters: u, offerMediaObject: l, offerRtpParameters: E, answerRtpParameters: S, codecOptions: e }) {
      switch (super({ iceParameters: m, iceCandidates: g, dtlsParameters: x }), this._mediaObject.mid = String(l.mid), this._mediaObject.type = l.type, this._mediaObject.protocol = l.protocol, u ? (this._mediaObject.connection = {
        ip: u.ip,
        version: u.ipVersion
      }, this._mediaObject.port = u.port) : (this._mediaObject.connection = { ip: "127.0.0.1", version: 4 }, this._mediaObject.port = 7), l.type) {
        case "audio":
        case "video": {
          this._mediaObject.direction = "recvonly", this._mediaObject.rtp = [], this._mediaObject.rtcpFb = [], this._mediaObject.fmtp = [];
          for (const t of S.codecs) {
            const s = {
              payload: t.payloadType,
              codec: C(t),
              rate: t.clockRate
            };
            t.channels > 1 && (s.encoding = t.channels), this._mediaObject.rtp.push(s);
            const o = y.clone(t.parameters) ?? {};
            let v = y.clone(t.rtcpFeedback) ?? [];
            if (e) {
              const { opusStereo: h, opusFec: d, opusDtx: i, opusMaxPlaybackRate: c, opusMaxAverageBitrate: b, opusPtime: R, opusNack: I, videoGoogleStartBitrate: M, videoGoogleMaxBitrate: a, videoGoogleMinBitrate: D } = e, P = E.codecs.find((k) => k.payloadType === t.payloadType);
              switch (t.mimeType.toLowerCase()) {
                case "audio/opus":
                case "audio/multiopus": {
                  h !== void 0 && (P.parameters["sprop-stereo"] = h ? 1 : 0, o.stereo = h ? 1 : 0), d !== void 0 && (P.parameters.useinbandfec = d ? 1 : 0, o.useinbandfec = d ? 1 : 0), i !== void 0 && (P.parameters.usedtx = i ? 1 : 0, o.usedtx = i ? 1 : 0), c !== void 0 && (o.maxplaybackrate = c), b !== void 0 && (o.maxaveragebitrate = b), R !== void 0 && (P.parameters.ptime = R, o.ptime = R), I || (P.rtcpFeedback = P.rtcpFeedback.filter((k) => k.type !== "nack" || k.parameter), v = v.filter((k) => k.type !== "nack" || k.parameter));
                  break;
                }
                case "video/vp8":
                case "video/vp9":
                case "video/h264":
                case "video/h265":
                case "video/av1": {
                  M !== void 0 && (o["x-google-start-bitrate"] = M), a !== void 0 && (o["x-google-max-bitrate"] = a), D !== void 0 && (o["x-google-min-bitrate"] = D);
                  break;
                }
              }
            }
            const p = {
              payload: t.payloadType,
              config: ""
            };
            for (const h of Object.keys(o))
              p.config && (p.config += ";"), p.config += `${h}=${o[h]}`;
            p.config && this._mediaObject.fmtp.push(p);
            for (const h of v)
              this._mediaObject.rtcpFb.push({
                payload: t.payloadType,
                type: h.type,
                subtype: h.parameter
              });
          }
          this._mediaObject.payloads = S.codecs.map((t) => t.payloadType).join(" "), this._mediaObject.ext = [];
          for (const t of S.headerExtensions)
            (l.ext ?? []).some((o) => o.uri === t.uri) && this._mediaObject.ext.push({
              uri: t.uri,
              value: t.id
            });
          if (l.extmapAllowMixed === "extmap-allow-mixed" && (this._mediaObject.extmapAllowMixed = "extmap-allow-mixed"), l.simulcast) {
            this._mediaObject.simulcast = {
              dir1: "recv",
              list1: l.simulcast.list1
            }, this._mediaObject.rids = [];
            for (const t of l.rids ?? [])
              t.direction === "send" && this._mediaObject.rids.push({
                id: t.id,
                direction: "recv"
              });
          } else if (l.simulcast_03) {
            this._mediaObject.simulcast_03 = {
              value: l.simulcast_03.value.replace(/send/g, "recv")
            }, this._mediaObject.rids = [];
            for (const t of l.rids ?? [])
              t.direction === "send" && this._mediaObject.rids.push({
                id: t.id,
                direction: "recv"
              });
          }
          this._mediaObject.rtcpMux = "rtcp-mux", this._mediaObject.rtcpRsize = "rtcp-rsize";
          break;
        }
        case "application": {
          typeof l.sctpPort == "number" ? (this._mediaObject.payloads = "webrtc-datachannel", this._mediaObject.sctpPort = r.port, this._mediaObject.maxMessageSize = r.maxMessageSize) : l.sctpmap && (this._mediaObject.payloads = String(r.port), this._mediaObject.sctpmap = {
            app: "webrtc-datachannel",
            sctpmapNumber: r.port,
            maxMessageSize: r.maxMessageSize
          });
          break;
        }
      }
    }
    setDtlsRole(m) {
      switch (m) {
        case "client": {
          this._mediaObject.setup = "active";
          break;
        }
        case "server": {
          this._mediaObject.setup = "passive";
          break;
        }
        case "auto": {
          this._mediaObject.setup = "actpass";
          break;
        }
      }
    }
    resume() {
      this._mediaObject.direction = "recvonly";
    }
    muxSimulcastStreams(m) {
      if (!this._mediaObject.simulcast?.list1)
        return;
      const g = {};
      for (const u of m)
        u.rid && (g[u.rid] = u);
      const x = this._mediaObject.simulcast.list1, r = f.parseSimulcastStreamList(x);
      for (const u of r)
        for (const l of u)
          l.paused = !g[l.scid]?.active;
      this._mediaObject.simulcast.list1 = r.map((u) => u.map((l) => `${l.paused ? "~" : ""}${l.scid}`).join(",")).join(";");
    }
  }
  H.AnswerMediaSection = n;
  class T extends w {
    constructor({ iceParameters: m, iceCandidates: g, dtlsParameters: x, sctpParameters: r, plainRtpParameters: u, mid: l, kind: E, offerRtpParameters: S, streamId: e, trackId: t }) {
      switch (super({ iceParameters: m, iceCandidates: g, dtlsParameters: x }), this._mediaObject.mid = String(l), this._mediaObject.type = E, u ? (this._mediaObject.connection = {
        ip: u.ip,
        version: u.ipVersion
      }, this._mediaObject.protocol = "RTP/AVP", this._mediaObject.port = u.port) : (this._mediaObject.connection = { ip: "127.0.0.1", version: 4 }, r ? this._mediaObject.protocol = "UDP/DTLS/SCTP" : this._mediaObject.protocol = "UDP/TLS/RTP/SAVPF", this._mediaObject.port = 7), this._mediaObject.extmapAllowMixed = "extmap-allow-mixed", E) {
        case "audio":
        case "video": {
          this._mediaObject.direction = "sendonly", this._mediaObject.rtp = [], this._mediaObject.rtcpFb = [], this._mediaObject.fmtp = [], this._mediaObject.msid = [{ id: e, appdata: t }];
          for (const p of S.codecs) {
            const h = {
              payload: p.payloadType,
              codec: C(p),
              rate: p.clockRate
            };
            p.channels > 1 && (h.encoding = p.channels), this._mediaObject.rtp.push(h);
            const d = {
              payload: p.payloadType,
              config: ""
            };
            for (const i of Object.keys(p.parameters ?? {}))
              d.config && (d.config += ";"), d.config += `${i}=${p.parameters[i]}`;
            d.config && this._mediaObject.fmtp.push(d);
            for (const i of p.rtcpFeedback)
              this._mediaObject.rtcpFb.push({
                payload: p.payloadType,
                type: i.type,
                subtype: i.parameter
              });
          }
          this._mediaObject.payloads = S.codecs.map((p) => p.payloadType).join(" "), this._mediaObject.ext = [];
          for (const p of S.headerExtensions)
            this._mediaObject.ext.push({
              uri: p.uri,
              value: p.id
            });
          this._mediaObject.rtcpMux = "rtcp-mux", this._mediaObject.rtcpRsize = "rtcp-rsize";
          const s = S.encodings[0], o = s.ssrc, v = s.rtx?.ssrc;
          this._mediaObject.ssrcs = [], this._mediaObject.ssrcGroups = [], o && S.rtcp.cname && this._mediaObject.ssrcs.push({
            id: o,
            attribute: "cname",
            value: S.rtcp.cname
          }), v && (S.rtcp.cname && this._mediaObject.ssrcs.push({
            id: v,
            attribute: "cname",
            value: S.rtcp.cname
          }), o && this._mediaObject.ssrcGroups.push({
            semantics: "FID",
            ssrcs: `${o} ${v}`
          }));
          break;
        }
        case "application": {
          this._mediaObject.payloads = "webrtc-datachannel", this._mediaObject.sctpPort = r.port, this._mediaObject.maxMessageSize = r.maxMessageSize;
          break;
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDtlsRole(m) {
      this._mediaObject.setup = "actpass";
    }
    resume() {
      this._mediaObject.direction = "sendonly";
    }
  }
  H.OfferMediaSection = T;
  function C(_) {
    const g = new RegExp("^(audio|video)/(.+)", "i").exec(_.mimeType);
    if (!g)
      throw new TypeError("invalid codec.mimeType");
    return g[2];
  }
  return H;
}
var Ct;
function Re() {
  if (Ct) return he;
  Ct = 1, Object.defineProperty(he, "__esModule", { value: !0 }), he.RemoteSdp = void 0;
  const f = G(), y = z(), w = dr(), n = Ht(), T = ["av1", "h264"], C = new y.Logger("RemoteSdp");
  let _ = class {
    // Remote ICE parameters.
    _iceParameters;
    // Remote ICE candidates.
    _iceCandidates;
    // Remote DTLS parameters.
    _dtlsParameters;
    // Remote SCTP parameters.
    _sctpParameters;
    // Parameters for plain RTP (no SRTP nor DTLS no BUNDLE).
    _plainRtpParameters;
    // MediaSection instances with same order as in the SDP.
    _mediaSections = [];
    // MediaSection indices indexed by MID.
    _midToIndex = /* @__PURE__ */ new Map();
    // First MID.
    _firstMid;
    // SDP object.
    _sdpObject;
    constructor({ iceParameters: g, iceCandidates: x, dtlsParameters: r, sctpParameters: u, plainRtpParameters: l }) {
      if (this._iceParameters = g, this._iceCandidates = x, this._dtlsParameters = r, this._sctpParameters = u, this._plainRtpParameters = l, this._sdpObject = {
        version: 0,
        origin: {
          address: "0.0.0.0",
          ipVer: 4,
          netType: "IN",
          sessionId: "10000",
          sessionVersion: 0,
          username: `mediasoup-client-v${n.version}`
        },
        name: "-",
        timing: { start: 0, stop: 0 },
        media: []
      }, this._sdpObject.iceOptions = "ice2", g?.iceLite && (this._sdpObject.icelite = "ice-lite"), r) {
        this._sdpObject.msidSemantic = { semantic: "WMS", token: "*" };
        const E = this._dtlsParameters.fingerprints.length;
        this._sdpObject.fingerprint = {
          type: r.fingerprints[E - 1].algorithm,
          hash: r.fingerprints[E - 1].value
        }, this._sdpObject.groups = [{ type: "BUNDLE", mids: "" }];
      }
      l && (this._sdpObject.origin.address = l.ip, this._sdpObject.origin.ipVer = l.ipVersion);
    }
    updateIceParameters(g) {
      C.debug("updateIceParameters() [iceParameters:%o]", g), this._iceParameters = g, this._sdpObject.icelite = g.iceLite ? "ice-lite" : void 0;
      for (const x of this._mediaSections)
        x.setIceParameters(g);
    }
    updateDtlsRole(g) {
      C.debug("updateDtlsRole() [role:%s]", g), this._dtlsParameters.role = g;
      for (const x of this._mediaSections)
        x.setDtlsRole(g);
    }
    /**
     * Set session level a=extmap-allow-mixed attibute.
     */
    setSessionExtmapAllowMixed() {
      C.debug("setSessionExtmapAllowMixed()"), this._sdpObject.extmapAllowMixed = "extmap-allow-mixed";
    }
    getNextMediaSectionIdx() {
      for (let g = 0; g < this._mediaSections.length; ++g) {
        const x = this._mediaSections[g];
        if (x.closed)
          return { idx: g, reuseMid: x.mid };
      }
      return { idx: this._mediaSections.length };
    }
    send({ offerMediaObject: g, reuseMid: x, offerRtpParameters: r, answerRtpParameters: u, codecOptions: l }) {
      const E = new w.AnswerMediaSection({
        iceParameters: this._iceParameters,
        iceCandidates: this._iceCandidates,
        dtlsParameters: this._dtlsParameters,
        plainRtpParameters: this._plainRtpParameters,
        offerMediaObject: g,
        offerRtpParameters: r,
        answerRtpParameters: u,
        codecOptions: l
      }), S = E.getObject();
      S.rtp.find((t) => T.includes(t.codec.toLowerCase())) || (S.ext = S.ext?.filter((t) => t.uri !== "https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension")), x ? this.replaceMediaSection(E, x) : this._midToIndex.has(E.mid) ? this.replaceMediaSection(E) : this.addMediaSection(E);
    }
    receive({ mid: g, kind: x, offerRtpParameters: r, streamId: u, trackId: l }) {
      this.setSessionExtmapAllowMixed();
      const E = new w.OfferMediaSection({
        iceParameters: this._iceParameters,
        iceCandidates: this._iceCandidates,
        dtlsParameters: this._dtlsParameters,
        plainRtpParameters: this._plainRtpParameters,
        mid: g,
        kind: x,
        offerRtpParameters: r,
        streamId: u,
        trackId: l
      }), S = this._mediaSections.find((e) => e.closed);
      S ? this.replaceMediaSection(E, S.mid) : this.addMediaSection(E);
    }
    pauseMediaSection(g) {
      this.findMediaSection(g).pause();
    }
    resumeSendingMediaSection(g) {
      this.findMediaSection(g).resume();
    }
    resumeReceivingMediaSection(g) {
      this.findMediaSection(g).resume();
    }
    disableMediaSection(g) {
      this.findMediaSection(g).disable();
    }
    /**
     * Closes media section. Returns true if the given MID corresponds to a m
     * section that has been indeed closed. False otherwise.
     *
     * NOTE: Closing the first m section is a pain since it invalidates the bundled
     * transport, so instead closing it we just disable it.
     */
    closeMediaSection(g) {
      const x = this.findMediaSection(g);
      return g === this._firstMid ? (C.debug("closeMediaSection() | cannot close first media section, disabling it instead [mid:%s]", g), this.disableMediaSection(g), !1) : (x.close(), this.regenerateBundleMids(), !0);
    }
    muxMediaSectionSimulcast(g, x) {
      const r = this.findMediaSection(g);
      r.muxSimulcastStreams(x), this.replaceMediaSection(r);
    }
    sendSctpAssociation({ offerMediaObject: g }) {
      const x = new w.AnswerMediaSection({
        iceParameters: this._iceParameters,
        iceCandidates: this._iceCandidates,
        dtlsParameters: this._dtlsParameters,
        sctpParameters: this._sctpParameters,
        plainRtpParameters: this._plainRtpParameters,
        offerMediaObject: g
      });
      this.addMediaSection(x);
    }
    receiveSctpAssociation() {
      const g = new w.OfferMediaSection({
        iceParameters: this._iceParameters,
        iceCandidates: this._iceCandidates,
        dtlsParameters: this._dtlsParameters,
        sctpParameters: this._sctpParameters,
        plainRtpParameters: this._plainRtpParameters,
        mid: "datachannel",
        kind: "application"
      });
      this.addMediaSection(g);
    }
    getSdp() {
      return this._sdpObject.origin.sessionVersion++, f.write(this._sdpObject);
    }
    addMediaSection(g) {
      this._firstMid || (this._firstMid = g.mid), this._mediaSections.push(g), this._midToIndex.set(g.mid, this._mediaSections.length - 1), this._sdpObject.media.push(g.getObject()), this.regenerateBundleMids();
    }
    replaceMediaSection(g, x) {
      if (typeof x == "string") {
        const r = this._midToIndex.get(x);
        if (r === void 0)
          throw new Error(`no media section found for reuseMid '${x}'`);
        const u = this._mediaSections[r];
        this._mediaSections[r] = g, this._midToIndex.delete(u.mid), this._midToIndex.set(g.mid, r), this._sdpObject.media[r] = g.getObject(), this.regenerateBundleMids();
      } else {
        const r = this._midToIndex.get(g.mid);
        if (r === void 0)
          throw new Error(`no media section found with mid '${g.mid}'`);
        this._mediaSections[r] = g, this._sdpObject.media[r] = g.getObject();
      }
    }
    findMediaSection(g) {
      const x = this._midToIndex.get(g);
      if (x === void 0)
        throw new Error(`no media section found with mid '${g}'`);
      return this._mediaSections[x];
    }
    regenerateBundleMids() {
      this._dtlsParameters && (this._sdpObject.groups[0].mids = this._mediaSections.filter((g) => !g.closed).map((g) => g.mid).join(" "));
    }
  };
  return he.RemoteSdp = _, he;
}
var Q = {}, Rt;
function Ee() {
  if (Rt) return Q;
  Rt = 1, Object.defineProperty(Q, "__esModule", { value: !0 }), Q.extractRtpCapabilities = y, Q.extractDtlsParameters = w, Q.getCname = n, Q.applyCodecParameters = T, Q.addHeaderExtension = C;
  const f = G();
  function y({ sdpObject: _ }) {
    const m = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map();
    for (const r of _.media) {
      const u = r.type;
      switch (u) {
        case "audio":
        case "video":
          break;
        default:
          continue;
      }
      for (const l of r.rtp) {
        const E = {
          kind: u,
          mimeType: `${u}/${l.codec}`,
          preferredPayloadType: l.payload,
          clockRate: l.rate,
          channels: l.encoding,
          parameters: {},
          rtcpFeedback: []
        };
        m.set(E.preferredPayloadType, E);
      }
      for (const l of r.fmtp ?? []) {
        const E = f.parseParams(l.config), S = m.get(l.payload);
        S && (E?.hasOwnProperty("profile-level-id") && (E["profile-level-id"] = String(E["profile-level-id"])), S.parameters = E);
      }
      for (const l of r.rtcpFb ?? []) {
        const E = {
          type: l.type,
          parameter: l.subtype
        };
        if (E.parameter || delete E.parameter, l.payload !== "*") {
          const S = m.get(Number(l.payload));
          if (!S)
            continue;
          S.rtcpFeedback.push(E);
        } else
          for (const S of m.values())
            S.kind === u && !/.+\/rtx$/i.test(S.mimeType) && S.rtcpFeedback.push(E);
      }
      for (const l of r.ext ?? []) {
        if (l["encrypt-uri"])
          continue;
        const E = {
          kind: u,
          uri: l.uri,
          preferredId: l.value
        };
        g.set(E.preferredId, E);
      }
    }
    return {
      codecs: Array.from(m.values()),
      headerExtensions: Array.from(g.values())
    };
  }
  function w({ sdpObject: _ }) {
    let m = _.setup, g = _.fingerprint;
    if (!m || !g) {
      const u = (_.media ?? []).find((l) => l.port !== 0);
      u && (m = m ?? u.setup, g = g ?? u.fingerprint);
    }
    if (m) {
      if (!g)
        throw new Error("no a=fingerprint found at SDP session or media level");
    } else throw new Error("no a=setup found at SDP session or media level");
    let x;
    switch (m) {
      case "active": {
        x = "client";
        break;
      }
      case "passive": {
        x = "server";
        break;
      }
      case "actpass": {
        x = "auto";
        break;
      }
    }
    return {
      role: x,
      fingerprints: [
        {
          algorithm: g.type,
          value: g.hash
        }
      ]
    };
  }
  function n({ offerMediaObject: _ }) {
    const m = (_.ssrcs ?? []).find((g) => g.attribute === "cname");
    return m ? m.value : "";
  }
  function T({ offerRtpParameters: _, answerMediaObject: m }) {
    for (const g of _.codecs) {
      const x = g.mimeType.toLowerCase();
      if (x !== "audio/opus" || !(m.rtp ?? []).find((E) => E.payload === g.payloadType))
        continue;
      m.fmtp = m.fmtp ?? [];
      let u = m.fmtp.find((E) => E.payload === g.payloadType);
      u || (u = { payload: g.payloadType, config: "" }, m.fmtp.push(u));
      const l = f.parseParams(u.config);
      if (x === "audio/opus") {
        const E = g.parameters?.["sprop-stereo"];
        E !== void 0 && (l.stereo = Number(E) ? 1 : 0);
      }
      u.config = "";
      for (const E of Object.keys(l))
        u.config && (u.config += ";"), u.config += `${E}=${l[E]}`;
    }
  }
  function C({ offerMediaObject: _, headerExtensionUri: m, headerExtensionId: g }) {
    _.ext || (_.ext = []), _.ext.push({
      uri: m,
      value: g
    });
  }
  return Q;
}
var fe = {}, Et;
function Te() {
  if (Et) return fe;
  Et = 1, Object.defineProperty(fe, "__esModule", { value: !0 }), fe.getRtpEncodings = f, fe.addLegacySimulcast = y;
  function f({ offerMediaObject: w, codecs: n }) {
    const T = /* @__PURE__ */ new Set();
    for (const m of w.ssrcs ?? []) {
      const g = m.id;
      g && T.add(g);
    }
    if (T.size === 0)
      throw new Error("no a=ssrc lines found");
    const C = /* @__PURE__ */ new Map();
    for (const m of w.ssrcGroups ?? []) {
      if (m.semantics !== "FID")
        continue;
      const g = m.ssrcs.split(/\s+/), x = Number(g[0]), r = Number(g[1]);
      T.has(x) && (T.delete(x), T.delete(r), C.set(x, r));
    }
    for (const m of T)
      C.set(m, void 0);
    const _ = [];
    for (const [m, g] of C) {
      const x = { ssrc: m };
      g && n.length > 1 && (x.rtx = { ssrc: g }), _.push(x);
    }
    return _;
  }
  function y({ offerMediaObject: w, numStreams: n }) {
    if (n <= 1)
      throw new TypeError("numStreams must be greater than 1");
    const T = (w.ssrcs ?? []).find((E) => E.attribute === "msid");
    if (!T)
      throw new Error("a=ssrc line with msid information not found");
    const [C, _] = T.value.split(" "), m = Number(T.id);
    let g;
    (w.ssrcGroups ?? []).some((E) => {
      if (E.semantics !== "FID")
        return !1;
      const S = E.ssrcs.split(/\s+/);
      return Number(S[0]) === m ? (g = Number(S[1]), !0) : !1;
    });
    const x = (w.ssrcs ?? []).find((E) => E.attribute === "cname");
    if (!x)
      throw new Error("a=ssrc line with cname information not found");
    const r = x.value, u = [], l = [];
    for (let E = 0; E < n; ++E)
      u.push(m + E), g && l.push(g + E);
    w.ssrcGroups = [], w.ssrcs = [], w.ssrcGroups.push({
      semantics: "SIM",
      ssrcs: u.join(" ")
    });
    for (const E of u)
      w.ssrcs.push({
        id: E,
        attribute: "cname",
        value: r
      }), w.ssrcs.push({
        id: E,
        attribute: "msid",
        value: `${C} ${_}`
      });
    for (let E = 0; E < l.length; ++E) {
      const S = u[E], e = l[E];
      w.ssrcs.push({
        id: e,
        attribute: "cname",
        value: r
      }), w.ssrcs.push({
        id: e,
        attribute: "msid",
        value: `${C} ${_}`
      }), w.ssrcGroups.push({
        semantics: "FID",
        ssrcs: `${S} ${e}`
      });
    }
  }
  return fe;
}
var X = {}, Tt;
function xe() {
  if (Tt) return X;
  Tt = 1, Object.defineProperty(X, "__esModule", { value: !0 }), X.addNackSupportForOpus = f, X.addHeaderExtensionSupport = y, X.getMsidStreamIdAndTrackId = w;
  function f(n) {
    for (const T of n.codecs ?? [])
      (T.mimeType.toLowerCase() === "audio/opus" || T.mimeType.toLowerCase() === "audio/multiopus") && !T.rtcpFeedback?.some((C) => C.type === "nack" && !C.parameter) && (T.rtcpFeedback || (T.rtcpFeedback = []), T.rtcpFeedback.push({ type: "nack" }));
  }
  function y(n, T) {
    let C;
    const _ = n.headerExtensions?.find((g) => g.uri === T.uri);
    if (_) {
      if (_.kind === T.kind)
        return;
      C = _.preferredId;
    }
    if (n.headerExtensions || (n.headerExtensions = []), C === void 0) {
      C = 1;
      const g = new Set(n.headerExtensions.map((x) => x.preferredId));
      for (; g.has(C); )
        ++C;
    }
    const m = {
      kind: T.kind,
      uri: T.uri,
      preferredId: C,
      preferredEncrypt: !1,
      direction: T.direction
    };
    n.headerExtensions.push(m);
  }
  function w(n) {
    if (!n || typeof n != "string")
      return { msidStreamId: void 0, msidTrackId: void 0 };
    const [T, C] = n.trim().split(/\s+/);
    return T ? { msidStreamId: T, msidTrackId: C } : { msidStreamId: void 0, msidTrackId: void 0 };
  }
  return X;
}
var xt;
function pr() {
  if (xt) return ue;
  xt = 1, Object.defineProperty(ue, "__esModule", { value: !0 }), ue.Chrome111 = void 0;
  const f = G(), y = $(), w = z(), n = V(), T = U(), C = te(), _ = Re(), m = Ee(), g = Te(), x = xe(), r = new w.Logger("Chrome111"), u = "Chrome111", l = { OS: 1024, MIS: 1024 };
  let E = class Ie extends y.EnhancedEventEmitter {
    // Closed flag.
    _closed = !1;
    // Handler direction.
    _direction;
    // Remote SDP handler.
    _remoteSdp;
    // Callback to request sending extended RTP capabilities on demand.
    _getSendExtendedRtpCapabilities;
    // Initial server side DTLS role. If not 'auto', it will force the opposite
    // value in client side.
    _forcedLocalDtlsRole;
    // RTCPeerConnection instance.
    _pc;
    // Map of RTCTransceivers indexed by MID.
    _mapMidTransceiver = /* @__PURE__ */ new Map();
    // Default local stream for sending if no `streamId` is given in send().
    _sendStream = new MediaStream();
    // Whether a DataChannel m=application section has been created.
    _hasDataChannelMediaSection = !1;
    // Sending DataChannel id value counter. Incremented for each new DataChannel.
    _nextSendSctpStreamId = 0;
    // Got transport local and remote parameters.
    _transportReady = !1;
    /**
     * Creates a factory function.
     */
    static createFactory() {
      return {
        name: u,
        factory: (e) => new Ie(e),
        getNativeRtpCapabilities: async () => {
          r.debug("getNativeRtpCapabilities()");
          let e = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require"
          });
          try {
            e.addTransceiver("audio"), e.addTransceiver("video", {
              sendEncodings: [{ scalabilityMode: "L3T3" }]
            });
            const t = await e.createOffer();
            try {
              e.close();
            } catch {
            }
            e = void 0;
            const s = f.parse(t.sdp);
            return Ie.getLocalRtpCapabilities(s);
          } catch (t) {
            try {
              e?.close();
            } catch {
            }
            throw e = void 0, t;
          }
        },
        getNativeSctpCapabilities: async () => (r.debug("getNativeSctpCapabilities()"), {
          numStreams: l
        })
      };
    }
    static getLocalRtpCapabilities(e, t = []) {
      const s = m.extractRtpCapabilities({
        sdpObject: e
      });
      n.validateAndNormalizeRtpCapabilities(s), x.addNackSupportForOpus(s);
      for (const o of t)
        x.addHeaderExtensionSupport(s, o);
      return s;
    }
    constructor({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: o, sctpParameters: v, iceServers: p, iceTransportPolicy: h, additionalSettings: d, getSendExtendedRtpCapabilities: i }) {
      super(), r.debug("constructor()"), this._direction = e, this._remoteSdp = new _.RemoteSdp({
        iceParameters: t,
        iceCandidates: s,
        dtlsParameters: o,
        sctpParameters: v
      }), this._getSendExtendedRtpCapabilities = i, o.role && o.role !== "auto" && (this._forcedLocalDtlsRole = o.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
        iceServers: p ?? [],
        iceTransportPolicy: h ?? "all",
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require",
        ...d
      }), this._pc.addEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.addEventListener("icecandidateerror", this.onIceCandidateError), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", this.onConnectionStateChange) : (r.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.addEventListener("iceconnectionstatechange", this.onIceConnectionStateChange));
    }
    get name() {
      return u;
    }
    close() {
      if (r.debug("close()"), !this._closed) {
        this._closed = !0;
        try {
          this._pc.close();
        } catch {
        }
        this._pc.removeEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.removeEventListener("icecandidateerror", this.onIceCandidateError), this._pc.removeEventListener("connectionstatechange", this.onConnectionStateChange), this._pc.removeEventListener("iceconnectionstatechange", this.onIceConnectionStateChange), this.emit("@close"), super.close();
      }
    }
    async updateIceServers(e) {
      this.assertNotClosed(), r.debug("updateIceServers()");
      const t = this._pc.getConfiguration();
      t.iceServers = e, this._pc.setConfiguration(t);
    }
    async restartIce(e) {
      if (this.assertNotClosed(), r.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
        if (this._direction === "send") {
          const t = await this._pc.createOffer({ iceRestart: !0 });
          r.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
          const s = {
            type: "answer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
        } else {
          const t = {
            type: "offer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
          const s = await this._pc.createAnswer();
          r.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
        }
    }
    async getTransportStats() {
      return this.assertNotClosed(), this._pc.getStats();
    }
    async send({ track: e, streamId: t, encodings: s, codecOptions: o, headerExtensionOptions: v, codec: p, onRtpSender: h }) {
      if (this.assertNotClosed(), this.assertSendDirection(), r.debug("send() [kind:%s, track.id:%s, streamId:%s]", e.kind, e.id, t), s && s.length > 1) {
        let O = 1;
        for (const F of s) {
          const N = F.scalabilityMode ? (0, C.parse)(F.scalabilityMode).temporalLayers : 3;
          N > O && (O = N);
        }
        s.forEach((F, N) => {
          F.rid = `r${N}`, F.scalabilityMode = `L1T${O}`;
        });
      }
      const d = this._remoteSdp.getNextMediaSectionIdx(), i = this._pc.addTransceiver(e, {
        direction: "sendonly",
        streams: [this._sendStream],
        sendEncodings: s
      });
      h && h(i.sender);
      let c = await this._pc.createOffer(), b = f.parse(c.sdp);
      b.extmapAllowMixed && this._remoteSdp.setSessionExtmapAllowMixed();
      const R = [];
      R.push({
        uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time",
        kind: e.kind,
        direction: "sendonly"
      });
      const I = Ie.getLocalRtpCapabilities(b, R), M = this._getSendExtendedRtpCapabilities(I), a = n.getSendingRtpParameters(e.kind, M);
      a.codecs = n.reduceCodecs(a.codecs, p);
      const D = n.getSendingRemoteRtpParameters(e.kind, M);
      if (D.codecs = n.reduceCodecs(D.codecs, p), this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: b
      }), v?.absCaptureTime) {
        const O = b.media[d.idx];
        m.addHeaderExtension({
          offerMediaObject: O,
          headerExtensionUri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time",
          headerExtensionId: D.headerExtensions.find((F) => F.uri === "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time").id
        }), c = {
          type: "offer",
          sdp: f.write(b)
        };
      }
      r.debug("send() | calling pc.setLocalDescription() [offer:%o]", c), await this._pc.setLocalDescription(c);
      const P = i.mid;
      a.mid = P, b = f.parse(this._pc.localDescription.sdp);
      const k = b.media[d.idx];
      if (a.rtcp.cname = m.getCname({
        offerMediaObject: k
      }), a.msid = `${t ?? this._sendStream.id} ${e.id}`, !s)
        a.encodings = g.getRtpEncodings({
          offerMediaObject: k,
          codecs: a.codecs
        });
      else if (s.length === 1) {
        const O = g.getRtpEncodings({
          offerMediaObject: k,
          codecs: a.codecs
        });
        Object.assign(O[0], s[0]), a.encodings = O;
      } else
        a.encodings = s;
      this._remoteSdp.send({
        offerMediaObject: k,
        reuseMid: d.reuseMid,
        offerRtpParameters: a,
        answerRtpParameters: D,
        codecOptions: o
      });
      const L = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      return r.debug("send() | calling pc.setRemoteDescription() [answer:%o]", L), await this._pc.setRemoteDescription(L), this._mapMidTransceiver.set(P, i), {
        localId: P,
        rtpParameters: a,
        rtpSender: i.sender
      };
    }
    async stopSending(e) {
      if (this.assertSendDirection(), r.debug("stopSending() [localId:%s]", e), this._closed)
        return;
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
        try {
          t.stop();
        } catch {
        }
      const o = await this._pc.createOffer();
      r.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", o), await this._pc.setLocalDescription(o);
      const v = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", v), await this._pc.setRemoteDescription(v), this._mapMidTransceiver.delete(e);
    }
    async pauseSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("pauseSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
      const s = await this._pc.createOffer();
      r.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async resumeSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("resumeSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (this._remoteSdp.resumeSendingMediaSection(e), !t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "sendonly";
      const s = await this._pc.createOffer();
      r.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async replaceTrack(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), t ? r.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : r.debug("replaceTrack() [localId:%s, no track]", e);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      await s.sender.replaceTrack(t);
    }
    async setMaxSpatialLayer(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        d <= t ? h.active = !0 : h.active = !1;
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async setRtpEncodingParameters(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        o.encodings[d] = { ...h, ...t };
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async getSenderStats(e) {
      this.assertNotClosed(), this.assertSendDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.sender.getStats();
    }
    async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: o, protocol: v }) {
      this.assertNotClosed(), this.assertSendDirection();
      const p = {
        negotiated: !0,
        id: this._nextSendSctpStreamId,
        ordered: e,
        maxPacketLifeTime: t,
        maxRetransmits: s,
        protocol: v
      };
      r.debug("sendDataChannel() [options:%o]", p);
      const h = this._pc.createDataChannel(o, p);
      if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % l.MIS, !this._hasDataChannelMediaSection) {
        const i = await this._pc.createOffer(), c = f.parse(i.sdp), b = c.media.find((I) => I.type === "application");
        this._transportReady || await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: c
        }), r.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", i), await this._pc.setLocalDescription(i), this._remoteSdp.sendSctpAssociation({ offerMediaObject: b });
        const R = {
          type: "answer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", R), await this._pc.setRemoteDescription(R), this._hasDataChannelMediaSection = !0;
      }
      const d = {
        streamId: p.id,
        ordered: p.ordered,
        maxPacketLifeTime: p.maxPacketLifeTime,
        maxRetransmits: p.maxRetransmits
      };
      return { dataChannel: h, sctpStreamParameters: d };
    }
    async receive(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = [], s = /* @__PURE__ */ new Map();
      for (const h of e) {
        const { trackId: d, kind: i, rtpParameters: c, streamId: b } = h;
        r.debug("receive() [trackId:%s, kind:%s]", d, i);
        const R = c.mid ?? String(this._mapMidTransceiver.size);
        s.set(d, R);
        const { msidStreamId: I } = x.getMsidStreamIdAndTrackId(c.msid);
        this._remoteSdp.receive({
          mid: R,
          kind: i,
          offerRtpParameters: c,
          streamId: b ?? I ?? c.rtcp?.cname ?? "-",
          trackId: d
        });
      }
      const o = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", o), await this._pc.setRemoteDescription(o);
      for (const h of e) {
        const { trackId: d, onRtpReceiver: i } = h;
        if (i) {
          const c = s.get(d), b = this._pc.getTransceivers().find((R) => R.mid === c);
          if (!b)
            throw new Error("transceiver not found");
          i(b.receiver);
        }
      }
      let v = await this._pc.createAnswer();
      const p = f.parse(v.sdp);
      for (const h of e) {
        const { trackId: d, rtpParameters: i } = h, c = s.get(d), b = p.media.find((R) => String(R.mid) === c);
        m.applyCodecParameters({
          offerRtpParameters: i,
          answerMediaObject: b
        });
      }
      v = {
        type: "answer",
        sdp: f.write(p)
      }, this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: p
      }), r.debug("receive() | calling pc.setLocalDescription() [answer:%o]", v), await this._pc.setLocalDescription(v);
      for (const h of e) {
        const { trackId: d } = h, i = s.get(d), c = this._pc.getTransceivers().find((b) => b.mid === i);
        if (c)
          this._mapMidTransceiver.set(i, c), t.push({
            localId: i,
            track: c.receiver.track,
            rtpReceiver: c.receiver
          });
        else
          throw new Error("new RTCRtpTransceiver not found");
      }
      return t;
    }
    async stopReceiving(e) {
      if (this.assertRecvDirection(), this._closed)
        return;
      for (const o of e) {
        r.debug("stopReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        this._remoteSdp.closeMediaSection(v.mid);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      for (const o of e)
        this._mapMidTransceiver.delete(o);
    }
    async pauseReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("pauseReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "inactive", this._remoteSdp.pauseMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async resumeReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("resumeReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async getReceiverStats(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.receiver.getStats();
    }
    async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
      this.assertNotClosed(), this.assertRecvDirection();
      const { streamId: o, ordered: v, maxPacketLifeTime: p, maxRetransmits: h } = e, d = {
        negotiated: !0,
        id: o,
        ordered: v,
        maxPacketLifeTime: p,
        maxRetransmits: h,
        protocol: s
      };
      r.debug("receiveDataChannel() [options:%o]", d);
      const i = this._pc.createDataChannel(t, d);
      if (!this._hasDataChannelMediaSection) {
        this._remoteSdp.receiveSctpAssociation();
        const c = {
          type: "offer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
        const b = await this._pc.createAnswer();
        if (!this._transportReady) {
          const R = f.parse(b.sdp);
          await this.setupTransport({
            localDtlsRole: this._forcedLocalDtlsRole ?? "client",
            localSdpObject: R
          });
        }
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", b), await this._pc.setLocalDescription(b), this._hasDataChannelMediaSection = !0;
      }
      return { dataChannel: i };
    }
    async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
      t || (t = f.parse(this._pc.localDescription.sdp));
      const s = m.extractDtlsParameters({
        sdpObject: t
      });
      s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((o, v) => {
        this.safeEmit("@connect", { dtlsParameters: s }, o, v);
      }), this._transportReady = !0;
    }
    onIceGatheringStateChange = () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    };
    onIceCandidateError = (e) => {
      this.emit("@icecandidateerror", e);
    };
    onConnectionStateChange = () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    };
    onIceConnectionStateChange = () => {
      switch (this._pc.iceConnectionState) {
        case "checking": {
          this.emit("@connectionstatechange", "connecting");
          break;
        }
        case "connected":
        case "completed": {
          this.emit("@connectionstatechange", "connected");
          break;
        }
        case "failed": {
          this.emit("@connectionstatechange", "failed");
          break;
        }
        case "disconnected": {
          this.emit("@connectionstatechange", "disconnected");
          break;
        }
        case "closed": {
          this.emit("@connectionstatechange", "closed");
          break;
        }
      }
    };
    assertNotClosed() {
      if (this._closed)
        throw new T.InvalidStateError("method called in a closed handler");
    }
    assertSendDirection() {
      if (this._direction !== "send")
        throw new Error('method can just be called for handlers with "send" direction');
    }
    assertRecvDirection() {
      if (this._direction !== "recv")
        throw new Error('method can just be called for handlers with "recv" direction');
    }
  };
  return ue.Chrome111 = E, ue;
}
var me = {}, kt;
function lr() {
  if (kt) return me;
  kt = 1, Object.defineProperty(me, "__esModule", { value: !0 }), me.Chrome74 = void 0;
  const f = G(), y = z(), w = $(), n = V(), T = U(), C = te(), _ = Re(), m = Ee(), g = Te(), x = xe(), r = new y.Logger("Chrome74"), u = "Chrome74", l = { OS: 1024, MIS: 1024 };
  let E = class Me extends w.EnhancedEventEmitter {
    // Closed flag.
    _closed = !1;
    // Handler direction.
    _direction;
    // Remote SDP handler.
    _remoteSdp;
    // Callback to request sending extended RTP capabilities on demand.
    _getSendExtendedRtpCapabilities;
    // Initial server side DTLS role. If not 'auto', it will force the opposite
    // value in client side.
    _forcedLocalDtlsRole;
    // RTCPeerConnection instance.
    _pc;
    // Map of RTCTransceivers indexed by MID.
    _mapMidTransceiver = /* @__PURE__ */ new Map();
    // Default local stream for sending if no `streamId` is given in send().
    _sendStream = new MediaStream();
    // Whether a DataChannel m=application section has been created.
    _hasDataChannelMediaSection = !1;
    // Sending DataChannel id value counter. Incremented for each new DataChannel.
    _nextSendSctpStreamId = 0;
    // Got transport local and remote parameters.
    _transportReady = !1;
    /**
     * Creates a factory function.
     */
    static createFactory() {
      return {
        name: u,
        factory: (e) => new Me(e),
        getNativeRtpCapabilities: async () => {
          r.debug("getNativeRtpCapabilities()");
          let e = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require"
          });
          try {
            e.addTransceiver("audio"), e.addTransceiver("video");
            const t = await e.createOffer();
            try {
              e.close();
            } catch {
            }
            e = void 0;
            const s = f.parse(t.sdp);
            return Me.getLocalRtpCapabilities(s);
          } catch (t) {
            try {
              e?.close();
            } catch {
            }
            throw e = void 0, t;
          }
        },
        getNativeSctpCapabilities: async () => (r.debug("getNativeSctpCapabilities()"), {
          numStreams: l
        })
      };
    }
    static getLocalRtpCapabilities(e, t = []) {
      const s = m.extractRtpCapabilities({
        sdpObject: e
      });
      n.validateAndNormalizeRtpCapabilities(s), x.addNackSupportForOpus(s);
      for (const o of t)
        x.addHeaderExtensionSupport(s, o);
      return s;
    }
    constructor({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: o, sctpParameters: v, iceServers: p, iceTransportPolicy: h, additionalSettings: d, getSendExtendedRtpCapabilities: i }) {
      super(), r.debug("constructor()"), this._direction = e, this._remoteSdp = new _.RemoteSdp({
        iceParameters: t,
        iceCandidates: s,
        dtlsParameters: o,
        sctpParameters: v
      }), this._getSendExtendedRtpCapabilities = i, o.role && o.role !== "auto" && (this._forcedLocalDtlsRole = o.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
        iceServers: p ?? [],
        iceTransportPolicy: h ?? "all",
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require",
        ...d
      }), this._pc.addEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.addEventListener("icecandidateerror", this.onIceCandidateError), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", this.onConnectionStateChange) : (r.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.addEventListener("iceconnectionstatechange", this.onIceConnectionStateChange));
    }
    get name() {
      return u;
    }
    close() {
      if (r.debug("close()"), !this._closed) {
        this._closed = !0;
        try {
          this._pc.close();
        } catch {
        }
        this._pc.removeEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.removeEventListener("icecandidateerror", this.onIceCandidateError), this._pc.removeEventListener("connectionstatechange", this.onConnectionStateChange), this._pc.removeEventListener("iceconnectionstatechange", this.onIceConnectionStateChange), this.emit("@close"), super.close();
      }
    }
    async updateIceServers(e) {
      this.assertNotClosed(), r.debug("updateIceServers()");
      const t = this._pc.getConfiguration();
      t.iceServers = e, this._pc.setConfiguration(t);
    }
    async restartIce(e) {
      if (this.assertNotClosed(), r.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
        if (this._direction === "send") {
          const t = await this._pc.createOffer({ iceRestart: !0 });
          r.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
          const s = {
            type: "answer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
        } else {
          const t = {
            type: "offer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
          const s = await this._pc.createAnswer();
          r.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
        }
    }
    async getTransportStats() {
      return this.assertNotClosed(), this._pc.getStats();
    }
    async send({ track: e, streamId: t, encodings: s, codecOptions: o, headerExtensionOptions: v, codec: p }) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("send() [kind:%s, track.id:%s, streamId:%s]", e.kind, e.id, t), s && s.length > 1 && s.forEach((F, N) => {
        F.rid = `r${N}`;
      });
      const h = this._remoteSdp.getNextMediaSectionIdx(), d = this._pc.addTransceiver(e, {
        direction: "sendonly",
        streams: [this._sendStream],
        sendEncodings: s
      });
      let i = await this._pc.createOffer(), c = f.parse(i.sdp);
      c.extmapAllowMixed && this._remoteSdp.setSessionExtmapAllowMixed();
      const b = [];
      b.push({
        uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time",
        kind: e.kind,
        direction: "sendonly"
      });
      const R = Me.getLocalRtpCapabilities(c, b), I = this._getSendExtendedRtpCapabilities(R), M = n.getSendingRtpParameters(e.kind, I);
      M.codecs = n.reduceCodecs(M.codecs, p);
      const a = n.getSendingRemoteRtpParameters(e.kind, I);
      a.codecs = n.reduceCodecs(a.codecs, p), this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      });
      let D = !1;
      const P = (0, C.parse)((s ?? [{}])[0].scalabilityMode);
      let k;
      s?.length === 1 && P.spatialLayers > 1 && M.codecs[0].mimeType.toLowerCase() === "video/vp9" && (r.debug("send() | enabling legacy simulcast for VP9 SVC"), D = !0, c = f.parse(i.sdp), k = c.media[h.idx], g.addLegacySimulcast({
        offerMediaObject: k,
        numStreams: P.spatialLayers
      }), i = {
        type: "offer",
        sdp: f.write(c)
      }), r.debug("send() | calling pc.setLocalDescription() [offer:%o]", i), v?.absCaptureTime && (k = c.media[h.idx], m.addHeaderExtension({
        offerMediaObject: k,
        headerExtensionUri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time",
        headerExtensionId: a.headerExtensions.find((F) => F.uri === "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time").id
      }), i = {
        type: "offer",
        sdp: f.write(c)
      }), await this._pc.setLocalDescription(i);
      const L = d.mid;
      if (M.mid = L, c = f.parse(this._pc.localDescription.sdp), k = c.media[h.idx], M.rtcp.cname = m.getCname({
        offerMediaObject: k
      }), M.msid = `${t ?? this._sendStream.id} ${e.id}`, !s)
        M.encodings = g.getRtpEncodings({
          offerMediaObject: k,
          codecs: M.codecs
        });
      else if (s.length === 1) {
        let F = g.getRtpEncodings({
          offerMediaObject: k,
          codecs: M.codecs
        });
        Object.assign(F[0], s[0]), D && (F = [F[0]]), M.encodings = F;
      } else
        M.encodings = s;
      if (M.encodings.length > 1 && (M.codecs[0].mimeType.toLowerCase() === "video/vp8" || M.codecs[0].mimeType.toLowerCase() === "video/h264"))
        for (const F of M.encodings)
          F.scalabilityMode ? F.scalabilityMode = `L1T${P.temporalLayers}` : F.scalabilityMode = "L1T3";
      this._remoteSdp.send({
        offerMediaObject: k,
        reuseMid: h.reuseMid,
        offerRtpParameters: M,
        answerRtpParameters: a,
        codecOptions: o
      });
      const O = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      return r.debug("send() | calling pc.setRemoteDescription() [answer:%o]", O), await this._pc.setRemoteDescription(O), this._mapMidTransceiver.set(L, d), {
        localId: L,
        rtpParameters: M,
        rtpSender: d.sender
      };
    }
    async stopSending(e) {
      if (this.assertSendDirection(), r.debug("stopSending() [localId:%s]", e), this._closed)
        return;
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
        try {
          t.stop();
        } catch {
        }
      const o = await this._pc.createOffer();
      r.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", o), await this._pc.setLocalDescription(o);
      const v = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", v), await this._pc.setRemoteDescription(v), this._mapMidTransceiver.delete(e);
    }
    async pauseSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("pauseSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
      const s = await this._pc.createOffer();
      r.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async resumeSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("resumeSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (this._remoteSdp.resumeSendingMediaSection(e), !t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "sendonly";
      const s = await this._pc.createOffer();
      r.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async replaceTrack(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), t ? r.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : r.debug("replaceTrack() [localId:%s, no track]", e);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      await s.sender.replaceTrack(t);
    }
    async setMaxSpatialLayer(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        d <= t ? h.active = !0 : h.active = !1;
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async setRtpEncodingParameters(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        o.encodings[d] = { ...h, ...t };
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async getSenderStats(e) {
      this.assertNotClosed(), this.assertSendDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.sender.getStats();
    }
    async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: o, protocol: v }) {
      this.assertNotClosed(), this.assertSendDirection();
      const p = {
        negotiated: !0,
        id: this._nextSendSctpStreamId,
        ordered: e,
        maxPacketLifeTime: t,
        maxRetransmits: s,
        protocol: v
      };
      r.debug("sendDataChannel() [options:%o]", p);
      const h = this._pc.createDataChannel(o, p);
      if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % l.MIS, !this._hasDataChannelMediaSection) {
        const i = await this._pc.createOffer(), c = f.parse(i.sdp), b = c.media.find((I) => I.type === "application");
        this._transportReady || await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: c
        }), r.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", i), await this._pc.setLocalDescription(i), this._remoteSdp.sendSctpAssociation({ offerMediaObject: b });
        const R = {
          type: "answer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", R), await this._pc.setRemoteDescription(R), this._hasDataChannelMediaSection = !0;
      }
      const d = {
        streamId: p.id,
        ordered: p.ordered,
        maxPacketLifeTime: p.maxPacketLifeTime,
        maxRetransmits: p.maxRetransmits
      };
      return { dataChannel: h, sctpStreamParameters: d };
    }
    async receive(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = [], s = /* @__PURE__ */ new Map();
      for (const h of e) {
        const { trackId: d, kind: i, rtpParameters: c, streamId: b } = h;
        r.debug("receive() [trackId:%s, kind:%s]", d, i);
        const R = c.mid ?? String(this._mapMidTransceiver.size);
        s.set(d, R);
        const { msidStreamId: I } = x.getMsidStreamIdAndTrackId(c.msid);
        this._remoteSdp.receive({
          mid: R,
          kind: i,
          offerRtpParameters: c,
          streamId: b ?? I ?? c.rtcp?.cname ?? "-",
          trackId: d
        });
      }
      const o = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", o), await this._pc.setRemoteDescription(o);
      let v = await this._pc.createAnswer();
      const p = f.parse(v.sdp);
      for (const h of e) {
        const { trackId: d, rtpParameters: i } = h, c = s.get(d), b = p.media.find((R) => String(R.mid) === c);
        m.applyCodecParameters({
          offerRtpParameters: i,
          answerMediaObject: b
        });
      }
      v = {
        type: "answer",
        sdp: f.write(p)
      }, this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: p
      }), r.debug("receive() | calling pc.setLocalDescription() [answer:%o]", v), await this._pc.setLocalDescription(v);
      for (const h of e) {
        const { trackId: d } = h, i = s.get(d), c = this._pc.getTransceivers().find((b) => b.mid === i);
        if (c)
          this._mapMidTransceiver.set(i, c), t.push({
            localId: i,
            track: c.receiver.track,
            rtpReceiver: c.receiver
          });
        else
          throw new Error("new RTCRtpTransceiver not found");
      }
      return t;
    }
    async stopReceiving(e) {
      if (this.assertRecvDirection(), this._closed)
        return;
      for (const o of e) {
        r.debug("stopReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        this._remoteSdp.closeMediaSection(v.mid);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      for (const o of e)
        this._mapMidTransceiver.delete(o);
    }
    async pauseReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("pauseReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "inactive", this._remoteSdp.pauseMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async resumeReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("resumeReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async getReceiverStats(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.receiver.getStats();
    }
    async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
      this.assertNotClosed(), this.assertRecvDirection();
      const { streamId: o, ordered: v, maxPacketLifeTime: p, maxRetransmits: h } = e, d = {
        negotiated: !0,
        id: o,
        ordered: v,
        maxPacketLifeTime: p,
        maxRetransmits: h,
        protocol: s
      };
      r.debug("receiveDataChannel() [options:%o]", d);
      const i = this._pc.createDataChannel(t, d);
      if (!this._hasDataChannelMediaSection) {
        this._remoteSdp.receiveSctpAssociation();
        const c = {
          type: "offer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
        const b = await this._pc.createAnswer();
        if (!this._transportReady) {
          const R = f.parse(b.sdp);
          await this.setupTransport({
            localDtlsRole: this._forcedLocalDtlsRole ?? "client",
            localSdpObject: R
          });
        }
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", b), await this._pc.setLocalDescription(b), this._hasDataChannelMediaSection = !0;
      }
      return { dataChannel: i };
    }
    async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
      t || (t = f.parse(this._pc.localDescription.sdp));
      const s = m.extractDtlsParameters({
        sdpObject: t
      });
      s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((o, v) => {
        this.safeEmit("@connect", { dtlsParameters: s }, o, v);
      }), this._transportReady = !0;
    }
    onIceGatheringStateChange = () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    };
    onIceCandidateError = (e) => {
      this.emit("@icecandidateerror", e);
    };
    onConnectionStateChange = () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    };
    onIceConnectionStateChange = () => {
      switch (this._pc.iceConnectionState) {
        case "checking": {
          this.emit("@connectionstatechange", "connecting");
          break;
        }
        case "connected":
        case "completed": {
          this.emit("@connectionstatechange", "connected");
          break;
        }
        case "failed": {
          this.emit("@connectionstatechange", "failed");
          break;
        }
        case "disconnected": {
          this.emit("@connectionstatechange", "disconnected");
          break;
        }
        case "closed": {
          this.emit("@connectionstatechange", "closed");
          break;
        }
      }
    };
    assertNotClosed() {
      if (this._closed)
        throw new T.InvalidStateError("method called in a closed handler");
    }
    assertSendDirection() {
      if (this._direction !== "send")
        throw new Error('method can just be called for handlers with "send" direction');
    }
    assertRecvDirection() {
      if (this._direction !== "recv")
        throw new Error('method can just be called for handlers with "recv" direction');
    }
  };
  return me.Chrome74 = E, me;
}
var ge = {}, Dt;
function ur() {
  if (Dt) return ge;
  Dt = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.Firefox120 = void 0;
  const f = G(), y = $(), w = z(), n = U(), T = V(), C = te(), _ = Re(), m = Ee(), g = Te(), x = xe(), r = new w.Logger("Firefox120"), u = "Firefox120", l = { OS: 16, MIS: 2048 };
  let E = class Oe extends y.EnhancedEventEmitter {
    // Closed flag.
    _closed = !1;
    // Handler direction.
    _direction;
    // Remote SDP handler.
    _remoteSdp;
    // Callback to request sending extended RTP capabilities on demand.
    _getSendExtendedRtpCapabilities;
    // RTCPeerConnection instance.
    _pc;
    // Map of RTCTransceivers indexed by MID.
    _mapMidTransceiver = /* @__PURE__ */ new Map();
    // Default local stream for sending if no `streamId` is given in send().
    _sendStream = new MediaStream();
    // Whether a DataChannel m=application section has been created.
    _hasDataChannelMediaSection = !1;
    // Sending DataChannel id value counter. Incremented for each new DataChannel.
    _nextSendSctpStreamId = 0;
    // Got transport local and remote parameters.
    _transportReady = !1;
    /**
     * Creates a factory function.
     */
    static createFactory() {
      return {
        name: u,
        factory: (e) => new Oe(e),
        getNativeRtpCapabilities: async () => {
          r.debug("getNativeRtpCapabilities()");
          let e = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require"
          });
          const t = document.createElement("canvas");
          t.getContext("2d");
          const o = t.captureStream().getVideoTracks()[0];
          try {
            e.addTransceiver("audio", { direction: "sendrecv" }), e.addTransceiver(o, {
              direction: "sendrecv",
              sendEncodings: [
                { rid: "r0", maxBitrate: 1e5 },
                { rid: "r1", maxBitrate: 5e5 }
              ]
            });
            const v = await e.createOffer();
            try {
              t.remove();
            } catch {
            }
            try {
              o.stop();
            } catch {
            }
            try {
              e.close();
            } catch {
            }
            e = void 0;
            const p = f.parse(v.sdp);
            return Oe.getLocalRtpCapabilities(p);
          } catch (v) {
            try {
              t.remove();
            } catch {
            }
            try {
              o.stop();
            } catch {
            }
            try {
              e?.close();
            } catch {
            }
            throw e = void 0, v;
          }
        },
        getNativeSctpCapabilities: async () => (r.debug("getNativeSctpCapabilities()"), {
          numStreams: l
        })
      };
    }
    static getLocalRtpCapabilities(e) {
      const t = m.extractRtpCapabilities({
        sdpObject: e
      });
      return T.validateAndNormalizeRtpCapabilities(t), t;
    }
    constructor({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: o, sctpParameters: v, iceServers: p, iceTransportPolicy: h, additionalSettings: d, getSendExtendedRtpCapabilities: i }) {
      super(), r.debug("constructor()"), this._direction = e, this._remoteSdp = new _.RemoteSdp({
        iceParameters: t,
        iceCandidates: s,
        dtlsParameters: o,
        sctpParameters: v
      }), this._getSendExtendedRtpCapabilities = i, this._pc = new RTCPeerConnection({
        iceServers: p ?? [],
        iceTransportPolicy: h ?? "all",
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require",
        ...d
      }), this._pc.addEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.addEventListener("icecandidateerror", this.onIceCandidateError), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", this.onConnectionStateChange) : (r.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.addEventListener("iceconnectionstatechange", this.onIceConnectionStateChange));
    }
    get name() {
      return u;
    }
    close() {
      if (r.debug("close()"), !this._closed) {
        this._closed = !0;
        try {
          this._pc.close();
        } catch {
        }
        this._pc.removeEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.removeEventListener("icecandidateerror", this.onIceCandidateError), this._pc.removeEventListener("connectionstatechange", this.onConnectionStateChange), this._pc.removeEventListener("iceconnectionstatechange", this.onIceConnectionStateChange), this.emit("@close"), super.close();
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateIceServers(e) {
      throw this.assertNotClosed(), new n.UnsupportedError("not supported");
    }
    async restartIce(e) {
      if (this.assertNotClosed(), r.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
        if (this._direction === "send") {
          const t = await this._pc.createOffer({ iceRestart: !0 });
          r.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
          const s = {
            type: "answer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
        } else {
          const t = {
            type: "offer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
          const s = await this._pc.createAnswer();
          r.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
        }
    }
    async getTransportStats() {
      return this.assertNotClosed(), this._pc.getStats();
    }
    async send({ track: e, streamId: t, encodings: s, codecOptions: o, codec: v, onRtpSender: p }) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("send() [kind:%s, track.id:%s, streamId:%s]", e.kind, e.id, t), s && s.length > 1 && s.forEach((k, L) => {
        k.rid = `r${L}`;
      });
      const h = this._pc.addTransceiver(e, {
        direction: "sendonly",
        streams: [this._sendStream],
        sendEncodings: s
      });
      p && p(h.sender);
      const d = await this._pc.createOffer();
      let i = f.parse(d.sdp);
      i.extmapAllowMixed && this._remoteSdp.setSessionExtmapAllowMixed();
      const c = Oe.getLocalRtpCapabilities(i), b = this._getSendExtendedRtpCapabilities(c), R = T.getSendingRtpParameters(e.kind, b);
      R.codecs = T.reduceCodecs(R.codecs, v);
      const I = T.getSendingRemoteRtpParameters(e.kind, b);
      I.codecs = T.reduceCodecs(I.codecs, v), this._transportReady || await this.setupTransport({ localDtlsRole: "client", localSdpObject: i });
      const M = (0, C.parse)((s ?? [{}])[0].scalabilityMode);
      r.debug("send() | calling pc.setLocalDescription() [offer:%o]", d), await this._pc.setLocalDescription(d);
      const a = h.mid;
      R.mid = a, i = f.parse(this._pc.localDescription.sdp);
      const D = i.media[i.media.length - 1];
      if (R.rtcp.cname = m.getCname({
        offerMediaObject: D
      }), R.msid = `${t ?? this._sendStream.id} ${e.id}`, !s)
        R.encodings = g.getRtpEncodings({
          offerMediaObject: D,
          codecs: R.codecs
        });
      else if (s.length === 1) {
        const k = g.getRtpEncodings({
          offerMediaObject: D,
          codecs: R.codecs
        });
        Object.assign(k[0], s[0]), R.encodings = k;
      } else
        R.encodings = s;
      if (R.encodings.length > 1 && (R.codecs[0].mimeType.toLowerCase() === "video/vp8" || R.codecs[0].mimeType.toLowerCase() === "video/h264"))
        for (const k of R.encodings)
          k.scalabilityMode ? k.scalabilityMode = `L1T${M.temporalLayers}` : k.scalabilityMode = "L1T3";
      this._remoteSdp.send({
        offerMediaObject: D,
        offerRtpParameters: R,
        answerRtpParameters: I,
        codecOptions: o
      });
      const P = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      return r.debug("send() | calling pc.setRemoteDescription() [answer:%o]", P), await this._pc.setRemoteDescription(P), this._mapMidTransceiver.set(a, h), {
        localId: a,
        rtpParameters: R,
        rtpSender: h.sender
      };
    }
    async stopSending(e) {
      if (this.assertSendDirection(), r.debug("stopSending() [localId:%s]", e), this._closed)
        return;
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated transceiver not found");
      t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.disableMediaSection(t.mid);
      const s = await this._pc.createOffer();
      r.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o), this._mapMidTransceiver.delete(e);
    }
    async pauseSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("pauseSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
      const s = await this._pc.createOffer();
      r.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async resumeSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("resumeSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "sendonly", this._remoteSdp.resumeSendingMediaSection(e);
      const s = await this._pc.createOffer();
      r.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async replaceTrack(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), t ? r.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : r.debug("replaceTrack() [localId:%s, no track]", e);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      await s.sender.replaceTrack(t);
    }
    async setMaxSpatialLayer(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated transceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        d <= t ? h.active = !0 : h.active = !1;
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async setRtpEncodingParameters(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        o.encodings[d] = { ...h, ...t };
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async getSenderStats(e) {
      this.assertNotClosed(), this.assertSendDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.sender.getStats();
    }
    async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: o, protocol: v }) {
      this.assertNotClosed(), this.assertSendDirection();
      const p = {
        negotiated: !0,
        id: this._nextSendSctpStreamId,
        ordered: e,
        maxPacketLifeTime: t,
        maxRetransmits: s,
        protocol: v
      };
      r.debug("sendDataChannel() [options:%o]", p);
      const h = this._pc.createDataChannel(o, p);
      if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % l.MIS, !this._hasDataChannelMediaSection) {
        const i = await this._pc.createOffer(), c = f.parse(i.sdp), b = c.media.find((I) => I.type === "application");
        this._transportReady || await this.setupTransport({ localDtlsRole: "client", localSdpObject: c }), r.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", i), await this._pc.setLocalDescription(i), this._remoteSdp.sendSctpAssociation({ offerMediaObject: b });
        const R = {
          type: "answer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", R), await this._pc.setRemoteDescription(R), this._hasDataChannelMediaSection = !0;
      }
      const d = {
        streamId: p.id,
        ordered: p.ordered,
        maxPacketLifeTime: p.maxPacketLifeTime,
        maxRetransmits: p.maxRetransmits
      };
      return { dataChannel: h, sctpStreamParameters: d };
    }
    async receive(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = [], s = /* @__PURE__ */ new Map();
      for (const h of e) {
        const { trackId: d, kind: i, rtpParameters: c, streamId: b } = h;
        r.debug("receive() [trackId:%s, kind:%s]", d, i);
        const R = c.mid ?? String(this._mapMidTransceiver.size);
        s.set(d, R);
        const { msidStreamId: I } = x.getMsidStreamIdAndTrackId(c.msid);
        this._remoteSdp.receive({
          mid: R,
          kind: i,
          offerRtpParameters: c,
          streamId: b ?? I ?? c.rtcp?.cname ?? "-",
          trackId: d
        });
      }
      const o = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", o), await this._pc.setRemoteDescription(o);
      for (const h of e) {
        const { trackId: d, onRtpReceiver: i } = h;
        if (i) {
          const c = s.get(d), b = this._pc.getTransceivers().find((R) => R.mid === c);
          if (!b)
            throw new Error("transceiver not found");
          i(b.receiver);
        }
      }
      let v = await this._pc.createAnswer();
      const p = f.parse(v.sdp);
      for (const h of e) {
        const { trackId: d, rtpParameters: i } = h, c = s.get(d), b = p.media.find((R) => String(R.mid) === c);
        m.applyCodecParameters({
          offerRtpParameters: i,
          answerMediaObject: b
        }), v = {
          type: "answer",
          sdp: f.write(p)
        };
      }
      this._transportReady || await this.setupTransport({ localDtlsRole: "client", localSdpObject: p }), r.debug("receive() | calling pc.setLocalDescription() [answer:%o]", v), await this._pc.setLocalDescription(v);
      for (const h of e) {
        const { trackId: d } = h, i = s.get(d), c = this._pc.getTransceivers().find((b) => b.mid === i);
        if (!c)
          throw new Error("new RTCRtpTransceiver not found");
        this._mapMidTransceiver.set(i, c), t.push({
          localId: i,
          track: c.receiver.track,
          rtpReceiver: c.receiver
        });
      }
      return t;
    }
    async stopReceiving(e) {
      if (this.assertRecvDirection(), this._closed)
        return;
      for (const o of e) {
        r.debug("stopReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        this._remoteSdp.closeMediaSection(v.mid);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      for (const o of e)
        this._mapMidTransceiver.delete(o);
    }
    async pauseReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("pauseReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "inactive", this._remoteSdp.pauseMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async resumeReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("resumeReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async getReceiverStats(e) {
      this.assertRecvDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.receiver.getStats();
    }
    async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
      this.assertNotClosed(), this.assertRecvDirection();
      const { streamId: o, ordered: v, maxPacketLifeTime: p, maxRetransmits: h } = e, d = {
        negotiated: !0,
        id: o,
        ordered: v,
        maxPacketLifeTime: p,
        maxRetransmits: h,
        protocol: s
      };
      r.debug("receiveDataChannel() [options:%o]", d);
      const i = this._pc.createDataChannel(t, d);
      if (!this._hasDataChannelMediaSection) {
        this._remoteSdp.receiveSctpAssociation();
        const c = {
          type: "offer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
        const b = await this._pc.createAnswer();
        if (!this._transportReady) {
          const R = f.parse(b.sdp);
          await this.setupTransport({ localDtlsRole: "client", localSdpObject: R });
        }
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", b), await this._pc.setLocalDescription(b), this._hasDataChannelMediaSection = !0;
      }
      return { dataChannel: i };
    }
    async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
      t || (t = f.parse(this._pc.localDescription.sdp));
      const s = m.extractDtlsParameters({
        sdpObject: t
      });
      s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((o, v) => {
        this.safeEmit("@connect", { dtlsParameters: s }, o, v);
      }), this._transportReady = !0;
    }
    onIceGatheringStateChange = () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    };
    onIceCandidateError = (e) => {
      this.emit("@icecandidateerror", e);
    };
    onConnectionStateChange = () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    };
    onIceConnectionStateChange = () => {
      switch (this._pc.iceConnectionState) {
        case "checking": {
          this.emit("@connectionstatechange", "connecting");
          break;
        }
        case "connected":
        case "completed": {
          this.emit("@connectionstatechange", "connected");
          break;
        }
        case "failed": {
          this.emit("@connectionstatechange", "failed");
          break;
        }
        case "disconnected": {
          this.emit("@connectionstatechange", "disconnected");
          break;
        }
        case "closed": {
          this.emit("@connectionstatechange", "closed");
          break;
        }
      }
    };
    assertNotClosed() {
      if (this._closed)
        throw new n.InvalidStateError("method called in a closed handler");
    }
    assertSendDirection() {
      if (this._direction !== "send")
        throw new Error('method can just be called for handlers with "send" direction');
    }
    assertRecvDirection() {
      if (this._direction !== "recv")
        throw new Error('method can just be called for handlers with "recv" direction');
    }
  };
  return ge.Firefox120 = E, ge;
}
var _e = {}, Pt;
function hr() {
  if (Pt) return _e;
  Pt = 1, Object.defineProperty(_e, "__esModule", { value: !0 }), _e.Safari12 = void 0;
  const f = G(), y = $(), w = z(), n = V(), T = U(), C = te(), _ = Re(), m = Ee(), g = Te(), x = xe(), r = new w.Logger("Safari12"), u = "Safari12", l = { OS: 1024, MIS: 1024 };
  let E = class Fe extends y.EnhancedEventEmitter {
    // Closed flag.
    _closed = !1;
    // Handler direction.
    _direction;
    // Remote SDP handler.
    _remoteSdp;
    // Callback to request sending extended RTP capabilities on demand.
    _getSendExtendedRtpCapabilities;
    // Initial server side DTLS role. If not 'auto', it will force the opposite
    // value in client side.
    _forcedLocalDtlsRole;
    // RTCPeerConnection instance.
    _pc;
    // Map of RTCTransceivers indexed by MID.
    _mapMidTransceiver = /* @__PURE__ */ new Map();
    // Default local stream for sending if no `streamId` is given in send().
    _sendStream = new MediaStream();
    // Whether a DataChannel m=application section has been created.
    _hasDataChannelMediaSection = !1;
    // Sending DataChannel id value counter. Incremented for each new DataChannel.
    _nextSendSctpStreamId = 0;
    // Got transport local and remote parameters.
    _transportReady = !1;
    /**
     * Creates a factory function.
     */
    static createFactory() {
      return {
        name: u,
        factory: (e) => new Fe(e),
        getNativeRtpCapabilities: async () => {
          r.debug("getNativeRtpCapabilities()");
          let e = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require"
          });
          try {
            e.addTransceiver("audio"), e.addTransceiver("video");
            const t = await e.createOffer();
            try {
              e.close();
            } catch {
            }
            e = void 0;
            const s = f.parse(t.sdp);
            return Fe.getLocalRtpCapabilities(s);
          } catch (t) {
            try {
              e?.close();
            } catch {
            }
            throw e = void 0, t;
          }
        },
        getNativeSctpCapabilities: async () => (r.debug("getNativeSctpCapabilities()"), {
          numStreams: l
        })
      };
    }
    static getLocalRtpCapabilities(e, t = []) {
      const s = m.extractRtpCapabilities({
        sdpObject: e
      });
      n.validateAndNormalizeRtpCapabilities(s), x.addNackSupportForOpus(s);
      for (const o of t)
        x.addHeaderExtensionSupport(s, o);
      return s;
    }
    constructor({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: o, sctpParameters: v, iceServers: p, iceTransportPolicy: h, additionalSettings: d, getSendExtendedRtpCapabilities: i }) {
      super(), r.debug("constructor()"), this._direction = e, this._remoteSdp = new _.RemoteSdp({
        iceParameters: t,
        iceCandidates: s,
        dtlsParameters: o,
        sctpParameters: v
      }), this._getSendExtendedRtpCapabilities = i, o.role && o.role !== "auto" && (this._forcedLocalDtlsRole = o.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
        iceServers: p ?? [],
        iceTransportPolicy: h ?? "all",
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require",
        ...d
      }), this._pc.addEventListener("icegatheringstatechange", () => {
        this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
      }), this._pc.addEventListener("icecandidateerror", (c) => {
        this.emit("@icecandidateerror", c);
      }), this._pc.addEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.addEventListener("icecandidateerror", this.onIceCandidateError), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", this.onConnectionStateChange) : (r.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.addEventListener("iceconnectionstatechange", this.onIceConnectionStateChange));
    }
    get name() {
      return u;
    }
    close() {
      if (r.debug("close()"), !this._closed) {
        this._closed = !0;
        try {
          this._pc.close();
        } catch {
        }
        this._pc.removeEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.removeEventListener("icecandidateerror", this.onIceCandidateError), this._pc.removeEventListener("connectionstatechange", this.onConnectionStateChange), this._pc.removeEventListener("iceconnectionstatechange", this.onIceConnectionStateChange), this.emit("@close"), super.close();
      }
    }
    async updateIceServers(e) {
      this.assertNotClosed(), r.debug("updateIceServers()");
      const t = this._pc.getConfiguration();
      t.iceServers = e, this._pc.setConfiguration(t);
    }
    async restartIce(e) {
      if (this.assertNotClosed(), r.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
        if (this._direction === "send") {
          const t = await this._pc.createOffer({ iceRestart: !0 });
          r.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
          const s = {
            type: "answer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
        } else {
          const t = {
            type: "offer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
          const s = await this._pc.createAnswer();
          r.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
        }
    }
    async getTransportStats() {
      return this.assertNotClosed(), this._pc.getStats();
    }
    async send({ track: e, streamId: t, encodings: s, codecOptions: o, headerExtensionOptions: v, codec: p, onRtpSender: h }) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("send() [kind:%s, track.id:%s, streamId:%s]", e.kind, e.id, t);
      const d = this._remoteSdp.getNextMediaSectionIdx(), i = this._pc.addTransceiver(e, {
        direction: "sendonly",
        streams: [this._sendStream]
      });
      h && h(i.sender);
      let c = await this._pc.createOffer(), b = f.parse(c.sdp);
      b.extmapAllowMixed && this._remoteSdp.setSessionExtmapAllowMixed();
      const R = [];
      R.push({
        uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time",
        kind: e.kind,
        direction: "sendonly"
      });
      const I = Fe.getLocalRtpCapabilities(b, R), M = this._getSendExtendedRtpCapabilities(I), a = n.getSendingRtpParameters(e.kind, M);
      a.codecs = n.reduceCodecs(a.codecs, p);
      const D = n.getSendingRemoteRtpParameters(e.kind, M);
      D.codecs = n.reduceCodecs(D.codecs, p);
      let P;
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: b
      });
      const k = (0, C.parse)((s ?? [{}])[0].scalabilityMode);
      s && s.length > 1 && (r.debug("send() | enabling legacy simulcast"), b = f.parse(c.sdp), P = b.media[d.idx], g.addLegacySimulcast({
        offerMediaObject: P,
        numStreams: s.length
      }), c = {
        type: "offer",
        sdp: f.write(b)
      }), v?.absCaptureTime && (P = b.media[d.idx], m.addHeaderExtension({
        offerMediaObject: P,
        headerExtensionUri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time",
        headerExtensionId: D.headerExtensions.find((F) => F.uri === "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time").id
      }), c = {
        type: "offer",
        sdp: f.write(b)
      }), r.debug("send() | calling pc.setLocalDescription() [offer:%o]", c), await this._pc.setLocalDescription(c);
      const L = i.mid;
      if (a.mid = L, b = f.parse(this._pc.localDescription.sdp), P = b.media[d.idx], a.rtcp.cname = m.getCname({
        offerMediaObject: P
      }), a.msid = `${t ?? this._sendStream.id} ${e.id}`, a.encodings = g.getRtpEncodings({
        offerMediaObject: P,
        codecs: a.codecs
      }), s)
        for (let F = 0; F < a.encodings.length; ++F)
          s[F] && Object.assign(a.encodings[F], s[F]);
      if (a.encodings.length > 1 && (a.codecs[0].mimeType.toLowerCase() === "video/vp8" || a.codecs[0].mimeType.toLowerCase() === "video/h264"))
        for (const F of a.encodings)
          F.scalabilityMode ? F.scalabilityMode = `L1T${k.temporalLayers}` : F.scalabilityMode = "L1T3";
      this._remoteSdp.send({
        offerMediaObject: P,
        reuseMid: d.reuseMid,
        offerRtpParameters: a,
        answerRtpParameters: D,
        codecOptions: o
      });
      const O = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      return r.debug("send() | calling pc.setRemoteDescription() [answer:%o]", O), await this._pc.setRemoteDescription(O), this._mapMidTransceiver.set(L, i), {
        localId: L,
        rtpParameters: a,
        rtpSender: i.sender
      };
    }
    async stopSending(e) {
      if (this.assertSendDirection(), this._closed)
        return;
      r.debug("stopSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
        try {
          t.stop();
        } catch {
        }
      const o = await this._pc.createOffer();
      r.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", o), await this._pc.setLocalDescription(o);
      const v = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", v), await this._pc.setRemoteDescription(v), this._mapMidTransceiver.delete(e);
    }
    async pauseSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("pauseSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
      const s = await this._pc.createOffer();
      r.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async resumeSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("resumeSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "sendonly", this._remoteSdp.resumeSendingMediaSection(e);
      const s = await this._pc.createOffer();
      r.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async replaceTrack(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), t ? r.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : r.debug("replaceTrack() [localId:%s, no track]", e);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      await s.sender.replaceTrack(t);
    }
    async setMaxSpatialLayer(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        d <= t ? h.active = !0 : h.active = !1;
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async setRtpEncodingParameters(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        o.encodings[d] = { ...h, ...t };
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async getSenderStats(e) {
      this.assertNotClosed(), this.assertSendDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.sender.getStats();
    }
    async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: o, protocol: v }) {
      this.assertNotClosed(), this.assertSendDirection();
      const p = {
        negotiated: !0,
        id: this._nextSendSctpStreamId,
        ordered: e,
        maxPacketLifeTime: t,
        maxRetransmits: s,
        protocol: v
      };
      r.debug("sendDataChannel() [options:%o]", p);
      const h = this._pc.createDataChannel(o, p);
      if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % l.MIS, !this._hasDataChannelMediaSection) {
        const i = await this._pc.createOffer(), c = f.parse(i.sdp), b = c.media.find((I) => I.type === "application");
        this._transportReady || await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: c
        }), r.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", i), await this._pc.setLocalDescription(i), this._remoteSdp.sendSctpAssociation({ offerMediaObject: b });
        const R = {
          type: "answer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", R), await this._pc.setRemoteDescription(R), this._hasDataChannelMediaSection = !0;
      }
      const d = {
        streamId: p.id,
        ordered: p.ordered,
        maxPacketLifeTime: p.maxPacketLifeTime,
        maxRetransmits: p.maxRetransmits
      };
      return { dataChannel: h, sctpStreamParameters: d };
    }
    async receive(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = [], s = /* @__PURE__ */ new Map();
      for (const h of e) {
        const { trackId: d, kind: i, rtpParameters: c, streamId: b } = h;
        r.debug("receive() [trackId:%s, kind:%s]", d, i);
        const R = c.mid ?? String(this._mapMidTransceiver.size);
        s.set(d, R);
        const { msidStreamId: I } = x.getMsidStreamIdAndTrackId(c.msid);
        this._remoteSdp.receive({
          mid: R,
          kind: i,
          offerRtpParameters: c,
          streamId: b ?? I ?? c.rtcp?.cname ?? "-",
          trackId: d
        });
      }
      const o = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", o), await this._pc.setRemoteDescription(o);
      for (const h of e) {
        const { trackId: d, onRtpReceiver: i } = h;
        if (i) {
          const c = s.get(d), b = this._pc.getTransceivers().find((R) => R.mid === c);
          if (!b)
            throw new Error("transceiver not found");
          i(b.receiver);
        }
      }
      let v = await this._pc.createAnswer();
      const p = f.parse(v.sdp);
      for (const h of e) {
        const { trackId: d, rtpParameters: i } = h, c = s.get(d), b = p.media.find((R) => String(R.mid) === c);
        m.applyCodecParameters({
          offerRtpParameters: i,
          answerMediaObject: b
        });
      }
      v = {
        type: "answer",
        sdp: f.write(p)
      }, this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: p
      }), r.debug("receive() | calling pc.setLocalDescription() [answer:%o]", v), await this._pc.setLocalDescription(v);
      for (const h of e) {
        const { trackId: d } = h, i = s.get(d), c = this._pc.getTransceivers().find((b) => b.mid === i);
        if (!c)
          throw new Error("new RTCRtpTransceiver not found");
        this._mapMidTransceiver.set(i, c), t.push({
          localId: i,
          track: c.receiver.track,
          rtpReceiver: c.receiver
        });
      }
      return t;
    }
    async stopReceiving(e) {
      if (this.assertRecvDirection(), this._closed)
        return;
      for (const o of e) {
        r.debug("stopReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        this._remoteSdp.closeMediaSection(v.mid);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      for (const o of e)
        this._mapMidTransceiver.delete(o);
    }
    async pauseReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("pauseReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "inactive", this._remoteSdp.pauseMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async resumeReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("resumeReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async getReceiverStats(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.receiver.getStats();
    }
    async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
      this.assertNotClosed(), this.assertRecvDirection();
      const { streamId: o, ordered: v, maxPacketLifeTime: p, maxRetransmits: h } = e, d = {
        negotiated: !0,
        id: o,
        ordered: v,
        maxPacketLifeTime: p,
        maxRetransmits: h,
        protocol: s
      };
      r.debug("receiveDataChannel() [options:%o]", d);
      const i = this._pc.createDataChannel(t, d);
      if (!this._hasDataChannelMediaSection) {
        this._remoteSdp.receiveSctpAssociation();
        const c = {
          type: "offer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
        const b = await this._pc.createAnswer();
        if (!this._transportReady) {
          const R = f.parse(b.sdp);
          await this.setupTransport({
            localDtlsRole: this._forcedLocalDtlsRole ?? "client",
            localSdpObject: R
          });
        }
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", b), await this._pc.setLocalDescription(b), this._hasDataChannelMediaSection = !0;
      }
      return { dataChannel: i };
    }
    async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
      t || (t = f.parse(this._pc.localDescription.sdp));
      const s = m.extractDtlsParameters({
        sdpObject: t
      });
      s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((o, v) => {
        this.safeEmit("@connect", { dtlsParameters: s }, o, v);
      }), this._transportReady = !0;
    }
    onIceGatheringStateChange = () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    };
    onIceCandidateError = (e) => {
      this.emit("@icecandidateerror", e);
    };
    onConnectionStateChange = () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    };
    onIceConnectionStateChange = () => {
      switch (this._pc.iceConnectionState) {
        case "checking": {
          this.emit("@connectionstatechange", "connecting");
          break;
        }
        case "connected":
        case "completed": {
          this.emit("@connectionstatechange", "connected");
          break;
        }
        case "failed": {
          this.emit("@connectionstatechange", "failed");
          break;
        }
        case "disconnected": {
          this.emit("@connectionstatechange", "disconnected");
          break;
        }
        case "closed": {
          this.emit("@connectionstatechange", "closed");
          break;
        }
      }
    };
    assertNotClosed() {
      if (this._closed)
        throw new T.InvalidStateError("method called in a closed handler");
    }
    assertSendDirection() {
      if (this._direction !== "send")
        throw new Error('method can just be called for handlers with "send" direction');
    }
    assertRecvDirection() {
      if (this._direction !== "recv")
        throw new Error('method can just be called for handlers with "recv" direction');
    }
  };
  return _e.Safari12 = E, _e;
}
var ve = {}, Lt;
function fr() {
  if (Lt) return ve;
  Lt = 1, Object.defineProperty(ve, "__esModule", { value: !0 }), ve.ReactNative106 = void 0;
  const f = G(), y = $(), w = z(), n = V(), T = U(), C = te(), _ = Re(), m = Ee(), g = Te(), x = xe(), r = new w.Logger("ReactNative106"), u = "ReactNative106", l = { OS: 1024, MIS: 1024 };
  let E = class Ne extends y.EnhancedEventEmitter {
    // Closed flag.
    _closed = !1;
    // Handler direction.
    _direction;
    // Remote SDP handler.
    _remoteSdp;
    // Callback to request sending extended RTP capabilities on demand.
    _getSendExtendedRtpCapabilities;
    // Initial server side DTLS role. If not 'auto', it will force the opposite
    // value in client side.
    _forcedLocalDtlsRole;
    // RTCPeerConnection instance.
    _pc;
    // Map of RTCTransceivers indexed by MID.
    _mapMidTransceiver = /* @__PURE__ */ new Map();
    // Default local stream for sending if no `streamId` is given in send().
    _sendStream = new MediaStream();
    // Whether a DataChannel m=application section has been created.
    _hasDataChannelMediaSection = !1;
    // Sending DataChannel id value counter. Incremented for each new DataChannel.
    _nextSendSctpStreamId = 0;
    // Got transport local and remote parameters.
    _transportReady = !1;
    /**
     * Creates a factory function.
     */
    static createFactory() {
      return {
        name: u,
        factory: (e) => new Ne(e),
        getNativeRtpCapabilities: async () => {
          r.debug("getNativeRtpCapabilities()");
          let e = new RTCPeerConnection({
            iceServers: [],
            iceTransportPolicy: "all",
            bundlePolicy: "max-bundle",
            rtcpMuxPolicy: "require"
          });
          try {
            e.addTransceiver("audio"), e.addTransceiver("video");
            const t = await e.createOffer();
            try {
              e.close();
            } catch {
            }
            e = void 0;
            const s = f.parse(t.sdp);
            return Ne.getLocalRtpCapabilities(s);
          } catch (t) {
            try {
              e?.close();
            } catch {
            }
            throw e = void 0, t;
          }
        },
        getNativeSctpCapabilities: async () => (r.debug("getNativeSctpCapabilities()"), {
          numStreams: l
        })
      };
    }
    static getLocalRtpCapabilities(e, t = []) {
      const s = m.extractRtpCapabilities({
        sdpObject: e
      });
      n.validateAndNormalizeRtpCapabilities(s), x.addNackSupportForOpus(s);
      for (const o of t)
        x.addHeaderExtensionSupport(s, o);
      return s;
    }
    constructor({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: o, sctpParameters: v, iceServers: p, iceTransportPolicy: h, additionalSettings: d, getSendExtendedRtpCapabilities: i }) {
      super(), r.debug("constructor()"), this._direction = e, this._remoteSdp = new _.RemoteSdp({
        iceParameters: t,
        iceCandidates: s,
        dtlsParameters: o,
        sctpParameters: v
      }), this._getSendExtendedRtpCapabilities = i, o.role && o.role !== "auto" && (this._forcedLocalDtlsRole = o.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
        iceServers: p ?? [],
        iceTransportPolicy: h ?? "all",
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require",
        ...d
      }), this._pc.addEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.addEventListener("icecandidateerror", this.onIceCandidateError), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", this.onConnectionStateChange) : (r.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.addEventListener("iceconnectionstatechange", this.onIceConnectionStateChange));
    }
    get name() {
      return u;
    }
    close() {
      if (r.debug("close()"), !this._closed) {
        this._closed = !0, this._sendStream.release(
          /* releaseTracks */
          !1
        );
        try {
          this._pc.close();
        } catch {
        }
        this._pc.removeEventListener("icegatheringstatechange", this.onIceGatheringStateChange), this._pc.removeEventListener("icecandidateerror", this.onIceCandidateError), this._pc.removeEventListener("connectionstatechange", this.onConnectionStateChange), this._pc.removeEventListener("iceconnectionstatechange", this.onIceConnectionStateChange), this.emit("@close"), super.close();
      }
    }
    async updateIceServers(e) {
      this.assertNotClosed(), r.debug("updateIceServers()");
      const t = this._pc.getConfiguration();
      t.iceServers = e, this._pc.setConfiguration(t);
    }
    async restartIce(e) {
      if (this.assertNotClosed(), r.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
        if (this._direction === "send") {
          const t = await this._pc.createOffer({ iceRestart: !0 });
          r.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
          const s = {
            type: "answer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
        } else {
          const t = {
            type: "offer",
            sdp: this._remoteSdp.getSdp()
          };
          r.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
          const s = await this._pc.createAnswer();
          r.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
        }
    }
    async getTransportStats() {
      return this.assertNotClosed(), this._pc.getStats();
    }
    async send({ track: e, streamId: t, encodings: s, codecOptions: o, headerExtensionOptions: v, codec: p, onRtpSender: h }) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("send() [kind:%s, track.id:%s, streamId:%s]", e.kind, e.id, t), s && s.length > 1 && s.forEach((N, Y) => {
        N.rid = `r${Y}`;
      });
      const d = this._remoteSdp.getNextMediaSectionIdx(), i = this._pc.addTransceiver(e, {
        direction: "sendonly",
        streams: [this._sendStream],
        sendEncodings: s
      });
      h && h(i.sender);
      let c = await this._pc.createOffer(), b = f.parse(c.sdp);
      b.extmapAllowMixed && this._remoteSdp.setSessionExtmapAllowMixed();
      const R = [];
      R.push({
        uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time",
        kind: e.kind,
        direction: "sendonly"
      });
      const I = Ne.getLocalRtpCapabilities(b, R), M = this._getSendExtendedRtpCapabilities(I), a = n.getSendingRtpParameters(e.kind, M);
      a.codecs = n.reduceCodecs(a.codecs, p);
      const D = n.getSendingRemoteRtpParameters(e.kind, M);
      D.codecs = n.reduceCodecs(D.codecs, p), this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: b
      });
      let P = !1;
      const k = (0, C.parse)((s ?? [{}])[0].scalabilityMode);
      let L;
      s?.length === 1 && k.spatialLayers > 1 && a.codecs[0].mimeType.toLowerCase() === "video/vp9" && (r.debug("send() | enabling legacy simulcast for VP9 SVC"), P = !0, b = f.parse(c.sdp), L = b.media[d.idx], g.addLegacySimulcast({
        offerMediaObject: L,
        numStreams: k.spatialLayers
      }), c = {
        type: "offer",
        sdp: f.write(b)
      }), v?.absCaptureTime && (L = b.media[d.idx], m.addHeaderExtension({
        offerMediaObject: L,
        headerExtensionUri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time",
        headerExtensionId: D.headerExtensions.find((N) => N.uri === "http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time").id
      }), c = {
        type: "offer",
        sdp: f.write(b)
      }), r.debug("send() | calling pc.setLocalDescription() [offer:%o]", c), await this._pc.setLocalDescription(c);
      let O = i.mid ?? void 0;
      if (O || r.warn("send() | missing transceiver.mid (bug in react-native-webrtc, using a workaround"), a.mid = O, b = f.parse(this._pc.localDescription.sdp), L = b.media[d.idx], a.rtcp.cname = m.getCname({
        offerMediaObject: L
      }), a.msid = `${t ?? this._sendStream.id} ${e.id}`, !s)
        a.encodings = g.getRtpEncodings({
          offerMediaObject: L,
          codecs: a.codecs
        });
      else if (s.length === 1) {
        let N = g.getRtpEncodings({
          offerMediaObject: L,
          codecs: a.codecs
        });
        Object.assign(N[0], s[0]), P && (N = [N[0]]), a.encodings = N;
      } else
        a.encodings = s;
      if (a.encodings.length > 1 && (a.codecs[0].mimeType.toLowerCase() === "video/vp8" || a.codecs[0].mimeType.toLowerCase() === "video/h264"))
        for (const N of a.encodings)
          N.scalabilityMode ? N.scalabilityMode = `L1T${k.temporalLayers}` : N.scalabilityMode = "L1T3";
      this._remoteSdp.send({
        offerMediaObject: L,
        reuseMid: d.reuseMid,
        offerRtpParameters: a,
        answerRtpParameters: D,
        codecOptions: o
      });
      const F = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      return r.debug("send() | calling pc.setRemoteDescription() [answer:%o]", F), await this._pc.setRemoteDescription(F), O || (O = i.mid, a.mid = O), this._mapMidTransceiver.set(O, i), {
        localId: O,
        rtpParameters: a,
        rtpSender: i.sender
      };
    }
    async stopSending(e) {
      if (this.assertSendDirection(), this._closed)
        return;
      r.debug("stopSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
        try {
          t.stop();
        } catch {
        }
      const o = await this._pc.createOffer();
      r.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", o), await this._pc.setLocalDescription(o);
      const v = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", v), await this._pc.setRemoteDescription(v), this._mapMidTransceiver.delete(e);
    }
    async pauseSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("pauseSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
      const s = await this._pc.createOffer();
      r.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async resumeSending(e) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("resumeSending() [localId:%s]", e);
      const t = this._mapMidTransceiver.get(e);
      if (this._remoteSdp.resumeSendingMediaSection(e), !t)
        throw new Error("associated RTCRtpTransceiver not found");
      t.direction = "sendonly";
      const s = await this._pc.createOffer();
      r.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
      const o = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", o), await this._pc.setRemoteDescription(o);
    }
    async replaceTrack(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), t ? r.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : r.debug("replaceTrack() [localId:%s, no track]", e);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      await s.sender.replaceTrack(t);
    }
    async setMaxSpatialLayer(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        d <= t ? h.active = !0 : h.active = !1;
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async setRtpEncodingParameters(e, t) {
      this.assertNotClosed(), this.assertSendDirection(), r.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
      const s = this._mapMidTransceiver.get(e);
      if (!s)
        throw new Error("associated RTCRtpTransceiver not found");
      const o = s.sender.getParameters();
      o.encodings.forEach((h, d) => {
        o.encodings[d] = { ...h, ...t };
      }), await s.sender.setParameters(o), this._remoteSdp.muxMediaSectionSimulcast(e, o.encodings);
      const v = await this._pc.createOffer();
      r.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", v), await this._pc.setLocalDescription(v);
      const p = {
        type: "answer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", p), await this._pc.setRemoteDescription(p);
    }
    async getSenderStats(e) {
      this.assertNotClosed(), this.assertSendDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.sender.getStats();
    }
    async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: o, protocol: v }) {
      this.assertNotClosed(), this.assertSendDirection();
      const p = {
        negotiated: !0,
        id: this._nextSendSctpStreamId,
        ordered: e,
        maxPacketLifeTime: t,
        maxRetransmits: s,
        protocol: v
      };
      r.debug("sendDataChannel() [options:%o]", p);
      const h = this._pc.createDataChannel(o, p);
      if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % l.MIS, !this._hasDataChannelMediaSection) {
        const i = await this._pc.createOffer(), c = f.parse(i.sdp), b = c.media.find((I) => I.type === "application");
        this._transportReady || await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: c
        }), r.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", i), await this._pc.setLocalDescription(i), this._remoteSdp.sendSctpAssociation({ offerMediaObject: b });
        const R = {
          type: "answer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", R), await this._pc.setRemoteDescription(R), this._hasDataChannelMediaSection = !0;
      }
      const d = {
        streamId: p.id,
        ordered: p.ordered,
        maxPacketLifeTime: p.maxPacketLifeTime,
        maxRetransmits: p.maxRetransmits
      };
      return { dataChannel: h, sctpStreamParameters: d };
    }
    async receive(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = [], s = /* @__PURE__ */ new Map();
      for (const h of e) {
        const { trackId: d, kind: i, rtpParameters: c, streamId: b } = h;
        r.debug("receive() [trackId:%s, kind:%s]", d, i);
        const R = c.mid ?? String(this._mapMidTransceiver.size);
        s.set(d, R);
        const { msidStreamId: I } = x.getMsidStreamIdAndTrackId(c.msid);
        this._remoteSdp.receive({
          mid: R,
          kind: i,
          offerRtpParameters: c,
          streamId: b ?? I ?? c.rtcp?.cname ?? "-",
          trackId: d
        });
      }
      const o = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", o), await this._pc.setRemoteDescription(o);
      for (const h of e) {
        const { trackId: d, onRtpReceiver: i } = h;
        if (i) {
          const c = s.get(d), b = this._pc.getTransceivers().find((R) => R.mid === c);
          if (!b)
            throw new Error("transceiver not found");
          i(b.receiver);
        }
      }
      let v = await this._pc.createAnswer();
      const p = f.parse(v.sdp);
      for (const h of e) {
        const { trackId: d, rtpParameters: i } = h, c = s.get(d), b = p.media.find((R) => String(R.mid) === c);
        m.applyCodecParameters({
          offerRtpParameters: i,
          answerMediaObject: b
        });
      }
      v = {
        type: "answer",
        sdp: f.write(p)
      }, this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: p
      }), r.debug("receive() | calling pc.setLocalDescription() [answer:%o]", v), await this._pc.setLocalDescription(v);
      for (const h of e) {
        const { trackId: d } = h, i = s.get(d), c = this._pc.getTransceivers().find((b) => b.mid === i);
        if (c)
          this._mapMidTransceiver.set(i, c), t.push({
            localId: i,
            track: c.receiver.track,
            rtpReceiver: c.receiver
          });
        else
          throw new Error("new RTCRtpTransceiver not found");
      }
      return t;
    }
    async stopReceiving(e) {
      if (this.assertRecvDirection(), this._closed)
        return;
      for (const o of e) {
        r.debug("stopReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        this._remoteSdp.closeMediaSection(v.mid);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      for (const o of e)
        this._mapMidTransceiver.delete(o);
    }
    async pauseReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("pauseReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "inactive", this._remoteSdp.pauseMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async resumeReceiving(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      for (const o of e) {
        r.debug("resumeReceiving() [localId:%s]", o);
        const v = this._mapMidTransceiver.get(o);
        if (!v)
          throw new Error("associated RTCRtpTransceiver not found");
        v.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(o);
      }
      const t = {
        type: "offer",
        sdp: this._remoteSdp.getSdp()
      };
      r.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
      const s = await this._pc.createAnswer();
      r.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    }
    async getReceiverStats(e) {
      this.assertNotClosed(), this.assertRecvDirection();
      const t = this._mapMidTransceiver.get(e);
      if (!t)
        throw new Error("associated RTCRtpTransceiver not found");
      return t.receiver.getStats();
    }
    async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
      this.assertNotClosed(), this.assertRecvDirection();
      const { streamId: o, ordered: v, maxPacketLifeTime: p, maxRetransmits: h } = e, d = {
        negotiated: !0,
        id: o,
        ordered: v,
        maxPacketLifeTime: p,
        maxRetransmits: h,
        protocol: s
      };
      r.debug("receiveDataChannel() [options:%o]", d);
      const i = this._pc.createDataChannel(t, d);
      if (!this._hasDataChannelMediaSection) {
        this._remoteSdp.receiveSctpAssociation();
        const c = {
          type: "offer",
          sdp: this._remoteSdp.getSdp()
        };
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
        const b = await this._pc.createAnswer();
        if (!this._transportReady) {
          const R = f.parse(b.sdp);
          await this.setupTransport({
            localDtlsRole: this._forcedLocalDtlsRole ?? "client",
            localSdpObject: R
          });
        }
        r.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", b), await this._pc.setLocalDescription(b), this._hasDataChannelMediaSection = !0;
      }
      return { dataChannel: i };
    }
    async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
      t || (t = f.parse(this._pc.localDescription.sdp));
      const s = m.extractDtlsParameters({
        sdpObject: t
      });
      s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((o, v) => {
        this.safeEmit("@connect", { dtlsParameters: s }, o, v);
      }), this._transportReady = !0;
    }
    onIceGatheringStateChange = () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    };
    onIceCandidateError = (e) => {
      this.emit("@icecandidateerror", e);
    };
    onConnectionStateChange = () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    };
    onIceConnectionStateChange = () => {
      switch (this._pc.iceConnectionState) {
        case "checking": {
          this.emit("@connectionstatechange", "connecting");
          break;
        }
        case "connected":
        case "completed": {
          this.emit("@connectionstatechange", "connected");
          break;
        }
        case "failed": {
          this.emit("@connectionstatechange", "failed");
          break;
        }
        case "disconnected": {
          this.emit("@connectionstatechange", "disconnected");
          break;
        }
        case "closed": {
          this.emit("@connectionstatechange", "closed");
          break;
        }
      }
    };
    assertNotClosed() {
      if (this._closed)
        throw new T.InvalidStateError("method called in a closed handler");
    }
    assertSendDirection() {
      if (this._direction !== "send")
        throw new Error('method can just be called for handlers with "send" direction');
    }
    assertRecvDirection() {
      if (this._direction !== "recv")
        throw new Error('method can just be called for handlers with "recv" direction');
    }
  };
  return ve.ReactNative106 = E, ve;
}
var It;
function mr() {
  if (It) return K;
  It = 1, Object.defineProperty(K, "__esModule", { value: !0 }), K.Device = void 0, K.detectDevice = l, K.detectDeviceAsync = E;
  const f = z(), y = $(), w = U(), n = ee(), T = V(), C = ar(), _ = pr(), m = lr(), g = ur(), x = hr(), r = fr(), u = new f.Logger("Device");
  function l(d, i) {
    return u.debug("detectDevice()"), !d && typeof navigator == "object" && (d = navigator.userAgent), !i && typeof navigator == "object" && (i = navigator.userAgentData), e(d, i);
  }
  async function E(d, i) {
    return u.debug("detectDeviceAsync()"), !d && typeof navigator == "object" && (d = navigator.userAgent), !i && typeof navigator == "object" && (i = navigator.userAgentData), e(d, i);
  }
  let S = class Ut {
    // RTC handler factory.
    _handlerFactory;
    // Handler name.
    _handlerName;
    // Loaded flag.
    _loaded = !1;
    // Callback for sending Transports to request sending extended RTP capabilities
    // on demand.
    _getSendExtendedRtpCapabilities;
    // Local RTP capabilities for receiving media.
    _recvRtpCapabilities;
    // Whether we can produce audio/video based on remote RTP capabilities.
    _canProduceByKind = {
      audio: !1,
      video: !1
    };
    // Local SCTP capabilities.
    _sctpCapabilities;
    // Observer instance.
    _observer = new y.EnhancedEventEmitter();
    /**
     * Create a new Device to connect to mediasoup server. It uses a more advanced
     * device detection.
     *
     * @throws {UnsupportedError} if device is not supported.
     */
    static async factory({ handlerName: i, handlerFactory: c } = {}) {
      if (u.debug("factory()"), i && c)
        throw new TypeError("just one of handlerName or handlerInterface can be given");
      if (!i && !c && (i = await E(), !i))
        throw new w.UnsupportedError("device not supported");
      return new Ut({ handlerName: i, handlerFactory: c });
    }
    /**
     * Create a new Device to connect to mediasoup server.
     *
     * @throws {UnsupportedError} if device is not supported.
     */
    constructor({ handlerName: i, handlerFactory: c } = {}) {
      if (u.debug("constructor()"), i && c)
        throw new TypeError("just one of handlerName or handlerInterface can be given");
      if (c)
        this._handlerFactory = c;
      else {
        if (i)
          u.debug("constructor() | handler given: %s", i);
        else if (i = l(), i)
          u.debug("constructor() | detected handler: %s", i);
        else
          throw new w.UnsupportedError("device not supported");
        switch (i) {
          case "Chrome111": {
            this._handlerFactory = _.Chrome111.createFactory();
            break;
          }
          case "Chrome74": {
            this._handlerFactory = m.Chrome74.createFactory();
            break;
          }
          case "Firefox120": {
            this._handlerFactory = g.Firefox120.createFactory();
            break;
          }
          case "Safari12": {
            this._handlerFactory = x.Safari12.createFactory();
            break;
          }
          case "ReactNative106": {
            this._handlerFactory = r.ReactNative106.createFactory();
            break;
          }
          default:
            throw new TypeError(`unknown handlerName "${i}"`);
        }
      }
      this._handlerName = this._handlerFactory.name;
    }
    /**
     * The RTC handler name.
     */
    get handlerName() {
      return this._handlerName;
    }
    /**
     * Whether the Device is loaded.
     */
    get loaded() {
      return this._loaded;
    }
    /**
     * RTP capabilities of the Device for receiving media.
     *
     * @throws {InvalidStateError} if not loaded.
     */
    get rtpCapabilities() {
      if (!this._loaded)
        throw new w.InvalidStateError("not loaded");
      return this._recvRtpCapabilities;
    }
    /**
     * SCTP capabilities of the Device.
     *
     * @throws {InvalidStateError} if not loaded.
     */
    get sctpCapabilities() {
      if (!this._loaded)
        throw new w.InvalidStateError("not loaded");
      return this._sctpCapabilities;
    }
    get observer() {
      return this._observer;
    }
    /**
     * Initialize the Device.
     */
    async load({ routerRtpCapabilities: i, preferLocalCodecsOrder: c = !1 }) {
      if (u.debug("load() [routerRtpCapabilities:%o]", i), this._loaded)
        throw new w.InvalidStateError("already loaded");
      const b = n.clone(i);
      T.validateAndNormalizeRtpCapabilities(b);
      const { getNativeRtpCapabilities: R, getNativeSctpCapabilities: I } = this._handlerFactory, M = n.clone(await R());
      T.validateAndNormalizeRtpCapabilities(M), u.debug("load() | got native RTP capabilities:%o", M), this._getSendExtendedRtpCapabilities = (D) => n.clone(T.getExtendedRtpCapabilities(D, b, c));
      const a = T.getExtendedRtpCapabilities(
        M,
        b,
        /* preferLocalCodecsOrder */
        !1
      );
      this._recvRtpCapabilities = T.getRecvRtpCapabilities(a), T.validateAndNormalizeRtpCapabilities(this._recvRtpCapabilities), u.debug("load() | got receiving RTP capabilities:%o", this._recvRtpCapabilities), this._canProduceByKind.audio = T.canSend("audio", this._recvRtpCapabilities), this._canProduceByKind.video = T.canSend("video", this._recvRtpCapabilities), this._sctpCapabilities = await I(), T.validateSctpCapabilities(this._sctpCapabilities), u.debug("load() | got native SCTP capabilities:%o", this._sctpCapabilities), u.debug("load() succeeded"), this._loaded = !0;
    }
    /**
     * Whether we can produce audio/video.
     *
     * @throws {InvalidStateError} if not loaded.
     * @throws {TypeError} if wrong arguments.
     */
    canProduce(i) {
      if (this._loaded) {
        if (i !== "audio" && i !== "video")
          throw new TypeError(`invalid kind "${i}"`);
      } else throw new w.InvalidStateError("not loaded");
      return this._canProduceByKind[i];
    }
    /**
     * Creates a Transport for sending media.
     *
     * @throws {InvalidStateError} if not loaded.
     * @throws {TypeError} if wrong arguments.
     */
    createSendTransport({ id: i, iceParameters: c, iceCandidates: b, dtlsParameters: R, sctpParameters: I, iceServers: M, iceTransportPolicy: a, additionalSettings: D, appData: P }) {
      return u.debug("createSendTransport()"), this.createTransport({
        direction: "send",
        id: i,
        iceParameters: c,
        iceCandidates: b,
        dtlsParameters: R,
        sctpParameters: I,
        iceServers: M,
        iceTransportPolicy: a,
        additionalSettings: D,
        appData: P
      });
    }
    /**
     * Creates a Transport for receiving media.
     *
     * @throws {InvalidStateError} if not loaded.
     * @throws {TypeError} if wrong arguments.
     */
    createRecvTransport({ id: i, iceParameters: c, iceCandidates: b, dtlsParameters: R, sctpParameters: I, iceServers: M, iceTransportPolicy: a, additionalSettings: D, appData: P }) {
      return u.debug("createRecvTransport()"), this.createTransport({
        direction: "recv",
        id: i,
        iceParameters: c,
        iceCandidates: b,
        dtlsParameters: R,
        sctpParameters: I,
        iceServers: M,
        iceTransportPolicy: a,
        additionalSettings: D,
        appData: P
      });
    }
    createTransport({ direction: i, id: c, iceParameters: b, iceCandidates: R, dtlsParameters: I, sctpParameters: M, iceServers: a, iceTransportPolicy: D, additionalSettings: P, appData: k }) {
      if (this._loaded) {
        if (typeof c != "string")
          throw new TypeError("missing id");
        if (typeof b != "object")
          throw new TypeError("missing iceParameters");
        if (Array.isArray(R)) {
          if (typeof I != "object")
            throw new TypeError("missing dtlsParameters");
          if (M && typeof M != "object")
            throw new TypeError("wrong sctpParameters");
          if (k && typeof k != "object")
            throw new TypeError("if given, appData must be an object");
        } else throw new TypeError("missing iceCandidates");
      } else throw new w.InvalidStateError("not loaded");
      const L = new C.Transport({
        direction: i,
        id: c,
        iceParameters: b,
        iceCandidates: R,
        dtlsParameters: I,
        sctpParameters: M,
        iceServers: a,
        iceTransportPolicy: D,
        additionalSettings: P,
        appData: k,
        handlerFactory: this._handlerFactory,
        getSendExtendedRtpCapabilities: this._getSendExtendedRtpCapabilities,
        recvRtpCapabilities: this._recvRtpCapabilities,
        canProduceByKind: this._canProduceByKind
      });
      return this._observer.safeEmit("newtransport", L), L;
    }
  };
  K.Device = S;
  function e(d, i) {
    u.debug('detectDeviceImpl() [userAgent:"%s", userAgentData:%o]', d, i);
    const c = t(d, i);
    if (c) {
      if (c >= 111)
        return u.debug("detectDeviceImpl() | using Chrome111 handler"), "Chrome111";
      if (c >= 74)
        return u.debug("detectDeviceImpl() | using Chrome74 handler"), "Chrome74";
      u.warn("detectDeviceImpl() | unsupported Chromium based browser/version");
      return;
    }
    const b = s(d);
    if (b) {
      if (b >= 120)
        return u.debug("detectDeviceImpl() | using Firefox120 handler"), "Firefox120";
      u.warn("detectDeviceImpl() | unsupported Firefox browser/version");
      return;
    }
    const R = o(d);
    if (R) {
      if (R >= 605)
        return u.debug("detectDeviceImpl() | using Safari12 handler"), "Safari12";
      u.warn("detectDeviceImpl() | unsupported desktop Safari browser/version");
      return;
    }
    const I = v(d);
    if (I) {
      if (I >= 605)
        return u.debug("detectDeviceImpl() | using Safari12 handler"), "Safari12";
      u.warn("detectDeviceImpl() | unsupported iOS Safari based browser/version");
      return;
    }
    if (h()) {
      if (typeof RTCPeerConnection < "u" && typeof RTCRtpTransceiver < "u")
        return u.debug("detectDeviceImpl() | using ReactNative106 handler"), "ReactNative106";
      u.warn("detectDeviceImpl() | unsupported react-native-webrtc version without RTCPeerConnection or RTCRtpTransceiver, forgot to call registerGlobals() on it?");
      return;
    }
    u.warn('detectDeviceImpl() | device not supported [userAgent:"%s", userAgentData:%o]', d, i);
  }
  function t(d, i) {
    if (u.debug("getChromiumMajorVersion()"), p(d, i)) {
      u.debug("getChromiumMajorVersion() | this is iOS => undefined");
      return;
    }
    if (h()) {
      u.debug("getChromiumMajorVersion() | this is React-Native => undefined");
      return;
    }
    if (i) {
      const b = (i.brands ?? []).find((R) => R.brand === "Chromium");
      if (b) {
        const R = Number(b.version);
        return u.debug(`getChromiumMajorVersion() | Chromium major version based on NavigatorUAData => ${R}`), R;
      }
    }
    const c = d?.match(/\b(?:Chrome|Chromium)\/(\w+)/i);
    if (c?.[1]) {
      const b = Number(c[1]);
      return u.debug(`getChromiumMajorVersion() | Chromium major version based on User-Agent => ${b}`), b;
    }
    u.debug("getChromiumMajorVersion() | this is not Chromium => undefined");
  }
  function s(d) {
    if (u.debug("getFirefoxMajorVersion()"), p(d)) {
      u.debug("getFirefoxMajorVersion() | this is iOS => undefined");
      return;
    }
    if (h()) {
      u.debug("getFirefoxMajorVersion() | this is React-Native => undefined");
      return;
    }
    const i = d?.match(/\bFirefox\/(\w+)/i);
    if (i?.[1]) {
      const c = Number(i[1]);
      return u.debug(`getFirefoxMajorVersion() | Firefox major version based on User-Agent => ${c}`), c;
    }
    u.debug("getFirefoxMajorVersion() | this is not Firefox => undefined");
  }
  function o(d) {
    if (u.debug("getMacOSWebKitMajorVersion()"), p(d)) {
      u.debug("getMacOSWebKitMajorVersion() | this is iOS => undefined");
      return;
    }
    if (h()) {
      u.debug("getMacOSWebKitMajorVersion() | this is React-Native => undefined");
      return;
    }
    if (!(d && /\bSafari\b/i.test(d) && !/\bChrome\b/i.test(d) && !/\bChromium\b/i.test(d) && !/\bFirefox\b/i.test(d))) {
      u.debug("getMacOSWebKitMajorVersion() | this is not Safari => undefined");
      return;
    }
    const c = d.match(/AppleWebKit\/(\w+)/i);
    if (c?.[1]) {
      const b = Number(c[1]);
      return u.debug(`getMacOSWebKitMajorVersion() | WebKit major version based on User-Agent => ${b}`), b;
    }
    u.debug("getMacOSWebKitMajorVersion() | this is not WebKit => undefined");
  }
  function v(d) {
    if (u.debug("getIOSWebKitMajorVersion()"), !p(d)) {
      u.debug("getIOSWebKitMajorVersion() | this is not iOS => undefined");
      return;
    }
    if (h()) {
      u.debug("getIOSWebKitMajorVersion() | this is React-Native => undefined");
      return;
    }
    const i = d?.match(/AppleWebKit\/(\w+)/i);
    if (i?.[1]) {
      const c = Number(i[1]);
      return u.debug(`getIOSWebKitMajorVersion() | WebKit major version based on User-Agent => ${c}`), c;
    }
    u.debug("getIOSWebKitMajorVersion() | this is not WebKit => undefined");
  }
  function p(d, i) {
    return u.debug("isIOS()"), i?.platform === "iOS" ? (u.debug("isIOS() | this is iOS based on NavigatorUAData.platform => true"), !0) : i?.platform ? (u.debug("isIOS() | this is not iOS based on NavigatorUAData.platform => false"), !1) : d && /iPad|iPhone|iPod/.test(d) ? (u.debug("isIOS() | this is iOS based on User-Agent => true"), !0) : typeof navigator == "object" && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 ? (u.debug("isIOS() | this is iPadOS 13+ based on User-Agent => true"), !0) : (u.debug("isIOS() | this is not iOS => false"), !1);
  }
  function h() {
    return u.debug("isReactNative()"), typeof navigator == "object" && navigator.product === "ReactNative" ? (u.debug("isReactNative() | this is React-Native based on navigator.product"), !0) : (u.debug("isReactNative() | this is not React-Native => false"), !1);
  }
  return K;
}
var we = {}, be = {}, Ge = {}, Mt;
function gr() {
  if (Mt) return Ge;
  Mt = 1;
  for (var f = 256, y = [], w; f--; ) y[f] = (f + 256).toString(16).substring(1);
  function n() {
    var T = 0, C, _ = "";
    if (!w || f + 16 > 256) {
      for (w = Array(T = 256); T--; ) w[T] = 256 * Math.random() | 0;
      T = f = 0;
    }
    for (; T < 16; T++)
      C = w[f + T], T == 6 ? _ += y[C & 15 | 64] : T == 8 ? _ += y[C & 63 | 128] : _ += y[C], T & 1 && T > 1 && T < 11 && (_ += "-");
    return f++, _;
  }
  return Ge.v4 = n, Ge;
}
var ye = {}, Ot;
function _r() {
  if (Ot) return ye;
  Ot = 1, Object.defineProperty(ye, "__esModule", { value: !0 }), ye.FakeEventTarget = void 0;
  class f {
    listeners = {};
    addEventListener(w, n, T) {
      n && (this.listeners[w] = this.listeners[w] ?? [], this.listeners[w].push({
        callback: (
          // eslint-disable-next-line @typescript-eslint/unbound-method
          typeof n == "function" ? n : n.handleEvent
        ),
        once: typeof T == "object" && T.once === !0
      }));
    }
    removeEventListener(w, n, T) {
      this.listeners[w] && n && (this.listeners[w] = this.listeners[w].filter((C) => C.callback !== // eslint-disable-next-line @typescript-eslint/unbound-method
      (typeof n == "function" ? n : n.handleEvent)));
    }
    dispatchEvent(w) {
      if (!w || typeof w.type != "string")
        throw new Error("invalid event object");
      const n = this.listeners[w.type];
      if (!n)
        return !0;
      for (const T of [...n]) {
        try {
          T.callback.call(this, w);
        } catch (C) {
          setTimeout(() => {
            throw C;
          }, 0);
        }
        T.once && this.removeEventListener(w.type, T.callback);
      }
      return !w.defaultPrevented;
    }
  }
  return ye.FakeEventTarget = f, ye;
}
var Se = {}, Ft;
function vr() {
  if (Ft) return Se;
  Ft = 1, Object.defineProperty(Se, "__esModule", { value: !0 }), Se.FakeEvent = void 0;
  let f = class {
    /**
     * Constants.
     */
    NONE = 0;
    CAPTURING_PHASE = 1;
    AT_TARGET = 2;
    BUBBLING_PHASE = 3;
    /**
     * Members.
     */
    type;
    bubbles;
    cancelable;
    defaultPrevented = !1;
    composed = !1;
    currentTarget = null;
    // Not implemented.
    eventPhase = this.NONE;
    isTrusted = !0;
    target = null;
    timeStamp = 0;
    // Deprecated.
    cancelBubble = !1;
    returnValue = !0;
    srcElement = null;
    constructor(w, n = {}) {
      this.type = w, this.bubbles = n.bubbles ?? !1, this.cancelable = n.cancelable ?? !1;
    }
    preventDefault() {
      this.cancelable && (this.defaultPrevented = !0);
    }
    /**
     * Not implemented.
     */
    stopPropagation() {
    }
    /**
     * Not implemented.
     */
    stopImmediatePropagation() {
    }
    /**
     * Not implemented.
     */
    composedPath() {
      return [];
    }
    /**
     * Not implemented.
     * @deprecated
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initEvent(w, n, T) {
    }
  };
  return Se.FakeEvent = f, Se;
}
var Le = {}, Nt;
function wr() {
  if (Nt) return Le;
  Nt = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.clone = f;
  function f(y) {
    if (y !== void 0)
      return Number.isNaN(y) ? NaN : typeof structuredClone == "function" ? structuredClone(y) : JSON.parse(JSON.stringify(y));
  }
  return Le;
}
var jt;
function br() {
  if (jt) return be;
  jt = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.FakeMediaStreamTrack = void 0;
  const f = gr(), y = _r(), w = vr(), n = wr();
  class T extends y.FakeEventTarget {
    #m;
    #l;
    #u;
    #e;
    #r;
    #t;
    #s;
    #h;
    #i;
    #f;
    #n;
    // Events.
    #a = null;
    #o = null;
    #c = null;
    // Custom events.
    #d = null;
    #p = null;
    constructor({ kind: _, id: m, label: g, contentHint: x, enabled: r, muted: u, readyState: l, capabilities: E, constraints: S, settings: e, data: t }) {
      super(), this.#m = m ?? (0, f.v4)(), this.#l = _, this.#u = g ?? "", this.#s = x ?? "", this.#r = r ?? !0, this.#t = u ?? !1, this.#e = l ?? "live", this.#h = E ?? {}, this.#i = S ?? {}, this.#f = e ?? {}, this.#n = t ?? {};
    }
    get id() {
      return this.#m;
    }
    get kind() {
      return this.#l;
    }
    get label() {
      return this.#u;
    }
    get contentHint() {
      return this.#s;
    }
    set contentHint(_) {
      this.#s = _;
    }
    get enabled() {
      return this.#r;
    }
    /**
     * Changes `enabled` member value and fires a custom "enabledchange" event.
     */
    set enabled(_) {
      const m = this.#r !== _;
      this.#r = _, m && this.dispatchEvent(new w.FakeEvent("enabledchange"));
    }
    get muted() {
      return this.#t;
    }
    get readyState() {
      return this.#e;
    }
    /**
     * Application custom data getter.
     */
    get data() {
      return this.#n;
    }
    /**
     * Application custom data setter.
     */
    set data(_) {
      this.#n = _;
    }
    get onmute() {
      return this.#a;
    }
    set onmute(_) {
      this.#a && this.removeEventListener("mute", this.#a), this.#a = _, _ && this.addEventListener("mute", _);
    }
    get onunmute() {
      return this.#o;
    }
    set onunmute(_) {
      this.#o && this.removeEventListener("unmute", this.#o), this.#o = _, _ && this.addEventListener("unmute", _);
    }
    get onended() {
      return this.#c;
    }
    set onended(_) {
      this.#c && this.removeEventListener("ended", this.#c), this.#c = _, _ && this.addEventListener("ended", _);
    }
    get onenabledchange() {
      return this.#d;
    }
    set onenabledchange(_) {
      this.#d && this.removeEventListener("enabledchange", this.#d), this.#d = _, _ && this.addEventListener("enabledchange", _);
    }
    get onstopped() {
      return this.#p;
    }
    set onstopped(_) {
      this.#p && this.removeEventListener("stopped", this.#p), this.#p = _, _ && this.addEventListener("stopped", _);
    }
    addEventListener(_, m, g) {
      super.addEventListener(_, m, g);
    }
    removeEventListener(_, m, g) {
      super.removeEventListener(_, m, g);
    }
    /**
     * Changes `readyState` member to "ended" and fires a custom "stopped" event
     * (if not already stopped).
     */
    stop() {
      this.#e !== "ended" && (this.#e = "ended", this.dispatchEvent(new w.FakeEvent("stopped")));
    }
    /**
     * Clones current track into another FakeMediaStreamTrack. `id` and `data`
     * can be optionally given.
     */
    clone({ id: _, data: m } = {}) {
      return new T({
        id: _ ?? (0, f.v4)(),
        kind: this.#l,
        label: this.#u,
        contentHint: this.#s,
        enabled: this.#r,
        muted: this.#t,
        readyState: this.#e,
        capabilities: (0, n.clone)(this.#h),
        constraints: (0, n.clone)(this.#i),
        settings: (0, n.clone)(this.#f),
        data: m ?? (0, n.clone)(this.#n)
      });
    }
    getCapabilities() {
      return this.#h;
    }
    getConstraints() {
      return this.#i;
    }
    async applyConstraints(_ = {}) {
      return this.#i = _, Promise.resolve();
    }
    getSettings() {
      return this.#f;
    }
    /**
     * Simulates a remotely triggered stop. It fires a custom "stopped" event and
     * the standard "ended" event (if the track was not already stopped).
     */
    remoteStop() {
      this.#e !== "ended" && (this.#e = "ended", this.dispatchEvent(new w.FakeEvent("stopped")), this.dispatchEvent(new w.FakeEvent("ended")));
    }
    /**
     * Simulates a remotely triggered mute. It fires a "mute" event (if the track
     * was not already muted).
     */
    remoteMute() {
      this.#t || (this.#t = !0, this.dispatchEvent(new w.FakeEvent("mute")));
    }
    /**
     * Simulates a remotely triggered unmute. It fires an "unmute" event (if the
     * track was muted).
     */
    remoteUnmute() {
      this.#t && (this.#t = !1, this.dispatchEvent(new w.FakeEvent("unmute")));
    }
  }
  return be.FakeMediaStreamTrack = T, be;
}
var Ce = {}, At;
function yr() {
  if (At) return Ce;
  At = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.FakeEventTarget = void 0;
  let f = class {
    listeners = {};
    addEventListener(w, n, T) {
      n && (this.listeners[w] = this.listeners[w] ?? [], this.listeners[w].push({
        callback: typeof n == "function" ? n : n.handleEvent,
        once: typeof T == "object" && T.once === !0
      }));
    }
    removeEventListener(w, n, T) {
      this.listeners[w] && n && (this.listeners[w] = this.listeners[w].filter((C) => C.callback !== (typeof n == "function" ? n : n.handleEvent)));
    }
    dispatchEvent(w) {
      if (!w || typeof w.type != "string")
        throw new Error("invalid event object");
      const n = this.listeners[w.type];
      if (!n)
        return !0;
      for (const T of [...n]) {
        try {
          T.callback.call(this, w);
        } catch (C) {
          setTimeout(() => {
            throw C;
          }, 0);
        }
        T.once && this.removeEventListener(w.type, T.callback);
      }
      return !w.defaultPrevented;
    }
  };
  return Ce.FakeEventTarget = f, Ce;
}
var zt;
function Sr() {
  if (zt) return we;
  zt = 1, Object.defineProperty(we, "__esModule", { value: !0 }), we.FakeHandler = void 0;
  const f = br(), y = $(), w = z(), n = ee(), T = V(), C = U(), _ = yr(), m = new w.Logger("FakeHandler"), g = "FakeHandler";
  let x = class je extends y.EnhancedEventEmitter {
    // Closed flag.
    _closed = !1;
    // Fake parameters source of RTP and SCTP parameters and capabilities.
    _fakeParameters;
    // Callback to request sending extended RTP capabilities on demand.
    _getSendExtendedRtpCapabilities;
    // Local RTCP CNAME.
    _cname = `CNAME-${n.generateRandomNumber()}`;
    // Default sending MediaStream id.
    _defaultSendStreamId = `${n.generateRandomNumber()}`;
    // Got transport local and remote parameters.
    _transportReady = !1;
    // Next localId.
    _nextLocalId = 1;
    // Sending and receiving tracks indexed by localId.
    _tracks = /* @__PURE__ */ new Map();
    // DataChannel id value counter. It must be incremented for each new DataChannel.
    _nextSctpStreamId = 0;
    /**
     * Creates a factory function.
     */
    static createFactory(l) {
      return {
        name: g,
        factory: (E) => new je(E, l),
        getNativeRtpCapabilities: async () => (m.debug("getNativeRtpCapabilities()"), je.getLocalRtpCapabilities(l)),
        getNativeSctpCapabilities: async () => (m.debug("getNativeSctpCapabilities()"), l.generateNativeSctpCapabilities())
      };
    }
    static getLocalRtpCapabilities(l) {
      const E = l.generateNativeRtpCapabilities();
      return T.validateAndNormalizeRtpCapabilities(E), E;
    }
    constructor({
      // direction,
      // iceParameters,
      // iceCandidates,
      // dtlsParameters,
      // sctpParameters,
      // iceServers,
      // iceTransportPolicy,
      // additionalSettings,
      getSendExtendedRtpCapabilities: l
    }, E) {
      super(), m.debug("constructor()"), this._getSendExtendedRtpCapabilities = l, this._fakeParameters = E;
    }
    get name() {
      return g;
    }
    close() {
      m.debug("close()"), !this._closed && (this._closed = !0, super.close());
    }
    // NOTE: Custom method for simulation purposes.
    setIceGatheringState(l) {
      this.emit("@icegatheringstatechange", l);
    }
    // NOTE: Custom method for simulation purposes.
    setConnectionState(l) {
      this.emit("@connectionstatechange", l);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateIceServers(l) {
      this.assertNotClosed(), m.debug("updateIceServers()");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async restartIce(l) {
      this.assertNotClosed(), m.debug("restartIce()");
    }
    async getTransportStats() {
      return this.assertNotClosed(), /* @__PURE__ */ new Map();
    }
    async send({ track: l, streamId: E, encodings: S, codecOptions: e, codec: t }) {
      this.assertNotClosed(), m.debug("send() [kind:%s, track.id:%s]", l.kind, l.id), this._transportReady || await this.setupTransport({ localDtlsRole: "server" });
      const s = je.getLocalRtpCapabilities(this._fakeParameters), o = this._getSendExtendedRtpCapabilities(s), v = T.getSendingRtpParameters(l.kind, o);
      v.codecs = T.reduceCodecs(v.codecs, t);
      const p = v.codecs.some((d) => /.+\/rtx$/i.test(d.mimeType));
      v.mid = `mid-${n.generateRandomNumber()}`, v.msid = `${E ?? "-"} ${l.id}`, S || (S = [{}]);
      for (const d of S)
        d.ssrc = n.generateRandomNumber(), p && (d.rtx = { ssrc: n.generateRandomNumber() });
      v.encodings = S, v.rtcp = {
        cname: this._cname,
        reducedSize: !0,
        mux: !0
      }, v.msid = `${E ?? this._defaultSendStreamId} ${l.id}`;
      const h = this._nextLocalId++;
      return this._tracks.set(h, l), { localId: String(h), rtpParameters: v };
    }
    async stopSending(l) {
      if (m.debug("stopSending() [localId:%s]", l), !this._closed) {
        if (!this._tracks.has(Number(l)))
          throw new Error("local track not found");
        this._tracks.delete(Number(l));
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async pauseSending(l) {
      this.assertNotClosed();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async resumeSending(l) {
      this.assertNotClosed();
    }
    async replaceTrack(l, E) {
      this.assertNotClosed(), E ? m.debug("replaceTrack() [localId:%s, track.id:%s]", l, E.id) : m.debug("replaceTrack() [localId:%s, no track]", l), this._tracks.delete(Number(l)), this._tracks.set(Number(l), E);
    }
    async setMaxSpatialLayer(l, E) {
      this.assertNotClosed(), m.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", l, E);
    }
    async setRtpEncodingParameters(l, E) {
      this.assertNotClosed(), m.debug("setRtpEncodingParameters() [localId:%s, params:%o]", l, E);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getSenderStats(l) {
      return this.assertNotClosed(), /* @__PURE__ */ new Map();
    }
    async sendDataChannel({ ordered: l, maxPacketLifeTime: E, maxRetransmits: S, label: e, protocol: t }) {
      this.assertNotClosed(), this._transportReady || await this.setupTransport({ localDtlsRole: "server" }), m.debug("sendDataChannel()");
      const s = new r({
        id: this._nextSctpStreamId++,
        ordered: l,
        maxPacketLifeTime: E,
        maxRetransmits: S,
        label: e,
        protocol: t
      }), o = {
        streamId: this._nextSctpStreamId,
        ordered: l,
        maxPacketLifeTime: E,
        maxRetransmits: S
      };
      return { dataChannel: s, sctpStreamParameters: o };
    }
    async receive(l) {
      this.assertNotClosed();
      const E = [];
      for (const S of l) {
        const { trackId: e, kind: t } = S;
        this._transportReady || await this.setupTransport({ localDtlsRole: "client" }), m.debug("receive() [trackId:%s, kind:%s]", e, t);
        const s = this._nextLocalId++, o = new f.FakeMediaStreamTrack({ kind: t });
        this._tracks.set(s, o), E.push({ localId: String(s), track: o });
      }
      return E;
    }
    async stopReceiving(l) {
      if (!this._closed)
        for (const E of l)
          m.debug("stopReceiving() [localId:%s]", E), this._tracks.delete(Number(E));
    }
    async pauseReceiving(l) {
      this.assertNotClosed();
    }
    async resumeReceiving(l) {
      this.assertNotClosed();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getReceiverStats(l) {
      return this.assertNotClosed(), /* @__PURE__ */ new Map();
    }
    async receiveDataChannel({ sctpStreamParameters: l, label: E, protocol: S }) {
      return this.assertNotClosed(), this._transportReady || await this.setupTransport({ localDtlsRole: "client" }), m.debug("receiveDataChannel()"), { dataChannel: new r({
        id: l.streamId,
        ordered: l.ordered,
        maxPacketLifeTime: l.maxPacketLifeTime,
        maxRetransmits: l.maxRetransmits,
        label: E,
        protocol: S
      }) };
    }
    async setupTransport({
      localDtlsRole: l,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      localSdpObject: E
    }) {
      const S = n.clone(this._fakeParameters.generateLocalDtlsParameters());
      l && (S.role = l), this.emit("@connectionstatechange", "connecting"), await new Promise((e, t) => this.emit("@connect", { dtlsParameters: S }, e, t)), this._transportReady = !0;
    }
    assertNotClosed() {
      if (this._closed)
        throw new C.InvalidStateError("method called in a closed handler");
    }
  };
  we.FakeHandler = x;
  class r extends _.FakeEventTarget {
    // Members for RTCDataChannel standard public getters/setters.
    _id;
    _negotiated = !0;
    // mediasoup just uses negotiated DataChannels.
    _ordered;
    _maxPacketLifeTime;
    _maxRetransmits;
    _label;
    _protocol;
    _readyState = "connecting";
    _bufferedAmount = 0;
    _bufferedAmountLowThreshold = 0;
    _binaryType = "arraybuffer";
    // Events.
    _onopen = null;
    _onclosing = null;
    _onclose = null;
    _onmessage = null;
    _onbufferedamountlow = null;
    _onerror = null;
    constructor({ id: l, ordered: E = !0, maxPacketLifeTime: S = null, maxRetransmits: e = null, label: t = "", protocol: s = "" }) {
      super(), m.debug(`constructor() [id:${l}, ordered:${E}, maxPacketLifeTime:${S}, maxRetransmits:${e}, label:${t}, protocol:${s}`), this._id = l, this._ordered = E, this._maxPacketLifeTime = S, this._maxRetransmits = e, this._label = t, this._protocol = s;
    }
    get id() {
      return this._id;
    }
    get negotiated() {
      return this._negotiated;
    }
    get ordered() {
      return this._ordered;
    }
    get maxPacketLifeTime() {
      return this._maxPacketLifeTime;
    }
    get maxRetransmits() {
      return this._maxRetransmits;
    }
    get label() {
      return this._label;
    }
    get protocol() {
      return this._protocol;
    }
    get readyState() {
      return this._readyState;
    }
    get bufferedAmount() {
      return this._bufferedAmount;
    }
    get bufferedAmountLowThreshold() {
      return this._bufferedAmountLowThreshold;
    }
    set bufferedAmountLowThreshold(l) {
      this._bufferedAmountLowThreshold = l;
    }
    get binaryType() {
      return this._binaryType;
    }
    set binaryType(l) {
      this._binaryType = l;
    }
    get onopen() {
      return this._onopen;
    }
    set onopen(l) {
      this._onopen && this.removeEventListener("open", this._onopen), this._onopen = l, l && this.addEventListener("open", l);
    }
    get onclosing() {
      return this._onclosing;
    }
    set onclosing(l) {
      this._onclosing && this.removeEventListener("closing", this._onclosing), this._onclosing = l, l && this.addEventListener("closing", l);
    }
    get onclose() {
      return this._onclose;
    }
    set onclose(l) {
      this._onclose && this.removeEventListener("close", this._onclose), this._onclose = l, l && this.addEventListener("close", l);
    }
    get onmessage() {
      return this._onmessage;
    }
    set onmessage(l) {
      this._onmessage && this.removeEventListener("message", this._onmessage), this._onmessage = l, l && this.addEventListener("message", l);
    }
    get onbufferedamountlow() {
      return this._onbufferedamountlow;
    }
    set onbufferedamountlow(l) {
      this._onbufferedamountlow && this.removeEventListener("bufferedamountlow", this._onbufferedamountlow), this._onbufferedamountlow = l, l && this.addEventListener("bufferedamountlow", l);
    }
    get onerror() {
      return this._onerror;
    }
    set onerror(l) {
      this._onerror && this.removeEventListener("error", this._onerror), this._onerror = l, l && this.addEventListener("error", l);
    }
    addEventListener(l, E, S) {
      super.addEventListener(l, E, S);
    }
    removeEventListener(l, E, S) {
      super.removeEventListener(l, E, S);
    }
    close() {
      ["closing", "closed"].includes(this._readyState) || (this._readyState = "closed");
    }
    /**
     * We extend the definition of send() to allow Node Buffer. However
     * ArrayBufferView and Blob do not exist in Node.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    send(l) {
      if (this._readyState !== "open")
        throw new C.InvalidStateError("not open");
    }
  }
  return we;
}
var q = {}, $t;
function Cr() {
  if ($t) return q;
  $t = 1, Object.defineProperty(q, "__esModule", { value: !0 }), q.generateRouterRtpCapabilities = w, q.generateNativeRtpCapabilities = n, q.generateNativeSctpCapabilities = T, q.generateLocalDtlsParameters = C, q.generateTransportRemoteParameters = _, q.generateProducerRemoteParameters = m, q.generateConsumerRemoteParameters = g, q.generateDataProducerRemoteParameters = x, q.generateDataConsumerRemoteParameters = r;
  const f = ee();
  function y() {
    return String(f.generateRandomNumber());
  }
  function w() {
    return f.deepFreeze({
      codecs: [
        {
          mimeType: "audio/opus",
          kind: "audio",
          preferredPayloadType: 100,
          clockRate: 48e3,
          channels: 2,
          rtcpFeedback: [{ type: "transport-cc" }],
          parameters: {
            useinbandfec: 1,
            foo: "bar"
          }
        },
        {
          mimeType: "video/VP8",
          kind: "video",
          preferredPayloadType: 101,
          clockRate: 9e4,
          rtcpFeedback: [
            { type: "nack" },
            { type: "nack", parameter: "pli" },
            { type: "ccm", parameter: "fir" },
            { type: "goog-remb" },
            { type: "transport-cc" }
          ],
          parameters: {
            "x-google-start-bitrate": 1500
          }
        },
        {
          mimeType: "video/rtx",
          kind: "video",
          preferredPayloadType: 102,
          clockRate: 9e4,
          rtcpFeedback: [],
          parameters: {
            apt: 101
          }
        },
        {
          mimeType: "video/H264",
          kind: "video",
          preferredPayloadType: 103,
          clockRate: 9e4,
          rtcpFeedback: [
            { type: "nack" },
            { type: "nack", parameter: "pli" },
            { type: "ccm", parameter: "fir" },
            { type: "goog-remb" },
            { type: "transport-cc" }
          ],
          parameters: {
            "level-asymmetry-allowed": 1,
            "packetization-mode": 1,
            "profile-level-id": "42e01f"
          }
        },
        {
          mimeType: "video/rtx",
          kind: "video",
          preferredPayloadType: 104,
          clockRate: 9e4,
          rtcpFeedback: [],
          parameters: {
            apt: 103
          }
        },
        {
          mimeType: "video/VP9",
          kind: "video",
          preferredPayloadType: 105,
          clockRate: 9e4,
          rtcpFeedback: [
            { type: "nack" },
            { type: "nack", parameter: "pli" },
            { type: "ccm", parameter: "fir" },
            { type: "goog-remb" },
            { type: "transport-cc" }
          ],
          parameters: {
            "profile-id": 0,
            "x-google-start-bitrate": 1500
          }
        },
        {
          mimeType: "video/rtx",
          kind: "video",
          preferredPayloadType: 106,
          clockRate: 9e4,
          rtcpFeedback: [],
          parameters: {
            apt: 105
          }
        }
      ],
      headerExtensions: [
        {
          kind: "audio",
          uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
          preferredId: 1,
          preferredEncrypt: !1,
          direction: "sendrecv"
        },
        {
          kind: "video",
          uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
          preferredId: 1,
          preferredEncrypt: !1,
          direction: "sendrecv"
        },
        {
          kind: "video",
          uri: "urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id",
          preferredId: 2,
          preferredEncrypt: !1,
          direction: "recvonly"
        },
        {
          kind: "video",
          uri: "urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id",
          preferredId: 3,
          preferredEncrypt: !1,
          direction: "recvonly"
        },
        {
          kind: "audio",
          uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
          preferredId: 4,
          preferredEncrypt: !1,
          direction: "sendrecv"
        },
        {
          kind: "video",
          uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
          preferredId: 4,
          preferredEncrypt: !1,
          direction: "sendrecv"
        },
        {
          kind: "audio",
          uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
          preferredId: 5,
          preferredEncrypt: !1,
          direction: "recvonly"
        },
        {
          kind: "video",
          uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
          preferredId: 5,
          preferredEncrypt: !1,
          direction: "sendrecv"
        },
        {
          kind: "audio",
          uri: "urn:ietf:params:rtp-hdrext:ssrc-audio-level",
          preferredId: 10,
          preferredEncrypt: !1,
          direction: "sendrecv"
        },
        {
          kind: "video",
          uri: "urn:3gpp:video-orientation",
          preferredId: 11,
          preferredEncrypt: !1,
          direction: "sendrecv"
        },
        {
          kind: "video",
          uri: "urn:ietf:params:rtp-hdrext:toffset",
          preferredId: 12,
          preferredEncrypt: !1,
          direction: "sendrecv"
        }
      ]
    });
  }
  function n() {
    return {
      codecs: [
        {
          mimeType: "audio/opus",
          kind: "audio",
          preferredPayloadType: 111,
          clockRate: 48e3,
          channels: 2,
          rtcpFeedback: [{ type: "transport-cc" }],
          parameters: {
            minptime: 10,
            useinbandfec: 1
          }
        },
        {
          mimeType: "audio/ISAC",
          kind: "audio",
          preferredPayloadType: 103,
          clockRate: 16e3,
          channels: 1,
          rtcpFeedback: [{ type: "transport-cc" }],
          parameters: {}
        },
        {
          mimeType: "audio/CN",
          kind: "audio",
          preferredPayloadType: 106,
          clockRate: 32e3,
          channels: 1,
          rtcpFeedback: [{ type: "transport-cc" }],
          parameters: {}
        },
        {
          mimeType: "audio/foo",
          kind: "audio",
          preferredPayloadType: 107,
          clockRate: 9e4,
          channels: 4,
          rtcpFeedback: [{ type: "foo-qwe-qwe" }],
          parameters: {
            foo: "lalala"
          }
        },
        {
          mimeType: "video/BAZCODEC",
          kind: "video",
          preferredPayloadType: 100,
          clockRate: 9e4,
          rtcpFeedback: [
            { type: "foo" },
            { type: "transport-cc" },
            { type: "ccm", parameter: "fir" },
            { type: "nack" },
            { type: "nack", parameter: "pli" }
          ],
          parameters: {
            baz: "1234abcd"
          }
        },
        {
          mimeType: "video/rtx",
          kind: "video",
          preferredPayloadType: 101,
          clockRate: 9e4,
          rtcpFeedback: [],
          parameters: {
            apt: 100
          }
        },
        {
          mimeType: "video/VP8",
          kind: "video",
          preferredPayloadType: 96,
          clockRate: 9e4,
          rtcpFeedback: [
            { type: "goog-remb" },
            { type: "transport-cc" },
            { type: "ccm", parameter: "fir" },
            { type: "nack" },
            { type: "nack", parameter: "pli" }
          ],
          parameters: {
            baz: "1234abcd"
          }
        },
        {
          mimeType: "video/rtx",
          kind: "video",
          preferredPayloadType: 97,
          clockRate: 9e4,
          rtcpFeedback: [],
          parameters: {
            apt: 96
          }
        },
        {
          mimeType: "video/VP9",
          kind: "video",
          preferredPayloadType: 98,
          clockRate: 9e4,
          rtcpFeedback: [
            { type: "goog-remb" },
            { type: "transport-cc" },
            { type: "ccm", parameter: "fir" },
            { type: "nack" },
            { type: "nack", parameter: "pli" }
          ],
          parameters: {
            "profile-id": 0
          }
        },
        {
          mimeType: "video/rtx",
          kind: "video",
          preferredPayloadType: 99,
          clockRate: 9e4,
          rtcpFeedback: [],
          parameters: {
            apt: 98
          }
        }
      ],
      headerExtensions: [
        {
          kind: "audio",
          uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
          preferredId: 1
        },
        {
          kind: "video",
          uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
          preferredId: 1
        },
        {
          kind: "video",
          uri: "urn:ietf:params:rtp-hdrext:toffset",
          preferredId: 2
        },
        {
          kind: "video",
          uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
          preferredId: 3
        },
        {
          kind: "video",
          uri: "urn:3gpp:video-orientation",
          preferredId: 4
        },
        {
          kind: "video",
          uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
          preferredId: 5
        },
        {
          kind: "video",
          uri: "http://www.webrtc.org/experiments/rtp-hdrext/playout-delay",
          preferredId: 6
        },
        {
          kind: "video",
          // @ts-expect-error --- ON purpose.
          uri: "http://www.webrtc.org/experiments/rtp-hdrext/video-content-type",
          preferredId: 7
        },
        {
          kind: "video",
          // @ts-expect-error --- ON purpose.
          uri: "http://www.webrtc.org/experiments/rtp-hdrext/video-timing",
          preferredId: 8
        },
        {
          kind: "audio",
          uri: "urn:ietf:params:rtp-hdrext:ssrc-audio-level",
          preferredId: 10
        }
      ]
    };
  }
  function T() {
    return f.deepFreeze({
      numStreams: { OS: 2048, MIS: 2048 }
    });
  }
  function C() {
    return f.deepFreeze({
      fingerprints: [
        {
          algorithm: "sha-256",
          value: "82:5A:68:3D:36:C3:0A:DE:AF:E7:32:43:D2:88:83:57:AC:2D:65:E5:80:C4:B6:FB:AF:1A:A0:21:9F:6D:0C:AD"
        }
      ],
      role: "auto"
    });
  }
  function _() {
    return {
      id: y(),
      iceParameters: f.deepFreeze({
        iceLite: !0,
        password: "yku5ej8nvfaor28lvtrabcx0wkrpkztz",
        usernameFragment: "h3hk1iz6qqlnqlne"
      }),
      iceCandidates: f.deepFreeze([
        {
          foundation: "udpcandidate",
          address: "9.9.9.9",
          ip: "9.9.9.9",
          port: 40533,
          priority: 1078862079,
          protocol: "udp",
          type: "host",
          tcpType: "passive"
        },
        {
          foundation: "udpcandidate",
          address: "9.9.9.9",
          ip: "9:9:9:9:9:9",
          port: 41333,
          priority: 1078862089,
          protocol: "udp",
          type: "host",
          tcpType: "passive"
        }
      ]),
      dtlsParameters: f.deepFreeze({
        fingerprints: [
          {
            algorithm: "sha-256",
            value: "A9:F4:E0:D2:74:D3:0F:D9:CA:A5:2F:9F:7F:47:FA:F0:C4:72:DD:73:49:D0:3B:14:90:20:51:30:1B:90:8E:71"
          },
          {
            algorithm: "sha-384",
            value: "03:D9:0B:87:13:98:F6:6D:BC:FC:92:2E:39:D4:E1:97:32:61:30:56:84:70:81:6E:D1:82:97:EA:D9:C1:21:0F:6B:C5:E7:7F:E1:97:0C:17:97:6E:CF:B3:EF:2E:74:B0"
          },
          {
            algorithm: "sha-512",
            value: "84:27:A4:28:A4:73:AF:43:02:2A:44:68:FF:2F:29:5C:3B:11:9A:60:F4:A8:F0:F5:AC:A0:E3:49:3E:B1:34:53:A9:85:CE:51:9B:ED:87:5E:B8:F4:8E:3D:FA:20:51:B8:96:EE:DA:56:DC:2F:5C:62:79:15:23:E0:21:82:2B:2C"
          }
        ],
        role: "auto"
      }),
      sctpParameters: f.deepFreeze({
        port: 5e3,
        OS: 2048,
        MIS: 2048,
        maxMessageSize: 2e6
      })
    };
  }
  function m() {
    return f.deepFreeze({
      id: y()
    });
  }
  function g({ id: u, codecMimeType: l } = {}) {
    switch (l) {
      case "audio/opus":
        return {
          id: u ?? y(),
          producerId: y(),
          kind: "audio",
          rtpParameters: f.deepFreeze({
            codecs: [
              {
                mimeType: "audio/opus",
                payloadType: 100,
                clockRate: 48e3,
                channels: 2,
                rtcpFeedback: [{ type: "transport-cc" }],
                parameters: {
                  useinbandfec: 1,
                  foo: "bar"
                }
              }
            ],
            encodings: [
              {
                ssrc: 46687003
              }
            ],
            headerExtensions: [
              {
                uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                id: 1
              },
              {
                uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
                id: 5
              },
              {
                uri: "urn:ietf:params:rtp-hdrext:ssrc-audio-level",
                id: 10
              }
            ],
            rtcp: {
              cname: "wB4Ql4lrsxYLjzuN",
              reducedSize: !0,
              mux: !0
            }
          })
        };
      case "audio/ISAC":
        return {
          id: u ?? y(),
          producerId: y(),
          kind: "audio",
          rtpParameters: f.deepFreeze({
            codecs: [
              {
                mimeType: "audio/ISAC",
                payloadType: 111,
                clockRate: 16e3,
                channels: 1,
                rtcpFeedback: [{ type: "transport-cc" }],
                parameters: {}
              }
            ],
            encodings: [
              {
                ssrc: 46687004
              }
            ],
            headerExtensions: [
              {
                uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                id: 1
              },
              {
                uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
                id: 5
              }
            ],
            rtcp: {
              cname: "wB4Ql4lrsxYLjzuN",
              reducedSize: !0,
              mux: !0
            }
          })
        };
      case "video/VP8":
        return {
          id: u ?? y(),
          producerId: y(),
          kind: "video",
          rtpParameters: f.deepFreeze({
            codecs: [
              {
                mimeType: "video/VP8",
                payloadType: 101,
                clockRate: 9e4,
                rtcpFeedback: [
                  { type: "nack" },
                  { type: "nack", parameter: "pli" },
                  { type: "ccm", parameter: "fir" },
                  { type: "goog-remb" },
                  { type: "transport-cc" }
                ],
                parameters: {
                  "x-google-start-bitrate": 1500
                }
              },
              {
                mimeType: "video/rtx",
                payloadType: 102,
                clockRate: 9e4,
                rtcpFeedback: [],
                parameters: {
                  apt: 101
                }
              }
            ],
            encodings: [
              {
                ssrc: 99991111,
                rtx: {
                  ssrc: 99991112
                }
              }
            ],
            headerExtensions: [
              {
                uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                id: 1
              },
              {
                uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
                id: 4
              },
              {
                uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
                id: 5
              },
              {
                uri: "urn:3gpp:video-orientation",
                id: 11
              },
              {
                uri: "urn:ietf:params:rtp-hdrext:toffset",
                id: 12
              }
            ],
            rtcp: {
              cname: "wB4Ql4lrsxYLjzuN",
              reducedSize: !0,
              mux: !0
            }
          })
        };
      case "video/H264":
        return {
          id: u ?? y(),
          producerId: y(),
          kind: "video",
          rtpParameters: f.deepFreeze({
            codecs: [
              {
                mimeType: "video/H264",
                payloadType: 103,
                clockRate: 9e4,
                rtcpFeedback: [
                  { type: "nack" },
                  { type: "nack", parameter: "pli" },
                  { type: "ccm", parameter: "fir" },
                  { type: "goog-remb" },
                  { type: "transport-cc" }
                ],
                parameters: {
                  "level-asymmetry-allowed": 1,
                  "packetization-mode": 1,
                  "profile-level-id": "42e01f"
                }
              },
              {
                mimeType: "video/rtx",
                payloadType: 104,
                clockRate: 9e4,
                rtcpFeedback: [],
                parameters: {
                  apt: 103
                }
              }
            ],
            encodings: [
              {
                ssrc: 99991113,
                rtx: {
                  ssrc: 99991114
                }
              }
            ],
            headerExtensions: [
              {
                uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                id: 1
              },
              {
                uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
                id: 4
              },
              {
                uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
                id: 5
              },
              {
                uri: "urn:3gpp:video-orientation",
                id: 11
              },
              {
                uri: "urn:ietf:params:rtp-hdrext:toffset",
                id: 12
              }
            ],
            rtcp: {
              cname: "wB4Ql4lrsxYLjzuN",
              reducedSize: !0,
              mux: !0
            }
          })
        };
      default:
        throw new TypeError(`unknown codecMimeType '${l}'`);
    }
  }
  function x() {
    return f.deepFreeze({
      id: y()
    });
  }
  function r({ id: u } = {}) {
    return {
      id: u ?? y(),
      dataProducerId: y(),
      sctpStreamParameters: f.deepFreeze({
        streamId: 666,
        maxPacketLifeTime: 5e3,
        maxRetransmits: void 0
      })
    };
  }
  return q;
}
var qt;
function Ht() {
  return qt || (qt = 1, (function(f) {
    Object.defineProperty(f, "__esModule", { value: !0 }), f.debug = f.testFakeParameters = f.FakeHandler = f.enhancedEvents = f.ortc = f.parseScalabilityMode = f.detectDeviceAsync = f.detectDevice = f.Device = f.version = f.types = void 0;
    const y = Ae();
    f.debug = y.default, f.types = Wt(), f.version = "3.18.6";
    var w = mr();
    Object.defineProperty(f, "Device", { enumerable: !0, get: function() {
      return w.Device;
    } }), Object.defineProperty(f, "detectDevice", { enumerable: !0, get: function() {
      return w.detectDevice;
    } }), Object.defineProperty(f, "detectDeviceAsync", { enumerable: !0, get: function() {
      return w.detectDeviceAsync;
    } });
    var n = te();
    Object.defineProperty(f, "parseScalabilityMode", { enumerable: !0, get: function() {
      return n.parse;
    } }), f.ortc = V(), f.enhancedEvents = $();
    var T = Sr();
    Object.defineProperty(f, "FakeHandler", { enumerable: !0, get: function() {
      return T.FakeHandler;
    } }), f.testFakeParameters = Cr();
  })(ze)), ze;
}
var We = Ht();
const Rr = /* @__PURE__ */ Qt(We), Er = /* @__PURE__ */ Vt({
  __proto__: null,
  default: Rr
}, [We]);
function Ar() {
  return new We.Device();
}
function zr() {
  return Er;
}
export {
  Ar as createDevice,
  zr as getMediaSoupClient
};
