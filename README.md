# Cinema Fun - Movie Booking Application

## Overview
Cinema Fun is a modern web application that allows users to browse movies, book tickets, and receive notifications about new movie releases. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it features real-time seat booking functionality and email notifications.

## Key Features
- **Movie Browsing**: Users can explore movies by genre and use the search functionality
- **Real-time Seat Booking**: Interactive seat selection with real-time updates using Socket.io
- **Admin Dashboard**: Secure admin panel for managing movies and monitoring bookings
- **Notification System**: Email notifications for new movie releases using Redis pub/sub
- **Authentication**: JWT-based authentication for admin users
- **Responsive Design**: Modern UI with glass-morphism design elements

## Technical Stack
### Frontend
- React with Vite
- Zustand for state management
- Tailwind CSS for styling
- Framer Motion for animations
- Socket.io-client for real-time updates

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Redis for pub/sub functionality
- JWT for authentication
- Socket.io for real-time communications
- Nodemailer for email notifications

## Main Components
1. **Movie Management**
   - CRUD operations for movies
   - Genre-based categorization
   - Search functionality

2. **Booking System**
   - Interactive seat selection
   - Real-time seat availability updates
   - Booking confirmation

3. **Notification Service** (explaind: https://dianas-organization-14.gitbook.io/cinema-app/basics/editor)
  - A dedicated microservice has been implemented to handle email notifications
  - This service uses Redis pub/sub to listen for new movie releases and send notifications.
  - This functionality is separated into a microservice, ensuring that the main application remains lightweight and the notification process is handled independently.

4. **Admin Features**
   - Movie creation and management
   - Booking overview
   - User management

## Future Enhancements
- Payment integration
- User reviews and ratings
- Mobile application
- Analytics dashboard
- Extended booking features

