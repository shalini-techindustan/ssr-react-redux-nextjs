const s = require('actions/types').storage;
const a = require('actions/types').app;
import STORAGE from 'root/storage';

export function initStorage() {
  return function (dispatch, getStore) {
    return new Promise(function (resolve, reject) {
      STORAGE.init()
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err.message);
        })
    });
  }
}


export function syncStorage() {
  return function (dispatch, getStore) {
    return new Promise(function (resolve, reject) {
      const store = getStore();
      let ts = Date.now();
      STORAGE.getStore()
        .then(storage => {
          //if no storage  copy current store
          if (!storage) {
            store.storage.updated = ts;
            store.app.updated = ts;
            STORAGE.setStore(store)
              .then(() => {
                dispatch(setUpdated(ts)); //so times will match
                console.log('storage updated from store');
                return resolve();
              })
              .catch(err => {
                reject(err.message);
              })
          }
          //store => storage
          else if (store.app.updated > storage.storage.updated) {
            console.log('store later than storage');
            store.storage.updated = store.app.updated;
            STORAGE.setStore(store)
              .then(() => {
                console.log('storage updated from store');
                resolve();
              })
              .catch(err => {
                reject(err);
              })
          }
          //storage => store  (user refreshed browser)
          else if (!store.app.updated || (storage.storage.updated > store.app.updated)) {
            storage.app.updated = storage.storage.updated;
            console.log('storage later than store');
            dispatch(setWholeStore(storage));
            console.log('store updated from storage');
            resolve();
          }
          else if (store.app.updated === storage.storage.updated) {
            console.log('storage is in sync');
            resolve();
          }

        })
        .catch(err => {
          console.error('storage err: ', err);
          reject(err.message);
        });
    });
  }
}

function setWholeStore(store) {
  return {
    type: s.SET_STORE,
    payload: store
  };
}

function setUpdated(ts) {
  return {
    type: a.SET_UPDATED,
    payload: ts
  };
}

export function ageStore(ts) {
  if (typeof ts !== 'number') { ts = Date.now() }
  return {
    type: a.SET_UPDATED,
    payload: ts
  };
}