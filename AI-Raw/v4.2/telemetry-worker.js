/**
 * ZXSPRD AI - Telemetry Web Worker
 * Runs in a background thread to simulate edge device hardware metrics 
 * without blocking the main UI thread.
 */

let intervalId = null;
let podIds = [];

// Listen for control messages from the main thread
self.onmessage = function(e) {
  const { type, data } = e.data;

  if (type === 'START_TELEMETRY') {
    podIds = data.podIds || [];
    startSimulation();
  } else if (type === 'STOP_TELEMETRY') {
    stopSimulation();
  } else if (type === 'UPDATE_PODS') {
    podIds = data.podIds || [];
  }
};

function startSimulation() {
  if (intervalId) clearInterval(intervalId);

  // Update metrics every 2.5 seconds
  intervalId = setInterval(() => {
    const updatedPods = podIds.map(podId => {
      // Simulate realistic hardware fluctuations
      const pingMs = Math.floor(Math.random() * (120 - 18 + 1)) + 18;
      const cpuUsage = Math.floor(Math.random() * (88 - 12 + 1)) + 12;
      const memoryUsageGb = parseFloat((Math.random() * (7.2 - 3.1) + 3.1).toFixed(1));
      
      // Battery slowly drains, but occasionally recharges (simulating being plugged in)
      const batteryDelta = Math.random() > 0.8 ? Math.floor(Math.random() * 5) : -Math.floor(Math.random() * 2);
      
      // 5% chance to enter 'Degraded' state, otherwise 'Online'
      const status = Math.random() > 0.95 ? 'Degraded' : 'Online';

      return {
        id: podId,
        pingMs,
        cpuUsage,
        memoryUsageGb,
        batteryDelta, 
        status
      };
    });

    // Send the simulated metrics back to the main thread
    self.postMessage({
      type: 'TELEMETRY_UPDATE',
      payload: updatedPods
    });
  }, 2500);
}

function stopSimulation() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}