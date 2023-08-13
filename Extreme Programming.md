# Methodology
XP teams operate within a structured framework of fixed iteration cycles, with each iteration typically spanning 1, 2, or 3 weeks, a duration tailored to the team's context. Consistency is maintained, as a team usually sticks to the same iteration duration throughout their work.

At the commencement of each iteration, a collaborative planning session unfolds between the team and the customer. Within this session, the focal point is the features that the customer desires to see accomplished during this iteration. A granular dissection of each feature into individual engineering tasks transpires. Subsequently, developers choose specific tasks, assuming ownership, and provide estimations for each task's completion time. It's an integral principle that a developer does not undertake more tasks in the upcoming iteration than the number they successfully delivered in the prior one.

The course of the iteration is dedicated to bringing to life the chosen features. The approach taken is pair programming, where all production code development occurs collaboratively. A fundamental tenet is that code is crafted test-first, signifying that developers embark on code creation only after crafting a test case that initially fails. These tests encompass unit tests designed to assess individual classes and subsystems. Functional or acceptance tests, originating from the customer, validate the evolving features that the development team is diligently shaping.

Upon the iteration's conclusion, typically on a Friday, the developers present a functional system to the customer. While not necessarily comprehensive in its scope, the delivered system boasts flawless functionality for the components that have been implemented. The customer's acceptance of this delivery signifies a successful milestone, and the team takes the liberty of an early departure. The subsequent Monday convenes the team once more, marking the initiation of the planning phase for the subsequent iteration, thus propelling the iterative cycle onward.

In an almost understated manner, the product release transpires. The customer retrieves the functional system that emerged from a designated iteration and disseminates it to the end users. The near absence of defects within the system ensures that the release is characterized by minimal disruptions. The critical juncture is determining when the amalgamation of new functionalities by the developers reaches a point where it becomes advantageous for end users to embrace the upgraded version.

---

# Roles

## Tracker
The tracker's main focus is overseeing the project's progress, with a key role in supervising task advancement. In case of delays, the tracker can arrange team meetings to prevent setbacks or engage with the client for updates and adjustments.

## Manager
The primary goal of the Manager is steering the project's course. This role involves fostering a growth-friendly environment for the team, setting priorities and goals. The Manager also maintains communication between the client and the development team, aligning expectations and progress. Additionally, they handle risk mitigation and addressing challenges that arise during the project.

## Customer Liaison
The customer or customer liaison role revolves around translating client requirements into achievable objectives, forming user stories, and defining functional tests. Moreover, they assume the responsibility of assigning priority to individual user stories, ensuring they align with project goals.

## Programmer
The XP programmer translates user stories into features and tasks, providing time estimates for task completion. They proceed to code as per customer requirements, collaborate, and maintain quality through practices like pair programming, continuous integration, and writing unit tests.

## Coach
The coach ensures the project team adheres to XP practices, assisting with tasks like arranging meetings and adjusting priorities as needed.

## Doomsayer
Doomsayer is the person who brings attention to potential risks within a project. They make concerted efforts to avert these risks from materializing.
