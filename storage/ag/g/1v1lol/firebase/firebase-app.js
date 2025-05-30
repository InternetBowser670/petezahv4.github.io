!((e, t) => {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
			? define(t)
			: ((e = e || self).firebase = t());
})(this, () => {
	var r = (e, t) =>
		(r =
			Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array &&
				((e, t) => {
					e.__proto__ = t;
				})) ||
			((e, t) => {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
			}))(e, t);
	var n = function () {
		return (n =
			Object.assign ||
			((e) => {
				for (var t, r = 1, n = arguments.length; r < n; r++)
					for (var i in (t = arguments[r]))
						Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
				return e;
			})).apply(this, arguments);
	};
	function v(e, t) {
		if (!(t instanceof Object)) return t;
		switch (t.constructor) {
			case Date:
				return new Date(t.getTime());
			case Object:
				void 0 === e && (e = {});
				break;
			case Array:
				e = [];
				break;
			default:
				return t;
		}
		for (var r in t) t.hasOwnProperty(r) && (e[r] = v(e[r], t[r]));
		return e;
	}
	var e,
		t,
		i,
		f =
			((i = Error),
			r((e = s), (t = i)),
			void (e.prototype =
				null === t ? Object.create(t) : ((o.prototype = t.prototype), new o())),
			s);
	function o() {
		this.constructor = e;
	}
	function s(e, t) {
		var r = i.call(this, t) || this;
		return (
			(r.code = e),
			(r.name = "FirebaseError"),
			Object.setPrototypeOf(r, s.prototype),
			Error.captureStackTrace && Error.captureStackTrace(r, a.prototype.create),
			r
		);
	}
	var a =
		((c.prototype.create = function (e) {
			for (var t = [], r = 1; r < arguments.length; r++)
				t[r - 1] = arguments[r];
			for (
				var n = t[0] || {},
					i = this.service + "/" + e,
					o = this.errors[e],
					s = o
						? ((e, n) =>
								e.replace(h, (e, t) => {
									var r = n[t];
									return null != r ? r.toString() : "<" + t + "?>";
								}))(o, n)
						: "Error",
					a = this.serviceName + ": " + s + " (" + i + ").",
					c = new f(i, a),
					l = 0,
					p = Object.keys(n);
				l < p.length;
				l++
			) {
				var u = p[l];
				"_" !== u.slice(-1) &&
					(u in c &&
						console.warn(
							'Overwriting FirebaseError base field "' +
								u +
								'" can cause unexpected behavior.',
						),
					(c[u] = n[u]));
			}
			return c;
		}),
		c);
	function c(e, t, r) {
		(this.service = e), (this.serviceName = t), (this.errors = r);
	}
	var h = /\{\$([^}]+)}/g;
	function d(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}
	function l(e, t) {
		var r = new b(e, t);
		return r.subscribe.bind(r);
	}
	var p,
		u,
		b =
			((y.prototype.next = function (t) {
				this.forEachObserver((e) => {
					e.next(t);
				});
			}),
			(y.prototype.error = function (t) {
				this.forEachObserver((e) => {
					e.error(t);
				}),
					this.close(t);
			}),
			(y.prototype.complete = function () {
				this.forEachObserver((e) => {
					e.complete();
				}),
					this.close();
			}),
			(y.prototype.subscribe = function (e, t, r) {
				var n;
				if (void 0 === e && void 0 === t && void 0 === r)
					throw new Error("Missing Observer.");
				void 0 ===
					(n = ((e, t) => {
						if ("object" != typeof e || null === e) return !1;
						for (var r = 0, n = t; r < n.length; r++) {
							var i = n[r];
							if (i in e && "function" == typeof e[i]) return !0;
						}
						return !1;
					})(e, ["next", "error", "complete"])
						? e
						: { next: e, error: t, complete: r }).next && (n.next = g),
					void 0 === n.error && (n.error = g),
					void 0 === n.complete && (n.complete = g);
				var o = this.unsubscribeOne.bind(this, this.observers.length);
				return (
					this.finalized &&
						this.task.then(() => {
							try {
								this.finalError ? n.error(this.finalError) : n.complete();
							} catch (e) {}
						}),
					this.observers.push(n),
					o
				);
			}),
			(y.prototype.unsubscribeOne = function (e) {
				void 0 !== this.observers &&
					void 0 !== this.observers[e] &&
					(delete this.observers[e],
					(this.observerCount -= 1),
					0 === this.observerCount &&
						void 0 !== this.onNoObservers &&
						this.onNoObservers(this));
			}),
			(y.prototype.forEachObserver = function (e) {
				if (!this.finalized)
					for (var t = 0; t < this.observers.length; t++) this.sendOne(t, e);
			}),
			(y.prototype.sendOne = function (e, t) {
				this.task.then(() => {
					if (void 0 !== this.observers && void 0 !== this.observers[e])
						try {
							t(this.observers[e]);
						} catch (e) {
							"undefined" != typeof console &&
								console.error &&
								console.error(e);
						}
				});
			}),
			(y.prototype.close = function (e) {
				this.finalized ||
					((this.finalized = !0),
					void 0 !== e && (this.finalError = e),
					this.task.then(() => {
						(this.observers = void 0), (this.onNoObservers = void 0);
					}));
			}),
			y);
	function y(e, t) {
		(this.observers = []),
			(this.unsubscribes = []),
			(this.observerCount = 0),
			(this.task = Promise.resolve()),
			(this.finalized = !1),
			(this.onNoObservers = t),
			this.task
				.then(() => {
					e(this);
				})
				.catch((e) => {
					this.error(e);
				});
	}
	function g() {}
	function m() {
		for (var e = 0, t = 0, r = arguments.length; t < r; t++)
			e += arguments[t].length;
		var n = Array(e),
			i = 0;
		for (t = 0; t < r; t++)
			for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++)
				n[i] = o[s];
		return n;
	}
	((u = p = p || {})[(u.DEBUG = 0)] = "DEBUG"),
		(u[(u.VERBOSE = 1)] = "VERBOSE"),
		(u[(u.INFO = 2)] = "INFO"),
		(u[(u.WARN = 3)] = "WARN"),
		(u[(u.ERROR = 4)] = "ERROR"),
		(u[(u.SILENT = 5)] = "SILENT");
	function _(e, t) {
		for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
		if (!(t < e.logLevel)) {
			var i = new Date().toISOString();
			switch (t) {
				case p.DEBUG:
				case p.VERBOSE:
					console.log.apply(console, m(["[" + i + "]  " + e.name + ":"], r));
					break;
				case p.INFO:
					console.info.apply(console, m(["[" + i + "]  " + e.name + ":"], r));
					break;
				case p.WARN:
					console.warn.apply(console, m(["[" + i + "]  " + e.name + ":"], r));
					break;
				case p.ERROR:
					console.error.apply(console, m(["[" + i + "]  " + e.name + ":"], r));
					break;
				default:
					throw new Error(
						"Attempted to log a message with an invalid logType (value: " +
							t +
							")",
					);
			}
		}
	}
	var E,
		N = p.INFO,
		O =
			(Object.defineProperty(A.prototype, "logLevel", {
				get: function () {
					return this._logLevel;
				},
				set: function (e) {
					if (!(e in p))
						throw new TypeError("Invalid value assigned to `logLevel`");
					this._logLevel = e;
				},
				enumerable: !0,
				configurable: !0,
			}),
			Object.defineProperty(A.prototype, "logHandler", {
				get: function () {
					return this._logHandler;
				},
				set: function (e) {
					if ("function" != typeof e)
						throw new TypeError(
							"Value assigned to `logHandler` must be a function",
						);
					this._logHandler = e;
				},
				enumerable: !0,
				configurable: !0,
			}),
			(A.prototype.debug = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				this._logHandler.apply(this, m([this, p.DEBUG], e));
			}),
			(A.prototype.log = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				this._logHandler.apply(this, m([this, p.VERBOSE], e));
			}),
			(A.prototype.info = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				this._logHandler.apply(this, m([this, p.INFO], e));
			}),
			(A.prototype.warn = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				this._logHandler.apply(this, m([this, p.WARN], e));
			}),
			(A.prototype.error = function () {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				this._logHandler.apply(this, m([this, p.ERROR], e));
			}),
			A);
	function A(e) {
		(this.name = e), (this._logLevel = N), (this._logHandler = _);
	}
	var k =
			(((E = {})["no-app"] =
				"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()"),
			(E["bad-app-name"] = "Illegal App name: '{$appName}"),
			(E["duplicate-app"] = "Firebase App named '{$appName}' already exists"),
			(E["app-deleted"] = "Firebase App named '{$appName}' already deleted"),
			(E["invalid-app-argument"] =
				"firebase.{$appName}() takes either no argument or a Firebase App instance."),
			E),
		w = new a("app", "Firebase", k),
		R = "[DEFAULT]",
		L =
			(Object.defineProperty(T.prototype, "automaticDataCollectionEnabled", {
				get: function () {
					return this.checkDestroyed_(), this.automaticDataCollectionEnabled_;
				},
				set: function (e) {
					this.checkDestroyed_(), (this.automaticDataCollectionEnabled_ = e);
				},
				enumerable: !0,
				configurable: !0,
			}),
			Object.defineProperty(T.prototype, "name", {
				get: function () {
					return this.checkDestroyed_(), this.name_;
				},
				enumerable: !0,
				configurable: !0,
			}),
			Object.defineProperty(T.prototype, "options", {
				get: function () {
					return this.checkDestroyed_(), this.options_;
				},
				enumerable: !0,
				configurable: !0,
			}),
			(T.prototype.delete = function () {
				return new Promise((e) => {
					this.checkDestroyed_(), e();
				})
					.then(() => {
						this.firebase_.INTERNAL.removeApp(this.name_);
						for (
							var e = [], t = 0, r = Object.keys(this.services_);
							t < r.length;
							t++
						)
							for (
								var n = r[t], i = 0, o = Object.keys(this.services_[n]);
								i < o.length;
								i++
							) {
								var s = o[i];
								e.push(this.services_[n][s]);
							}
						return Promise.all(
							e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
						);
					})
					.then(() => {
						(this.isDeleted_ = !0), (this.services_ = {});
					});
			}),
			(T.prototype._getService = function (e, t) {
				if (
					(void 0 === t && (t = R),
					this.checkDestroyed_(),
					this.services_[e] || (this.services_[e] = {}),
					!this.services_[e][t])
				) {
					var r = t !== R ? t : void 0,
						n = this.firebase_.INTERNAL.factories[e](
							this,
							this.extendApp.bind(this),
							r,
						);
					this.services_[e][t] = n;
				}
				return this.services_[e][t];
			}),
			(T.prototype._removeServiceInstance = function (e, t) {
				void 0 === t && (t = R),
					this.services_[e] &&
						this.services_[e][t] &&
						delete this.services_[e][t];
			}),
			(T.prototype.extendApp = function (e) {
				if ((v(this, e), e.INTERNAL)) {
					if (e.INTERNAL.addAuthTokenListener) {
						for (var t = 0, r = this.tokenListeners_; t < r.length; t++) {
							var n = r[t];
							this.INTERNAL.addAuthTokenListener(n);
						}
						this.tokenListeners_ = [];
					}
					if (e.INTERNAL.analytics) {
						for (
							var i = 0, o = this.analyticsEventRequests_;
							i < o.length;
							i++
						) {
							var s = o[i];
							this.INTERNAL.analytics.logEvent.apply(void 0, s);
						}
						this.analyticsEventRequests_ = [];
					}
				}
			}),
			(T.prototype.checkDestroyed_ = function () {
				if (this.isDeleted_)
					throw w.create("app-deleted", { appName: this.name_ });
			}),
			T);
	function T(e, t, r) {
		(this.firebase_ = r),
			(this.isDeleted_ = !1),
			(this.services_ = {}),
			(this.tokenListeners_ = []),
			(this.analyticsEventRequests_ = []),
			(this.name_ = t.name),
			(this.automaticDataCollectionEnabled_ =
				t.automaticDataCollectionEnabled || !1),
			(this.options_ = ((e) => v(void 0, e))(e));
		this.INTERNAL = {
			getUid: () => null,
			getToken: () => Promise.resolve(null),
			addAuthTokenListener: (e) => {
				this.tokenListeners_.push(e), setTimeout(() => e(null), 0);
			},
			removeAuthTokenListener: (t) => {
				this.tokenListeners_ = this.tokenListeners_.filter((e) => e !== t);
			},
			analytics: {
				logEvent: () => {
					this.analyticsEventRequests_.push(arguments);
				},
			},
		};
	}
	(L.prototype.name && L.prototype.options) ||
		L.prototype.delete ||
		console.log("dc");
	var I = "7.2.1",
		j = new O("@firebase/app");
	function D(s) {
		var o = {},
			a = {},
			c = {},
			l = {
				__esModule: !0,
				initializeApp: (e, t) => {
					void 0 === t && (t = {});
					if ("object" != typeof t || null === t) {
						t = { name: t };
					}
					var r = t;
					void 0 === r.name && (r.name = R);
					var n = r.name;
					if ("string" != typeof n || !n)
						throw w.create("bad-app-name", { appName: String(n) });
					if (d(o, n)) throw w.create("duplicate-app", { appName: n });
					var i = new s(e, r, l);
					return f((o[n] = i), "create"), i;
				},
				app: p,
				apps: null,
				SDK_VERSION: I,
				INTERNAL: {
					registerService: (r, e, t, n, i) => {
						void 0 === i && (i = !1);
						if (a[r])
							return (
								j.debug(
									"There were multiple attempts to register service " + r + ".",
								),
								l[r]
							);
						(a[r] = e),
							n &&
								((c[r] = n),
								u().forEach((e) => {
									n("create", e);
								}));
						function o(e) {
							if ((void 0 === e && (e = p()), "function" != typeof e[r]))
								throw w.create("invalid-app-argument", { appName: r });
							return e[r]();
						}
						void 0 !== t && v(o, t);
						return (
							(l[r] = o),
							(s.prototype[r] = function () {
								for (var e = [], t = 0; t < arguments.length; t++)
									e[t] = arguments[t];
								return this._getService.bind(this, r).apply(this, i ? e : []);
							}),
							o
						);
					},
					removeApp: (e) => {
						f(o[e], "delete"), delete o[e];
					},
					factories: a,
					useAsService: h,
				},
			};
		function p(e) {
			if (!d(o, (e = e || R))) throw w.create("no-app", { appName: e });
			return o[e];
		}
		function u() {
			return Object.keys(o).map((e) => o[e]);
		}
		function f(e, t) {
			for (var r = 0, n = Object.keys(a); r < n.length; r++) {
				var i = h(e, n[r]);
				if (null === i) return;
				c[i] && c[i](t, e);
			}
		}
		function h(e, t) {
			return "serverAuth" === t ? null : t;
		}
		return (
			(l.default = l),
			Object.defineProperty(l, "apps", { get: u }),
			(p.App = s),
			l
		);
	}
	if (
		"object" == typeof self &&
		self.self === self &&
		void 0 !== self.firebase
	) {
		j.warn(
			"\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ",
		);
		var F = self.firebase.SDK_VERSION;
		F &&
			0 <= F.indexOf("LITE") &&
			j.warn(
				"\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ",
			);
	}
	var S = (function e() {
			var t = D(L);
			return (
				(t.INTERNAL = n(n({}, t.INTERNAL), {
					createFirebaseNamespace: e,
					extendNamespace: (e) => {
						v(t, e);
					},
					createSubscribe: l,
					ErrorFactory: a,
					deepExtend: v,
				})),
				t
			);
		})(),
		P = S.initializeApp;
	return (
		(S.initializeApp = () => {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			return (
				(() => {
					try {
						return (
							"[object process]" ===
							Object.prototype.toString.call(global.process)
						);
					} catch (e) {
						return !1;
					}
				})() &&
					j.warn(
						'\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      ',
					),
				P.apply(void 0, e)
			);
		}),
		S
	);
});
//# sourceMappingURL=firebase-app.js.map
