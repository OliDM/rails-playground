class Dispatcher {
  constructor() {
    this.topics = {};
    this.runOnce = {};
    this.hOP = this.topics.hasOwnProperty;
    this.roOP = this.runOnce.hasOwnProperty;

    this.subscribe = this.subscribe.bind(this);
    this.subscribeOnce = this.subscribeOnce.bind(this);
    this.publish = this.publish.bind(this);
  }


  subscribe(topic, listener) {
    // Create the topic's object if not yet created
    if (!this.hOP.call(this.topics, topic)) this.topics[topic] = [];

    // Add the listener to queue
    var index = this.topics[topic].push(listener) - 1;

    // Provide handle back for removal of topic
    return {
      remove: () => {
        delete this.topics[topic][index];
      }
    };
  }

  subscribeOnce(topic, listener) {
    if (!roOP.call(this.runOnce, topic)) this.runOnce[topic] = [];

    // Add the listener to queue
    var index = this.runOnce[topic].push(listener) - 1;

    // Provide handle back for removal of topic
    return {
      remove: () => {
        delete this.runOnce[topic][index];
      }
    };
  }

  publish(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    var args = Array.prototype.slice.call(arguments);
    // Remove the topic.
    args.shift();

    if (!this.hOP.call(this.topics, topic) && !this.roOP.call(this.runOnce, topic)) return;
    // Cycle through topics queue, fire!
    this.topics[topic] && this.topics[topic].forEach((item) => {
      item.apply(undefined, args);
    });

    this.runOnce[topic] && this.runOnce[topic].forEach((item) => {
      item.apply(undefined, args);
    });

    this.runOnce[topic] = [];
  }
}

let dispatcher = new Dispatcher();
export default dispatcher;