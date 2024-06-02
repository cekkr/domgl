onmessage = function (e) {
    const time = e.data.time;

    // Perform some heavy computations or animations
    const rotationX = time * 0.001;
    const rotationY = time * 0.001;

    // Send the result back to the main thread
    postMessage({ rotationX, rotationY });
};
