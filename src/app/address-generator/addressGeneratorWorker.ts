const workerCode = () => {
    self.onmessage = function(event) {
      const target = event.data.target;
      let attempts = 0;
      let found = false;
    
      while (!found) {
          attempts++;
          const number = Math.random();
          
          if (number.toString().endsWith(target)) {
              found = true;
              self.postMessage({
                  status: 'found',
                  number: number,
                  attempts: attempts
              });
          }
    
          // 每100000次尝试报告一次进度
          if (attempts % 100000 === 0) {
              self.postMessage({
                  status: 'progress',
                  attempts: attempts
              });
          }
      }
    };
}

let code = workerCode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
const blob = new Blob([code], { type: 'application/javascript' });
const workerScriptURL = URL.createObjectURL(blob);

export default workerScriptURL;