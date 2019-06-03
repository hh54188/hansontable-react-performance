self.addEventListener(
  "message",
  function(e) {
    console.log("Generate Begin");

    const result = [];
    for (let i = 0; i < 10e5 * 3; i++) {
      result.push(new Object());
    }

    self.postMessage(result);
  },
  false
);
