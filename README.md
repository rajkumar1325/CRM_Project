# LIFECYCLE 
## NEW --> CONTACTED --> QUALIFIED --> CONVERTED --> LOST



1. New: 
- A lead is in this stage when they have just been added to the system. 
- This could be from a website form, a trade show, a referral, or manual entry. 
- At this point, the lead is simply an unverified contact and needs to be reached out to.


2. Contacted: 
- The lead has been successfully reached. 
- This means a salesperson has made a successful connection, through an email, a phone call, or personal meeting. 
- The purpose of this stage is to gather initial information and determine if the lead is worth pursuing.


3. Qualified: 
- A lead enters this stage after the salesperson has determined they are a good fit for the product or service. 
- This is often based on criteria like their budget, authority to purchase, need for the product, and timeline. 
- A qualified lead is a promising prospect who is likely to convert.


4. Converted: 
- This is the final and most successful stage.
- The lead has completed the sales process, a deal has been closed, and they have become a paying customer.
- At this point, they are typically moved from the "leads" section of the CRM to the "customers" section.


5. Lost: This stage is for leads who are no longer being pursued. 



















# TECH I HAVE USED
- @mui for material and icons.
- @nivoCharts for charts
- sidebar using React-pro-sidebar
- Routing is done inside the APP.js under src






## Folder Information !
- App.js renders the final setting... {all components are rendered here.}

- Index.js :: 
- - React uses it to render your root component (App.js) into the DOM.
- - It connects your React components to the HTML file (public/index.html), where there’s usually a `<div id="root"></div>`.

- Index.css ::  {This is the global stylesheet.}
- - It applies CSS styles to the entire application, not just one component.

- App.css :: 
- - Usually used for component-level styling, especially for things inside your App component.

- Index.js ::
- - App.js is the root component of your React application.
- - It’s the first component that gets rendered by index.js.
- - All other components (like Header, Sidebar, Dashboard, etc.) are usually nested inside App.js.




## variant prop controls how the input looks. {Material UI}

#### Form variant
1. Outlined:
- Puts a rectangular border around the input.
- Label floats above the border when focused { Good for forms, most commonly used.}

2. filled
- Input background is filled with a slight color.
- Only has a bottom border line (subtle).

3. standard
- Minimal style: only an underline at the bottom.
- Very lightweight, no box/border around.


#### btn have its own variant
- text: A button with a transparent background and a text label. This is used for secondary, non-destructive actions.

- outlined: A button with a transparent background and a border.

- contained: A button with a solid, filled background. This is typically used for primary, prominent actions.




#####
pieChart --> Deals by state/stages
LineChart --> make using Chart.js and MUI material react