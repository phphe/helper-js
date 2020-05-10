/*!
 * helper-js v1.4.38
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: undefined
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.helperJs = {}));
}(this, (function (exports) { 'use strict';

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  var superPropBase = _superPropBase;

  var get = createCommonjsModule(function (module) {
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayLikeToArray = _arrayLikeToArray;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var unsupportedIterableToArray = _unsupportedIterableToArray;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  var regenerator = runtime_1;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function _createSuper(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var _marked = /*#__PURE__*/regenerator.mark(iterateAll);

  function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray$1(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  // local store
  var store = {}; // get global
  // `this` !== global or window because of build tool

  function glb() {
    if (store.glb) {
      return store.glb;
    } else {
      // resolve global
      var t;

      try {
        t = global;
      } catch (e) {
        t = window;
      }

      store.glb = t;
      return t;
    }
  }
  function isDocumentExisted() {
    try {
      var t = document;
    } catch (e) {
      return false;
    }

    return true;
  } // is 各种判断

  function isset(v) {
    return typeof v !== 'undefined';
  }
  function isArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }
  function isBool(v) {
    return Object.prototype.toString.call(v) === '[object Boolean]';
  }
  function isNumber(v) {
    return Object.prototype.toString.call(v) === '[object Number]';
  }
  function isNumeric(v) {
    return isFinite(v) && !isNaN(parseFloat(v));
  }
  function isString(v) {
    return Object.prototype.toString.call(v) === '[object String]';
  }
  function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
  }
  function isFunction(v) {
    return typeof v === 'function';
  }
  function isPromise(v) {
    return Object.prototype.toString.call(v) === '[object Promise]';
  }
  function empty(v) {
    if (v == null) {
      return true;
    } else if (v.length != null) {
      return v.length === 0;
    } else if (isBool(v)) {
      return false;
    } else if (isNumber(v)) {
      return isNaN(v);
    } else if (isObject(v)) {
      return Object.keys(v).length === 0;
    }
  } // num

  function numRand(min, max) {
    if (arguments.length === 1) {
      max = min;
      min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function numPad(num, n) {
    var len = num.toString().length;

    while (len < n) {
      num = '0' + num;
      len++;
    }

    return num;
  }
  function min(n, min) {
    return n < min ? min : n;
  }
  function max(n, max) {
    return n < max ? n : max;
  } // str 字符

  function studlyCase(str) {
    return str && str[0].toUpperCase() + str.substr(1);
  }
  function kebabCase(str) {
    return str.replace(/ /g, '-').replace(/_/g, '-').replace(/([A-Z])/g, '-$1').replace(/--+/g, '-').replace(/^-|-$|/g, '').toLowerCase();
  }
  function snakeCase(str) {
    return kebabCase(str).replace(/-/g, '_');
  }
  function camelCase(str) {
    var temp = str.toString().split(/[-_]/);

    for (var i = 1; i < temp.length; i++) {
      temp[i] = studlyCase(temp[i]);
    }

    return temp.join('');
  }
  function camelToWords(str) {
    return str.toString().trim().split(/(?=[A-Z])/);
  }
  function titleCase(str) {
    return camelToWords(studlyCase(camelCase(str))).join(' ').replace(/\bid\b/ig, 'ID');
  }
  function strRand() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var r = '';
    var seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
      r += seeds[numRand(seeds.length - 1)];
    }

    return prefix + r;
  }
  function replaceMultiple(mapObj, str) {
    var reg = new RegExp(Object.keys(mapObj).join('|'), 'g');
    return str.replace(reg, function (matchedKey) {
      return mapObj[matchedKey];
    });
  } // array

  function arrayRemove(arr, v) {
    var index;
    var count = 0;

    while ((index = arr.indexOf(v)) > -1) {
      arr.splice(index, 1);
      count++;
    }

    return count;
  }
  function arrayRemoveBySortedIndexes(arr, sortedIndexes) {
    for (var i = sortedIndexes.length - 1; i >= 0; i--) {
      var index = sortedIndexes[i];
      arr.splice(index, 1);
    }
  }
  function newArrayRemoveAt(arr, indexes) {
    indexes = toArrayIfNot(indexes);
    var mapping = {};

    var _iterator = _createForOfIteratorHelper(indexes),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var index = _step.value;
        mapping[index] = true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var newArr = [];
    var len = arr.length;

    for (var i = 0; i < len; i++) {
      if (!mapping[i]) {
        newArr.push(arr[i]);
      }
    }

    return newArr;
  }
  function arrayAt(arr, n) {
    return arr[n >= 0 ? n : arr.length + n];
  }
  function arrayFirst(arr) {
    return arr[0];
  }
  function arrayLast(arr) {
    return arr[arr.length - 1];
  }
  function arrayDiff(arr1, arr2) {
    var len = arr1.length;
    var arr = [];

    while (len--) {
      if (arr2.indexOf(arr1[len]) < 0) {
        arr.push(arr1[len]);
      }
    }

    return arr;
  } // offset can be many

  function arraySibling(arr, item, offset) {
    var index = arr.indexOf(item);

    if (index === -1) {
      throw 'item is not in array';
    }

    if (isArray(offset)) {
      return offset.map(function (v) {
        return arr[index + v];
      });
    }

    return arr[index + offset];
  }
  function toArrayIfNot(arrOrNot) {
    return isArray(arrOrNot) ? arrOrNot : [arrOrNot];
  } // n can be getter(number of times)
  // n可以是方法, 参数1是第几次分块

  function splitArray(arr, n) {
    var r = [];

    if (isFunction(n)) {
      var getChunkLength = n;
      var times = 1;
      var i = 0;

      while (i < arr.length) {
        var _n = getChunkLength(times);

        var end = i + _n;
        r.push(arr.slice(i, end));
        i = end;
        times++;
      }
    } else {
      var _i = 0;

      while (_i < arr.length) {
        var _end = _i + n;

        r.push(arr.slice(_i, _end));
        _i = _end;
      }
    }

    return r;
  }
  function groupArray(arr, getMark) {
    var groups = new Map();
    arr.forEach(function (v) {
      var mark = getMark(v);

      if (!groups.has(mark)) {
        groups.set(mark, []);
      }

      groups.get(mark).push(v);
    });
    var r = [];
    groups.forEach(function (value, key) {
      r.push([key, value]);
    });
    return r;
  }
  function arrayDistinct(arr) {
    if (glb().Set) {
      return toConsumableArray(new Set(arr));
    } else {
      return arr.filter(function (v, i, a) {
        return a.indexOf(v) === i;
      });
    }
  }
  function arrayGet(arr, index, endIndex) {
    if (index < 0) {
      index += arr.length;
    }

    if (endIndex == null) {
      return arr[index];
    } else {
      if (endIndex < 0) {
        endIndex += arr.length;
      }

      return arr.slice(index, endIndex - index + 1);
    }
  }
  function arrayWithoutEnd(arr, len) {
    return arr.slice(0, arr.length - len);
  }
  function arrayFlat(arr) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var r = [];

    var rec = function rec(arr, curentDepth) {
      var _iterator2 = _createForOfIteratorHelper(arr),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;

          if (isArray(item) && curentDepth < depth) {
            rec(item, curentDepth + 1);
          } else {
            r.push(item);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };

    rec(arr, 0);
    return r;
  } // object

  function assignIfDifferent(obj, key, val) {
    if (obj[key] !== val) {
      obj[key] = val;
    }
  }
  function objectMerge(o1, o2) {
    for (var k in o2) {
      if (!o1.hasOwnProperty(k)) {
        o1[k] = o2[k];
      } else if (isObject(o1[k]) && isObject(o2[k])) {
        Object.assign(o1[k], o2[k]);
      } else {
        o1[k] = o2[k];
      }
    }

    return o1;
  }
  function objectMap(obj, func) {
    var r = {};

    for (var key in obj) {
      r[key] = func(obj[key], key, obj);
    }

    return r;
  }
  function objectOnly(obj, keys) {
    var r = {};

    for (var key in obj) {
      if (keys.indexOf(key) > -1) {
        r[key] = obj[key];
      }
    }

    return r;
  }
  function objectExcept(obj, keys) {
    var r = {};

    for (var key in obj) {
      if (keys.indexOf(key) === -1) {
        r[key] = obj[key];
      }
    }

    return r;
  } // loop for all type
  // TODO change reverse to opt in next version

  function forAll(val, handler, reverse) {
    if (!reverse) {
      if (isArray(val) || isString(val) || val.hasOwnProperty('length')) {
        for (var i = 0; i < val.length; i++) {
          if (handler(val[i], i) === false) {
            break;
          }
        }
      } else if (isObject(val)) {
        for (var _i2 = 0, _Object$keys = Object.keys(val); _i2 < _Object$keys.length; _i2++) {
          var key = _Object$keys[_i2];

          if (handler(val[key], key) === false) {
            break;
          }
        }
      } else if (Number.isInteger(val)) {
        for (var _i3 = 0; _i3 < val; _i3++) {
          if (handler(_i3, _i3) === false) {
            break;
          }
        }
      }
    } else {
      if (isArray(val) || isString(val) || val.hasOwnProperty('length')) {
        for (var _i4 = val.length - 1; _i4 >= 0; _i4--) {
          if (handler(val[_i4], _i4) === false) {
            break;
          }
        }
      } else if (isObject(val)) {
        var keys = Object.keys(val);
        keys.reverse();

        for (var _i5 = 0, _keys = keys; _i5 < _keys.length; _i5++) {
          var _key = _keys[_i5];

          if (handler(val[_key], _key) === false) {
            break;
          }
        }
      } else if (Number.isInteger(val)) {
        for (var _i6 = val - 1; _i6 >= 0; _i6--) {
          if (handler(_i6, _i6) === false) {
            break;
          }
        }
      }
    }
  } // loop for Array, Object, NodeList, String

  function iterateAll(val) {
    var opt,
        i,
        info,
        _i7,
        _Object$keys2,
        key,
        _info,
        _i8,
        _info2,
        keys,
        _i9,
        _keys2,
        _key2,
        _info3,
        _args = arguments;

    return regenerator.wrap(function iterateAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opt = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

            if (opt.reverse) {
              _context.next = 30;
              break;
            }

            if (!(val.length != null)) {
              _context.next = 14;
              break;
            }

            i = 0;

          case 4:
            if (!(i < val.length)) {
              _context.next = 12;
              break;
            }

            info = {
              value: val[i],
              index: i
            };

            if (!(!opt.exclude || !opt.exclude(info))) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return info;

          case 9:
            i++;
            _context.next = 4;
            break;

          case 12:
            _context.next = 28;
            break;

          case 14:
            if (!isObject(val)) {
              _context.next = 27;
              break;
            }

            _i7 = 0, _Object$keys2 = Object.keys(val);

          case 16:
            if (!(_i7 < _Object$keys2.length)) {
              _context.next = 25;
              break;
            }

            key = _Object$keys2[_i7];
            _info = {
              value: val[key],
              key: key
            };

            if (!(!opt.exclude || !opt.exclude(_info))) {
              _context.next = 22;
              break;
            }

            _context.next = 22;
            return _info;

          case 22:
            _i7++;
            _context.next = 16;
            break;

          case 25:
            _context.next = 28;
            break;

          case 27:
            throw 'Unsupported type';

          case 28:
            _context.next = 58;
            break;

          case 30:
            if (!(val.length != null)) {
              _context.next = 42;
              break;
            }

            _i8 = val.length - 1;

          case 32:
            if (!(_i8 >= 0)) {
              _context.next = 40;
              break;
            }

            _info2 = {
              value: val[_i8],
              index: _i8
            };

            if (!(!opt.exclude || !opt.exclude(_info2))) {
              _context.next = 37;
              break;
            }

            _context.next = 37;
            return _info2;

          case 37:
            _i8--;
            _context.next = 32;
            break;

          case 40:
            _context.next = 58;
            break;

          case 42:
            if (!isObject(val)) {
              _context.next = 57;
              break;
            }

            keys = Object.keys(val);
            keys.reverse();
            _i9 = 0, _keys2 = keys;

          case 46:
            if (!(_i9 < _keys2.length)) {
              _context.next = 55;
              break;
            }

            _key2 = _keys2[_i9];
            _info3 = {
              value: val[_key2],
              key: _key2
            };

            if (!(!opt.exclude || !opt.exclude(_info3))) {
              _context.next = 52;
              break;
            }

            _context.next = 52;
            return _info3;

          case 52:
            _i9++;
            _context.next = 46;
            break;

          case 55:
            _context.next = 58;
            break;

          case 57:
            throw 'Unsupported type';

          case 58:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  } // Deprecated in next version

  var iterateALL = iterateAll; // source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string

  function objectGet(obj, path, throwError) {
    var paths = isArray(path) ? path : path.split('.');
    var current = obj;

    try {
      var _iterator3 = _createForOfIteratorHelper(paths),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var key = _step3.value;
          current = current[key];
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    } catch (e) {
      if (throwError) {
        throw "Path does not exist";
      }
    }

    return current;
  }
  function objectSet(obj, path, value) {
    var paths = isArray(path) ? path : path.split('.');
    var lastKey = arrayLast(paths);
    var parent = objectGet(obj, paths.slice(0, paths.length - 1));

    if (!parent) {
      throw "Path does not exist";
    }

    parent[lastKey] = value;
  }
  function unset(obj, prop) {
    obj[prop] = undefined;

    try {
      delete obj[prop];
    } catch (e) {}
  } // exclude: array or function

  function cloneObj(obj, exclude) {
    var type = _typeof_1(obj);

    switch (type) {
      case 'undefined':
      case 'boolean':
      case 'nuber':
      case 'string':
      case 'function':
        return obj;

      case 'object':
        if (obj === null) {
          // null is object
          return obj;
        }

        var r;

        if (isArray(obj)) {
          r = [];

          var _iterator4 = _createForOfIteratorHelper(obj),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var item = _step4.value;
              r.push(cloneObj(item, exclude));
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        } else {
          r = {};

          for (var _i10 = 0, _Object$keys3 = Object.keys(obj); _i10 < _Object$keys3.length; _i10++) {
            var key = _Object$keys3[_i10];

            if (!exclude || isArray(exclude) && !exclude.includes(key) || !exclude(key, obj[key], obj)) {
              r[key] = cloneObj(obj[key], exclude);
            }
          }
        }

        return r;

      default:
        return obj;
    }
  }
  /*
  return cloned obj
  handler(value, key, parent, newParent)
  handler can return null or an object.
  null: don't change anything
  object{
    key: false, // delete. Deprecated, this will be removed in future, please use `delete` instead of it.
    key: new key, // use a new key instead of old key. if key == null, the old key will be detected
    delete,
    value, // new value. if value not gived, the old value will be detected
    skip, // skip children
    stop,
  }
  {key: false}: delete
  {value}: change value
  {key, value}. change key and value
  limit: to prevent circular reference.
   */

  function mapObjectTree(obj, handler) {
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
    var r;
    var count = 0;
    var stack = [{
      value: obj
    }];

    var _loop2 = function _loop2() {
      if (count >= limit) {
        throw "mapObjectTree: limit(".concat(limit, ") reached, object may has circular reference");
      }

      count++;

      var _stack$shift = stack.shift(),
          value = _stack$shift.value,
          key = _stack$shift.key,
          parent = _stack$shift.parent,
          newParent = _stack$shift.newParent;

      var t = handler(value, key, parent, newParent);

      var assign = function assign(value, key, canPush) {
        if (isArray(value)) {
          value = [];
        } else if (isObject(value)) {
          value = {};
        }

        if (parent) {
          if (isArray(newParent) && canPush) {
            newParent.push(value);
          } else {
            newParent[key] = value;
          }
        } else {
          r = value;
        } // value may changed


        return value;
      };

      var newVal = void 0,
          val = void 0,
          toDelete = void 0,
          stop = void 0,
          skip = void 0;

      if (!t) {
        // no change
        val = value;
        newVal = assign(value, key);
      } else {
        var key2 = t.key,
            _value = t.value;
        val = _value;

        if (t.delete || key2 === false) {
          // del
          toDelete = true;
        } else if (key2 == null) {
          // don't change key
          newVal = assign(_value, key, true);
        } else if (t.hasOwnProperty('value')) {
          newVal = assign(_value, key2);
        }

        stop = t.stop;
        skip = t.skip;
      }

      if (toDelete) {
        return "continue";
      }

      if (skip) {
        return "continue";
      }

      if (stop) {
        return "break";
      }

      if (isArray(val)) {
        var len = val.length;

        for (var i = 0; i < len; i++) {
          stack.push({
            value: val[i],
            key: i,
            parent: val,
            newParent: newVal
          });
        }
      } else if (isObject(val)) {
        Object.keys(val).forEach(function (key) {
          stack.push({
            value: val[key],
            key: key,
            parent: val,
            newParent: newVal
          });
        });
      }
    };

    _loop: while (stack.length > 0) {
      var _ret = _loop2();

      switch (_ret) {
        case "continue":
          continue;

        case "break":
          break _loop;
      }
    }

    return r;
  } // arr, idKey/getId

  function mapObjects(arr, idKey) {
    var r = {};
    var len = arr.length;

    for (var i = 0; i < len; i++) {
      var item = arr[i];
      var id = isFunction(idKey) ? idKey(item, i) : item[idKey];
      r[id] = item;
    }

    return r;
  } //

  function pairRows(rows1, rows2, key1, key2) {
    if (!key2) {
      key2 = key1;
    }

    var map = mapObjects(rows2, key2);
    return rows1.map(function (row1) {
      return [row1, map[row1[key1]]];
    });
  } // 深度优先遍历
  // Depth-First-Search
  // TODO change args in next version

  function depthFirstSearch(obj, handler) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var reverse = arguments.length > 3 ? arguments[3] : undefined;
    var rootChildren = isArray(obj) ? obj : [obj]; //

    var StopException = function StopException() {
      classCallCheck(this, StopException);
    };

    var func = function func(children, parent, parentPath) {
      if (reverse) {
        children = children.slice();
        children.reverse();
      }

      var len = children.length;

      for (var i = 0; i < len; i++) {
        var item = children[i];
        var index = reverse ? len - i - 1 : i;
        var path = parentPath ? [].concat(toConsumableArray(parentPath), [index]) : []; // TODO change args in next version

        var r = handler(item, index, parent, path);

        if (r === false) {
          // stop
          throw new StopException();
        } else if (r === 'skip children') {
          continue;
        } else if (r === 'skip siblings') {
          break;
        }

        if (item[childrenKey] != null) {
          func(item[childrenKey], item, path);
        }
      }
    };

    try {
      func(rootChildren, null, isArray(obj) ? [] : null);
    } catch (e) {
      if (e instanceof StopException) ; else {
        throw e;
      }
    }
  }
  var walkTreeData = depthFirstSearch;
  var TreeData = /*#__PURE__*/function () {
    // data = null;
    function TreeData(data) {
      classCallCheck(this, TreeData);

      this.childrenKey = 'children';
      this.data = data;
    }

    createClass(TreeData, [{
      key: "iteratePath",
      value: /*#__PURE__*/regenerator.mark(function iteratePath(path) {
        var opt,
            childrenKey,
            rootChildren,
            prevPath,
            prevChildren,
            _iterator5,
            _step5,
            index,
            currentPath,
            currentNode,
            list,
            _iterator6,
            _step6,
            _step6$value,
            _path,
            node,
            _args2 = arguments;

        return regenerator.wrap(function iteratePath$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                opt = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                childrenKey = this.childrenKey, rootChildren = this.rootChildren;

                if (opt.reverse) {
                  _context2.next = 29;
                  break;
                }

                prevPath = [];
                prevChildren = rootChildren;
                _iterator5 = _createForOfIteratorHelper(path);
                _context2.prev = 6;

                _iterator5.s();

              case 8:
                if ((_step5 = _iterator5.n()).done) {
                  _context2.next = 19;
                  break;
                }

                index = _step5.value;
                currentPath = [].concat(toConsumableArray(prevPath), [index]);
                currentNode = prevChildren[index];
                _context2.next = 14;
                return {
                  path: currentPath,
                  node: currentNode
                };

              case 14:
                prevPath = currentPath;
                prevChildren = currentNode[childrenKey];

              case 17:
                _context2.next = 8;
                break;

              case 19:
                _context2.next = 24;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](6);

                _iterator5.e(_context2.t0);

              case 24:
                _context2.prev = 24;

                _iterator5.f();

                return _context2.finish(24);

              case 27:
                _context2.next = 48;
                break;

              case 29:
                list = toConsumableArray(this.iteratePath(path, _objectSpread({}, opt, {
                  reverse: false
                })));
                list.reverse();
                _iterator6 = _createForOfIteratorHelper(list);
                _context2.prev = 32;

                _iterator6.s();

              case 34:
                if ((_step6 = _iterator6.n()).done) {
                  _context2.next = 40;
                  break;
                }

                _step6$value = _step6.value, _path = _step6$value.path, node = _step6$value.node;
                _context2.next = 38;
                return {
                  path: _path,
                  node: node
                };

              case 38:
                _context2.next = 34;
                break;

              case 40:
                _context2.next = 45;
                break;

              case 42:
                _context2.prev = 42;
                _context2.t1 = _context2["catch"](32);

                _iterator6.e(_context2.t1);

              case 45:
                _context2.prev = 45;

                _iterator6.f();

                return _context2.finish(45);

              case 48:
              case "end":
                return _context2.stop();
            }
          }
        }, iteratePath, this, [[6, 21, 24, 27], [32, 42, 45, 48]]);
      })
    }, {
      key: "getAllNodes",
      value: function getAllNodes(path) {
        var all = [];

        var _iterator7 = _createForOfIteratorHelper(this.iteratePath(path)),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var node = _step7.value.node;
            all.push(node);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        return all;
      }
    }, {
      key: "getNode",
      value: function getNode(path) {
        return arrayLast(this.getAllNodes(path));
      }
    }, {
      key: "getNodeIndexAndParent",
      value: function getNodeIndexAndParent(path) {
        var parentPath = path.slice();
        var index = parentPath.pop();
        return {
          parent: this.getNode(parentPath),
          index: index,
          parentPath: parentPath
        };
      }
    }, {
      key: "getNodeParent",
      value: function getNodeParent(path) {
        return this.getNodeIndexAndParent(path).parent;
      }
    }, {
      key: "setPathNode",
      value: function setPathNode(path, node) {
        if (path == null || path.length === 0) {
          this.data = node;
        } else {
          var childrenKey = this.childrenKey,
              rootChildren = this.rootChildren;

          var _this$getNodeIndexAnd = this.getNodeIndexAndParent(path),
              parent = _this$getNodeIndexAnd.parent,
              index = _this$getNodeIndexAnd.index;

          var parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
          parentChildren[index] = node;
        }
      }
    }, {
      key: "removeNode",
      value: function removeNode(path) {
        var childrenKey = this.childrenKey,
            rootChildren = this.rootChildren;

        var _this$getNodeIndexAnd2 = this.getNodeIndexAndParent(path),
            parent = _this$getNodeIndexAnd2.parent,
            index = _this$getNodeIndexAnd2.index;

        var parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
        var node = parentChildren[index];
        parentChildren.splice(index, 1);
        return node;
      }
    }, {
      key: "walk",
      value: function walk(handler) {
        var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var childrenKey = this.childrenKey,
            data = this.data; // TODO change args in next version

        return walkTreeData(data, handler, childrenKey, opt.reverse);
      }
    }, {
      key: "clone",
      value: function clone() {
        var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})
        // TODO change args in next version
        var childrenKey = this.childrenKey;
        var td = new TreeData();
        this.walk(function (node, index, parent, path) {
          var newNode = Object.assign({}, node);

          if (newNode[childrenKey]) {
            newNode[childrenKey] = [];
          }

          if (opt.afterNodeCreated) {
            opt.afterNodeCreated(newNode, {
              oldNode: node,
              index: index,
              parent: parent,
              path: path
            });
          }

          td.setPathNode(path, newNode);
        });
        return td.data;
      }
    }, {
      key: "rootChildren",
      get: function get() {
        var childrenKey = this.childrenKey;

        if (!this.data) {
          this.data = [];
        }

        var data = this.data;
        return isArray(data) ? data : data[childrenKey];
      }
    }]);

    return TreeData;
  }(); // function helper | method helper ============================

  function resolveValueOrGettter(valueOrGetter) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (isFunction(valueOrGetter)) {
      return valueOrGetter.apply(void 0, toConsumableArray(args));
    } else {
      return valueOrGetter;
    }
  }
  function executeWithCount(func) {
    var count = 0;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key3 = 0; _key3 < _len; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return func.call.apply(func, [this, count++].concat(args));
    };
  }
  function watchChange(getVal, handler) {
    var oldVal;

    var update = function update() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key4 = 0; _key4 < _len2; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var newVal = getVal.apply(void 0, args);

      if (oldVal !== newVal) {
        handler.apply(void 0, [newVal].concat(args));
      }

      oldVal = newVal;
    };

    return update;
  }
  var store_executeOnceInScopeByName = {};
  function executeOnceInScopeByName(name, action) {
    var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : scope_executeOnceInScopeByName;
    var storeResult = arguments.length > 3 ? arguments[3] : undefined;
    name = "executeOnceInScopeByName_".concat(name);

    if (!scope[name]) {
      var value = action();

      var destroy = function destroy() {
        delete scope[name];
      };

      scope[name] = {
        destroy: destroy
      };

      if (storeResult) {
        scope[name].value = value;
      }
    }

    return scope[name];
  }
  function debounceTrailing(action) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var t;
    var delaying;
    var lastArgs; // when trailing, use last args

    var resolves = [];
    var rejects = [];

    var wrappedAction = function wrappedAction() {
      var _this = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key5 = 0; _key5 < _len3; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return new Promise(function (resolve, reject) {
        resolves.push(resolve);
        rejects.push(reject); //

        lastArgs = args;

        if (!delaying) {
          delaying = true;
          t = setTimeout(function () {
            var result = action.call.apply(action, [_this].concat(toConsumableArray(lastArgs)));
            t = null;
            delaying = false;
            resolves.forEach(function (resolve) {
              return resolve(result);
            });
            resolves = [];
            rejects = [];
          }, wait);
        }
      });
    };

    wrappedAction.stop = function () {
      if (t) {
        clearTimeout(t);
        t = null;
      }

      delaying = false;
      resolves = [];
      rejects.forEach(function (reject) {
        return reject();
      });
      rejects = [];
    };

    return wrappedAction;
  }
  function debounceImmediate(action) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var t;
    var delaying;
    var result;

    var wrappedAction = function wrappedAction() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (delaying) {
          resolve(result);
        } else {
          delaying = true;
          result = action.call.apply(action, [_this2].concat(toConsumableArray(lastArgs)));
          resolve(result);
          t = setTimeout(function () {
            t = null;
            delaying = false;
            result = null;
          }, wait);
        }
      });
    };

    wrappedAction.stop = function () {
      if (t) {
        clearTimeout(t);
        t = null;
      }

      delaying = false;
    };

    return wrappedAction;
  }
  function debounce(action) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (opt.immediate) {
      return debounceImmediate(action, wait);
    } else {
      return debounceTrailing(action, wait);
    }
  }
  /**
   * [joinMethods description]
   * @param  {[Function[]]} methods        [description]
   * @param  {String} [mode='value'] [value, pipeline]
   * @return {[Function]}                [description]
   */

  function joinMethods(methods) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
    var simpleJoinedMethod;

    var _iterator8 = _createForOfIteratorHelper(methods),
        _step8;

    try {
      var _loop3 = function _loop3() {
        var method = _step8.value;
        var old = simpleJoinedMethod;

        if (old) {
          simpleJoinedMethod = function simpleJoinedMethod() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key6 = 0; _key6 < _len4; _key6++) {
              args[_key6] = arguments[_key6];
            }

            return method.call.apply(method, [this, mode === 'value' ? old.call.apply(old, [this].concat(args)) : old].concat(args));
          };
        } else {
          simpleJoinedMethod = method;
        }
      };

      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        _loop3();
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    return simpleJoinedMethod;
  } // the returned function only accept one argument

  function joinFunctionsByResult(funcs) {
    var wrappedFunc = funcs[0];

    for (var i = 1; i < funcs.length; i++) {
      wrappedFunc = join2func(wrappedFunc, funcs[i]);
    }

    return wrappedFunc;

    function join2func(func1, func2) {
      return function (arg) {
        var result = args;
        var result1 = func1(arg);
        return func2(result1);
      };
    }
  } // must pass arguments to `next` manually

  function joinFunctionsByNext(funcs) {
    var next = function next() {};

    var _iterator9 = _createForOfIteratorHelper(iterateAll(funcs, {
      reverse: true
    })),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var func = _step9.value.value;
        var currentNext = next;
        next = wrapFuncWithNext(func, currentNext);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    return next;

    function wrapFuncWithNext(func, next) {
      return function () {
        for (var _len5 = arguments.length, args = new Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
          args[_key7] = arguments[_key7];
        }

        return func.apply(void 0, [next].concat(args));
      };
    }
  } // promise
  // execute promise in sequence

  function executePromiseGetters(getters) {
    var concurrent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var stopped;
    var promise = new Promise(function (resolve, reject) {
      var r = [];
      var chunks = splitArray(getters, concurrent);
      var promise = Promise.resolve();
      chunks.forEach(function (chunk) {
        promise = promise.then(function (result) {
          if (result) {
            r.push.apply(r, toConsumableArray(result));
          }

          if (stopped) {
            reject('stopped');
          } else {
            return Promise.all(chunk.map(function (v) {
              return v();
            }));
          }
        });
      });
      promise.then(function (result) {
        r.push.apply(r, toConsumableArray(result));
        resolve(r);
      });
    });
    return {
      promise: promise,
      destroy: function destroy() {
        stopped = true;
      }
    };
  }
  function promiseTimeout(promise, timeout) {
    return new Promise(function (resolve, reject) {
      var t, rejected;
      promise.then(function () {
        clearTimeout(t);
        resolve.apply(void 0, arguments);
      }, function () {
        if (!rejected) {
          clearTimeout(t);
          reject.apply(void 0, arguments);
        }
      });
      t = setTimeout(function () {
        rejected = true;
        var e = new Error('Promise timeout!');
        e.name = 'timeout';
        reject(e);
      }, timeout);
    });
  } // url

  /* eslint-disable */

  function getUrlParam(par) {
    // 获取当前URL
    var local_url = document.location.href; // 获取要取得的get参数位置

    var get = local_url.indexOf(par + '=');

    if (get == -1) {
      return false;
    } // 截取字符串


    var get_par = local_url.slice(par.length + get + 1); // 判断截取后的字符串是否还有其他get参数

    var nextPar = get_par.indexOf('&');

    if (nextPar != -1) {
      get_par = get_par.slice(0, nextPar);
    }

    return get_par;
  }
  /* eslint-enable */
  // dom =====================================================
  // return NodeList if there are multiple top-level nodes

  function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    if (div.childNodes.length > 1) {
      return div.childNodes;
    } else {
      return div.childNodes[0];
    }
  }
  function uniqueId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id_';
    var id = prefix + strRand();
    if (!store.uniqueId) store.uniqueId = {};
    var generatedIds = store.uniqueId;

    if (document.getElementById(id) || generatedIds[id]) {
      return uniqueId(prefix);
    } else {
      generatedIds[id] = true;
      return id;
    }
  }
  function isDescendantOf(el, parent) {
    while (true) {
      if (el.parentElement == null) {
        return false;
      } else if (el.parentElement === parent) {
        return true;
      } else {
        el = el.parentElement;
      }
    }
  }
  function removeEl(el) {
    if (el.parentNode !== null) {
      return el.parentNode.removeChild(el);
    }
  } // refer: https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window

  function getScroll() {
    if (typeof pageYOffset != 'undefined') {
      //most browsers except IE before #9
      return {
        top: pageYOffset,
        left: pageXOffset
      };
    } else {
      var B = document.body; //IE 'quirks'

      var D = document.documentElement; //IE with doctype

      D = D.clientHeight ? D : B;
      return {
        top: D.scrollTop,
        left: D.scrollLeft
      };
    }
  } // refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1

  function getOffset(el) {
    var rect = getBoundingClientRect(el);
    var scroll = getScroll();
    return {
      x: rect.left + scroll.left,
      y: rect.top + scroll.top
    };
  } // there is some trap in el.offsetParent, so use this func to fix

  function getOffsetParent(el) {
    var offsetParent = el.offsetParent;

    if (!offsetParent || offsetParent === document.body && getComputedStyle(document.body).position === 'static') {
      offsetParent = document.body.parentElement;
    }

    return offsetParent;
  } // get el current position. like jQuery.position
  // the position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
  // 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.

  function getPosition(el) {
    var offsetParent = getOffsetParent(el);
    var ps = {
      x: el.offsetLeft,
      y: el.offsetTop
    };
    var parent = el;

    while (true) {
      parent = parent.parentElement;

      if (parent === offsetParent || !parent) {
        break;
      }

      ps.x -= parent.scrollLeft;
      ps.y -= parent.scrollTop;
    }

    return ps;
  } // get position of a el if its offset is given. like jQuery.offset.
  // 类似 jQuery.offset的设置功能, 但是它只返回计算的position, 不改变元素样式.

  function getPositionFromOffset(el, of) {
    var offsetParent = getOffsetParent(el);
    var parentOf = getOffset(offsetParent);
    return {
      x: of.x - parentOf.x,
      y: of.y - parentOf.y
    };
  }
  function getBoundingClientRect(el) {
    // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
    var xy = el.getBoundingClientRect();
    var top = xy.top - document.documentElement.clientTop,
        //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
    bottom = xy.bottom,
        left = xy.left - document.documentElement.clientLeft,
        //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
    right = xy.right,
        width = xy.width || right - left,
        //IE67不存在width 使用right - left获得
    height = xy.height || bottom - top;
    var x = left;
    var y = top;
    return {
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      width: width,
      height: height,
      x: x,
      y: y
    };
  }
  var getViewportPosition = getBoundingClientRect; // TODO not tested

  function viewportPositionToOffset(position) {
    var body = document.body;
    var bodyOf = getOffset(body);
    var bodyVP = getViewportPosition(body);
    return {
      x: position.x + bodyOf.x - bodyVP.x,
      y: position.y + bodyOf.y - bodyVP.y
    };
  } // TODO not tested

  function offsetToViewportPosition(offset) {
    var body = document.body;
    var bodyOf = getOffset(body);
    var bodyVP = getViewportPosition(body);
    return {
      x: offset.x + bodyVP.x - bodyOf.x,
      y: offset.y + bodyVP.y - bodyOf.y
    };
  }
  function findParent(el, callback, opt) {
    var cur = opt && opt.withSelf ? el : el.parentElement;

    while (cur) {
      var r = callback(cur);

      if (r === 'break') {
        return;
      } else if (r) {
        return cur;
      } else {
        cur = cur.parentElement;
      }
    }
  }
  function backupAttr(el, name) {
    var key = "original_".concat(name);
    el[key] = el.getAttribute(name);
  }
  function restoreAttr(el, name) {
    var key = "original_".concat(name);
    el.setAttribute(name, el[key]);
  } // source: http://youmightnotneedjquery.com/

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  } // source: http://youmightnotneedjquery.com/

  function addClass(el, className) {
    if (!hasClass(el, className)) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    }
  } // source: http://youmightnotneedjquery.com/

  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  } // TODO rename to getElSizeEvenInvisible in next version

  function getElSize(el) {
    backupAttr(el, 'style');
    el.style.display = 'block';
    var t = getBoundingClientRect(el);
    var size = {
      width: t.width,
      height: t.height
    };
    restoreAttr(el, 'style');
    return size;
  }
  var getElSizeEvenInvisible = getElSize;
  /**
   * [isOffsetInEl]
   * @param {Number} x
   * @param {Number} y
   * @param {Object} el HTML Element
   */

  function isOffsetInEl(x, y, el) {
    var offset = getOffset(el);
    return offset.x <= x && offset.x + el.offsetWidth >= x && offset.y <= y && offset.y + el.offsetHeight >= y;
  } // get border

  function getBorder(el) {
    var body = document.body;
    var workArea = findParent(el, function (v) {
      return hasClass(v, 'work-area');
    });
    var of = getOffset(workArea);
    return {
      left: of.x,
      right: of.x + workArea.offsetWidth,
      top: of.y + 50,
      bottom: body.offsetHeight < glb().innerHeight ? glb().innerHeight : body.offsetHeight
    };
  }
  function setElChildByIndex(el, index, child) {
    child.childComponentIndex = index;
    var len = el.childNodes.length;

    if (len === 0) {
      el.appendChild(child);
    } else if (index === 0) {
      el.insertBefore(child, el.childNodes[0]);
    } else {
      var _binarySearch = binarySearch(el.childNodes, function (el) {
        return el.childComponentIndex - index;
      }, 0, max(index, len - 1), true),
          nearestIndex = _binarySearch.index,
          nearest = _binarySearch.value,
          bigger = _binarySearch.bigger;

      if (bigger) {
        el.insertBefore(child, nearest);
      } else {
        var next = el.childNodes[nearestIndex + 1];

        if (next) {
          el.insertBefore(child, next);
        } else {
          el.appendChild(child);
        }
      }
    }
  } // from https://blog.csdn.net/qq_30100043/article/details/74719534

  function getCss3Prefix() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (opt.noCache || store.css3Prefix == null) {
      store.css3Prefix = reget();
    }

    return store.css3Prefix;

    function reget() {
      var div = document.createElement('div');
      var cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
      div.style.cssText = cssText;
      var style = div.style;

      if (style.webkitTransition) {
        return '-webkit-';
      }

      if (style.MozTransition) {
        return '-moz-';
      }

      if (style.oTransition) {
        return '-o-';
      }

      if (style.msTransition) {
        return '-ms-';
      }

      return '';
    }
  } // dom event

  function onDOM(el, name, handler) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key8 = 3; _key8 < _len6; _key8++) {
      args[_key8 - 3] = arguments[_key8];
    }

    if (el.addEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.addEventListener.apply(el, [name, handler].concat(args));
    } else if (el.attachEvent) {
      // IE 8 及更早 IE 版本
      el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  }
  function offDOM(el, name, handler) {
    for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key9 = 3; _key9 < _len7; _key9++) {
      args[_key9 - 3] = arguments[_key9];
    }

    if (el.removeEventListener) {
      // 所有主流浏览器，除了 IE 8 及更早 IE版本
      el.removeEventListener.apply(el, [name, handler].concat(args));
    } else if (el.detachEvent) {
      // IE 8 及更早 IE 版本
      el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
    }
  }
  function onDOMMany(els, names, handler) {
    els = toArrayIfNot(els);
    names = toArrayIfNot(names);

    for (var _len8 = arguments.length, args = new Array(_len8 > 3 ? _len8 - 3 : 0), _key10 = 3; _key10 < _len8; _key10++) {
      args[_key10 - 3] = arguments[_key10];
    }

    var _iterator10 = _createForOfIteratorHelper(els),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var el = _step10.value;

        var _iterator13 = _createForOfIteratorHelper(names),
            _step13;

        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var name = _step13.value;
            onDOM.apply(void 0, [el, name, handler].concat(args));
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    var destroy = function destroy() {
      var _iterator11 = _createForOfIteratorHelper(els),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var el = _step11.value;

          var _iterator12 = _createForOfIteratorHelper(names),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var name = _step12.value;
              offDOM(el, name, handler);
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    };

    return destroy;
  }
  function getImageSizeByUrl(url) {
    var image = document.createElement('img');
    return new Promise(function (resolve, reject) {
      onDOM(image, 'load', function () {
        resolve({
          width: image.width,
          height: image.height
        });
      });
      onDOM(image, 'error', function (e) {
        reject(e);
      });
      image.src = url;
    });
  }
  function findNodeList(list, callback) {
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var iterator = iterateAll(list, {
      reverse: opt.reverse
    });

    var _iterator14 = _createForOfIteratorHelper(iterator),
        _step14;

    try {
      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
        var _step14$value = _step14.value,
            value = _step14$value.value,
            index = _step14$value.index;

        if (callback(value, index)) {
          return value;
        }
      }
    } catch (err) {
      _iterator14.e(err);
    } finally {
      _iterator14.f();
    }
  }
  function findNodeListReverse(list, callback) {
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    opt.reverse = true;
    return findNodeList(list, callback, opt);
  }
  function elementsFromPoint() {
    var func = document.elementsFromPoint || document.msElementsFromPoint || elementsFromPoint;

    for (var _len9 = arguments.length, args = new Array(_len9), _key11 = 0; _key11 < _len9; _key11++) {
      args[_key11] = arguments[_key11];
    }

    return func.apply(document, args);

    function elementsFromPoint(x, y) {
      var parents = [];
      var parent = void 0;

      do {
        if (parent !== document.elementFromPoint(x, y)) {
          parent = document.elementFromPoint(x, y);
          parents.push(parent);
          parent.style.pointerEvents = 'none';
        } else {
          parent = false;
        }
      } while (parent);

      parents.forEach(function (parent) {
        return parent.style.pointerEvents = 'all';
      });
      return parents;
    }
  }
  function getOuterAttachedHeight(el) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    opt = _objectSpread({
      margin: true,
      border: true
    }, opt);
    var stl = getComputedStyle(el);
    var r = 0;
    var arr = [];

    if (opt.margin) {
      arr.push('margin-top', 'margin-bottom');
    }

    if (opt.border) {
      arr.push('border-top-width', 'border-bottom-width');
    }

    arr.forEach(function (key) {
      r += parseFloat(stl[key]);
    });
    return r;
  }
  function getOuterAttachedWidth(el) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    opt = _objectSpread({
      margin: true,
      border: true
    }, opt);
    var stl = getComputedStyle(el);
    var r = 0;
    var arr = [];

    if (opt.margin) {
      arr.push('margin-left', 'margin-right');
    }

    if (opt.border) {
      arr.push('border-left-width', 'border-right-width');
    }

    arr.forEach(function (key) {
      r += parseFloat(stl[key]);
    });
    return r;
  } // DOM structure

  function insertBefore(el, target) {
    target.parentElement.insertBefore(el, target);
  }
  function insertAfter(el, target) {
    target.parentElement.insertBefore(el, target.nextSibling);
  }
  function prependTo(el, target) {
    target.insertBefore(el, target.firstChild);
  }
  function appendTo(el, target) {
    target.appendChild(el);
  } // Date ===================================

  function cloneDate(dateObj) {
    return new Date(dateObj.getTime());
  }
  function addDate(dateObj, n, type) {
    if (!['year', 'month', 'day', 'date'].includes(type)) {
      type += 's';
    }

    type = studlyCase(type);

    if (type === 'Day') {
      type = 'Date';
    }

    var setFuncName = 'set' + type;
    var getFuncName = 'get' + type;
    dateObj[setFuncName](dateObj[getFuncName]() + n);
    return dateObj;
  }
  function getMonthStart(dateObj) {
    var clonedObj = cloneDate(dateObj);
    clonedObj.setDate(1);
    return clonedObj;
  }
  function getMonthEnd(dateObj) {
    var r = cloneDate(dateObj);
    addDate(r, 1, 'month');
    r.setDate(0);
    return r;
  }
  /**
   * [getCalendar description]
   * @param  {[type]} year         [description]
   * @param  {[type]} month        [description]
   * @param  {Number} [startWeekDay=0] [0 is sunday]
   * @return {[type]}              [description]
   */

  function getCalendar(year, month) {
    var startWeekDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var results = [];
    var date = new Date(year, month - 1);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    var monthStart = getMonthStart(date);
    var monthStartDay = monthStart.getDay();
    var calendarStart = addDate(cloneDate(monthStart), -(monthStartDay + startWeekDay), 'day');

    if (monthStartDay > startWeekDay) {
      var startDate = calendarStart.getDate();

      var _year = calendarStart.getFullYear();

      var _month = calendarStart.getMonth() + 1;

      for (var i = startWeekDay; i < monthStartDay; i++) {
        var _date = startDate + i;

        results.push({
          year: _year,
          month: _month,
          date: _date,
          text: _date,
          prevMonth: true
        });
      }
    } //


    var monthEnd = getMonthEnd(date);
    var monthEndtDate = monthEnd.getDate();

    for (var _i11 = 1; _i11 <= monthEndtDate; _i11++) {
      var _date2 = _i11;
      results.push({
        year: year,
        month: month,
        date: _date2,
        text: _date2,
        currentMonth: true
      });
    } //


    var monthEndDay = monthEnd.getDay();
    var endWeekDay = 6 - startWeekDay;

    if (monthEndDay < endWeekDay) {
      var nextMonth = addDate(cloneDate(date), 1, 'month');

      var _year2 = nextMonth.getFullYear();

      var _month2 = nextMonth.getMonth() + 1;

      for (var _i12 = monthEndDay + 1, _date3 = 1; _i12 <= endWeekDay; _i12++, _date3++) {
        results.push({
          year: _year2,
          month: _month2,
          date: _date3,
          text: _date3,
          nextMonth: true
        });
      }
    } //


    return splitArray(results, 7);
  } // eg: 2018-09-07T03:38:37.888Z
  // timezone must be UTC

  function isIsoFormat(str) {
    return str.length > 15 && str.length < 30 && str.match(/^\d{4}-\d{2}-\d{2}T.*Z$/);
  } // timestamp eg: 2018-09-07T03:38:37.888Z

  function parseISO(timestamp) {
    var _timestamp$split = timestamp.split('T'),
        _timestamp$split2 = slicedToArray(_timestamp$split, 2),
        datePart = _timestamp$split2[0],
        timePart = _timestamp$split2[1];

    var y,
        m,
        d,
        h = 0,
        min = 0,
        s = 0;

    var _datePart$split$map = datePart.split('-').map(function (v) {
      return parseInt(v);
    });

    var _datePart$split$map2 = slicedToArray(_datePart$split$map, 3);

    y = _datePart$split$map2[0];
    m = _datePart$split$map2[1];
    d = _datePart$split$map2[2];
    m = m - 1;

    if (timePart) {
      var t = timePart.split('-').map(function (v) {
        return parseFloat(v);
      });
      h = t[0];

      if (t[1] != null) {
        min = t[1];
      }

      if (t[2] != null) {
        s = t[2];
      }
    }

    var dt = new Date(y, m, d, h, min, s); // the dt timezone is current, so reset hour with setUTCHours

    dt.setUTCHours(h);
    return dt;
  } // advance =================================
  // binarySearch 二分查找
  // callback(mid, i) should return mid - your_value

  function binarySearch(arr, callback, start, end, returnNearestIfNoHit) {
    var max = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1000;
    var midNum;
    var mid;

    if (start == null) {
      start = 0;
      end = arr.length - 1;
    }

    var i = 0;
    var r;

    while (start >= 0 && start <= end) {
      if (i >= max) {
        throw Error("binarySearch: loop times is over ".concat(max, ", you can increase the limit."));
      }

      midNum = Math.floor((end - start) / 2 + start);
      mid = arr[midNum];
      r = callback(mid, i);

      if (r > 0) {
        end = midNum - 1;
      } else if (r < 0) {
        start = midNum + 1;
      } else {
        return {
          index: midNum,
          value: mid,
          count: i + 1,
          hit: true
        };
      }

      i++;
    }

    return returnNearestIfNoHit ? {
      index: midNum,
      value: mid,
      count: i + 1,
      hit: false,
      bigger: r > 0
    } : null;
  } //

  function windowLoaded() {
    return new Promise(function (resolve, reject) {
      if (document && document.readyState === 'complete') {
        resolve();
      } else {
        glb().addEventListener('load', function once() {
          resolve();
          glb().removeEventListener('load', once);
        });
      }
    });
  }
  function waitTime(milliseconds, callback) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        callback && callback();
        resolve();
      }, milliseconds);
    });
  } // overload waitFor(condition, time = 100, maxCount = 1000))

  function waitFor(name, condition) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var maxCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

    if (isFunction(name)) {
      maxCount = time;
      time = isNumeric(condition) ? condition : 100;
      condition = name;
      name = null;
    }

    if (!store.waitFor) store.waitFor = {};
    var waits = store.waitFor;

    if (name && isset(waits[name])) {
      glb().clearInterval(waits[name]);
      delete waits[name];
    }

    return new Promise(function (resolve, reject) {
      var count = 0;

      function judge(interval) {
        if (count <= maxCount) {
          if (condition()) {
            stop(interval, name);
            resolve();
          }
        } else {
          stop(interval, name);
          reject(new Error('waitFor: Limit is reached'));
        }

        count++;
      }

      function stop(interval, name) {
        if (interval) {
          if (name && isset(waits[name])) {
            glb().clearInterval(waits[name]);
            delete waits[name];
          } else {
            glb().clearInterval(interval);
          }
        }
      }

      var interval = glb().setInterval(function () {
        judge(interval);
      }, time);

      if (name) {
        waits[name] = interval;
      }

      judge();
    });
  }
  function retry(func) {
    var limitTimes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    if (!store.retry) store.retry = {};
    var counters = retry;
    var name = generateName();
    counters[name] = 0;
    return doFunc;

    function doFunc(arg1, arg2, arg3) {
      return func(arg1, arg2, arg3).then(function (data) {
        delete counters[name];
        return data;
      }).catch(function (e) {
        counters[name]++;

        if (counters[name] >= limitTimes) {
          delete counters[name];
          return Promise.reject(e);
        } else {
          return doFunc(arg1, arg2, arg3);
        }
      });
    }

    function generateName() {
      var name = Math.random() + '';

      if (counters[name]) {
        return generateName();
      } else {
        return name;
      }
    }
  } // 复制文字到剪贴板

  function copyTextToClipboard(text) {
    try {
      // use latest api
      navigator.clipboard.writeText(text);
      return;
    } catch (e) {}

    var textArea = document.createElement('textarea'); //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //
    // Place in top-left corner of screen regardless of scroll position.

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0; // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.

    textArea.style.width = '2em';
    textArea.style.height = '2em'; // We don't need padding, reducing the size if it does flash render.

    textArea.style.padding = 0; // Clean up any borders.

    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none'; // Avoid flash of white box if rendered for any reason.

    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
  }
  function isWindowDefined() {
    try {
      return window && true;
    } catch (error) {
      return false;
    }
  }
  function isNode() {
    return Boolean(typeof glb().module !== 'undefined' && glb().module.exports);
  }
  function isIE() {
    return Boolean(window.ActiveXObject || "ActiveXObject" in window);
  } // jquery

  function jqFixedSize(sel) {
    var $ = glb().jQuery;
    $(sel).each(function () {
      var t = $(this);
      t.css({
        width: t.width() + 'px',
        height: t.height() + 'px'
      });
    });
  }
  function jqMakeCarousel(wrapperSel, listSel, itemSel) {
    var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
    var space = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 16;
    var dir = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'left';
    var top = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

    if (space.toString().match(/^\d+$/)) {
      space = space + 'px';
    }

    var spaceNumber = parseFloat(space);
    var $ = glb().jQuery;
    var wrapper = $(wrapperSel);
    var list = wrapper.find(listSel);
    wrapper.css({
      position: 'relative',
      height: wrapper.height() + 'px'
    });
    var items0 = list.find(itemSel);
    items0.css({
      margin: '0',
      marginRight: space
    });
    var width = (Math.ceil(items0.width()) + spaceNumber) * items0.length;
    list.css({
      position: 'absolute',
      margin: '0',
      width: width + 'px'
    });
    var height = list.height();
    var list2 = list.clone();
    var list3 = list.clone();
    list.css({
      left: 0
    });
    list2.css({
      left: width + 'px'
    });
    list3.css({
      left: width * 2 + 'px'
    });
    var lists = $('<div></div>');
    lists.css({
      position: 'absolute',
      width: width * 3 + 'px',
      height: height + 'px',
      left: 0,
      top: top
    });
    lists.append(list).append(list2).append(list3);
    wrapper.append(lists);
    var left = 0;

    function animateLoop() {
      if (dir === 'left') {
        left -= 100;
      } else {
        left += 100;
      }

      lists.animate({
        left: "".concat(left, "px")
      }, speed, 'linear', function () {
        if (Math.abs(left) > width) {
          if (dir === 'left') {
            left += width;
          } else {
            left -= width;
          }

          lists.css({
            left: left + 'px'
          });
        }

        animateLoop();
      });
    }

    animateLoop();
  } // https://developer.mozilla.org/docs/Web/API/Window/open
  // http://www.w3school.com.cn/htmldom/met_win_open.asp#windowfeatures

  function openWindow(url, name) {
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    glb().open(url, name, Object.keys(opt).map(function (k) {
      return "".concat(k, "=").concat(opt[k]);
    }).join(','));
  }
  function openCenterWindow(url, name, width, height) {
    var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var t = {
      width: width,
      height: height,
      top: (glb().screen.availHeight - 30 - height) / 2,
      left: (glb().screen.availWidth - 30 - width) / 2
    };
    Object.assign(t, opt);
    openWindow(url, name, t);
  }
  var URLHelper = /*#__PURE__*/function () {
    // protocol, hostname, port, pastname
    function URLHelper(baseUrl) {
      var _this3 = this;

      classCallCheck(this, URLHelper);

      this.baseUrl = '';
      this.search = {};
      var t = decodeURI(baseUrl).split('?');
      this.baseUrl = t[0];

      if (t[1]) {
        t[1].split('&').forEach(function (v) {
          var t2 = v.split('=');
          _this3.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    createClass(URLHelper, [{
      key: "getHref",
      value: function getHref() {
        var _this4 = this;

        var t = [this.baseUrl];
        var searchStr = Object.keys(this.search).map(function (k) {
          return "".concat(k, "=").concat(encodeURIComponent(_this4.search[k]));
        }).join('&');

        if (searchStr) {
          t.push(searchStr);
        }

        return t.join('?');
      }
    }]);

    return URLHelper;
  }(); // 解析函数参数, 帮助重载
  // types eg: ['Object', (i) => i > 3, ['Number', default], null ]
  // null represent all types of argument

  function resolveArgsByType(args, types) {
    var argIndex = 0;
    return types.map(function (v) {
      // make rule
      var rule, dft;

      if (isArray(v)) {
        rule = v[0];
        dft = v[1];
      } else {
        rule = v;
        dft = undefined;
      }

      if (!isFunction(rule)) {
        if (rule == null) {
          rule = function rule() {
            return true;
          };
        } else {
          var t = rule;

          rule = function rule(x) {
            return Object.prototype.toString.call(x) === "[object ".concat(t, "]");
          };
        }
      }

      var arg = args[argIndex];

      if (rule(arg)) {
        argIndex++;
        return arg;
      } else {
        return dft;
      }
    });
  } // set null can remove a item

  function makeStorageHelper(storage) {
    return {
      storage: storage,
      set: function set(name, value, minutes) {
        if (value == null) {
          this.storage.removeItem(name);
        } else {
          this.storage.setItem(name, JSON.stringify({
            value: value,
            expired_at: minutes ? new Date().getTime() + minutes * 60 * 1000 : null
          }));
        }
      },
      get: function get(name) {
        var t = this.storage.getItem(name);

        if (t) {
          t = JSON.parse(t);

          if (!t.expired_at || t.expired_at > new Date().getTime()) {
            return t.value;
          } else {
            this.storage.removeItem(name);
          }
        }

        return null;
      },
      clear: function clear() {
        this.storage.clear();
      }
    };
  }
  function getLocalStorage2() {
    if (!store.localStorage2) {
      store.localStorage2 = makeStorageHelper(glb().localStorage);
    }

    return store.localStorage2;
  }
  function getSessionStorage2() {
    if (!store.sessionStorage2) {
      store.sessionStorage2 = makeStorageHelper(glb().sessionStorage);
    }

    return store.sessionStorage2;
  } // 事件处理

  var EventProcessor = /*#__PURE__*/function () {
    function EventProcessor() {
      classCallCheck(this, EventProcessor);

      this.eventStore = [];
    }

    createClass(EventProcessor, [{
      key: "on",
      value: function on(name, handler) {
        this.eventStore.push({
          name: name,
          handler: handler
        });
      }
    }, {
      key: "once",
      value: function once(name, handler) {
        var _this5 = this;

        var off = function off() {
          _this5.off(name, wrappedHandler);
        };

        var wrappedHandler = function wrappedHandler() {
          handler.apply(void 0, arguments);
          off();
        };

        this.on(name, wrappedHandler);
        return off;
      }
    }, {
      key: "onceTimeout",
      value: function onceTimeout(name, handler, timeout) {
        var _this6 = this;

        var off;
        var promise = new Promise(function (resolve, reject) {
          var wrappedHandler = function wrappedHandler() {
            handler.apply(void 0, arguments);
            resolve();
          };

          off = _this6.once(name, wrappedHandler);
          waitTime(timeout).then(function () {
            off();
            reject();
          });
        });

        var off2 = function off2() {
          off && off();
        };

        return {
          off: off2,
          promise: promise
        };
      }
    }, {
      key: "off",
      value: function off(name, handler) {
        var indexes = []; // to remove indexes; reverse; 倒序的

        var len = this.eventStore.length;

        for (var i = 0; i < len; i++) {
          var item = this.eventStore[i];

          if (item.name === name && item.handler === handler) {
            indexes.unshift(i);
          }
        }

        for (var _i13 = 0, _indexes = indexes; _i13 < _indexes.length; _i13++) {
          var index = _indexes[_i13];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];

        var _iterator15 = _createForOfIteratorHelper(this.eventStore),
            _step15;

        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var _item = _step15.value;

            if (_item.name === name) {
              items.push(_item);
            }
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }

        for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key12 = 1; _key12 < _len10; _key12++) {
          args[_key12 - 1] = arguments[_key12];
        }

        for (var _i14 = 0, _items = items; _i14 < _items.length; _i14++) {
          var item = _items[_i14];
          item.handler.apply(item, args);
        }
      }
    }]);

    return EventProcessor;
  }();
  var CrossWindowEventProcessor = /*#__PURE__*/function (_EventProcessor) {
    inherits(CrossWindowEventProcessor, _EventProcessor);

    var _super = _createSuper(CrossWindowEventProcessor);

    // id
    function CrossWindowEventProcessor(opt) {
      var _this7;

      classCallCheck(this, CrossWindowEventProcessor);

      _this7 = _super.call(this);
      _this7.storageName = '_crossWindow';
      _this7.windows = [];
      _this7.timeout = 200;
      _this7.BROADCAST = '__BROADCAST__';

      if (opt) {
        Object.assign(assertThisInitialized(_this7), opt);
      }

      onDOM(window, 'storage', function (ev) {
        if (ev.key === _this7.storageName) {
          var event = JSON.parse(ev.newValue);

          if (!event.targets || event.targets.includes(_this7.id)) {
            var _this8;

            (_this8 = _this7).emitLocal.apply(_this8, [event.name].concat(toConsumableArray(event.args)));
          }
        }
      }); // social parts 集体部分
      // join

      _this7.id = strRand();
      _this7.windows = [_this7.id];
      _this7.ready = new Promise(function (resolve, reject) {
        _this7.onceTimeout('_windows_updated', function (_ref) {
          var windows = _ref.windows;
          _this7.windows = windows;
        }, _this7.timeout).promise.then(function () {
          resolve(); // responsed 被响应
        }, function () {
          // no response 无响应
          resolve();
        });

        _this7.broadcast('_join', _this7.id);
      });

      _this7.ready.then(function () {
        // on join
        _this7.on('_join', function (id) {
          _this7.windows.push(id);

          if (_this7.isMain()) {
            _this7.broadcast('_windows_updated', {
              windows: _this7.windows,
              type: 'join',
              id: id
            });
          }
        }); // on _windows_updated


        _this7.on('_windows_updated', function (_ref2) {
          var windows = _ref2.windows;
          _this7.windows = windows;
        }); // on exit


        _this7.on('_exit', function (id) {
          var oldMain = _this7.windows[0];
          arrayRemove(_this7.windows, id);

          if (_this7.isMain()) {
            _this7.emit('_windows_updated', {
              windows: _this7.windows,
              type: 'exit',
              id: id
            });

            if (oldMain != _this7.id) {
              _this7.emit('_main_updated', {
                windows: _this7.windows,
                old: oldMain,
                'new': _this7.id
              });
            }
          }
        });

        onDOM(window, 'beforeunload', function () {
          _this7.exitGroup();
        });
      });

      return _this7;
    }

    createClass(CrossWindowEventProcessor, [{
      key: "isMain",
      value: function isMain() {
        return this.id === this.windows[0];
      }
    }, {
      key: "emitTo",
      value: function emitTo(name, targets) {
        for (var _len11 = arguments.length, args = new Array(_len11 > 2 ? _len11 - 2 : 0), _key13 = 2; _key13 < _len11; _key13++) {
          args[_key13 - 2] = arguments[_key13];
        }

        if (targets === this.BROADCAST) {
          targets = null;
        } else {
          if (targets && !isArray(targets)) {
            targets = [targets];
          }

          if (targets.includes(this.id)) {
            var _get2;

            (_get2 = get(getPrototypeOf(CrossWindowEventProcessor.prototype), "emit", this)).call.apply(_get2, [this, name].concat(args)); // emit to current window

          }
        }

        glb().localStorage.setItem(this.storageName, JSON.stringify({
          name: name,
          targets: targets,
          args: args,
          // use random make storage event triggered every time
          // 加入随机保证触发storage事件
          random: Math.random()
        }));
      }
    }, {
      key: "emitLocal",
      value: function emitLocal(name) {
        for (var _len12 = arguments.length, args = new Array(_len12 > 1 ? _len12 - 1 : 0), _key14 = 1; _key14 < _len12; _key14++) {
          args[_key14 - 1] = arguments[_key14];
        }

        this.emitTo.apply(this, [name, this.id].concat(args));
      }
    }, {
      key: "broadcast",
      value: function broadcast(name) {
        for (var _len13 = arguments.length, args = new Array(_len13 > 1 ? _len13 - 1 : 0), _key15 = 1; _key15 < _len13; _key15++) {
          args[_key15 - 1] = arguments[_key15];
        }

        this.emitTo.apply(this, [name, this.BROADCAST].concat(args));
      }
    }, {
      key: "emit",
      value: function emit(name) {
        for (var _len14 = arguments.length, args = new Array(_len14 > 1 ? _len14 - 1 : 0), _key16 = 1; _key16 < _len14; _key16++) {
          args[_key16 - 1] = arguments[_key16];
        }

        this.emitTo.apply(this, [name, this.windows].concat(args));
      }
    }, {
      key: "exitGroup",
      value: function exitGroup() {
        this.broadcast('_exit', this.id);
      }
    }]);

    return CrossWindowEventProcessor;
  }(EventProcessor); // Deprecated in next version

  var CrossWindow = CrossWindowEventProcessor;
  function onQuickKeydown(handler) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    opt = _objectSpread({
      timeout: 1000
    }, opt);
    var input = '';
    var timeoutId;

    var keydownHandler = function keydownHandler(e) {
      if (e.key && e.key.length === 1) {
        input = "".concat(input).concat(e.key);
        handler(input);

        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        timeoutId = setTimeout(function () {
          input = '';
        }, opt.timeout);
      }
    };

    onDOM(document, 'keydown', keydownHandler);
    return function () {
      offDOM(document, 'keydown', keydownHandler);
    };
  }
  function getUserLanguage() {
    return navigator.language || navigator.userLanguage;
  }
  var Cache = /*#__PURE__*/function () {
    function Cache() {
      classCallCheck(this, Cache);

      this.store = {};
    }

    createClass(Cache, [{
      key: "has",
      value: function has(name) {
        return this.store.hasOwnProperty(name);
      }
    }, {
      key: "remember",
      value: function remember(name, getter) {
        if (!this.has(name)) {
          this.store[name] = {
            value: getter()
          };
        }

        return this.store[name].value;
      }
    }, {
      key: "forget",
      value: function forget(name) {
        if (name) {
          if (this.has(name)) {
            delete this.store[name];
          }
        } else {
          this.store = {};
        }
      }
    }]);

    return Cache;
  }(); // attach cached getters to an object; can attach to self

  function attachCache(obj, toCache) {
    var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Cache();

    var _loop4 = function _loop4(key) {
      var getter = toCache[key];
      Object.defineProperty(obj, key, {
        get: function get() {
          var _this9 = this;

          return cache.remember(key, function () {
            return getter.call(_this9);
          });
        }
      });
    };

    for (var key in toCache) {
      _loop4(key);
    }
  }

  exports.Cache = Cache;
  exports.CrossWindow = CrossWindow;
  exports.CrossWindowEventProcessor = CrossWindowEventProcessor;
  exports.EventProcessor = EventProcessor;
  exports.TreeData = TreeData;
  exports.URLHelper = URLHelper;
  exports.addClass = addClass;
  exports.addDate = addDate;
  exports.appendTo = appendTo;
  exports.arrayAt = arrayAt;
  exports.arrayDiff = arrayDiff;
  exports.arrayDistinct = arrayDistinct;
  exports.arrayFirst = arrayFirst;
  exports.arrayFlat = arrayFlat;
  exports.arrayGet = arrayGet;
  exports.arrayLast = arrayLast;
  exports.arrayRemove = arrayRemove;
  exports.arrayRemoveBySortedIndexes = arrayRemoveBySortedIndexes;
  exports.arraySibling = arraySibling;
  exports.arrayWithoutEnd = arrayWithoutEnd;
  exports.assignIfDifferent = assignIfDifferent;
  exports.attachCache = attachCache;
  exports.backupAttr = backupAttr;
  exports.binarySearch = binarySearch;
  exports.camelCase = camelCase;
  exports.camelToWords = camelToWords;
  exports.cloneDate = cloneDate;
  exports.cloneObj = cloneObj;
  exports.copyTextToClipboard = copyTextToClipboard;
  exports.createElementFromHTML = createElementFromHTML;
  exports.debounce = debounce;
  exports.debounceImmediate = debounceImmediate;
  exports.debounceTrailing = debounceTrailing;
  exports.depthFirstSearch = depthFirstSearch;
  exports.elementsFromPoint = elementsFromPoint;
  exports.empty = empty;
  exports.executeOnceInScopeByName = executeOnceInScopeByName;
  exports.executePromiseGetters = executePromiseGetters;
  exports.executeWithCount = executeWithCount;
  exports.findNodeList = findNodeList;
  exports.findNodeListReverse = findNodeListReverse;
  exports.findParent = findParent;
  exports.forAll = forAll;
  exports.getBorder = getBorder;
  exports.getBoundingClientRect = getBoundingClientRect;
  exports.getCalendar = getCalendar;
  exports.getCss3Prefix = getCss3Prefix;
  exports.getElSize = getElSize;
  exports.getElSizeEvenInvisible = getElSizeEvenInvisible;
  exports.getImageSizeByUrl = getImageSizeByUrl;
  exports.getLocalStorage2 = getLocalStorage2;
  exports.getMonthEnd = getMonthEnd;
  exports.getMonthStart = getMonthStart;
  exports.getOffset = getOffset;
  exports.getOffsetParent = getOffsetParent;
  exports.getOuterAttachedHeight = getOuterAttachedHeight;
  exports.getOuterAttachedWidth = getOuterAttachedWidth;
  exports.getPosition = getPosition;
  exports.getPositionFromOffset = getPositionFromOffset;
  exports.getScroll = getScroll;
  exports.getSessionStorage2 = getSessionStorage2;
  exports.getUrlParam = getUrlParam;
  exports.getUserLanguage = getUserLanguage;
  exports.getViewportPosition = getViewportPosition;
  exports.glb = glb;
  exports.groupArray = groupArray;
  exports.hasClass = hasClass;
  exports.insertAfter = insertAfter;
  exports.insertBefore = insertBefore;
  exports.isArray = isArray;
  exports.isBool = isBool;
  exports.isDescendantOf = isDescendantOf;
  exports.isDocumentExisted = isDocumentExisted;
  exports.isFunction = isFunction;
  exports.isIE = isIE;
  exports.isIsoFormat = isIsoFormat;
  exports.isNode = isNode;
  exports.isNumber = isNumber;
  exports.isNumeric = isNumeric;
  exports.isObject = isObject;
  exports.isOffsetInEl = isOffsetInEl;
  exports.isPromise = isPromise;
  exports.isString = isString;
  exports.isWindowDefined = isWindowDefined;
  exports.isset = isset;
  exports.iterateALL = iterateALL;
  exports.iterateAll = iterateAll;
  exports.joinFunctionsByNext = joinFunctionsByNext;
  exports.joinFunctionsByResult = joinFunctionsByResult;
  exports.joinMethods = joinMethods;
  exports.jqFixedSize = jqFixedSize;
  exports.jqMakeCarousel = jqMakeCarousel;
  exports.kebabCase = kebabCase;
  exports.makeStorageHelper = makeStorageHelper;
  exports.mapObjectTree = mapObjectTree;
  exports.mapObjects = mapObjects;
  exports.max = max;
  exports.min = min;
  exports.newArrayRemoveAt = newArrayRemoveAt;
  exports.numPad = numPad;
  exports.numRand = numRand;
  exports.objectExcept = objectExcept;
  exports.objectGet = objectGet;
  exports.objectMap = objectMap;
  exports.objectMerge = objectMerge;
  exports.objectOnly = objectOnly;
  exports.objectSet = objectSet;
  exports.offDOM = offDOM;
  exports.offsetToViewportPosition = offsetToViewportPosition;
  exports.onDOM = onDOM;
  exports.onDOMMany = onDOMMany;
  exports.onQuickKeydown = onQuickKeydown;
  exports.openCenterWindow = openCenterWindow;
  exports.openWindow = openWindow;
  exports.pairRows = pairRows;
  exports.parseISO = parseISO;
  exports.prependTo = prependTo;
  exports.promiseTimeout = promiseTimeout;
  exports.removeClass = removeClass;
  exports.removeEl = removeEl;
  exports.replaceMultiple = replaceMultiple;
  exports.resolveArgsByType = resolveArgsByType;
  exports.resolveValueOrGettter = resolveValueOrGettter;
  exports.restoreAttr = restoreAttr;
  exports.retry = retry;
  exports.setElChildByIndex = setElChildByIndex;
  exports.snakeCase = snakeCase;
  exports.splitArray = splitArray;
  exports.store = store;
  exports.store_executeOnceInScopeByName = store_executeOnceInScopeByName;
  exports.strRand = strRand;
  exports.studlyCase = studlyCase;
  exports.titleCase = titleCase;
  exports.toArrayIfNot = toArrayIfNot;
  exports.uniqueId = uniqueId;
  exports.unset = unset;
  exports.viewportPositionToOffset = viewportPositionToOffset;
  exports.waitFor = waitFor;
  exports.waitTime = waitTime;
  exports.walkTreeData = walkTreeData;
  exports.watchChange = watchChange;
  exports.windowLoaded = windowLoaded;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
