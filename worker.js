onmessage = function (e) {
    const time = e.data.time;

    // Calculate color based on time for a dynamic texture effect
    const colorValue = Math.floor((Math.sin(time * 0.001) + 1) * 127.5);
    const color = `rgb(${colorValue}, ${colorValue}, 255)`;

    // Send the result back to the main thread
    postMessage({ color });
};
