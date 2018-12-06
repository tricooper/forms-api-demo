# HubSpot Forms API Code Demo

## Submitting HubSpot Forms Data using Express and Node

### Description
This is an example of HubSpot's Forms API (see documentation) using Express and Node.Js. This includes a basic Landing Page with a bootstrap form and a Thank You page; both of which are rendered using the Pug template engine. Upon Form Submission, the data is posted to a HubSpot portal giving it full functionality of a HubSpot embedded form. 

Outside of the Forms API, this form:
- Utilizes email address and required field validation using connect-flash messages. 
- Uses sessions to remember state of form fields if it errors out so a visitor does not have to retype their answers.
- Displays dynamic content in the Thank You page by passing the Form Submission data as a variable to the Thank You page.

### Prerequisites

To set this project up, you'll need an active HubSpot portal and an associated HubSpot Form. The associated pages should also have a HubSpot tracking code to appropriately track the visitor's analytics data after Form Submission. 

### Resources
- Sign up for a test HubSpot portal by signing up for a Developer's Account on [this page](https://developers.hubspot.com/). From the Developer's account, choose "testing" and then create a test HubSpot portal.
- Read Forms API Documentation [here](https://developers.hubspot.com/docs/methods/forms/submit_form)
- [HubSpot Forms FAQ](https://knowledge.hubspot.com/articles/kcs_article/forms/forms-faq)

