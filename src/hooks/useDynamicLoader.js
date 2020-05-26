import React from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const id = (x) => x;
const noop = () => {};

const cancellable = (promise) => {
  let cancelled = false;

  const then = (resolve, reject = id) => {
    return cancellable(
      promise.then(
        (...args) => {
          if (!cancelled) {
            resolve(...args);
          }
        },
        (...args) => {
          if (!cancelled) {
            reject(...args);
          }
        }
      )
    );
  };

  const catchError = (f) => {
    return then(id, f);
  };

  const cancel = () => {
    cancelled = true;
  };

  return {
    then,
    catchError,
    cancel,
    promise,
  };
};

const useDynamicLoader = (url, fileName) => {
  const [loaded, setLoaded] = React.useState(false);
  const [object, setObject] = React.useState(null);
  const [promise, setPromise] = React.useState(null);

  const resetLoader = () => {
    if (promise) {
      promise.cancel();
      setPromise(null);
    }
  };

  const loadObj = () => {
    const loader = new OBJLoader();

    const prom = cancellable(
      new Promise((resolve, reject) => {
        loader.load(url, resolve, noop, reject);
      })
    );

    setPromise(prom);

    prom.then(
      (result) => {
        setLoaded(true);
        setObject(result);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  };

  React.useEffect(() => {
    // test for type
    resetLoader();
    loadObj();
  }, [url, fileName]);

  return {
    loaded,
    object,
  };
};

export default useDynamicLoader;
