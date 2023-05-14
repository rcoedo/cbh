# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

---

### Ticket 1: Extend the database schema to allow custom ids

We need to modify our database structure to store custom ids for each Agent that is assigned by the Facility.

#### Implementation details

Create a new migration with a `Facility_Agents` table and `facility_id`, `agent_id`, `custom_id` columns. This table will store the relationship between facilities and agents along with the custom id defined by the facility for each agent.

#### Acceptance Criteria

* Database schema changes do not affect existing functionality.

#### Effort estimation

~1 day

---

### Ticket 2: Update reports to include custom ids

We want to include the agent custom ids assigned by facilities in their reports. Modify the reports service to include
the new database fields.

#### Implementation details

* Update the `getShiftsByFacility` function to include custom ids of agents assigned by the facility in the data retrieved. Modify the SQL query within the `getShiftsByFacility` function to join with `Facility_Agents` table and fetch custom ids when necessary.
* Update the `generateReport` function to include the custom id when available.

#### Acceptance Criteria:

* The `getShiftsByFacility` function returns custom ids of agents if available, and the function continues to return data as expected when custom ids are not available.
* The generated report includes the custom id for an Agent when available.
* The changes don't break existing features.
* The tests are updated and cover the new functionality.
* New and refactored code follow good code standards and practices.

#### Effort estimation

~1 day

---

### Ticket 3: Add a new feature for Facilities to assign custom ids to Agents in the Facility dashboard

Facilities should be able to assign custom ids to the Agents they work with. Add a new feature in the Facility dashboard for assigning custom ids to Agents.

#### Implementation details

* In the `Agents` view of the facility dashboard, add a new `custom id` column.
* The user can update the field value by clicking the cell.
* When the cell loses focus, the value is updated.
* The backend properly stores the value.

#### Acceptance Criteria

* Facilities can assign, view, and update custom ids for Agents.
* The assigned custom id are correctly saved into the database.
* The new feature doesn't break existing functionality.
* The changes don't break existing features.
* The tests are updated and cover the new functionality.
* New and refactored code follow good code standards and practices.

#### Effort estimation

~ 3 days
