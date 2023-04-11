import React from 'react';
import { FaGreaterThan } from 'react-icons/fa';

const Blog = () => {
    return (
        <div>
         <h1>1    What is a unit test? Why should we write unit tests?</h1>
        
         <p>  Unit testing involves testing individual components of the software program or application. The main purpose behind this is to check that all the individual parts are working as intended. A unit is known as the smallest possible component of software that can be tested </p>
       
         <br/> 
          <h1>2    What are the different ways to manage a state in a React application?  </h1>
           <p>       With React, you won’t modify the UI from code directly. For example, you won’t write commands like “disable the button”, “enable the button”, “show the success message”, etc. Instead, you will describe the UI you want to see for the different visual states of your component (“initial state”, “typing state”, “success state”), and then trigger the state changes in response to user input. This is similar to how designers think about UI.

Here is a quiz form built using React. Note how it uses the status state variable to determine whether to enable or disable the submit button, and whether to show the success message instead.</p>
      
      <br/>  <h1>3       How does prototypical inheritance work? </h1>
        <p>  In JavaScript, prototype inheritance is a way of sharing properties and methods between objects. Every object in JavaScript has a prototype, which is another object that the current object inherits properties and methods from. When a property or method is called on an object, JavaScript first checks the object's own properties and methods. If it can't find the property or method there, it checks the object's prototype, and then the prototype's prototype, and so on until it either finds the property or reaches the end of the prototype chain.

The prototype chain is established when an object is created. When a new object is created, it inherits its prototype from the constructor function that was used to create it. Constructor functions are simply functions that are used to create new objects with a shared set of properties and methods. The prototype of a constructor function is an object that becomes the prototype of any object created using that constructor function.

In summary, prototype inheritance is a way of sharing properties and methods between objects in JavaScript. It works by linking the prototype of a parent object to a child object, so that the child object can inherit properties and methods from the parent object's prototype. The prototype chain is established when an object is created, and it allows objects to access properties and methods from their prototypes and the prototypes of their ancestors.  </p>
     
<br/>
<h1>4     Difference React vs. Angular vs. Vue?</h1>
      
      <p>  A simple difference between these three is that React is a UI library, and Vue is a progressive framework. However, Angular is a full-fledged front-end framework. As per StackOverflow Survey 2022, React is the favorite framework of 40.14% of developers, Angular with 22.96%, and Vue with 18.97% of developers</p>
        </div> 

        
    );
};

export default Blog;