# To-Do List Application with Cloud Database Integration

As a software engineer, my primary goal is to continuously grow my technical skills while building real-world applications that solve problems efficiently. With this To-Do List application, I wanted to dive into integrating a cloud database. By doing so, I’m gaining hands-on experience with technologies like Firebase Firestore, learning how to handle real-time data syncing, and understanding cloud infrastructure.

# Description

- This is a simple and intuitive To-Do List Application that integrates with a Cloud Firestore Database to manage tasks in real-time. The application allows users to:

Add tasks with a title and description.
Delete tasks when they are no longer needed.
The program demonstrates integration with a cloud database by performing CRUD (Create, Read, Update, Delete) operations on Firestore. All tasks are stored in the cloud, enabling easy management and retrieval.

# Purpose
The purpose of this software is to showcase how a web application can integrate with a Cloud Database to perform essential data operations. This project is also designed to explore real-time database updates, security rules, and responsive web design.

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running, a walkthrough of the code, and a view of the cloud database.}

[Software Demo Video](https://youtu.be/O6LY7P4U6Vk)

# Cloud Database
- Description
This application uses Firebase Firestore as the cloud database. Firestore is a NoSQL database that allows real-time data syncing between the web application and the cloud.

- Database Structure
Collection Name: tasks
Document Fields:
title: (String) The title of the task.
description: (String) A brief description of the task.
status: (String) The status of the task (pending or completed).
createdAt: (Timestamp) The timestamp when the task was created.

# Development Environment

- Tools Used
Code Editor: Visual Studio Code
Browser: Google Chrome (for testing and debugging)
Firebase Console: For managing Firestore and configuring database rules

- Programming Language and Libraries
HTML: For structuring the application.
CSS: For styling the application.
JavaScript: For implementing functionality, including Firestore integration.
Firebase SDK:
firebase-app.js: For initializing Firebase.
firebase-firestore.js: For interacting with Firestore

# Useful Websites

Here are some resources that were helpful during this project:

- [Web Site Name](https://firebase.google.com/docs)
- [Web Site Name](https://developer.mozilla.org/en-US/)

# Future Work

Here are some improvements and features planned for the future:

Add user authentication so each user can manage their own tasks.
Enable offline support with Firestore’s offline capabilities.
Allow tasks to be categorized and sorted by priority or due date.
Implement notifications or reminders for tasks with deadlines.