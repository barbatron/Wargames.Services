const compile = require('../messageType').compile;
const _ = require('lodash');

// console.log(`handlers init: COMPILE:${compile}    LODASH:${_}`);
/**
 * The registered message handlers.
 * @type {{}} A map of compiled message namespaces/types and their respective handlers.
 */
let handlers = {};

/**
 * Resets the handler map.
 * @returns {{}} The reset handler map.
 */
const reset = () => handlers = {};

/**
 * Registers a handler of a message type.
 * @param type The message type.
 * @param callback The callback invoked when the message occurs.
 * @param namespace (Optional) The message namespace.
 */
const register = (messages, namespace) => {
    Object.keys(messages).forEach(message => {
      const callback = messages[message];
      const type = message;
      // console.log(`register> Iterating entries. ${message}     ${callback}`)
      const messageType = compile({type, namespace});
      handlers[messageType] = callback;
      // console.log(`Registered message ${messageType} with handler (${namespace}) ${callback.name || '(anonymous)'}`);
    });
  }
;

/**
 * Returns a map of all registered message handlers.
 * @returns {{}} The message handler map.
 */
const getAll = () => handlers;

/**
 * Returns the handler for a specific message type.
 * @param type The message type.
 * @param namespace (Optional) The message namespace.
 * @returns {Function} The handler for the specified message type.
 */
const getForType = (type, namespace) => {
  const messageType = compile({type, namespace});
  return handlers[messageType];
};

module.exports = {register, reset, getAll, getForType};
