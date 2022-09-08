// //Task1--------------------------------------------
function first() {
   console.log(1);
   setTimeout(two, 1000);
};
function two() {
   console.log(2);
   setTimeout(three, 1000);
};
function three() {
   console.log(3)
};
first();

//Task2----------------------------------------------
function first2() {
   return new Promise((res) => {
      setTimeout(() => res(console.log(1)), 1000)
   })
};

function two2() {
   return new Promise((res) => {
      setTimeout(() => res(console.log(2)), 1000)
   })
};

function three2() {
   return new Promise((res) => {
      setTimeout(() => res(console.log(3)), 1000)
   })
};

async function launchFunctions() {
   try {
      await first2();
      await two2();
      await three2();
      // const res = await Promise.all([first2(), two2(), three2()]);
   }
   catch (err) {
      console.log(err)
   };
}
launchFunctions()
// Task3------------------------------------------------
const fulefilled = 'fulefilled';
const pending = 'pending';
const rejected = 'rejected';

class MyPromise {
   constructor(executor) {
      this.state = pending;
      this.result = undefined;
      this.onFulfilledFn = [];
      this.onRejectedFn = [];


      const resolve = (value) => {
         if (this.state === pending) {
            this.state = fulefilled;
            this.result = value;
            this.onFulfilledFn.forEach(fn => fn(value));
         }
      };

      const reject = (error) => {
         if (this.state === pending) {
            this.state = rejected;
            this.result = error;
            this.onRejectedFn.forEach(fn => fn(error));
         }
      };

      try {
         executor(resolve, reject);
      } catch (err) {
         reject(err);
      }
   }

   then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
         if (this.state === pending) {
            if (onFulfilled) {
               this.onFulfilledFn.push(() => {
                  try {
                     const newResult = onFulfilled(this.result);
                     resolve(newResult);
                  } catch (err) {
                     reject(err);
                  }
               });
            }

            if (onRejected) {
               this.onRejectedFn.push(() => {
                  try {
                     const newResult = onRejected(this.result);
                     reject(newResult)
                  } catch (err) {
                     reject(err)
                  }
               });
            }
            return;
         }

         if (onFulfilled && this.state === fulefilled) {
            try {
               const newResult = onFulfilled(this.result);
               resolve(newResult);
            } catch (err) {
               reject(err);
            }
            return;
         }

         if (onRejected && this.state === rejected) {
            try {
               const newResult = onRejected(this.result);
               reject(newResult);
            } catch (err) {
               reject(err);
            }
            return;
         }
      })
   }
   catch(onRejected) {
      return this.then(null, onRejected);
   }
}

let myPromise = new MyPromise((res, rej) => {
   res('ok');
})
myPromise.then((value) => {
   return value + ' this chain work';
})
   .then(value => console.log(value));



































