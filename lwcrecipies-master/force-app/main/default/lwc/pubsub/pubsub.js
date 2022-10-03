/*
    Author      : Amit Singh
    Company     : SFDCPanther
    Built Date  : 2nd October 2019
    Web         : https://sfdcpanther.com
    LinkedIn    : https://www.linkedin.com/in/simplyamit/
    YouTube     : https://www.youtube.com/c/SFDCPanther
    Twitter     : https://twitter.com/cloudyamit
    Version     : 1.0

    *************************** Modified History *************************
        Modified Date :- 
        Version       :- 
        Modified By   :- 
        Description   :- 
*/
/* eslint-disable no-console */

// this variable holds the list of all the events needs to be published/unpublished
const callbacks = {};

/**
 * Registers a callback for an event
 * @param {string} eventName - Name of the event to listen for.
 * @param {function} callback - Function to invoke when said event is fired.
 */
const register = (eventName, callback) => {
    if (!callbacks[eventName]) {
        callbacks[eventName] = new Set();
    }
    callbacks[eventName].add(callback);
};

/**
 * Unregisters a callback for an event
 * @param {string} eventName - Name of the event to unregister from.
 * @param {function} callback - Function to unregister.
 */
const unregister = (eventName, callback) => {
    if (callbacks[eventName]) {
        callbacks[eventName].delete(callback);
    }
};

/**
 * Fires an event to listeners.
 * @param {string} eventName - Name of the event to fire.
 * @param {*} payload - Payload of the event to fire.
 */
const fire = (eventName, payload) => {
    if (callbacks[eventName]) {
        callbacks[eventName].forEach(callback => {
            try {
                console.log( ' firing event using pub-sub pattern ');
                callback(payload);
            } catch (error) {
                console.log(' Error Occured ', error)
            }
        });
    }
};

export default {
    register,
    unregister,
    fire
};