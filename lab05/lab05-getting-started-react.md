# 01UDF/01TXY Web Applications I (2025/2026)

## Lab 5: Getting Started with React    

In this lab, you will begin developing the front end of your web-based Film Library using React. The design should adhere to the specifications outlined in Lab 4 (see the [lab04 folder](https://github.com/polito-webapp1/lab-2026/tree/main/lab04)). As part of this process, you will restructure the Film Library to leverage React's component-based approach. This involves breaking down the application into distinct components, identifying the necessary state and props for storing and displaying films, and implementing functionality to filter the displayed films. 

------------------------------------------------------------------------

## 1. Create and configure the React application

Create a new React app using Vite. Then, use the React-enabled version of Bootstrap and its components to structure the front end of your web-based Film Library. You can find the documentation at <https://react-bootstrap.github.io/>.

Organize the page using React functional components stored in different files. Your application, for example, might have distinct components to manage the navigation bar, the sidebar, and the list of films.

Finally, add a suitable set of props and states to each component. Similarly to Lab 5, states and props for visualizing films must be initialized using a proper JS data structure (i.e., an array of Films). To display the Film Library, decide which components hold the states, and how information propagates using props.

**Note:** for this exercise, don't make the page interactive yet. Things like the favorite checkbox won't do anything for now. Your focus is on designing and implementing the main components needed to display the layout from Lab 4 accurately.

---

## 2. Implement the filters

Create all the suitable functions to implement the filters described below. Only the films matching the specified filter criteria must be displayed when a filter is clicked. Specifically, filtering should not affect the state(s) used to store the films, but only their visualization. To implement the filtering, you must associate the items in the sidebar with the following actions:

- **All**: display all the films in the Film Library (default filter).
- **Favorite**: display only films marked as favorites.
- **Best Rated**: display only films whose score is five out of five.
- **Seen Last Month**: display only films watched between today and the last 30 days.
- **Unseen**: display only films without a watch date.

---

### Notes:

1. For handling dates and times, you can continue to use Day.js.
2. You can find useful icons on the Bootstrap Icons site: <https://icons.getbootstrap.com>
