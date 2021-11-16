## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

Ans: Component and PureComponent are same except PureComponent handle *shouldComponentUpdate* method where it checks props or state changes, PureComponent will do a shallow comparison on both props and state. 

PureComponent's shouldComponentUpdate() only shallowly compares the objects so if component have deep nested prop changes their it might miss it and won't rerender.


## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Ans: *shouldComponentUpdate* bypasses the rendering of a part of the component tree. If props or state of a component are not changed in a meaningful way, it will return false from shouldComponentUpdate and descendants that make use of props and/or state won’t be updated

## 3. Describe 3 ways to pass information from a component to its PARENT.

Ans: 1. By Callback
     2. Create a Context and update the context from child 
     3. Using Redux or any other state management library, update the Global state and consume it in parent


## 4. Give 2 ways to prevent components from re-rendering.

Ans: 1. Use PureComponent
     2. Use ShouldComponentUpdate


## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Ans: Fragment is used to group a list of childeren without adding a new node to DOM, Advantage of this that it consume less memory.

## 6. Give 3 examples of the HOC pattern.

Ans: A HOC is a technique for reusing logic in React components
     ```const higherOrderComponent = (WrappedComponent) => {
          class HOC extends React.Component {
          render() {
               return <WrappedComponent />;
          }
          }
          return HOC;
     };```

     Examples are 1. connect in react-redux
                  2. withRouter in react-router
                  3. Loading HOC or HOC with error handling logic which can be used across app 

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

Ans: 1. Promise:
     ```myPromise
          .then((res) => {
          console.log(res);
          })
          .catch((err) => { 
               // exceptions handling in catch block
               console.log(err);
          });
     ```

     2. Async...await

     ```
          async function demoPromise() {
               try {
               let message = await myPromise;
               console.log(message);

               }catch((error) => { 
                    // exceptions handling in catch block
                    console.log("Error:" + error.message);
               })
          }
     ```

     3. CallBack: Callback functions we can't catch error as these are simple functions which are being executted when some async task completed, so we have to check it in callback itself or we can pass separate error callback for that which will trigger in case of exceptions.


## 8. How many arguments does setState take and why is it async.

Ans: setState takes two arguments: new State and a Callback method(option) will be called after state get changed.

State update in batches, which means react may combined few setState and update it once to avoid re-render, that is why it is async.

## 9. List the steps needed to migrate a Class to Function Component.

Ans: 1. Change class expression to function
     2. define all state variables to const using useState hook
     3. Achieve lifecycle method using hooks, With the useEffect() Hook, you get the functionality of both componentDidMount, and componentDidUpdate.
     4. remove render method
     5. Replace React.Purecomponent to React.memo


## 10. List a few ways styles can be used with components.

Ans: 1. Inline Style
     2. Global Style (in index.html file)
     3. Adding style for each individual component
     5. Css in JS (adding css as javascript object)


## 11.  How to render an HTML string coming from the server.

Ans: We use dangerouslySetInnerHTML property to render html, though it's not recommended as it may introduce XSS bugs.
