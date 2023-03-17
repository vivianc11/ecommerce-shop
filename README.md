# Headless E-commerce Site 
![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) &nbsp; 
![CommerceJS Badge](https://img.shields.io/badge/CommerceJS-FCC624?style=for-the-badge&logo=&logoColor=black)
![Stripe Badge](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![MaterialUI Badge](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

## What is a headless e-commerce?
Headless e-commerce is a modern approach to building an online store that decouples the frontend presentation layer from the backend e-commerce functionality. This means that the presentation layer can be developed and managed independently from the underlying e-commerce functionality.

The benefit of this approach allows developers to use different technologies and programming languages for the frontend and backend, which provides more <i>flexibility</i> and <i>scalability</i> for the e-commerce platform. In a headless e-commerce setup, the frontend can be built using modern web development frameworks like React, Angular or Vue, while the backend can be powered by a robust e-commerce platform like Shopify, Magento, WooCommerce, or CommerceJS.

Headless e-commerce allows online retailers to create unique and compelling customer experiences, including personalized product recommendations, dynamic pricing, and more, without being limited by the capabilities of a specific e-commerce platform's frontend. By separating the frontend from the backend, headless e-commerce makes it easier to add new features and integrations, and to scale the online store to meet growing demand.

### Features
The products currently available for purchase are showcased on the landing page, each with its own card displaying an image, description, price, and an "Add to Cart" button. Adding an item to the cart will trigger an update of the cart icon in the navbar with a number badge. To view and make adjustments to the items in their cart, the user can click on the cart icon, which will take them to their cart. When the user decides to checkout, Stripe handles the payment feature. After the purchase is complete, the user will be presented with a thank you message, a reference code, and Stripe will send a confirmation email.

### Future Development
- During development, I noticed that there was a lot of Prop Drilling happening within the code. With unnecessary prop passing, it can make the code more complex and harder to maintain during in the future. It can also lead to performance issues, as each time a prop is passed down, it adds a level of indirection and can potentially cause a re-render of the entire component tree. 
    - Solution: The site will have to be refactored using <b>context</b> in React, which allows data to be passed down the component tree without having to pass props explicitly through every level. Or using state management libraries like <b>Redux</b>, which allows data to be managed in a centralized store and accessed by any component that needs it, regardless of its position in the component tree.

## Table of Contents

-[Installation](#installation)

-[Usage](#usage)

-[Screenshots](#screenshots)

-[Resources](#resources)

-[License](#license)

-[Deployed Application](#deploy-application)


### Installation

1) Make sure you do have Node v16.x+ installed from <https://nodejs.org/en/download/>
2) Clone this repository:
````
$ git clone https://github.com/vivianc11/ecommerce-shop.git
````
3) Open folder in VS Code.
4) If you do see our package.json in your folder, in the Integrated Terminal at the level of the package.json, run the command:
````
npm i
````

### Screenshots



### Resources
[JavaScriptMastery](https://www.youtube.com/watch?v=377AQ0y6LPA&ab_channel=JavaScriptMastery)

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the terms of the MIT license.

## Deployed Application




