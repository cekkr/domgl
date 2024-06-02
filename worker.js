onmessage = function (e) {
    // Perform any worker-specific tasks
    const time = e.data.time;

    // This example doesn't need to do anything in the worker for now
    // Post a message back to the main thread to trigger canvas update
    postMessage({});
};
